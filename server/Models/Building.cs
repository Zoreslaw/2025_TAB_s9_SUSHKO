using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("building")]
    public class Building
    {
        [Key]
        [Column("building_id")]
        public int BuildingId { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("address")]
        public string Address { get; set; } = string.Empty;

        // Navigation properties
        public virtual ICollection<Apartment> Apartments { get; set; } = new List<Apartment>();
    }
} 