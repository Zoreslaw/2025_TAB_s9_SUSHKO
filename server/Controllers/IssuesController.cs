using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
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
            var issues = await _context.Issues
                .Include(i => i.Issuer)
                .Include(i => i.Operator)
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
    }
} 