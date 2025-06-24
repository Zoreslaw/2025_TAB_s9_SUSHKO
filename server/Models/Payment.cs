using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("payment")]
    public class Payment
    {
        [Key]
        [Column("payment_id")]
        public int PaymentId { get; set; }

        [Column("tenant_id")]
        public int TenantId { get; set; }

        [Column("approver_id")]
        public int? ApproverId { get; set; }

        [Column("apartment_id")]
        public int ApartmentId { get; set; }

        [Column("order_id")]
        public int? OrderId { get; set; }

        [Column("payment_amount", TypeName = "decimal(10,2)")]
        public decimal PaymentAmount { get; set; }

        [Column("payment_description")]
        public string? PaymentDescription { get; set; }

        [Column("payment_date")]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow.Date;

        [MaxLength(50)]
        [Column("payment_status")]
        public string? PaymentStatus { get; set; }

        // Navigation properties
        [ForeignKey("TenantId")]
        public virtual Tenant Tenant { get; set; } = null!;

        [ForeignKey("ApproverId")]
        public virtual UserAccount? Approver { get; set; }

        [ForeignKey("ApartmentId")]
        public virtual Apartment Apartment { get; set; } = null!;

        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; }

        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
} 