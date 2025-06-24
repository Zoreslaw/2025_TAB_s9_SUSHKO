using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApartmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApartmentDto>>> GetApartments()
        {
            var apartments = await _context.Apartments
                .Include(a => a.Building)
                .Select(a => new ApartmentDto
                {
                    ApartmentId = a.ApartmentId,
                    BuildingId = a.BuildingId,
                    ApartmentNumber = a.ApartmentNumber,
                    BuildingAddress = a.Building.Address
                })
                .ToListAsync();

            return Ok(apartments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApartmentDto>> GetApartment(int id)
        {
            var apartment = await _context.Apartments
                .Include(a => a.Building)
                .Where(a => a.ApartmentId == id)
                .Select(a => new ApartmentDto
                {
                    ApartmentId = a.ApartmentId,
                    BuildingId = a.BuildingId,
                    ApartmentNumber = a.ApartmentNumber,
                    BuildingAddress = a.Building.Address
                })
                .FirstOrDefaultAsync();

            if (apartment == null)
            {
                return NotFound();
            }

            return Ok(apartment);
        }

        [HttpPost]
        public async Task<ActionResult<ApartmentDto>> CreateApartment(CreateApartmentDto createApartmentDto)
        {
            var apartment = new Apartment
            {
                BuildingId = createApartmentDto.BuildingId,
                ApartmentNumber = createApartmentDto.ApartmentNumber
            };

            _context.Apartments.Add(apartment);
            await _context.SaveChangesAsync();

            var apartmentDto = new ApartmentDto
            {
                ApartmentId = apartment.ApartmentId,
                BuildingId = apartment.BuildingId,
                ApartmentNumber = apartment.ApartmentNumber,
                BuildingAddress = "" // Will be populated when fetched with include
            };

            return CreatedAtAction(nameof(GetApartment), new { id = apartment.ApartmentId }, apartmentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApartment(int id, UpdateApartmentDto updateApartmentDto)
        {
            var apartment = await _context.Apartments.FindAsync(id);
            if (apartment == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (updateApartmentDto.BuildingId.HasValue)
                apartment.BuildingId = updateApartmentDto.BuildingId.Value;
            
            if (!string.IsNullOrEmpty(updateApartmentDto.ApartmentNumber))
                apartment.ApartmentNumber = updateApartmentDto.ApartmentNumber;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ApartmentExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApartment(int id)
        {
            var apartment = await _context.Apartments.FindAsync(id);
            if (apartment == null)
            {
                return NotFound();
            }

            _context.Apartments.Remove(apartment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> ApartmentExists(int id)
        {
            return await _context.Apartments.AnyAsync(e => e.ApartmentId == id);
        }
    }
} 