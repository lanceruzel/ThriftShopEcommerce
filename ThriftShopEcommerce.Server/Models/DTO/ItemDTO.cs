using System.ComponentModel.DataAnnotations;

namespace ThriftShopEcommerce.Server.Models.DTO
{
    public class ItemDTO
    {
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public decimal OldPrice { get; set; }

        [Required]
        public decimal NewPrice { get; set; }

        public bool? IsSold { get; set; }

        public List<IFormFile>? ImageFiles { get; set; }
        public List<string>? RemovedImages { get; set; }

        [Required]
        public int ItemFitTypeId { get; set; }

        [Required]
        public int? ItemCategoryId { get; set; }

        // Size Details
        public float? Shoulder { get; set; }
        public float? Chest { get; set; }
        public float? SleeveLength { get; set; }
        public float? Length { get; set; }
        public float? Waist { get; set; }
        public float? Thigh { get; set; }
        public float? Inseam { get; set; }
        public float? LegOpening { get; set; }
    }
}
