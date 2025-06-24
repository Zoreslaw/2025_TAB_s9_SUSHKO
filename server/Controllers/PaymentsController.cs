using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetPayments()
        {
            // Get user ID and role from query parameters
            var userId = Request.Query["userId"].FirstOrDefault();
            var userRole = Request.Query["userRole"].FirstOrDefault();
            
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("User ID is required");
            }

            var isManagerOrAdmin = userRole != null && (userRole.ToLower() == "manager" || userRole.ToLower() == "admin");

            var payments = await _context.Payments
                .Include(p => p.Tenant)
                    .ThenInclude(t => t.Resident)
                        .ThenInclude(r => r.User)
                .Include(p => p.Approver)
                .Include(p => p.Apartment)
                    .ThenInclude(a => a.Building)
                .Where(p => isManagerOrAdmin || 
                           // Find payments for apartments where the user lives
                           _context.Residents.Any(r => r.UserId == userIdInt && r.ApartmentId == p.ApartmentId))
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    TenantId = p.TenantId,
                    ApproverId = p.ApproverId,
                    ApartmentId = p.ApartmentId,
                    OrderId = p.OrderId,
                    PaymentAmount = p.PaymentAmount,
                    PaymentDescription = p.PaymentDescription,
                    PaymentDate = p.PaymentDate,
                    PaymentStatus = p.PaymentStatus
                })
                .ToListAsync();

            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDto>> GetPayment(int id)
        {
            var payment = await _context.Payments
                .Include(p => p.Tenant)
                    .ThenInclude(t => t.Resident)
                        .ThenInclude(r => r.User)
                .Include(p => p.Approver)
                .Include(p => p.Apartment)
                    .ThenInclude(a => a.Building)
                .Where(p => p.PaymentId == id)
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    TenantId = p.TenantId,
                    ApproverId = p.ApproverId,
                    ApartmentId = p.ApartmentId,
                    OrderId = p.OrderId,
                    PaymentAmount = p.PaymentAmount,
                    PaymentDescription = p.PaymentDescription,
                    PaymentDate = p.PaymentDate,
                    PaymentStatus = p.PaymentStatus
                })
                .FirstOrDefaultAsync();

            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePayment(CreatePaymentDto createPaymentDto)
        {
            var payment = new Payment
            {
                TenantId = createPaymentDto.TenantId,
                ApartmentId = createPaymentDto.ApartmentId,
                PaymentAmount = createPaymentDto.PaymentAmount,
                PaymentDescription = createPaymentDto.PaymentDescription,
                PaymentDate = createPaymentDto.PaymentDate,
                PaymentStatus = createPaymentDto.PaymentStatus
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            var paymentDto = new PaymentDto
            {
                PaymentId = payment.PaymentId,
                TenantId = payment.TenantId,
                ApproverId = payment.ApproverId,
                ApartmentId = payment.ApartmentId,
                OrderId = payment.OrderId,
                PaymentAmount = payment.PaymentAmount,
                PaymentDescription = payment.PaymentDescription,
                PaymentDate = payment.PaymentDate,
                PaymentStatus = payment.PaymentStatus
            };

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, paymentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, UpdatePaymentDto updatePaymentDto)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updatePaymentDto.ApproverId.HasValue)
                payment.ApproverId = updatePaymentDto.ApproverId.Value;
            
            if (updatePaymentDto.PaymentAmount.HasValue)
                payment.PaymentAmount = updatePaymentDto.PaymentAmount.Value;
            
            if (!string.IsNullOrEmpty(updatePaymentDto.PaymentDescription))
                payment.PaymentDescription = updatePaymentDto.PaymentDescription;
            
            if (updatePaymentDto.PaymentDate.HasValue)
                payment.PaymentDate = updatePaymentDto.PaymentDate.Value;
            
            if (!string.IsNullOrEmpty(updatePaymentDto.PaymentStatus))
                payment.PaymentStatus = updatePaymentDto.PaymentStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PaymentExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("from-order/{orderId}")]
        public async Task<ActionResult<PaymentDto>> CreatePaymentFromOrder(int orderId, [FromBody] int approverId)
        {
            // Get the order with related data
            var order = await _context.Orders
                .Include(o => o.Issue)
                    .ThenInclude(i => i.Issuer)
                        .ThenInclude(u => u.Residents)
                            .ThenInclude(r => r.Apartment)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            // Only allow payment creation for completed orders
            if (!string.Equals(order.OrderStatus, "completed", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Payment can only be created for completed orders.");
            }

            // Check if a payment already exists for this order
            var existingPayment = await _context.Payments
                .FirstOrDefaultAsync(p => p.OrderId == orderId);

            if (existingPayment != null)
            {
                return BadRequest("A payment already exists for this order.");
            }

            // Find the apartment where the issue occurred
            var issueApartment = order.Issue.Issuer.Residents
                .Select(r => r.Apartment)
                .FirstOrDefault();

            if (issueApartment == null)
            {
                return BadRequest("No apartment found for the issue issuer");
            }

            // Find the tenant who is responsible for this apartment
            // We need to find a tenant who has this apartment and is currently active
            var tenant = await _context.Tenants
                .Include(t => t.Resident)
                    .ThenInclude(r => r.User)
                .Where(t => t.ApartmentId == issueApartment.ApartmentId)
                .FirstOrDefaultAsync();

            if (tenant == null)
            {
                return BadRequest("No tenant found for the apartment where the issue occurred");
            }

            var payment = new Payment
            {
                TenantId = tenant.TenantId,
                ApproverId = approverId,
                ApartmentId = issueApartment.ApartmentId,
                OrderId = orderId, // Set the OrderId to link payment to order
                PaymentAmount = order.Cost,
                PaymentDescription = $"Płatność za naprawę: {order.OrderDescription}",
                PaymentDate = DateTime.UtcNow,
                PaymentStatus = "pending"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Create notification for the tenant
            var notification = new Notification
            {
                UserId = tenant.Resident.UserId,
                Title = "Nowa płatność do uregulowania",
                Message = $"Utworzono nową płatność w wysokości {order.Cost:C} za naprawę: {order.OrderDescription}",
                Type = "payment",
                Priority = "medium",
                PaymentId = payment.PaymentId,
                OrderId = orderId
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            var paymentDto = new PaymentDto
            {
                PaymentId = payment.PaymentId,
                TenantId = payment.TenantId,
                ApproverId = payment.ApproverId,
                ApartmentId = payment.ApartmentId,
                OrderId = payment.OrderId,
                PaymentAmount = payment.PaymentAmount,
                PaymentDescription = payment.PaymentDescription,
                PaymentDate = payment.PaymentDate,
                PaymentStatus = payment.PaymentStatus
            };

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, paymentDto);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetUserPayments(int userId)
        {
            var payments = await _context.Payments
                .Include(p => p.Tenant)
                    .ThenInclude(t => t.Resident)
                        .ThenInclude(r => r.User)
                .Include(p => p.Approver)
                .Include(p => p.Apartment)
                    .ThenInclude(a => a.Building)
                .Where(p => _context.Residents.Any(r => r.UserId == userId && r.ApartmentId == p.ApartmentId)) // Filter by user's apartment
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    TenantId = p.TenantId,
                    ApproverId = p.ApproverId,
                    ApartmentId = p.ApartmentId,
                    OrderId = p.OrderId,
                    PaymentAmount = p.PaymentAmount,
                    PaymentDescription = p.PaymentDescription,
                    PaymentDate = p.PaymentDate,
                    PaymentStatus = p.PaymentStatus
                })
                .ToListAsync();

            return Ok(payments);
        }

        private async Task<bool> PaymentExists(int id)
        {
            return await _context.Payments.AnyAsync(e => e.PaymentId == id);
        }
    }
} 