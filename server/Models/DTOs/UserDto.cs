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
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
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
        public int? OrderId { get; set; }
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

    public class CreateIssueDto
    {
        public int IssuerId { get; set; }
        public string IssueDescription { get; set; } = string.Empty;
        public string IssueType { get; set; } = string.Empty;
        public string IssueStatus { get; set; } = "pending";
    }

    public class UpdateIssueDto
    {
        public int? OperatorId { get; set; }
        public string? IssueDescription { get; set; }
        public string? IssueStatus { get; set; }
        public string? IssueType { get; set; }
    }

    public class CreatePaymentDto
    {
        public int TenantId { get; set; }
        public int ApartmentId { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentDescription { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow.Date;
        public string PaymentStatus { get; set; } = "pending";
    }

    public class UpdatePaymentDto
    {
        public int? ApproverId { get; set; }
        public decimal? PaymentAmount { get; set; }
        public string? PaymentDescription { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string? PaymentStatus { get; set; }
    }

    public class RegisterResidentDto
    {
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int BuildingId { get; set; }
        public string ApartmentNumber { get; set; } = string.Empty;
        public DateTime MoveInDate { get; set; }
        public DateTime? MoveOutDate { get; set; }
        public string Role { get; set; } = "resident";
        public string UserStatus { get; set; } = "active";
        public string? AvatarUrl { get; set; }
    }

    public class BuildingDto
    {
        public int BuildingId { get; set; }
        public string Address { get; set; } = string.Empty;
        public int Flats { get; set; }
    }

    public class CreateBuildingDto
    {
        public string Address { get; set; } = string.Empty;
        public int Flats { get; set; }
    }

    public class UpdateBuildingDto
    {
        public string? Address { get; set; }
        public int? Flats { get; set; }
    }

    public class ApartmentDto
    {
        public int ApartmentId { get; set; }
        public int BuildingId { get; set; }
        public string ApartmentNumber { get; set; } = string.Empty;
        public string BuildingAddress { get; set; } = string.Empty;
    }

    public class CreateApartmentDto
    {
        public int BuildingId { get; set; }
        public string ApartmentNumber { get; set; } = string.Empty;
    }

    public class UpdateApartmentDto
    {
        public int? BuildingId { get; set; }
        public string? ApartmentNumber { get; set; }
    }
} 