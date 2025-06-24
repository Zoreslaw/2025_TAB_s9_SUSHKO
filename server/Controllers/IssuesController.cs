using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IssuesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueDto>>> GetIssues()
        {
            // Get user ID and role from query parameters
            var userId = Request.Query["userId"].FirstOrDefault();
            var userRole = Request.Query["userRole"].FirstOrDefault();
            
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("User ID is required");
            }

            var isManagerOrAdmin = userRole != null && (userRole.ToLower() == "manager" || userRole.ToLower() == "admin");

            var issues = await _context.Issues
                .Include(i => i.Issuer)
                .Include(i => i.Operator)
                .Where(i => isManagerOrAdmin || i.IssuerId == userIdInt)
                .Select(i => new IssueDto
                {
                    IssueId = i.IssueId,
                    IssuerId = i.IssuerId,
                    OperatorId = i.OperatorId,
                    IssueDescription = i.IssueDescription,
                    IssueStatus = i.IssueStatus,
                    IssueType = i.IssueType,
                    IssueCreationDate = i.IssueCreationDate,
                    IssueUpdateDate = i.IssueUpdateDate
                })
                .ToListAsync();

            return Ok(issues);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<IssueDto>>> GetUserIssues(int userId)
        {
            var issues = await _context.Issues
                .Include(i => i.Issuer)
                .Include(i => i.Operator)
                .Where(i => i.IssuerId == userId) // Filter by user's issues
                .Select(i => new IssueDto
                {
                    IssueId = i.IssueId,
                    IssuerId = i.IssuerId,
                    OperatorId = i.OperatorId,
                    IssueDescription = i.IssueDescription,
                    IssueStatus = i.IssueStatus,
                    IssueType = i.IssueType,
                    IssueCreationDate = i.IssueCreationDate,
                    IssueUpdateDate = i.IssueUpdateDate
                })
                .ToListAsync();

            return Ok(issues);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IssueDto>> GetIssue(int id)
        {
            var issue = await _context.Issues
                .Include(i => i.Issuer)
                .Include(i => i.Operator)
                .Where(i => i.IssueId == id)
                .Select(i => new IssueDto
                {
                    IssueId = i.IssueId,
                    IssuerId = i.IssuerId,
                    OperatorId = i.OperatorId,
                    IssueDescription = i.IssueDescription,
                    IssueStatus = i.IssueStatus,
                    IssueType = i.IssueType,
                    IssueCreationDate = i.IssueCreationDate,
                    IssueUpdateDate = i.IssueUpdateDate
                })
                .FirstOrDefaultAsync();

            if (issue == null)
            {
                return NotFound();
            }

            return Ok(issue);
        }

        [HttpPost]
        public async Task<ActionResult<IssueDto>> CreateIssue(CreateIssueDto createIssueDto)
        {
            var issue = new Issue
            {
                IssuerId = createIssueDto.IssuerId,
                IssueDescription = createIssueDto.IssueDescription,
                IssueType = createIssueDto.IssueType,
                IssueStatus = createIssueDto.IssueStatus,
                IssueCreationDate = DateTime.UtcNow.Date
            };

            _context.Issues.Add(issue);
            await _context.SaveChangesAsync();

            // Notify all managers and admins about new issue
            var managersAndAdmins = await _context.UserAccounts
                .Where(u => u.Role == "manager" || u.Role == "admin")
                .ToListAsync();
            foreach (var user in managersAndAdmins)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = user.UserId,
                    Title = "Nowe zgłoszenie",
                    Message = $"Nowe zgłoszenie: {issue.IssueDescription}",
                    Type = "issue",
                    Priority = "high",
                    CreatedDate = DateTime.UtcNow,
                    IssueId = issue.IssueId
                });
            }
            await _context.SaveChangesAsync();

            var issueDto = new IssueDto
            {
                IssueId = issue.IssueId,
                IssuerId = issue.IssuerId,
                OperatorId = issue.OperatorId,
                IssueDescription = issue.IssueDescription,
                IssueStatus = issue.IssueStatus,
                IssueType = issue.IssueType,
                IssueCreationDate = issue.IssueCreationDate,
                IssueUpdateDate = issue.IssueUpdateDate
            };

            return CreatedAtAction(nameof(GetIssue), new { id = issue.IssueId }, issueDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIssue(int id, UpdateIssueDto updateIssueDto)
        {
            var issue = await _context.Issues.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updateIssueDto.OperatorId.HasValue)
                issue.OperatorId = updateIssueDto.OperatorId.Value;
            
            if (!string.IsNullOrEmpty(updateIssueDto.IssueDescription))
                issue.IssueDescription = updateIssueDto.IssueDescription;
            
            if (!string.IsNullOrEmpty(updateIssueDto.IssueStatus))
                issue.IssueStatus = updateIssueDto.IssueStatus;
            
            if (!string.IsNullOrEmpty(updateIssueDto.IssueType))
                issue.IssueType = updateIssueDto.IssueType;

            issue.IssueUpdateDate = DateTime.UtcNow.Date;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await IssueExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(int id)
        {
            var issue = await _context.Issues.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }

            _context.Issues.Remove(issue);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignOperator(int id, [FromBody] int operatorId)
        {
            var issue = await _context.Issues.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }

            issue.OperatorId = operatorId;
            issue.IssueStatus = "in_progress";
            issue.IssueUpdateDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // Notify assigned operator
            _context.Notifications.Add(new Notification
            {
                UserId = operatorId,
                Title = "Przypisano zgłoszenie",
                Message = $"Zostałeś przypisany do zgłoszenia: {issue.IssueDescription}",
                Type = "issue",
                Priority = "info",
                CreatedDate = DateTime.UtcNow,
                IssueId = issue.IssueId
            });
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var issue = await _context.Issues.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }

            issue.IssueStatus = status;
            issue.IssueUpdateDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // Notify issuer and operator about status change
            if (issue.IssuerId != 0)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = issue.IssuerId,
                    Title = "Zmiana statusu zgłoszenia",
                    Message = $"Status Twojego zgłoszenia został zmieniony na: {status}",
                    Type = "issue",
                    Priority = "info",
                    CreatedDate = DateTime.UtcNow,
                    IssueId = issue.IssueId
                });
            }
            if (issue.OperatorId.HasValue)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = issue.OperatorId.Value,
                    Title = "Zmiana statusu zgłoszenia",
                    Message = $"Status przypisanego zgłoszenia został zmieniony na: {status}",
                    Type = "issue",
                    Priority = "info",
                    CreatedDate = DateTime.UtcNow,
                    IssueId = issue.IssueId
                });
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> IssueExists(int id)
        {
            return await _context.Issues.AnyAsync(e => e.IssueId == id);
        }
    }
} 