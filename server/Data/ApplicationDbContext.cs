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
        public DbSet<Apartment> Apartments { get; set; }

        public DbSet<Building> Buildings { get; set; }

        public DbSet<Issue> Issues { get; set; }

        public DbSet<Lease> Leases { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<Resident> Residents { get; set; }

        public DbSet<UserAccount> UserAccount { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("useraccount_pkey");

                entity.HasIndex(e => e.Login, "useraccount_login_key").IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.AvatarUrl).HasColumnName("avatar_url");
                entity.Property(e => e.Login)
                    .HasMaxLength(100)
                    .HasColumnName("login");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .HasColumnName("role")
                    .HasConversion(
                        v => v.ToString(),
                        v => Enum.Parse<UserRoles>(v));
                entity.Property(e => e.UserCreationDate)
                    .HasDefaultValueSql("CURRENT_DATE")
                    .HasColumnName("user_creation_date");
                entity.Property(e => e.UserStatus)
                    .HasMaxLength(50)
                    .HasColumnName("user_status")
                    .HasConversion(
                        v => v.ToString(),                   // enum → string
                        v => Enum.Parse<UserStatus>(v));
            });

            modelBuilder.Entity<Resident>(entity =>
            {
                entity.HasKey(e => e.ResidentId).HasName("resident_pkey");

                entity.Property(e => e.ResidentId).HasColumnName("resident_id");
                entity.Property(e => e.ApartmentId).HasColumnName("apartment_id");
                entity.Property(e => e.MoveinDate).HasColumnName("movein_date");
                entity.Property(e => e.MoveoutDate).HasColumnName("moveout_date");
                entity.Property(e => e.ResidentStatus)
                    .HasMaxLength(50)
                    .HasColumnName("resident_status");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Apartment).WithMany(p => p.Residents)
                    .HasForeignKey(d => d.ApartmentId)
                    .HasConstraintName("resident_apartment_id_fkey");

                entity.HasOne(d => d.User).WithMany(p => p.Residents)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("resident_user_id_fkey");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.PaymentId).HasName("payment_pkey");

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");
                entity.Property(e => e.ApartmentId).HasColumnName("apartment_id");
                entity.Property(e => e.ApproverId).HasColumnName("approver_id");
                entity.Property(e => e.LeaseId).HasColumnName("lease_id");
                entity.Property(e => e.PaymentAmount)
                    .HasPrecision(10, 2)
                    .HasColumnName("payment_amount");
                entity.Property(e => e.PaymentDate)
                    .HasDefaultValueSql("CURRENT_DATE")
                    .HasColumnName("payment_date");
                entity.Property(e => e.PaymentDescription).HasColumnName("payment_description");
                entity.Property(e => e.PaymentStatus)
                    .HasMaxLength(50)
                    .HasColumnName("payment_status");

                entity.HasOne(d => d.Apartment).WithMany(p => p.Payments)
                    .HasForeignKey(d => d.ApartmentId)
                    .HasConstraintName("payment_apartment_id_fkey");

                entity.HasOne(d => d.Approver).WithMany(p => p.Payments)
                    .HasForeignKey(d => d.ApproverId)
                    .HasConstraintName("payment_approver_id_fkey");

                entity.HasOne(d => d.Lease).WithMany(p => p.Payments)
                    .HasForeignKey(d => d.LeaseId)
                    .HasConstraintName("payment_tenant_id_fkey");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId).HasName("order_pkey");

                entity.Property(e => e.OrderId).HasColumnName("order_id");
                entity.Property(e => e.Contractor)
                    .HasMaxLength(255)
                    .HasColumnName("contractor");
                entity.Property(e => e.Cost)
                    .HasPrecision(10, 2)
                    .HasColumnName("cost");
                entity.Property(e => e.IssueId).HasColumnName("issue_id");
                entity.Property(e => e.OrderCreationDate)
                    .HasDefaultValueSql("CURRENT_DATE")
                    .HasColumnName("order_creation_date");
                entity.Property(e => e.OrderDescription).HasColumnName("order_description");
                entity.Property(e => e.OrderEndDate).HasColumnName("order_end_date");
                entity.Property(e => e.OrderStatus)
                    .HasMaxLength(50)
                    .HasColumnName("order_status");
                entity.Property(e => e.OrdererId).HasColumnName("orderer_id");

                entity.HasOne(d => d.Issue).WithMany(p => p.Orders)
                    .HasForeignKey(d => d.IssueId)
                    .HasConstraintName("order_issue_id_fkey");

                entity.HasOne(d => d.Orderer).WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OrdererId)
                    .HasConstraintName("order_orderer_id_fkey");
            });

            modelBuilder.Entity<Lease>(entity =>
            {
                entity.HasKey(e => e.LeaseId).HasName("lease_pkey");

                entity.HasIndex(e => e.ResidentId, "tenant_resident_id_key").IsUnique();

                entity.Property(e => e.LeaseId).HasColumnName("lease_id");
                entity.Property(e => e.ApartmentId).HasColumnName("apartment_id");
                entity.Property(e => e.LeaseEndDate).HasColumnName("lease_end_date");
                entity.Property(e => e.LeaseStartDate).HasColumnName("lease_start_date");
                entity.Property(e => e.ResidentId).HasColumnName("resident_id");

                entity.HasOne(d => d.Apartment).WithMany(p => p.Leases)
                    .HasForeignKey(d => d.ApartmentId)
                    .HasConstraintName("tenant_apartment_id_fkey");

                entity.HasOne(d => d.Resident).WithOne(p => p.Lease)
                    .HasForeignKey<Lease>(d => d.ResidentId)
                    .HasConstraintName("tenant_resident_id_fkey");
            });

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.HasKey(e => e.ApartmentId).HasName("apartment_pkey");

                entity.Property(e => e.ApartmentId).HasColumnName("apartment_id");
                entity.Property(e => e.ApartmentNumber)
                    .HasMaxLength(20)
                    .HasColumnName("apartment_number");
                entity.Property(e => e.BuildingId).HasColumnName("building_id");

                entity.HasOne(d => d.Building).WithMany(p => p.Apartments)
                    .HasForeignKey(d => d.BuildingId)
                    .HasConstraintName("apartment_building_id_fkey");
            });

            modelBuilder.Entity<Building>(entity =>
            {
                entity.HasKey(e => e.BuildingId).HasName("building_pkey");

                entity.Property(e => e.BuildingId).HasColumnName("building_id");
                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");
            });

            modelBuilder.Entity<Issue>(entity =>
            {
                entity.HasKey(e => e.IssueId).HasName("issue_pkey");

                entity.Property(e => e.IssueId).HasColumnName("issue_id");
                entity.Property(e => e.IssueCreationDate)
                    .HasDefaultValueSql("CURRENT_DATE")
                    .HasColumnName("issue_creation_date");
                entity.Property(e => e.IssueDescription).HasColumnName("issue_description");
                entity.Property(e => e.IssueStatus)
                    .HasMaxLength(50)
                    .HasColumnName("issue_status");
                entity.Property(e => e.IssueType)
                    .HasMaxLength(50)
                    .HasColumnName("issue_type");
                entity.Property(e => e.IssueUpdateDate).HasColumnName("issue_update_date");
                entity.Property(e => e.IssuerId).HasColumnName("issuer_id");
                entity.Property(e => e.OperatorId).HasColumnName("operator_id");

                entity.HasOne(d => d.Issuer).WithMany(p => p.IssueIssuers)
                    .HasForeignKey(d => d.IssuerId)
                    .HasConstraintName("issue_issuer_id_fkey");

                entity.HasOne(d => d.Operator).WithMany(p => p.IssueOperators)
                    .HasForeignKey(d => d.OperatorId)
                    .HasConstraintName("issue_operator_id_fkey");
            });
        }
    }
}
