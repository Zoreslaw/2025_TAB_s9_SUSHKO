using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("tenant")]
    public class Tenant
    {
        [Key]
        [Column("tenant_id")]
        public int TenantId { get; set; }

        [Column("resident_id")]
        public int ResidentId { get; set; }

        [Column("apartment_id")]
        public int ApartmentId { get; set; }

        [Column("lease_start_date")]
        public DateTime? LeaseStartDate { get; set; }

        [Column("lease_end_date")]
        public DateTime? LeaseEndDate { get; set; }

        // Navigation properties
        [ForeignKey("ResidentId")]
        public virtual Resident Resident { get; set; } = null!;

        [ForeignKey("ApartmentId")]
        public virtual Apartment Apartment { get; set; } = null!;

        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
} 