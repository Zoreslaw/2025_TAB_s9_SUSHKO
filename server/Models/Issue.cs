using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Issue
{
    [Key] public int IssueId { get; set; }

    public int? IssuerId { get; set; }

    public int? OperatorId { get; set; }

    public string? IssueDescription { get; set; }

    public string? IssueStatus { get; set; }

    public string? IssueType { get; set; }

    public DateOnly? IssueCreationDate { get; set; }

    public DateOnly? IssueUpdateDate { get; set; }

    public virtual UserAccount? Issuer { get; set; }

    public virtual UserAccount? Operator { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
