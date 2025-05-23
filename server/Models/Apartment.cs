using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Apartment
{
    [Key] public int ApartmentId { get; set; }

    public int? BuildingId { get; set; }

    public string ApartmentNumber { get; set; } = null!;

    public virtual Building? Building { get; set; }

    public virtual ICollection<Lease> Leases { get; set; } = new List<Lease>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Resident> Residents { get; set; } = new List<Resident>();
}
