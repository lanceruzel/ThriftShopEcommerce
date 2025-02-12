using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ThriftShopEcommerce.Server.Model;

namespace ThriftShopEcommerce.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemFitType> ItemFitTypes { get; set; }
        public DbSet<ItemSize> ItemSizes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Insert default datas
            builder.Entity<ItemCategory>().HasData(
                    new ItemCategory { Id = 1, Name = "T-Shirts" },
                    new ItemCategory { Id = 2, Name = "Jeans" },
                    new ItemCategory { Id = 3, Name = "Jackets" },
                    new ItemCategory { Id = 4, Name = "Dresses" },
                    new ItemCategory { Id = 5, Name = "Blouses" },
                    new ItemCategory { Id = 6, Name = "Sweaters" },
                    new ItemCategory { Id = 7, Name = "Shorts" },
                    new ItemCategory { Id = 8, Name = "Skirts" }
                );

            builder.Entity<ItemFitType>().HasData(
                    new ItemFitType { Id = 1, Name = "Skinny Fit" },
                    new ItemFitType { Id = 2, Name = "Slim Fit" },
                    new ItemFitType { Id = 3, Name = "Regular Fit" },
                    new ItemFitType { Id = 4, Name = "Relaxed Fit" },
                    new ItemFitType { Id = 5, Name = "Straight Fit" },
                    new ItemFitType { Id = 6, Name = "Oversized Fit" },
                    new ItemFitType { Id = 7, Name = "Baggy Fit" }
                );

            #region Relationships
            // Item -> ItemCategory (Many to One)
            builder.Entity<Item>()
                .HasOne(i => i.ItemCategory)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.ItemCategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            // Item -> ItemFitType (Many to One)
            builder.Entity<Item>()
                .HasOne(i => i.ItemFitType)
                .WithMany(f => f.Items)
                .HasForeignKey(i => i.ItemFitTypeId)
                .OnDelete(DeleteBehavior.SetNull);

            // Item -> ItemSize (One to One)
            builder.Entity<Item>()
                .HasOne(i => i.ItemSize) 
                .WithOne(s => s.Item)
                .HasForeignKey<ItemSize>(s => s.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order -> OrderItem (One-to-Many)
            builder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // OrderItem -> Item (Many-to-One)
            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Item)
                .WithMany(i => i.OrderItems)
                .HasForeignKey(oi => oi.ItemId)
                .OnDelete(DeleteBehavior.Restrict);

            #endregion

            base.OnModelCreating(builder);
        }
    }
}
