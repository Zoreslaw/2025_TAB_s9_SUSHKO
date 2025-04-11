using System;

namespace server.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime IssueDate { get; set; }
    }
}
