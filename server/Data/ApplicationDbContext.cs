using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Building> Buildings { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Resident> Residents { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure UserAccount relationships
            modelBuilder.Entity<UserAccount>()
                .HasMany(u => u.ApprovedPayments)
                .WithOne(p => p.Approver)
                .HasForeignKey(p => p.ApproverId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<UserAccount>()
                .HasMany(u => u.IssuedIssues)
                .WithOne(i => i.Issuer)
                .HasForeignKey(i => i.IssuerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserAccount>()
                .HasMany(u => u.OperatedIssues)
                .WithOne(i => i.Operator)
                .HasForeignKey(i => i.OperatorId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<UserAccount>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.Orderer)
                .HasForeignKey(o => o.OrdererId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Tenant-Resident one-to-one relationship
            modelBuilder.Entity<Tenant>()
                .HasOne(t => t.Resident)
                .WithOne(r => r.Tenant)
                .HasForeignKey<Tenant>(t => t.ResidentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure unique constraint for UserAccount login
            modelBuilder.Entity<UserAccount>()
                .HasIndex(u => u.Login)
                .IsUnique();

            // Configure decimal precision
            modelBuilder.Entity<Payment>()
                .Property(p => p.PaymentAmount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.Cost)
                .HasPrecision(10, 2);
        }
    }
}
