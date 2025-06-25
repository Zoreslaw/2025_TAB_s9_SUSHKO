# MieszkaMy.pl – Property & Community Management Platform

## Table of Contents
1. Overview
2. Tech-stack
3. Features & Domain Concepts
4. Project Structure
5. Getting Started
   * Prerequisites
   * Back-end setup
   * Front-end setup
6. Environment Configuration
7. Available NPM & .NET commands
8. REST API Reference
9. Seed Data & Default Accounts
10. Contributing
11. License

---

## 1. Overview
**MieszkaMy.pl** is a full-stack web application that helps administrators, managers and residents to collaborate around a residential building.  The platform offers:
* **Building & apartment registry** – keep track of every object you manage.
* **User & role management** – Admin, Manager, Tenant and Resident roles with dedicated dashboards.
* **Issue tracking** – Residents can report faults; managers can assign operators and monitor progress.
* **Work orders & contractors** – Convert issues to orders, track costs and completion.
* **Payments** – Generate and collect payments for rent or repairs, directly linked to orders & apartments.
* **Notification centre** – Real-time information about everything that matters.

The back-end is written in ASP.NET Core 8 (EF Core + PostgreSQL) and the front-end in React 19 + TypeScript (Vite 6 + Material UI 6).

---

## 2. Tech-stack
| Layer  | Technology |
|--------|------------|
| Front-end | React 19, TypeScript 5, Vite 6, Material-UI 6, Styled Components, React-Router v7 |
| Back-end | ASP.NET Core 8 (Web API), Entity Framework Core 9, Npgsql, BCrypt.Net, Swagger / Swashbuckle |
| Database | PostgreSQL ≥ 15 |
| Tooling  | ESLint, TypeScript compiler, dotnet-EF migrations, Swagger UI |

---

## 3. Features & Domain Concepts
* **Users & Roles**
  * `admin` – full access to everything.
  * `manager` – manages issues, orders, payments, notifications.
  * `tenant` – resident that rents an apartment and is financially responsible.
  * `resident` – regular inhabitant.
* **Buildings & Apartments** – physical objects that group residents.
* **Issues** – fault reports created by residents and processed by managers/operators.
* **Orders** – repair or service orders created by managers from issues.
* **Payments** – invoices linked to orders or rent, approved by managers and paid by tenants.
* **Notifications** – system messages for any important event (new issue, payment due, status change, etc.).

---

## 4. Project Structure (monorepo)
```text
2025_TAB_s9_SUSHKO/
├── client/            # React front-end (Vite)
│   ├── src/
│   │   ├── components/ …
│   │   ├── pages/      # React-Router pages (Home, Dashboard, Managers, Admin, …)
│   │   ├── hooks/      # Custom React hooks interacting with the API
│   │   ├── contexts/   # Global React contexts (Auth, UserTable …)
│   │   └── services/   # `api.ts` – API layer mapping REST ↔︎ TS models
│   └── package.json
├── server/            # ASP.NET Core back-end
│   ├── Controllers/    # REST endpoints (Users, Auth, Issues, Orders, …)
│   ├── Data/           # EF Core DbContext & seeding
│   ├── Models/         # Domain entities & DTOs
│   ├── Migrations/     # Auto-generated EF migrations
│   └── Program.cs      # Web host configuration
└── README.md           # ← you are here
```

---

## 5. Getting Started
### 5.1 Prerequisites
* **Node.js** ≥ 18 (npm is bundled).  
* **.NET SDK** 8.0 
* **PostgreSQL** ≥ 15 running locally (default connection string uses `postgres:admin`).

### 5.2 Back-end setup
```bash
# from repo root
cd server
# restore dependencies & build
 dotnet restore
 dotnet build

# apply the EF Core migrations (creates db `ski_station_db` by default)
 dotnet ef database update

# run the API on https://localhost:5213
 dotnet run
```
Swagger UI will be available at `https://localhost:5213/swagger` in development mode.

### 5.3 Front-end setup
```bash
# from repo root
cd client
npm install
# start Vite dev server on http://localhost:5173
npm run dev
```
The client is configured (`api.ts`) to call the API at `http://localhost:5213/api`.  Make sure the back-end is running or adjust the base URL accordingly.

---

## 6. Environment Configuration
The most common parameters can be changed via:
* **server/appsettings.json** – update `ConnectionStrings:DefaultConnection` if your PostgreSQL user/password differ.
* **CORS** is configured in `Program.cs` to allow `http://localhost:5173` & `http://localhost:3000`; add extra origins if needed.

>  Note: no additional environment variables are required for local development.

