using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class ItemCategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ItemCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<ItemCategory> items = new List<ItemCategory>();

            try
            {
                items = await _context.ItemCategories.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occured while fetching data.");
            }

            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] ItemCategory category)
        {
            if (category == null || string.IsNullOrWhiteSpace(category.Name))
            {
                return BadRequest("Invalid category data.");
            }

            try
            {
                _context.ItemCategories.Add(category);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the category.");
            }

            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] ItemCategory category)
        {
            if (category == null || category.Id <= 0 || string.IsNullOrWhiteSpace(category.Name))
            {
                return BadRequest("Invalid category data.");
            }

            if (id != category.Id)
            {
                return BadRequest("ID in URL and body must match.");
            }

            try
            {
                var existingCategory = await _context.ItemCategories.FindAsync(category.Id);
                if (existingCategory == null)
                {
                    return NotFound($"Category with ID {category.Id} not found.");
                }

                // Update the category
                existingCategory.Name = category.Name;
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
        public async Task<IActionResult> DeleteCategory(int id)
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
