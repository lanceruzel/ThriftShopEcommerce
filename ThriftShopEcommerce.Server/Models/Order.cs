using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ThriftShopEcommerce.Server.Model
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required, Precision(16, 2)]
        public decimal Amount { get; set; }

        [Required]
        public string ModeOfPayment { get; set; }

        public string? DeliveryCharge { get; set; }

        [Required, MaxLength(4)]
        public string PostalCode { get; set; }

        [Required]
        public string Province { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Barangay { get; set; }

        [Required]
        public string HouseStreet { get; set; }

        public bool IsPaid { get; set; } = false;

        public List<OrderItem>? OrderItems { get; set; }
    }
}
