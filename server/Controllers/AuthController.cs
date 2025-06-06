using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Login) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Login and password are required");
            }

            // Find user by login
            var user = await _context.UserAccounts
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Apartment)
                        .ThenInclude(a => a.Building)
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Tenant)
                .FirstOrDefaultAsync(u => u.Login == request.Login);

            if (user == null)
            {
                return Unauthorized("Invalid login or password");
            }

            // Verify password using BCrypt
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Unauthorized("Invalid login or password");
            }

            // Check if user is active
            if (user.UserStatus?.ToLower() != "active")
            {
                return Unauthorized("Account is not active");
            }

            // Create response
            var response = new LoginResponse
            {
                UserId = user.UserId,
                Login = user.Login,
                Role = user.Role ?? "resident",
                UserStatus = user.UserStatus ?? "active",
                AvatarUrl = user.AvatarUrl,
                UserCreationDate = user.UserCreationDate,
                Residents = user.Residents?.Select(r => new ResidentDto
                {
                    ResidentId = r.ResidentId,
                    ApartmentId = r.ApartmentId,
                    ApartmentNumber = r.Apartment?.ApartmentNumber,
                    BuildingAddress = r.Apartment?.Building?.Address,
                    MoveinDate = r.MoveinDate,
                    ResidentStatus = r.ResidentStatus,
                    MoveoutDate = r.MoveoutDate,
                    Tenant = r.Tenant != null ? new TenantDto
                    {
                        TenantId = r.Tenant.TenantId,
                        LeaseStartDate = r.Tenant.LeaseStartDate,
                        LeaseEndDate = r.Tenant.LeaseEndDate
                    } : null
                }).ToList()
            };

            return Ok(response);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // For now, just return success
            // In a real app, you might invalidate tokens here
            return Ok(new { message = "Logged out successfully" });
        }
    }
} 