using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("issue")]
    public class Issue
    {
        [Key]
        [Column("issue_id")]
        public int IssueId { get; set; }

        [Column("issuer_id")]
        public int IssuerId { get; set; }

        [Column("operator_id")]
        public int? OperatorId { get; set; }

        [Column("issue_description")]
        public string? IssueDescription { get; set; }

        [MaxLength(50)]
        [Column("issue_status")]
        public string? IssueStatus { get; set; }

        [MaxLength(50)]
        [Column("issue_type")]
        public string? IssueType { get; set; }

        [Column("issue_creation_date")]
        public DateTime IssueCreationDate { get; set; } = DateTime.UtcNow.Date;

        [Column("issue_update_date")]
        public DateTime? IssueUpdateDate { get; set; }

        // Navigation properties
        [ForeignKey("IssuerId")]
        public virtual UserAccount Issuer { get; set; } = null!;

        [ForeignKey("OperatorId")]
        public virtual UserAccount? Operator { get; set; }

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
} 