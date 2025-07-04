using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("order")]
    public class Order
    {
        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }

        [Column("orderer_id")]
        public int OrdererId { get; set; }

        [Column("issue_id")]
        public int IssueId { get; set; }

        [Column("cost", TypeName = "decimal(10,2)")]
        public decimal Cost { get; set; }

        [MaxLength(255)]
        [Column("contractor")]
        public string Contractor { get; set; } = string.Empty;

        [Column("order_description")]
        public string OrderDescription { get; set; } = string.Empty;

        [MaxLength(50)]
        [Column("order_status")]
        public string OrderStatus { get; set; } = string.Empty; // 'pending', 'in_progress', 'completed', 'cancelled'

        [Column("order_creation_date")]
        public DateTime OrderCreationDate { get; set; } = DateTime.UtcNow;

        [Column("order_end_date")]
        public DateTime? OrderEndDate { get; set; }

        // Navigation properties
        [ForeignKey("OrdererId")]
        public virtual UserAccount Orderer { get; set; } = null!;

        [ForeignKey("IssueId")]
        public virtual Issue Issue { get; set; } = null!;

        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
} 