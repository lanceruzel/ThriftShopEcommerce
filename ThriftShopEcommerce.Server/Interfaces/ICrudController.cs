using Microsoft.AspNetCore.Mvc;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Interfaces
{
    public interface ICrudController<T, TKey>
    {
        // Get all items
        Task<IActionResult> Index();

        // Get a single item by ID
        Task<IActionResult> Show(TKey id);

        // Create a new item
        Task<IActionResult> Create([FromBody] T entity);

        // Update an item
        Task<IActionResult> Update(TKey id, [FromBody] T entity);

        // Delete an item
        Task<IActionResult> Delete(TKey id);
    }
}
