# 🎿 Ski Station Management System

## Table of Contents

1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Repository Structure](#repository-structure)  
5. [Installation](#installation)  
   - [1. Clone the Repository](#1-clone-the-repository)  
   - [2. Client Setup (React + TypeScript)](#2-client-setup-react--typescript)  
   - [3. Server Setup (.NET + PostgreSQL)](#3-server-setup-net--postgresql)  
6. [Database Configuration](#database-configuration)  
   - [Connection String](#connection-string)  
   - [Applying Migrations](#applying-migrations)  
   - [Seeding the Database](#seeding-the-database)  
   - [Updating the Database Schema](#updating-the-database-schema)  
7. [Running the Application](#running-the-application)  
8. [Testing the API](#testing-the-api)  
9. [Troubleshooting](#troubleshooting)  
10. [Contributing](#contributing)  

Welcome to the **Ski Station Management System** repository! This project is a full-stack application designed to manage ski station operations, such as ticket sales, lift usage tracking, reporting, and more.

## 🚀 Overview

The Ski Station Management System is a complete client-server application featuring:

- **Ticket and pass sales**
- **Lift usage tracking**
- **Management and operational reporting**
- **Ticket management (block/unblock tickets)**
- **Administrative tools**

The system leverages a modern technology stack to ensure performance, maintainability, and scalability.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** .NET (ASP.NET Core) + Entity Framework Core
- **Database:** PostgreSQL
- **Additional Tools:**
  - Node.js
  - pgAdmin or psql (optional)

---

## 📋 Prerequisites

Before setting up the project, install the following tools:

- [Node.js (v14+)](https://nodejs.org/)
- [.NET SDK (v6.0+)](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)
  - (Optional) pgAdmin for GUI database management
- [Git](https://git-scm.com/downloads)

Make sure these tools are installed and accessible via your system's PATH.

---

## 📁 Repository Structure

```
ski-station-system/
├── client/                 # React + TypeScript app (powered by Vite)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.tsx
│       ├── main.tsx
│       └── vite.config.ts
├── server/                 # .NET (ASP.NET Core) application
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Program.cs
│   ├── DesignTimeDbContextFactory.cs
│   └── appsettings.json
├── docs/                   # Project documentation
└── README.md               # This file
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/ski-station-system.git
cd ski-station-system
```

### 2. Client Setup (React + TypeScript + Vite)

Install dependencies and run the client:

```bash
cd client
npm install
npm run dev
```

The frontend will be running at `http://localhost:5173`.

### 3. Server Setup (.NET + PostgreSQL)

Install dependencies and configure the backend:

```bash
cd ../server
dotnet restore
```

Update `appsettings.json` with your PostgreSQL connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ski_station_db;Username=postgres;Password=YOUR_PASSWORD"
  }
}
```

Create and apply database migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Run the backend server:

```bash
dotnet run
```

Backend server will run at `https://localhost:5001`.

---

## 🌱 Database Seeding

To seed your database, ensure the `SeedData.Initialize()` method is called in `Program.cs`:

```csharp
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}
```

---

## 🧪 Testing the API

- Access Swagger UI: `https://localhost:5001/swagger`
- Use Postman or Insomnia for testing API endpoints.

---

## ❗ Troubleshooting

- **EF Core Errors:** Ensure EF Core tools are installed:

```bash
dotnet tool install --global dotnet-ef
```

- **Database Connection Issues:** Check your `appsettings.json` for correct database credentials.

---

## 🤝 Contributing

1. Create a branch (`feature/your-feature`).
2. Submit a pull request.
3. Wait for team review before merging.

---

Feel free to reach out via Discord if you have any questions or issues!

**Happy coding!** 🚀

---

_With love,_

**Zoreslav Sushko**