---

## 7. Useful Commands
### Front-end (inside `client/`)
* `npm run dev` – hot-reload dev server (Vite)
* `npm run build` – production build
* `npm run preview` – preview built assets locally
* `npm run lint` – run ESLint

### Back-end (inside `server/`)
* `dotnet run` – launch API with watch reload
* `dotnet ef migrations add <Name>` – create new migration
* `dotnet ef database update` – apply the latest migrations

---

## 8. REST API Reference (JSON over HTTPS)
Base URL: `http://localhost:5213/api`

### 8.1 Authentication
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | `{ login, password }` | Authenticate, returns user profile & residents |
| POST | `/auth/logout` | – | Dummy endpoint (token invalidation placeholder) |

### 8.2 Users
| Method | Endpoint | Body | Notes |
|--------|----------|------|-------|
| GET | `/users` | – | List all users (admin/manager) |
| GET | `/users/{id}` | – | Get single user |
| POST | `/users` | `CreateUserDto` | Create generic user |
| PUT | `/users/{id}` | `UpdateUserDto` | Partial update |
| DELETE | `/users/{id}` | – | Delete user |
| POST | `/users/register` | `RegisterResidentDto` | Register Resident/Tenant & assign apartment |
| POST | `/users/register-manager` | `RegisterResidentDto` | Register Manager / Admin |

### 8.3 Buildings & Apartments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/buildings` | All buildings |
| GET | `/buildings/{id}` | Single building |
| POST | `/buildings` | Create |
| PUT | `/buildings/{id}` | Update |
| DELETE | `/buildings/{id}` | Delete |
| GET | `/apartments` | All apartments with building address |
| GET | `/apartments/{id}` | Single apartment |
| POST | `/apartments` | Create |
| PUT | `/apartments/{id}` | Update |
| DELETE | `/apartments/{id}` | Delete |

### 8.4 Issues
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/issues?userId=&userRole=` | List issues (role-aware) |
| GET | `/issues/user/{userId}` | Issues reported by user |
| GET | `/issues/{id}` | Single issue |
| POST | `/issues` | Create issue (resident) |
| PUT | `/issues/{id}` | Update (manager) |
| PUT | `/issues/{id}/assign` | Assign operator (manager) – body: `operatorId` |
| PUT | `/issues/{id}/status` | Change status – body: `"new_status"` |
| DELETE | `/issues/{id}` | Remove issue |

### 8.5 Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders?userId=&userRole=` | List orders (role-aware) |
| GET | `/orders/{id}` | Single order |
| POST | `/orders` | Create (manager) |
| PUT | `/orders/{id}` | Update |
| DELETE | `/orders/{id}` | Delete |

### 8.6 Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payments?userId=&userRole=` | List payments (role-aware) |
| GET | `/payments/{id}` | Single payment |
| GET | `/payments/user/{userId}` | Payments related to user's apartments |
| POST | `/payments` | Create payment |
| POST | `/payments/from-order/{orderId}` | Auto-create payment from completed order (body: `approverId`) |
| PUT | `/payments/{id}` | Update payment |
| DELETE | `/payments/{id}` | Delete |

### 8.7 Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications?userId=&userRole=` | List notifications (role-aware) |
| GET | `/notifications/user/{userId}` | User notifications |
| GET | `/notifications/{id}` | Single notification |
| POST | `/notifications` | Create custom notification |
| PUT | `/notifications/{id}` | Update (mark read, etc.) |
| PUT | `/notifications/{id}/read` | Mark as read |
| DELETE | `/notifications/{id}` | Delete |

### 8.8 Tickets (experimental)
| GET `/tickets` · POST `/tickets` |

All endpoints return standard HTTP status codes (`200`, `201`, `204`, `400`, `401`, `404`) and a JSON body (DTO) described in the Swagger UI.

---

## 9. Seed Data & Default Accounts
On first launch the `SeedData.Initialize` method populates the database with demo data (buildings, apartments, users, etc.).  Additionally a script `server/add-zorik-admin.sql` can be executed to create an extra admin:
```
login: zorik
password: admin123  (stored hashed in DB)
```
Feel free to adjust or disable the seeding logic in `server/Data/SeedData.cs`.

---

## 10. Contributing
Pull requests are welcome!  Please open an issue first to discuss significant changes.  Make sure to:
1. Follow the existing code style (ESLint / dotnet format).
2. Add unit or integration tests when you add new behaviour.
3. Ensure both `npm run lint` and `dotnet build` pass before submitting.

---

## 11. License
This project is released under the MIT License – see `LICENSE` for details.
