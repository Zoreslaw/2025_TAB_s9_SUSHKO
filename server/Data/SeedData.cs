using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using server.Data;
using server.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new ApplicationDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
        {
            if (context.Tickets.Any())
            {
                return;
            }

            context.Tickets.AddRange(
                new Ticket { Name = "Ticket A", IssueDate = DateTime.UtcNow },
                new Ticket { Name = "Ticket B", IssueDate = DateTime.UtcNow.AddDays(-1) },
                new Ticket { Name = "Ticket C", IssueDate = DateTime.UtcNow.AddDays(-2) }
            );

            context.SaveChanges();
        }
    }
}
