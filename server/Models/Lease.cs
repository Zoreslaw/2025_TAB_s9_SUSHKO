using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Lease
{
    [Key] public int LeaseId { get; set; }

    public int? ResidentId { get; set; }

    public int? ApartmentId { get; set; }

    public DateOnly? LeaseStartDate { get; set; }

    public DateOnly? LeaseEndDate { get; set; }

    public virtual Apartment? Apartment { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Resident? Resident { get; set; }
}
