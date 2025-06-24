namespace server.Models.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int OrdererId { get; set; }
        public string OrdererName { get; set; } = string.Empty;
        public int IssueId { get; set; }
        public string IssueDescription { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public string Contractor { get; set; } = string.Empty;
        public string OrderDescription { get; set; } = string.Empty;
        public string OrderStatus { get; set; } = string.Empty;
        public DateTime OrderCreationDate { get; set; }
        public DateTime? OrderEndDate { get; set; }
    }

    public class CreateOrderDto
    {
        public int IssueId { get; set; }
        public decimal Cost { get; set; }
        public string Contractor { get; set; } = string.Empty;
        public string OrderDescription { get; set; } = string.Empty;
    }

    public class UpdateOrderDto
    {
        public decimal? Cost { get; set; }
        public string? Contractor { get; set; }
        public string? OrderDescription { get; set; }
        public string? OrderStatus { get; set; }
        public DateTime? OrderEndDate { get; set; }
    }
} 