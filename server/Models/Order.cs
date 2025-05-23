using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Order
{
    [Key] public int OrderId { get; set; }

    public int? OrdererId { get; set; }

    public int? IssueId { get; set; }

    public decimal? Cost { get; set; }

    public string? Contractor { get; set; }

    public string? OrderDescription { get; set; }

    public string? OrderStatus { get; set; }

    public DateOnly? OrderCreationDate { get; set; }

    public DateOnly? OrderEndDate { get; set; }

    public virtual Issue? Issue { get; set; }

    public virtual UserAccount? Orderer { get; set; }
}
