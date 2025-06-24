using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuildingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BuildingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BuildingDto>>> GetBuildings()
        {
            var buildings = await _context.Buildings
                .Select(b => new BuildingDto
                {
                    BuildingId = b.BuildingId,
                    Address = b.Address,
                    Flats = b.Apartments.Count
                })
                .ToListAsync();

            return Ok(buildings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BuildingDto>> GetBuilding(int id)
        {
            var building = await _context.Buildings
                .Where(b => b.BuildingId == id)
                .Select(b => new BuildingDto
                {
                    BuildingId = b.BuildingId,
                    Address = b.Address,
                    Flats = b.Apartments.Count
                })
                .FirstOrDefaultAsync();

            if (building == null)
            {
                return NotFound();
            }

            return Ok(building);
        }

        [HttpPost]
        public async Task<ActionResult<BuildingDto>> CreateBuilding(CreateBuildingDto createBuildingDto)
        {
            var building = new Building
            {
                Address = createBuildingDto.Address
            };

            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();

            var buildingDto = new BuildingDto
            {
                BuildingId = building.BuildingId,
                Address = building.Address,
                Flats = 0
            };

            return CreatedAtAction(nameof(GetBuilding), new { id = building.BuildingId }, buildingDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBuilding(int id, UpdateBuildingDto updateBuildingDto)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (!string.IsNullOrEmpty(updateBuildingDto.Address))
                building.Address = updateBuildingDto.Address;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BuildingExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound();
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> BuildingExists(int id)
        {
            return await _context.Buildings.AnyAsync(e => e.BuildingId == id);
        }
    }
} 