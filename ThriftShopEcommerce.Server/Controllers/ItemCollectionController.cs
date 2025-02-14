using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Interfaces;
using ThriftShopEcommerce.Server.Model;
using ThriftShopEcommerce.Server.Models;
using ThriftShopEcommerce.Server.Models.DTO;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/collection")]
    [ApiController]
    public class ItemCollectionController : Controller, ICrudController<ItemCollection, int>
    {

        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly string imagesDirectory;

        public ItemCollectionController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
            imagesDirectory = Path.Combine(_environment.ContentRootPath, "Uploads", "Images", "Collections");
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ItemCollectionDTO entity)
        {
            try
            {
                // Rename image file
                string newFileName = $"{Guid.NewGuid()}{Path.GetExtension(entity.ImageFile!.FileName)}";

                // Get image path
                string imageFullPath = Path.Combine(imagesDirectory, newFileName);

                // Save image to path
                using (var stream = System.IO.File.Create(imageFullPath))
                {
                    await entity.ImageFile.CopyToAsync(stream);
                }


                ItemCollection itemCollection = new ItemCollection
                {
                    Name = entity.Name,
                    Image = newFileName
                };

                _context.Add(itemCollection);
                await _context.SaveChangesAsync();

                return Ok(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] ItemCollectionDTO entity)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid collection ID.");
            }

            try
            {
                ItemCollection? itemCollection = await _context.ItemCollections.FindAsync(id);

                if (itemCollection == null)
                {
                    return NotFound();
                }

                string newFileName = itemCollection.Image;

                if (entity.ImageFile != null)
                {
                    // Rename image file
                    newFileName = $"{Guid.NewGuid()}{Path.GetExtension(entity.ImageFile!.FileName)}";

                    // Get image path
                    string imageFullPath = Path.Combine(imagesDirectory, newFileName);

                    // Save image to path
                    using (var stream = System.IO.File.Create(imageFullPath))
                    {
                        await entity.ImageFile.CopyToAsync(stream);
                    }

                    //Delete old image file
                    string oldImageFullPath = Path.Combine(imagesDirectory, itemCollection.Image);
                    System.IO.File.Delete(oldImageFullPath);
                }

                itemCollection.Name = entity.Name;
                itemCollection.Image = newFileName;

                _context.Update(itemCollection);
                await _context.SaveChangesAsync();

                return Ok(entity);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid collection ID.");
            }

            try
            {
                var collection = await _context.ItemCollections.FindAsync(id);

                if (collection == null)
                {
                    return NotFound($"Collection with ID {id} not found.");
                }

                _context.ItemCollections.Remove(collection);
                await _context.SaveChangesAsync();

                return Ok($"Collection with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Show(int id)
        {
            if (id <= 0 || id == null)
            {
                return BadRequest("Invalid collection data.");
            }

            try
            {
                var collection = await _context.ItemCollections
                    .Include(i => i.Items)
                    .ToListAsync();

                if (collection == null)
                {
                    return NotFound("Collection not found");
                }

                return Ok(collection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var items = await _context.ItemCollections.ToListAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occured while fetching data.");
            }
        }

        Task<IActionResult> ICrudController<ItemCollection, int>.Create(ItemCollection entity)
        => throw new NotImplementedException();

        Task<IActionResult> ICrudController<ItemCollection, int>.Update(int id, ItemCollection entity)
        => throw new NotImplementedException();
    }
}
