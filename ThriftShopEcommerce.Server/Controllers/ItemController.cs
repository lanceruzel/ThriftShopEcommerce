using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Interfaces;
using ThriftShopEcommerce.Server.Model;
using ThriftShopEcommerce.Server.Models;
using ThriftShopEcommerce.Server.Models.DTO;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/item")]
    [ApiController]
    public class ItemController : Controller, ICrudController<Item, int>
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ILogger<ItemController> _logger;
        private readonly string imagesDirectory;

        public ItemController(ILogger<ItemController> logger, ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            imagesDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads", "Images", "Products");
        }

        Task<IActionResult> ICrudController<Item, int>.Create(Item entity)
        => throw new NotImplementedException();

        Task<IActionResult> ICrudController<Item, int>.Update(int id, Item entity)
        => throw new NotImplementedException();

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ItemDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Invalid item data.");
                }

                if (dto.ImageFiles == null || dto.ImageFiles.Count == 0)
                {
                    return BadRequest("At least one image is required.");
                }

                // Ensure images directory exists
                if (!Directory.Exists(imagesDirectory))
                {
                    Directory.CreateDirectory(imagesDirectory);
                }

                List<string> savedImagePaths = new List<string>();

                try
                {
                    foreach (var file in dto.ImageFiles)
                    {
                        // Rename image file
                        string newFileName = $"{Guid.NewGuid()}{Path.GetExtension(file!.FileName)}";

                        // Get image path
                        string imageFullPath = Path.Combine(imagesDirectory, newFileName);

                        // Save image to path
                        using (var stream = System.IO.File.Create(imageFullPath))
                        {
                            await file.CopyToAsync(stream);
                        }

                        // Save image into list
                        savedImagePaths.Add(newFileName);
                    }

                    Item item = new Item
                    {
                        Code = dto.Code,
                        Description = dto.Description,
                        Gender = dto.Gender,
                        OldPrice = dto.OldPrice,
                        NewPrice = dto.NewPrice,
                        ItemCategoryId = dto.ItemCategoryId,
                        ItemFitTypeId = dto.ItemFitTypeId,
                        ItemCollectionId = dto.ItemCollectionId,
                        Images = JsonSerializer.Serialize(savedImagePaths),
                    };

                    ItemSize itemSize = new ItemSize
                    {
                        Shoulder = dto.Shoulder,
                        Chest = dto.Chest,
                        SleeveLength = dto.SleeveLength,
                        Length = dto.Length,
                        Waist = dto.Waist,
                        Thigh = dto.Thigh,
                        Inseam = dto.Inseam,
                        LegOpening = dto.LegOpening,
                        Item = item
                    };

                    _context.Add(item);
                    _context.Add(itemSize);
                    await _context.SaveChangesAsync();

                    return Ok(item);
                }
                catch (Exception ex)
                {
                    // If DB save fails, delete the uploaded images
                    foreach (var imagePath in savedImagePaths)
                    {
                        string fullPath = Path.Combine(imagesDirectory, imagePath);

                        if (System.IO.File.Exists(fullPath))
                        {
                            System.IO.File.Delete(fullPath);
                        }
                    }
                    return StatusCode(500, $"An error occurred while saving the item to the database: {ex.Message}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] ItemDTO dto)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid item ID.");
            }

            List<string> newImagePaths = new List<string>();

            try
            {
                var item = await _context.Items.FindAsync(id);

                if (item == null)
                {
                    return NotFound($"Item with ID {id} not found.");
                }

                // Ensure images directory exists
                if (!Directory.Exists(imagesDirectory))
                {
                    Directory.CreateDirectory(imagesDirectory);
                }

                // Deserialize db image paths
                List<string> existingImages = string.IsNullOrEmpty(item.Images)
                            ? new List<string>()
                            : JsonSerializer.Deserialize<List<string>>(item.Images) ?? new List<string>();

                List<string> updatedImages = new List<string>(existingImages);
                
                try
                {
                    //Delete removed images
                    if (dto.RemovedImages != null && dto.RemovedImages.Count > 0)
                    {

                        if (dto.RemovedImages.Count == 1 && dto.RemovedImages[0].StartsWith("["))
                        {
                            // Deserialize the JSON string into a List<string>
                            dto.RemovedImages = JsonSerializer.Deserialize<List<string>>(dto.RemovedImages[0]);
                        }

                        foreach (var imageName in dto.RemovedImages)
                        {
                            string imagePath = Path.Combine(imagesDirectory, imageName);

                            if (System.IO.File.Exists(imagePath))
                            {
                                System.IO.File.Delete(imagePath);
                            }

                            // Remove from the list of images
                            updatedImages.Remove(imageName);
                        }
                    }

                    //Save new images
                    if (dto.ImageFiles != null && dto.ImageFiles.Count > 0)
                    {
                        foreach (var file in dto.ImageFiles)
                        {
                            string newFileName = $"{Guid.NewGuid()}{Path.GetExtension(file!.FileName)}";

                            string imageFullPath = Path.Combine(imagesDirectory, newFileName);

                            using (var stream = System.IO.File.Create(imageFullPath))
                            {
                                await file.CopyToAsync(stream);
                            }

                            newImagePaths.Add(newFileName);
                            updatedImages.Add(newFileName);
                        }
                    }

                    item.Code = dto.Code;
                    item.Description = dto.Description;
                    item.Gender = dto.Gender;
                    item.OldPrice = dto.OldPrice;
                    item.NewPrice = dto.NewPrice;
                    item.ItemCategoryId = dto.ItemCategoryId;
                    item.ItemFitTypeId = dto.ItemFitTypeId;
                    item.ItemCollectionId = dto.ItemCollectionId;
                    item.Images = JsonSerializer.Serialize(updatedImages);

                    // Update the existing itemsize and create new if not exists
                    var itemSize = await _context.ItemSizes.FirstOrDefaultAsync(s => s.ItemId == item.Id);

                    if (itemSize != null)
                    {
                        itemSize.Shoulder = dto.Shoulder;
                        itemSize.Chest = dto.Chest;
                        itemSize.SleeveLength = dto.SleeveLength;
                        itemSize.Length = dto.Length;
                        itemSize.Waist = dto.Waist;
                        itemSize.Thigh = dto.Thigh;
                        itemSize.Inseam = dto.Inseam;
                        itemSize.LegOpening = dto.LegOpening;
                    }
                    else
                    {
                        itemSize = new ItemSize
                        {
                            ItemId = item.Id,
                            Shoulder = dto.Shoulder,
                            Chest = dto.Chest,
                            SleeveLength = dto.SleeveLength,
                            Length = dto.Length,
                            Waist = dto.Waist,
                            Thigh = dto.Thigh,
                            Inseam = dto.Inseam,
                            LegOpening = dto.LegOpening
                        };
                        _context.ItemSizes.Add(itemSize);
                    }

                    _context.Update(item);
                    _context.Update(itemSize);
                    await _context.SaveChangesAsync();

                    return Ok(item);
                }
                catch(Exception ex)
                {
                    //Delete new saved images
                    foreach (var image in newImagePaths)
                    {
                        string fullPath = Path.Combine(imagesDirectory, image);

                        if (System.IO.File.Exists(fullPath))
                        {
                            System.IO.File.Delete(fullPath);
                        }
                    }

                    return StatusCode(500, $"An error occurred while updating the item: {ex.Message}");
                }
            }
            catch (Exception ex)
            {
                //Delete new saved images
                foreach (var image in newImagePaths)
                {
                    string fullPath = Path.Combine(imagesDirectory, image);

                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                }

                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid item ID.");
            }

            try
            {
                var item = await _context.Items.FindAsync(id);

                if (item == null)
                {
                    return NotFound($"Item with ID {id} not found.");
                }

                // Deserialize image paths
                List<string>? imagePaths = JsonSerializer.Deserialize<List<string>>(item.Images);

                // Save changes
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();

                //Delete images if delete is success
                if (imagePaths != null)
                {
                    foreach (var filename in imagePaths)
                    {
                        string fullPath = Path.Combine(imagesDirectory, filename);

                        if (System.IO.File.Exists(fullPath))
                        {
                            System.IO.File.Delete(fullPath);
                        }
                    }
                }

                return Ok($"Item with ID {id} deleted successfully.");
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
                var items = await _context.Items
                    .Include(i => i.ItemCategory)
                    .Include(i => i.ItemFitType)
                    .Include(i => i.ItemSize)
                    .ToListAsync();

                return Ok(items);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occured while fetching data.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Show(int id)
        {
            if(id <= 0 || id == null)
            {
                return BadRequest("Invalid item data.");
            }

            try
            {
                var item = await _context.Items
                    .Include(i => i.ItemCategory)
                    .Include(i => i.ItemFitType)
                    .Include(i => i.ItemSize)
                    .FirstOrDefaultAsync(i => i.Id == id);

                if(item == null)
                {
                    return NotFound("Item not found");
                }

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
