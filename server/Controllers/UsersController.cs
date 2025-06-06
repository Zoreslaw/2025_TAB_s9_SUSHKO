using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.UserAccounts
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Apartment)
                        .ThenInclude(a => a.Building)
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Tenant)
                .Select(u => new UserDto
                {
                    UserId = u.UserId,
                    Login = u.Login,
                    AvatarUrl = u.AvatarUrl,
                    Role = u.Role,
                    UserStatus = u.UserStatus,
                    UserCreationDate = u.UserCreationDate,
                    Residents = u.Residents.Select(r => new ResidentDto
                    {
                        ResidentId = r.ResidentId,
                        ApartmentId = r.ApartmentId,
                        ApartmentNumber = r.Apartment.ApartmentNumber,
                        BuildingAddress = r.Apartment.Building.Address,
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
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.UserAccounts
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Apartment)
                        .ThenInclude(a => a.Building)
                .Include(u => u.Residents)
                    .ThenInclude(r => r.Tenant)
                .Where(u => u.UserId == id)
                .Select(u => new UserDto
                {
                    UserId = u.UserId,
                    Login = u.Login,
                    AvatarUrl = u.AvatarUrl,
                    Role = u.Role,
                    UserStatus = u.UserStatus,
                    UserCreationDate = u.UserCreationDate,
                    Residents = u.Residents.Select(r => new ResidentDto
                    {
                        ResidentId = r.ResidentId,
                        ApartmentId = r.ApartmentId,
                        ApartmentNumber = r.Apartment.ApartmentNumber,
                        BuildingAddress = r.Apartment.Building.Address,
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
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto createUserDto)
        {
            // Check if login already exists
            if (await _context.UserAccounts.AnyAsync(u => u.Login == createUserDto.Login))
            {
                return BadRequest("Login already exists");
            }

            var user = new UserAccount
            {
                Login = createUserDto.Login,
                Password = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password), // Hash password
                AvatarUrl = createUserDto.AvatarUrl,
                Role = createUserDto.Role,
                UserStatus = createUserDto.UserStatus,
                UserCreationDate = DateTime.UtcNow.Date
            };

            _context.UserAccounts.Add(user);
            await _context.SaveChangesAsync();

            var userDto = new UserDto
            {
                UserId = user.UserId,
                Login = user.Login,
                AvatarUrl = user.AvatarUrl,
                Role = user.Role,
                UserStatus = user.UserStatus,
                UserCreationDate = user.UserCreationDate,
                Residents = new List<ResidentDto>()
            };

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, userDto);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto updateUserDto)
        {
            var user = await _context.UserAccounts.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Check if new login already exists (if login is being changed)
            if (!string.IsNullOrEmpty(updateUserDto.Login) && 
                updateUserDto.Login != user.Login &&
                await _context.UserAccounts.AnyAsync(u => u.Login == updateUserDto.Login))
            {
                return BadRequest("Login already exists");
            }

            // Update only provided fields
            if (!string.IsNullOrEmpty(updateUserDto.Login))
                user.Login = updateUserDto.Login;
            
            if (updateUserDto.AvatarUrl != null)
                user.AvatarUrl = updateUserDto.AvatarUrl;
            
            if (!string.IsNullOrEmpty(updateUserDto.Role))
                user.Role = updateUserDto.Role;
            
            if (!string.IsNullOrEmpty(updateUserDto.UserStatus))
                user.UserStatus = updateUserDto.UserStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UserExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserAccounts.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.UserAccounts.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> UserExists(int id)
        {
            return await _context.UserAccounts.AnyAsync(e => e.UserId == id);
        }
    }
} 