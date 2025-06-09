namespace server.Models.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Login { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string? Role { get; set; }
        public string? UserStatus { get; set; }
        public DateTime UserCreationDate { get; set; }
        public List<ResidentDto>? Residents { get; set; }
    }

    public class ResidentDto
    {
        public int ResidentId { get; set; }
        public int ApartmentId { get; set; }
        public string? ApartmentNumber { get; set; }
        public string? BuildingAddress { get; set; }
        public DateTime? MoveinDate { get; set; }
        public string? ResidentStatus { get; set; }
        public DateTime? MoveoutDate { get; set; }
        public TenantDto? Tenant { get; set; }
    }

    public class TenantDto
    {
        public int TenantId { get; set; }
        public DateTime? LeaseStartDate { get; set; }
        public DateTime? LeaseEndDate { get; set; }
    }

    public class CreateUserDto
    {
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string? Role { get; set; }
        public string? UserStatus { get; set; }
    }

    public class UpdateUserDto
    {
        public string? Login { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Role { get; set; }
        public string? UserStatus { get; set; }
    }

    public class LoginRequest
    {
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public int UserId { get; set; }
        public string Login { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string? Role { get; set; }
        public string? UserStatus { get; set; }
        public DateTime UserCreationDate { get; set; }
        public List<ResidentDto>? Residents { get; set; }
    }

    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public int TenantId { get; set; }
        public int? ApproverId { get; set; }
        public int ApartmentId { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentDescription { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
    }

    public class IssueDto
    {
        public int IssueId { get; set; }
        public int IssuerId { get; set; }
        public int? OperatorId { get; set; }
        public string IssueDescription { get; set; } = string.Empty;
        public string IssueStatus { get; set; } = string.Empty;
        public string IssueType { get; set; } = string.Empty;
        public DateTime IssueCreationDate { get; set; }
        public DateTime? IssueUpdateDate { get; set; }
    }

    public class NotificationDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
    }
} 