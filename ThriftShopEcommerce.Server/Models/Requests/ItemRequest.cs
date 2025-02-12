using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace ThriftShopEcommerce.Server.Model.Requests
{
    public class ItemRequest
    {
        [Required, MaxLength(10)]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Category { get; set; }

        [Required, Range(0, double.MaxValue)]
        public decimal OldPrice { get; set; }

        [Required, Range(0, double.MaxValue)]
        public decimal NewPrice { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? LastUpdatedAt { get; set; }

        [Required]
        public List<string> ImageList { get; set; } = new();

        [Required]
        public int ItemSizeId { get; set; }

        [Required]
        public int ItemCategoryId { get; set; }

        [Required]
        public int ItemFitTypeId { get; set; }

        [Required]
        public List<IFormFile>? ImageFiles { get; set; }
    }
}
