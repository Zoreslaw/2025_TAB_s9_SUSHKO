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
            // Ensure database is created
            context.Database.EnsureCreated();

            // Check if data already exists
            if (context.UserAccounts.Any())
            {
                return;
            }

            // Seed Buildings
            var buildings = new[]
            {
                new Building { Address = "ul. Kwiatowa 15, Warszawa" },
                new Building { Address = "ul. Słoneczna 8, Kraków" },
                new Building { Address = "ul. Parkowa 22, Gdańsk" }
            };
            context.Buildings.AddRange(buildings);
            context.SaveChanges();

            // Seed Apartments
            var apartments = new[]
            {
                new Apartment { BuildingId = buildings[0].BuildingId, ApartmentNumber = "1A" },
                new Apartment { BuildingId = buildings[0].BuildingId, ApartmentNumber = "1B" },
                new Apartment { BuildingId = buildings[0].BuildingId, ApartmentNumber = "2A" },
                new Apartment { BuildingId = buildings[1].BuildingId, ApartmentNumber = "1" },
                new Apartment { BuildingId = buildings[1].BuildingId, ApartmentNumber = "2" },
                new Apartment { BuildingId = buildings[2].BuildingId, ApartmentNumber = "101" },
                new Apartment { BuildingId = buildings[2].BuildingId, ApartmentNumber = "102" }
            };
            context.Apartments.AddRange(apartments);
            context.SaveChanges();

            // Seed Users
            var users = new[]
            {
                new UserAccount 
                { 
                    Login = "jan.kowalski", 
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "resident",
                    UserStatus = "active",
                    AvatarUrl = "https://i.pravatar.cc/150?img=1"
                },
                new UserAccount 
                { 
                    Login = "anna.nowak", 
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "resident",
                    UserStatus = "active",
                    AvatarUrl = "https://i.pravatar.cc/150?img=2"
                },
                new UserAccount 
                { 
                    Login = "piotr.wisniewski", 
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "resident",
                    UserStatus = "active",
                    AvatarUrl = "https://i.pravatar.cc/150?img=3"
                },
                new UserAccount 
                { 
                    Login = "admin", 
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = "administrator",
                    UserStatus = "active",
                    AvatarUrl = "https://i.pravatar.cc/150?img=4"
                },
                new UserAccount 
                { 
                    Login = "operator", 
                    Password = BCrypt.Net.BCrypt.HashPassword("operator123"),
                    Role = "operator",
                    UserStatus = "active",
                    AvatarUrl = "https://i.pravatar.cc/150?img=5"
                }
            };
            context.UserAccounts.AddRange(users);
            context.SaveChanges();

            // Seed Residents
            var residents = new[]
            {
                new Resident 
                { 
                    UserId = users[0].UserId, 
                    ApartmentId = apartments[0].ApartmentId,
                    MoveinDate = DateTime.UtcNow.AddMonths(-12),
                    ResidentStatus = "active"
                },
                new Resident 
                { 
                    UserId = users[1].UserId, 
                    ApartmentId = apartments[1].ApartmentId,
                    MoveinDate = DateTime.UtcNow.AddMonths(-8),
                    ResidentStatus = "active"
                },
                new Resident 
                { 
                    UserId = users[2].UserId, 
                    ApartmentId = apartments[3].ApartmentId,
                    MoveinDate = DateTime.UtcNow.AddMonths(-6),
                    ResidentStatus = "active"
                }
            };
            context.Residents.AddRange(residents);
            context.SaveChanges();

            // Seed Tenants
            var tenants = new[]
            {
                new Tenant 
                { 
                    ResidentId = residents[0].ResidentId,
                    ApartmentId = apartments[0].ApartmentId,
                    LeaseStartDate = DateTime.UtcNow.AddMonths(-12),
                    LeaseEndDate = DateTime.UtcNow.AddMonths(12)
                },
                new Tenant 
                { 
                    ResidentId = residents[1].ResidentId,
                    ApartmentId = apartments[1].ApartmentId,
                    LeaseStartDate = DateTime.UtcNow.AddMonths(-8),
                    LeaseEndDate = DateTime.UtcNow.AddMonths(16)
                }
            };
            context.Tenants.AddRange(tenants);
            context.SaveChanges();

            // Seed Issues
            var issues = new[]
            {
                new Issue
                {
                    IssuerId = users[0].UserId,
                    OperatorId = users[4].UserId,
                    IssueDescription = "Przeciek w łazience - wymaga natychmiastowej naprawy",
                    IssueStatus = "resolved",
                    IssueType = "plumbing",
                    IssueCreationDate = DateTime.UtcNow.AddDays(-10),
                    IssueUpdateDate = DateTime.UtcNow.AddDays(-2)
                },
                new Issue
                {
                    IssuerId = users[1].UserId,
                    IssueDescription = "Nie działa oświetlenie w korytarzu",
                    IssueStatus = "pending",
                    IssueType = "electrical",
                    IssueCreationDate = DateTime.UtcNow.AddDays(-3)
                },
                new Issue
                {
                    IssuerId = users[2].UserId,
                    IssueDescription = "Uszkodzona klamka w drzwiach wejściowych",
                    IssueStatus = "in_progress",
                    IssueType = "maintenance",
                    IssueCreationDate = DateTime.UtcNow.AddDays(-5),
                    IssueUpdateDate = DateTime.UtcNow.AddDays(-1)
                }
            };
            context.Issues.AddRange(issues);
            context.SaveChanges();

            // Seed Payments
            var payments = new[]
            {
                new Payment
                {
                    TenantId = tenants[0].TenantId,
                    ApproverId = users[3].UserId,
                    ApartmentId = apartments[0].ApartmentId,
                    PaymentAmount = 1200.00m,
                    PaymentDescription = "Czynsz za styczeń 2024",
                    PaymentDate = DateTime.UtcNow.AddDays(-30),
                    PaymentStatus = "approved"
                },
                new Payment
                {
                    TenantId = tenants[1].TenantId,
                    ApartmentId = apartments[1].ApartmentId,
                    PaymentAmount = 1350.00m,
                    PaymentDescription = "Czynsz za luty 2024",
                    PaymentDate = DateTime.UtcNow.AddDays(-15),
                    PaymentStatus = "pending"
                },
                new Payment
                {
                    TenantId = tenants[0].TenantId,
                    ApartmentId = apartments[0].ApartmentId,
                    PaymentAmount = 517.00m,
                    PaymentDescription = "Zaległe płatności",
                    PaymentDate = DateTime.UtcNow.AddDays(-5),
                    PaymentStatus = "overdue"
                }
            };
            context.Payments.AddRange(payments);
            context.SaveChanges();

            // Keep existing tickets for compatibility
            if (!context.Tickets.Any())
            {
                context.Tickets.AddRange(
                    new Ticket { Name = "Ticket A", IssueDate = DateTime.UtcNow },
                    new Ticket { Name = "Ticket B", IssueDate = DateTime.UtcNow.AddDays(-1) },
                    new Ticket { Name = "Ticket C", IssueDate = DateTime.UtcNow.AddDays(-2) }
                );
                context.SaveChanges();
            }
        }
    }
}
