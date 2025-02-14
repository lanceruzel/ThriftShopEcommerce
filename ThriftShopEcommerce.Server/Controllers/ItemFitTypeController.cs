using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Interfaces;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/fit")]
    [ApiController]
    public class ItemFitTypeController : Controller, ICrudController<ItemFitType, int>
    {
        private readonly ApplicationDbContext _context;

        public ItemFitTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var items = await _context.ItemFitTypes.ToListAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occured while fetching data.");
            }
        }

        [HttpGet("{id}")]
        public Task<IActionResult> Show(int id)
        {
            return null;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemFitType entity)
        {
            if (entity == null || string.IsNullOrWhiteSpace(entity.Name))
            {
                return BadRequest("Invalid fit type data.");
            }

            try
            {
                _context.ItemFitTypes.Add(entity);
                await _context.SaveChangesAsync();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the fit type.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ItemFitType entity)
        {
            if (entity == null || entity.Id <= 0 || string.IsNullOrWhiteSpace(entity.Name))
            {
                return BadRequest("Invalid fit type data.");
            }

            if (id != entity.Id)
            {
                return BadRequest("ID in URL and body must match.");
            }

            try
            {
                var existingFitType = await _context.ItemFitTypes.FindAsync(entity.Id);
                if (existingFitType == null)
                {
                    return NotFound($"ItemFitType with ID {entity.Id} not found.");
                }

                // Update the Fit Type
                existingFitType.Name = entity.Name;
                _context.ItemFitTypes.Update(existingFitType);
                await _context.SaveChangesAsync();

                return Ok(existingFitType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid FitType ID.");
            }

            try
            {
                var fitType = await _context.ItemFitTypes.FindAsync(id);
                if (fitType == null)
                {
                    return NotFound($"FitType with ID {id} not found.");
                }

                _context.ItemFitTypes.Remove(fitType);
                await _context.SaveChangesAsync();

                return Ok($"FitType with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
