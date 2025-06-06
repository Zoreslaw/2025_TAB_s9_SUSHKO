using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("useraccount")]
    public class UserAccount
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("login")]
        public string Login { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Column("avatar_url")]
        public string? AvatarUrl { get; set; }

        [MaxLength(50)]
        [Column("role")]
        public string? Role { get; set; }

        [MaxLength(50)]
        [Column("user_status")]
        public string? UserStatus { get; set; }

        [Column("user_creation_date")]
        public DateTime UserCreationDate { get; set; } = DateTime.UtcNow.Date;

        // Navigation properties
        public virtual ICollection<Resident> Residents { get; set; } = new List<Resident>();
        public virtual ICollection<Payment> ApprovedPayments { get; set; } = new List<Payment>();
        public virtual ICollection<Issue> IssuedIssues { get; set; } = new List<Issue>();
        public virtual ICollection<Issue> OperatedIssues { get; set; } = new List<Issue>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
} 