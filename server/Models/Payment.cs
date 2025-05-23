using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Payment
{
    [Key] public int PaymentId { get; set; }

    public int? LeaseId { get; set; }

    public int? ApproverId { get; set; }

    public int? ApartmentId { get; set; }

    public decimal? PaymentAmount { get; set; }

    public string? PaymentDescription { get; set; }

    public DateOnly? PaymentDate { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual Apartment? Apartment { get; set; }

    public virtual UserAccount? Approver { get; set; }

    public virtual Lease? Lease { get; set; }
}
