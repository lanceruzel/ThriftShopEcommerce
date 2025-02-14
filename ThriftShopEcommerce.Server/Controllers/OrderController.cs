using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Interfaces;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/order")]
    [ApiController]
    public class OrderController : Controller, ICrudController<Order, int>
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order entity)
        {
            if (entity == null || entity.OrderItems == null || !entity.OrderItems.Any())
            {
                return BadRequest("Invalid order data or no items provided.");
            }

            var strategy = _context.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                using var transaction = await _context.Database.BeginTransactionAsync();
                try
                {
                    // Ensure items exist before proceeding
                    var itemIds = entity.OrderItems.Select(oi => oi.ItemId).ToList();
                    var existingItems = await _context.Items
                                                     .Where(i => itemIds.Contains(i.Id))
                                                     .ToListAsync();

                    if (existingItems.Count != itemIds.Count)
                    {
                        return BadRequest("Some items do not exist.");
                    }

                    // Calculate total amount based on item price and quantity
                    entity.Amount = entity.OrderItems.Sum(oi =>
                        existingItems.First(i => i.Id == oi.ItemId).NewPrice * oi.Quantity
                    );

                    // Attach the order to context
                    _context.Orders.Add(entity);

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return Ok(entity);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    Console.WriteLine($"Error: {ex.Message}");
                    return StatusCode(500, "An error occurred while creating the order.");
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Order entity)
        {
            if (entity == null || entity.OrderItems == null || !entity.OrderItems.Any())
            {
                return BadRequest("Invalid order data or no items provided.");
            }

            var strategy = _context.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                await using var transaction = await _context.Database.BeginTransactionAsync();
                try
                {
                    var existingOrder = await _context.Orders
                        .Include(o => o.OrderItems)
                        .FirstOrDefaultAsync(o => o.Id == id);

                    if (existingOrder == null)
                    {
                        return NotFound($"Order with ID {id} not found.");
                    }

                    // Validate if new items exist
                    var itemIds = entity.OrderItems.Select(oi => oi.ItemId).ToList();
                    var existingItems = await _context.Items
                        .Where(i => itemIds.Contains(i.Id))
                        .ToDictionaryAsync(i => i.Id, i => i.NewPrice);

                    if (existingItems.Count != itemIds.Count)
                    {
                        return BadRequest("Some items do not exist.");
                    }

                    // Recalculate total amount
                    entity.Amount = entity.OrderItems.Sum(oi => existingItems[oi.ItemId] * oi.Quantity);

                    // Update order details
                    existingOrder.FirstName = entity.FirstName;
                    existingOrder.LastName = entity.LastName;
                    existingOrder.Email = entity.Email;
                    existingOrder.Contact = entity.Contact;
                    existingOrder.ModeOfPayment = entity.ModeOfPayment;
                    existingOrder.DeliveryCharge = entity.DeliveryCharge;
                    existingOrder.PostalCode = entity.PostalCode;
                    existingOrder.Province = entity.Province;
                    existingOrder.City = entity.City;
                    existingOrder.Barangay = entity.Barangay;
                    existingOrder.HouseStreet = entity.HouseStreet;
                    existingOrder.IsPaid = entity.IsPaid;
                    existingOrder.Amount = entity.Amount;

                    
                    // Remove old order items and add new ones
                    if (existingOrder.OrderItems != null)
                    {
                        _context.OrderItems.RemoveRange(existingOrder.OrderItems);
                    }

                    existingOrder.OrderItems = entity.OrderItems;

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return Ok(existingOrder);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    Console.WriteLine($"Error: {ex.Message}");
                    return StatusCode(500, "An error occurred while updating the order.");
                }
            });
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
                var order = await _context.Orders.FindAsync(id);

                if (order == null)
                {
                    return NotFound($"Order with ID {id} not found.");
                }

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();

                return Ok($"Order with ID {id} deleted successfully.");
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
                var items = await _context.Orders
                    .Include(i => i.OrderItems)
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
            if (id <= 0 || id == null)
            {
                return BadRequest("Invalid order data.");
            }

            try
            {
                var item = await _context.Orders
                    .Include(i => i.OrderItems)
                    .ToListAsync();

                if (item == null)
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
