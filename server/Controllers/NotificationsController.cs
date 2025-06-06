using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
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
            var notifications = new List<NotificationDto>();

            // Get recent resolved issues (last 30 days)
            var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
            var recentResolvedIssues = await _context.Issues
                .Where(i => i.IssueStatus == "resolved" && 
                           i.IssueUpdateDate.HasValue && 
                           i.IssueUpdateDate.Value >= thirtyDaysAgo)
                .OrderByDescending(i => i.IssueUpdateDate)
                .Take(5)
                .ToListAsync();

            foreach (var issue in recentResolvedIssues)
            {
                notifications.Add(new NotificationDto
                {
                    Id = $"issue_{issue.IssueId}",
                    Title = "Zgłoszona awaria została usunięta",
                    Date = issue.IssueUpdateDate?.ToString("dd.MM.yyyy") ?? DateTime.UtcNow.ToString("dd.MM.yyyy"),
                    Description = $"Zgłoszenie dotyczące: {issue.IssueDescription} zostało zrealizowane.",
                    Type = "issue_resolved",
                    Priority = "normal"
                });
            }

            // Get overdue payments
            var overduePayments = await _context.Payments
                .Where(p => p.PaymentStatus == "overdue")
                .OrderByDescending(p => p.PaymentDate)
                .Take(3)
                .ToListAsync();

            foreach (var payment in overduePayments)
            {
                notifications.Add(new NotificationDto
                {
                    Id = $"payment_{payment.PaymentId}",
                    Title = "Zaległe płatności",
                    Date = payment.PaymentDate.ToString("dd.MM.yyyy"),
                    Description = $"Prosimy o uregulowanie: {payment.PaymentDescription}. Kwota: {payment.PaymentAmount:C}",
                    Type = "payment_overdue",
                    Priority = "high"
                });
            }

            // Get recent pending issues
            var pendingIssues = await _context.Issues
                .Where(i => i.IssueStatus == "pending")
                .OrderByDescending(i => i.IssueCreationDate)
                .Take(3)
                .ToListAsync();

            foreach (var issue in pendingIssues)
            {
                notifications.Add(new NotificationDto
                {
                    Id = $"pending_issue_{issue.IssueId}",
                    Title = "Nowe zgłoszenie oczekuje na realizację",
                    Date = issue.IssueCreationDate.ToString("dd.MM.yyyy"),
                    Description = $"Zgłoszenie: {issue.IssueDescription}",
                    Type = "issue_pending",
                    Priority = "normal"
                });
            }

            // Add some system notifications
            notifications.Add(new NotificationDto
            {
                Id = "system_maintenance",
                Title = "Planowane prace remontowe",
                Date = DateTime.UtcNow.AddDays(10).ToString("dd.MM.yyyy"),
                Description = "Informujemy, że w najbliższych tygodniach planowane są prace remontowe w klatce schodowej.",
                Type = "system",
                Priority = "normal"
            });

            // Sort by priority and date
            var sortedNotifications = notifications
                .OrderBy(n => n.Priority == "high" ? 0 : 1)
                .ThenByDescending(n => {
                    if (DateTime.TryParse(n.Date, out DateTime parsedDate))
                        return parsedDate;
                    return DateTime.MinValue;
                })
                .Take(10)
                .ToList();

            return Ok(sortedNotifications);
        }
    }
} 