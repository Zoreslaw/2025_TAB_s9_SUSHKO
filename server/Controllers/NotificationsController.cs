using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetNotifications()
        {
            // Get user ID and role from query parameters
            var userId = Request.Query["userId"].FirstOrDefault();
            var userRole = Request.Query["userRole"].FirstOrDefault();
            
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("User ID is required");
            }

            var isManagerOrAdmin = userRole != null && (userRole.ToLower() == "manager" || userRole.ToLower() == "admin");

            var notifications = await _context.Notifications
                .Where(n => isManagerOrAdmin || n.UserId == userIdInt)
                .OrderByDescending(n => n.CreatedDate)
                .Select(n => new NotificationDto
                {
                    NotificationId = n.NotificationId,
                    UserId = n.UserId,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    Priority = n.Priority,
                    IsRead = n.IsRead,
                    CreatedDate = n.CreatedDate,
                    ReadDate = n.ReadDate,
                    IssueId = n.IssueId,
                    OrderId = n.OrderId,
                    PaymentId = n.PaymentId
                })
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetUserNotifications(int userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedDate)
                .Select(n => new NotificationDto
                {
                    NotificationId = n.NotificationId,
                    UserId = n.UserId,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    Priority = n.Priority,
                    IsRead = n.IsRead,
                    CreatedDate = n.CreatedDate,
                    ReadDate = n.ReadDate,
                    IssueId = n.IssueId,
                    OrderId = n.OrderId,
                    PaymentId = n.PaymentId
                })
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NotificationDto>> GetNotification(int id)
        {
            var notification = await _context.Notifications
                .Where(n => n.NotificationId == id)
                .Select(n => new NotificationDto
                {
                    NotificationId = n.NotificationId,
                    UserId = n.UserId,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    Priority = n.Priority,
                    IsRead = n.IsRead,
                    CreatedDate = n.CreatedDate,
                    ReadDate = n.ReadDate,
                    IssueId = n.IssueId,
                    OrderId = n.OrderId,
                    PaymentId = n.PaymentId
                })
                .FirstOrDefaultAsync();

            if (notification == null)
            {
                return NotFound();
            }

            return Ok(notification);
        }

        [HttpPost]
        public async Task<ActionResult<NotificationDto>> CreateNotification(CreateNotificationDto createNotificationDto)
        {
            var notification = new Notification
            {
                UserId = createNotificationDto.UserId,
                Title = createNotificationDto.Title,
                Message = createNotificationDto.Message,
                Type = createNotificationDto.Type,
                Priority = createNotificationDto.Priority,
                IssueId = createNotificationDto.IssueId,
                OrderId = createNotificationDto.OrderId,
                PaymentId = createNotificationDto.PaymentId
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            var notificationDto = new NotificationDto
            {
                NotificationId = notification.NotificationId,
                UserId = notification.UserId,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                Priority = notification.Priority,
                IsRead = notification.IsRead,
                CreatedDate = notification.CreatedDate,
                ReadDate = notification.ReadDate,
                IssueId = notification.IssueId,
                OrderId = notification.OrderId,
                PaymentId = notification.PaymentId
            };

            return CreatedAtAction(nameof(GetNotification), new { id = notification.NotificationId }, notificationDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, UpdateNotificationDto updateNotificationDto)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updateNotificationDto.IsRead.HasValue)
                notification.IsRead = updateNotificationDto.IsRead.Value;
            
            if (updateNotificationDto.ReadDate.HasValue)
                notification.ReadDate = updateNotificationDto.ReadDate.Value;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await NotificationExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            notification.IsRead = true;
            notification.ReadDate = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await NotificationExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> NotificationExists(int id)
        {
            return await _context.Notifications.AnyAsync(e => e.NotificationId == id);
        }
    }
} 