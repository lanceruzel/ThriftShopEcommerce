using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Models;

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

        // Relationships
        public ItemSize ItemSize { get; set; }

        public int? ItemCategoryId { get; set; }
        public ItemCategory? ItemCategory { get; set; }

        public int? ItemFitTypeId { get; set; }
        public ItemFitType? ItemFitType { get; set; }

        public int? ItemCollectionId { get; set; }
        public ItemCollection? ItemCollection { get; set; }

        public List<OrderItem>? OrderItems { get; set; }
    }
}
