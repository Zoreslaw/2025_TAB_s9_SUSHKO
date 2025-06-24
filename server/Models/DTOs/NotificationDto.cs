namespace server.Models.DTOs
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ReadDate { get; set; }
        public int? IssueId { get; set; }
        public int? OrderId { get; set; }
        public int? PaymentId { get; set; }
    }

    public class CreateNotificationDto
    {
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public int? IssueId { get; set; }
        public int? OrderId { get; set; }
        public int? PaymentId { get; set; }
    }

    public class UpdateNotificationDto
    {
        public bool? IsRead { get; set; }
        public DateTime? ReadDate { get; set; }
    }
} 