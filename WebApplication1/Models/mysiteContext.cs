using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApplication1.Models
{
    public partial class mysiteContext : DbContext
    {
        public mysiteContext()
        {
        }

        public mysiteContext(DbContextOptions<mysiteContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<OrderItems> OrderItems { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("mysitedb");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PK_Category");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.CatName)
                    .HasColumnName("cat_name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<OrderItems>(entity =>
            {
                entity.HasKey(e => e.ItemId);

                entity.ToTable("orderItems");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ProductName)
                    .HasColumnName("product_name")
                    .HasMaxLength(50);

                entity.Property(e => e.ProductPrice).HasColumnName("product_price");

                entity.Property(e => e.QuantityValue).HasColumnName("quantity_value");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_orderItems_orders");
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.ToTable("orders");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.OrderDate)
                    .HasColumnName("order_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.OrderPrice).HasColumnName("order_price");

                entity.Property(e => e.OrderStatus)
                    .HasColumnName("order_status")
                    .HasMaxLength(50);

                entity.Property(e => e.Uid).HasColumnName("uid");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.ProductImage)
                    .HasColumnName("product_image")
                    .HasMaxLength(50);

                entity.Property(e => e.ProductName)
                    .HasColumnName("product_name")
                    .HasMaxLength(50);

                entity.Property(e => e.ProductPrice).HasColumnName("product_price");

                entity.Property(e => e.ProductQuantity).HasColumnName("product_quantity");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Uid);

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.UAddress)
                    .HasColumnName("u_address")
                    .IsUnicode(false);

                entity.Property(e => e.UContact)
                    .HasColumnName("u_contact")
                    .HasMaxLength(50);

                entity.Property(e => e.UEmail)
                    .HasColumnName("u_email")
                    .HasMaxLength(50);

                entity.Property(e => e.UName)
                    .HasColumnName("u_name")
                    .HasMaxLength(50);

                entity.Property(e => e.UPassword)
                    .HasColumnName("u_password")
                    .HasMaxLength(50);

                entity.Property(e => e.UType)
                    .HasColumnName("u_type")
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
