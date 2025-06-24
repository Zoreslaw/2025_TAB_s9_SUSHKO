using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }
        
        public int UserId { get; set; }
        public UserAccount User { get; set; }
        
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // 'issue', 'payment', 'order', 'general'
        public string Priority { get; set; } = string.Empty; // 'low', 'medium', 'high', 'urgent'
        public bool IsRead { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ReadDate { get; set; }
        
        // Optional references to related entities
        public int? IssueId { get; set; }
        public Issue? Issue { get; set; }
        
        public int? OrderId { get; set; }
        public Order? Order { get; set; }
        
        public int? PaymentId { get; set; }
        public Payment? Payment { get; set; }
    }
} 