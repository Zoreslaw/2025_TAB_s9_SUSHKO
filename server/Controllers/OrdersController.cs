using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            // Get user ID and role from query parameters
            var userId = Request.Query["userId"].FirstOrDefault();
            var userRole = Request.Query["userRole"].FirstOrDefault();
            
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("User ID is required");
            }

            var isManagerOrAdmin = userRole != null && (userRole.ToLower() == "manager" || userRole.ToLower() == "admin");

            var orders = await _context.Orders
                .Include(o => o.Orderer)
                .Include(o => o.Issue)
                .Where(o => isManagerOrAdmin || o.Issue.IssuerId == userIdInt)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    OrdererId = o.OrdererId,
                    OrdererName = o.Orderer.Login,
                    IssueId = o.IssueId,
                    IssueDescription = o.Issue.IssueDescription ?? "",
                    Cost = o.Cost,
                    Contractor = o.Contractor,
                    OrderDescription = o.OrderDescription,
                    OrderStatus = o.OrderStatus,
                    OrderCreationDate = o.OrderCreationDate,
                    OrderEndDate = o.OrderEndDate
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Orderer)
                .Include(o => o.Issue)
                .Where(o => o.OrderId == id)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    OrdererId = o.OrdererId,
                    OrdererName = o.Orderer.Login,
                    IssueId = o.IssueId,
                    IssueDescription = o.Issue.IssueDescription ?? "",
                    Cost = o.Cost,
                    Contractor = o.Contractor,
                    OrderDescription = o.OrderDescription,
                    OrderStatus = o.OrderStatus,
                    OrderCreationDate = o.OrderCreationDate,
                    OrderEndDate = o.OrderEndDate
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
        {
            // Get the current user (manager) from the request
            // For now, we'll use a default orderer ID - in a real app, get from JWT token
            var ordererId = 1; // TODO: Get from authentication

            var order = new Order
            {
                OrdererId = ordererId,
                IssueId = createOrderDto.IssueId,
                Cost = createOrderDto.Cost,
                Contractor = createOrderDto.Contractor,
                OrderDescription = createOrderDto.OrderDescription,
                OrderStatus = "pending"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Update the issue status to "in_progress"
            var issue = await _context.Issues.FindAsync(createOrderDto.IssueId);
            if (issue != null)
            {
                issue.IssueStatus = "in_progress";
                issue.IssueUpdateDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                OrdererId = order.OrdererId,
                OrdererName = "Manager", // TODO: Get actual name
                IssueId = order.IssueId,
                IssueDescription = createOrderDto.OrderDescription,
                Cost = order.Cost,
                Contractor = order.Contractor,
                OrderDescription = order.OrderDescription,
                OrderStatus = order.OrderStatus,
                OrderCreationDate = order.OrderCreationDate,
                OrderEndDate = order.OrderEndDate
            };

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, orderDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, UpdateOrderDto updateOrderDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updateOrderDto.Cost.HasValue)
                order.Cost = updateOrderDto.Cost.Value;
            
            if (!string.IsNullOrEmpty(updateOrderDto.Contractor))
                order.Contractor = updateOrderDto.Contractor;
            
            if (!string.IsNullOrEmpty(updateOrderDto.OrderDescription))
                order.OrderDescription = updateOrderDto.OrderDescription;
            
            if (!string.IsNullOrEmpty(updateOrderDto.OrderStatus))
                order.OrderStatus = updateOrderDto.OrderStatus;
            
            if (updateOrderDto.OrderEndDate.HasValue)
                order.OrderEndDate = updateOrderDto.OrderEndDate.Value;

            // If order is completed, update the issue status
            if (updateOrderDto.OrderStatus == "completed")
            {
                var issue = await _context.Issues.FindAsync(order.IssueId);
                if (issue != null)
                {
                    issue.IssueStatus = "resolved";
                    issue.IssueUpdateDate = DateTime.UtcNow;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await OrderExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> OrderExists(int id)
        {
            return await _context.Orders.AnyAsync(e => e.OrderId == id);
        }
    }
} 