using Microsoft.AspNetCore.Mvc;

namespace ThriftShopEcommerce.Server.Controllers
{
    [Route("api/item")]
    [ApiController]
    public class ItemController : Controller
    {

        [HttpGet]
        public IActionResult ViewItems()
        {
            return Ok("test");
        }

        [HttpGet("{id}")]
        public IActionResult ViewItem(int id)
        {
            return Ok(id);
        }
    }
}
