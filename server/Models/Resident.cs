using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("resident")]
    public class Resident
    {
        [Key]
        [Column("resident_id")]
        public int ResidentId { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("apartment_id")]
        public int ApartmentId { get; set; }

        [Column("movein_date")]
        public DateTime? MoveinDate { get; set; }

        [MaxLength(50)]
        [Column("resident_status")]
        public string? ResidentStatus { get; set; }

        [Column("moveout_date")]
        public DateTime? MoveoutDate { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual UserAccount User { get; set; } = null!;

        [ForeignKey("ApartmentId")]
        public virtual Apartment Apartment { get; set; } = null!;

        public virtual Tenant? Tenant { get; set; }
    }
} 