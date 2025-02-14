using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Models.DTO
{
    public class ItemCollectionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
