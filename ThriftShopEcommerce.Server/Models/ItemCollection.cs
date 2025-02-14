using System.ComponentModel.DataAnnotations;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Models
{
    public class ItemCollection
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public List<Item>? Items { get; set; }
    }
}
