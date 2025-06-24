using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("apartment")]
    public class Apartment
    {
        [Key]
        [Column("apartment_id")]
        public int ApartmentId { get; set; }

        [Column("building_id")]
        public int BuildingId { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("apartment_number")]
        public string ApartmentNumber { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("BuildingId")]
        public virtual Building Building { get; set; } = null!;
        
        public virtual ICollection<Resident> Residents { get; set; } = new List<Resident>();
        public virtual ICollection<Tenant> Tenants { get; set; } = new List<Tenant>();
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
} 