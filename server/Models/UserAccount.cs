using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class UserAccount
{
    [Key] public int UserId { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    public UserRoles Role { get; set; }

    public UserStatus UserStatus { get; set; }

    public DateOnly? UserCreationDate { get; set; }

    public virtual ICollection<Issue> IssueIssuers { get; set; } = new List<Issue>();

    public virtual ICollection<Issue> IssueOperators { get; set; } = new List<Issue>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Resident> Residents { get; set; } = new List<Resident>();
}

public enum UserRoles
{
    ADMIN,
    MANAGER,
    RESIDENT,
    TENANT
}

public enum UserStatus
{
    ACTIVE,
    INACTIVE,
    BLOCKED
}
