using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThriftShopEcommerce.Server.Model
{
    public class ItemSize
    {
        [Key]
        public int ItemId { get; set; }
        public float? Shoulder { get; set; }
        public float? Chest { get; set; }
        public float? SleeveLength { get; set; }
        public float? Length { get; set; }
        public float? Waist { get; set; }
        public float? Thigh { get; set; }
        public float? Inseam { get; set; }
        public float? LegOpening { get; set; }

        //
        public Item Item { get; set; }
    }
}
