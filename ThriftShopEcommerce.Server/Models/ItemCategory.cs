namespace ThriftShopEcommerce.Server.Model
{
    public class ItemCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Item>? Items { get; set; }
    }
}
