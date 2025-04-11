# Building Administration Management System

Welcome to the **Building Administration Management System** repository! This project is a full-stack application designed to support the daily work of building administrators. The system handles registration and payment processing, maintenance and repair requests, delegation of work to subcontractors, and generates both operational and management reports.

> **Assignment Code:** ŁW4  
> **Subject:** System informatyczny wspomagający pracę administratora budynków  
> **Instructor:** Łukasz Wyciślik  
> **Contact:** lwycislik@polsl.pl, (p. 418)

--------------------------------------------------------------------------------

## Table of Contents

1. [Installation](#installation)
2. [Database Configuration](#database-configuration)
3. [Running the Application](#running-the-application)
4. [Testing the API](#testing-the-api)
5. [Troubleshooting](#troubleshooting)
6. [Contributing](#contributing)
7. [Repository Structure](#repository-structure)

--------------------------------------------------------------------------------

## Installation

### 1. Clone the Repository

    git clone https://github.com/<your-organization-or-username>/building-admin-system.git
    cd building-admin-system

### 2. Client Setup

For a **JavaScript-based front end (React or Vue):**

1. Navigate to the client folder:
    
       cd client
    
2. Install dependencies:
    
       npm install
    
   or
   
       yarn install
    
3. (Optional) Configure environment variables:
   Create and configure `.env` or equivalent files as needed. These files are ignored by Git via `.gitignore`.

For a **desktop client (JavaFX, Swing, Windows Forms, WPF)**:
Set up your project in your chosen IDE (e.g., IntelliJ IDEA, Visual Studio) and import the project files.

### 3. Server Setup & Database Integration

Depending on your chosen back-end technology:

**For .NET Core:**

1. Navigate to the server folder:
    
       cd ../server
    
2. Restore .NET dependencies:
    
       dotnet restore
    
3. Update `appsettings.json`:
   Ensure the connection string is properly set up (see [Database Configuration](#database-configuration)).

**For Java (Spring):**

1. Open the project in your IDE (e.g., IntelliJ IDEA or Eclipse).  
2. Configure your `application.yml` or `application.properties` file with the proper database connection settings.  
3. Build the project using Maven or Gradle.

--------------------------------------------------------------------------------

## Database Configuration

### Connection String

For **.NET Core**, the connection string is located in `appsettings.json`. An example configuration for PostgreSQL looks like:

    {
      "ConnectionStrings": {
        "DefaultConnection": "Host=localhost;Port=5432;Database=building_admin_db;Username=postgres;Password=YOUR_PASSWORD"
      },
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      "AllowedHosts": "*"
    }

For **Spring**, configure your connection string in `application.yml` or `application.properties`.  
- **Host:** The hostname or IP of your database server.  
- **Port:** Default for PostgreSQL is 5432 (adjust as needed for other databases).  
- **Database:** The name (e.g., `building_admin_db`).  
- **Username & Password:** Your database credentials.

### Applying Migrations

We use ORM migrations to manage database schema changes.

**For .NET Core (Entity Framework Core):**

1. Open Package Manager Console in Visual Studio or a terminal in the `server` folder.  
2. Create the initial migration (if not already existing):
    
       dotnet ef migrations add InitialCreate
    
3. Apply the migration:
    
       dotnet ef database update

**For Spring (using Liquibase or Flyway):**

- Configure and run your migration tool to create or update the database schema as needed.

### Seeding the Database

If a **SeedData** (or similar) class is included to populate initial data, ensure it is called during application startup. For example, in a .NET Core project, you might see:

    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        SeedData.Initialize(services);
    }

After starting the server, check your database to confirm that the data has been seeded properly.

### Updating the Database Schema

After modifying your models or adding new ones:

1. Add a new migration (for example, `AddMaintenanceTable`):
   
       dotnet ef migrations add AddMaintenanceTable
   
2. Apply the migration:
   
       dotnet ef database update
   
3. Commit and push the generated migration files so your team stays in sync.

--------------------------------------------------------------------------------

## Running the Application

1. **Start your database server** (or use Docker):
   
       docker-compose up -d
   
   or ensure your local database service is running.

2. **Run the back-end server**:
   - For .NET Core:
         
         cd server
         dotnet run
   
   - For Spring:
     Run the application from your IDE or via Maven/Gradle commands.

3. **Run the client application**:
   - For a JavaScript-based front end:
         
         cd client
         npm run dev
      or
         
         yarn run dev
   
   - For a desktop client:
     Launch the application via your IDE or build the executable.

--------------------------------------------------------------------------------

## Testing the API

1. **Swagger UI (if enabled, .NET Core)**:  
   Navigate to `https://localhost:5001/swagger/index.html` (or the configured port) to view and test available endpoints.

2. **REST Clients (Postman/Insomnia)**:  
   For example:
   
       GET https://localhost:5001/api/Occupancies
       POST https://localhost:5001/api/Payments

3. **Check the Database**:  
   Use your preferred client (pgAdmin, MySQL Workbench, etc.) to verify data persistence in the database.

--------------------------------------------------------------------------------

## Troubleshooting

- **Migrations Not Found**  
  - Ensure the appropriate ORM tools (EF Core Tools, Liquibase/Flyway for Spring) are installed.  
  - Verify you’re running commands in the correct folder and that your context/configuration is correctly set.

- **Connection Issues**  
  - Double-check your connection string in `appsettings.json` or `application.yml`.  
  - Confirm that your database server is running and that firewall/port settings are correct.

- **Seeding Errors**  
  - Check that the seed logic is correctly invoked during startup and that no data conflicts exist.

--------------------------------------------------------------------------------

## Contributing

1. **Branching**: Create a feature branch for new features or bug fixes (e.g., `feature/add-maintenance-module`).  
2. **Pull Requests**: Submit a pull request to the main branch. Please include detailed descriptions of your changes.  
3. **Code Reviews**: Await at least one team member’s review and approval before merging changes.  
4. **Documentation**: Update this README and any relevant `docs/` files when making significant changes.

--------------------------------------------------------------------------------

## Repository Structure

Below is a conceptual view of how the project is structured:

    .
    ├── client/              # Front-end application (React, Vue, or desktop code)
    │   ├── public/
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       └── ...
    ├── server/              # Back-end application (.NET Core or Spring)
    │   ├── Controllers/
    │   ├── Data/
    │   ├── Migrations/
    │   ├── Models/
    │   ├── Program.cs       # For .NET Core
    │   ├── application.yml  # Or application.properties for Spring
    │   ├── appsettings.json # For .NET Core
    │   └── ...
    ├── docs/                # Documentation
    └── README.md            # This file

--------------------------------------------------------------------------------

With best regards,  
*The Development Team*
