using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Interfaces;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/category")]
    [ApiController]
    public class ItemCategoryController : Controller, ICrudController<ItemCategory, int>
    {
        private readonly ApplicationDbContext _context;

        public ItemCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var items = await _context.ItemCategories.ToListAsync();
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
        public async Task<IActionResult> Create([FromBody] ItemCategory entity)
        {
            if (entity == null || string.IsNullOrWhiteSpace(entity.Name))
            {
                return BadRequest("Invalid category data.");
            }

            try
            {
                _context.ItemCategories.Add(entity);
                await _context.SaveChangesAsync();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the category.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ItemCategory entity)
        {
            if (entity == null || entity.Id <= 0 || string.IsNullOrWhiteSpace(entity.Name))
            {
                return BadRequest("Invalid category data.");
            }

            if (id != entity.Id)
            {
                return BadRequest("ID in URL and body must match.");
            }

            try
            {
                var existingCategory = await _context.ItemCategories.FindAsync(entity.Id);
                if (existingCategory == null)
                {
                    return NotFound($"Category with ID {entity.Id} not found.");
                }

                // Update the category
                existingCategory.Name = entity.Name;
                _context.ItemCategories.Update(existingCategory);
                await _context.SaveChangesAsync();

                return Ok(existingCategory);
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
                return BadRequest("Invalid category ID.");
            }

            try
            {
                var category = await _context.ItemCategories.FindAsync(id);

                if (category == null)
                {
                    return NotFound($"Category with ID {id} not found.");
                }

                _context.ItemCategories.Remove(category);
                await _context.SaveChangesAsync();

                return Ok($"Category with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
