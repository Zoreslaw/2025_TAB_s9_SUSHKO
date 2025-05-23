using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Resident
{
    [Key] public int ResidentId { get; set; }

    public int? UserId { get; set; }

    public int? ApartmentId { get; set; }

    public DateOnly? MoveinDate { get; set; }

    public string? ResidentStatus { get; set; }

    public DateOnly? MoveoutDate { get; set; }

    public virtual Apartment? Apartment { get; set; }

    public virtual Lease? Lease { get; set; }

    public virtual UserAccount? User { get; set; }
}
