using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace ThriftShopEcommerce.Server.Model
{
    public class Item
    {
        public int Id { get; set; }

        [Required, MaxLength(10)]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Category { get; set; }

        [Required, Precision(16, 2)]
        public decimal OldPrice { get; set; }

        [Required, Precision(16, 2)]
        public decimal NewPrice { get; set; }

        public bool? IsSold { get; set; } = false;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? LastUpdatedAt { get; set; }

        [Required]
        public string Images { get; set; }

        [NotMapped]
        public List<string> ImageList
        {
            get => string.IsNullOrEmpty(Images) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(Images);
            set => Images = JsonSerializer.Serialize(value);
        }

        //Relationships
        public ItemSize ItemSize { get; set; }

        //
        public int? ItemCategoryId { get; set; }

        [ForeignKey("ItemCategoryId")]
        public ItemCategory? ItemCategory { get; set; }

        //
        public int? ItemFitTypeId { get; set; }

        [ForeignKey("ItemFitTypeId")]
        public ItemFitType? ItemFitType { get; set; }

        public List<OrderItem>? OrderItems { get; set; }
    }
}
