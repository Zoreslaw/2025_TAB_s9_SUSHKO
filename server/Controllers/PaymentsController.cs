using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
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
            var payments = await _context.Payments
                .Include(p => p.Tenant)
                    .ThenInclude(t => t.Resident)
                        .ThenInclude(r => r.User)
                .Include(p => p.Approver)
                .Include(p => p.Apartment)
                    .ThenInclude(a => a.Building)
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    TenantId = p.TenantId,
                    ApproverId = p.ApproverId,
                    ApartmentId = p.ApartmentId,
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
    }
} 