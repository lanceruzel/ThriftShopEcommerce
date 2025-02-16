using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Data;
using ThriftShopEcommerce.Server.Models.DTO;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("/cart")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] CartRequest cartRequest)
        {
            if (cartRequest.Id == null || !cartRequest.Id.Any())
            {
                return StatusCode(400, "Cart is empty.");
            }

            try
            {
                var items = await _context.Items
                .Where(item => cartRequest.Id.Contains(item.Id))
                .ToListAsync();

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occured while fetching data.");
            }
        }
    }
}
