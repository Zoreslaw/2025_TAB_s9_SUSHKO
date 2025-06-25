# MieszkaMy.pl – Platforma Zarządzania Nieruchomościami i Społecznością

## Spis treści
1. Przegląd
2. Stos technologiczny
3. Funkcje i pojęcia domenowe
4. Struktura projektu
5. Rozpoczęcie pracy
   * Wymagania wstępne
   * Konfiguracja back-endu
   * Konfiguracja front-endu
6. Konfiguracja środowiska
7. Przydatne polecenia NPM i .NET
8. Referencja REST API
9. Dane startowe i konta domyślne
10. Współtworzenie
11. Licencja

---

## 1. Przegląd
**MieszkaMy.pl** to aplikacja full-stack ułatwiająca współpracę administratorów, menedżerów oraz mieszkańców w obrębie budynków mieszkalnych. Platforma oferuje:
* **Rejestr budynków i mieszkań** – pełna ewidencja zarządzanych obiektów.
* **Zarządzanie użytkownikami i rolami** – role Admin, Manager, Tenant i Resident z dedykowanymi panelami.
* **Obsługa zgłoszeń usterek** – mieszkańcy zgłaszają, menedżerowie przypisują operatorów i śledzą postęp.
* **Zamówienia prac i wykonawcy** – konwersja zgłoszeń na zlecenia, monitorowanie kosztów i realizacji.
* **Płatności** – generowanie i pobieranie opłat (czynsz, naprawy) powiązanych z zamówieniami i mieszkaniami.
* **Centrum powiadomień** – bieżące informacje o kluczowych zdarzeniach.

Back-end napisany jest w ASP.NET Core 8 (EF Core + PostgreSQL), a front-end w React 19 + TypeScript (Vite 6 + Material UI 6).

---

## 2. Stos technologiczny
| Warstwa | Technologia |
|---------|-------------|
| Front-end | React 19, TypeScript 5, Vite 6, Material-UI 6, Styled-Components, React-Router v7 |
| Back-end  | ASP.NET Core 8 (Web API), Entity Framework Core 9, Npgsql, BCrypt.Net, Swagger / Swashbuckle |
| Baza danych | PostgreSQL ≥ 15 |
| Narzędzia   | ESLint, kompilator TypeScript, migracje dotnet-EF, Swagger UI |

---

## 3. Funkcje i pojęcia domenowe
* **Użytkownicy i role**
  * `admin` – pełny dostęp do wszystkich funkcji.
  * `manager` – zarządzanie zgłoszeniami, zleceniami, płatnościami i powiadomieniami.
  * `tenant` – najemca odpowiedzialny finansowo za mieszkanie.
  * `resident` – zwykły mieszkaniec.
* **Budynki i mieszkania** – obiekty fizyczne grupujące mieszkańców.
* **Issues (zgłoszenia)** – usterki zgłaszane przez mieszkańców, obsługiwane przez menedżerów/operatorów.
* **Orders (zlecenia)** – prace naprawcze lub usługowe tworzone z issues.
* **Payments (płatności)** – faktury powiązane z orders lub czynszem, zatwierdzane przez menedżera i opłacane przez tenantów.
* **Notifications (powiadomienia)** – komunikaty o ważnych zdarzeniach (nowe zgłoszenie, płatność, zmiana statusu).

---

## 4. Struktura projektu (monorepo)
```text
2025_TAB_s9_SUSHKO/
├── client/            # Front-end React (Vite)
│   ├── src/
│   │   ├── components/ …
│   │   ├── pages/      # Strony React-Router (Home, Dashboard, Manager, Admin…)
│   │   ├── hooks/      # Własne hooki do komunikacji z API
│   │   ├── contexts/   # Konteksty globalne (Auth, UserTable …)
│   │   └── services/   # `api.ts` – warstwa komunikacji REST ↔︎ modele TS
│   └── package.json
├── server/            # Back-end ASP.NET Core
│   ├── Controllers/    # Endpointy REST (Users, Auth, Issues, Orders …)
│   ├── Data/           # DbContext EF Core i seeding
│   ├── Models/         # Encje domenowe i DTO
│   ├── Migrations/     # Migracje EF
│   └── Program.cs      # Konfiguracja hosta
└── README.md           # ← ten plik
```

---

## 5. Rozpoczęcie pracy
### 5.1 Wymagania wstępne
* **Node.js** ≥ 18 (npm w pakiecie)  
* **.NET SDK** 8.0  
* **PostgreSQL** ≥ 15 uruchomiony lokalnie (domyślny connection string używa `postgres:admin`).

### 5.2 Konfiguracja back-endu
```bash
# z katalogu głównego repozytorium
cd server
# przywróć zależności i zbuduj projekt
dotnet restore
dotnet build

# zastosuj migracje EF (utworzy bazę `ski_station_db`)
dotnet ef database update

# uruchom API pod https://localhost:5213
dotnet run
```
Swagger UI będzie dostępne pod adresem `https://localhost:5213/swagger` w trybie deweloperskim.

### 5.3 Konfiguracja front-endu
```bash
# z katalogu głównego
cd client
npm install
# uruchom Vite pod http://localhost:5173
npm run dev
```
Front-end odwołuje się do API pod `http://localhost:5213/api` (zob. `api.ts`). Upewnij się, że back-end działa lub zmodyfikuj URL.

---

## 6. Konfiguracja środowiska
Najważniejsze parametry możesz zmienić w:
* **server/appsettings.json** – `ConnectionStrings:DefaultConnection` (dane do bazy Postgres).
* **CORS** – `Program.cs` pozwala domyślnie na `http://localhost:5173` i `http://localhost:3000`.

> Do lokalnego developmentu nie są wymagane dodatkowe zmienne środowiskowe.

---

## 7. Przydatne polecenia
### Front-end (`client/`)
* `npm run dev` – serwer dev z hot-reload (Vite)
* `npm run build` – produkcyjny build
* `npm run preview` – podgląd builda lokalnie
* `npm run lint` – ESLint

### Back-end (`server/`)
* `dotnet run` – uruchom API z automatycznym przeładowaniem
* `dotnet ef migrations add <Nazwa>` – nowa migracja
* `dotnet ef database update` – zastosuj migracje

---

## 8. Referencja REST API (JSON przez HTTPS)
Bazowy URL: `http://localhost:5213/api`

### 8.1 Uwierzytelnianie
| Metoda | Endpoint | Body | Opis |
|--------|----------|------|------|
| POST | `/auth/login` | `{ login, password }` | Logowanie, zwraca profil użytkownika i mieszkańców |
| POST | `/auth/logout` | – | Wylogowanie (placeholder) |

### 8.2 Users
| Metoda | Endpoint | Body | Uwagi |
|--------|----------|------|------|
| GET | `/users` | – | Lista użytkowników (admin/manager) |
| GET | `/users/{id}` | – | Pojedynczy użytkownik |
| POST | `/users` | `CreateUserDto` | Tworzenie użytkownika |
| PUT | `/users/{id}` | `UpdateUserDto` | Cząstkowa aktualizacja |
| DELETE | `/users/{id}` | – | Usunięcie |
| POST | `/users/register` | `RegisterResidentDto` | Rejestracja mieszkańca/najemcy |
| POST | `/users/register-manager` | `RegisterResidentDto` | Rejestracja menedżera / admina |

### 8.3 Budynki i mieszkania
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/buildings` | Wszystkie budynki |
| GET | `/buildings/{id}` | Konkretny budynek |
| POST | `/buildings` | Dodaj |
| PUT | `/buildings/{id}` | Edytuj |
| DELETE | `/buildings/{id}` | Usuń |
| GET | `/apartments` | Wszystkie mieszkania z adresem budynku |
| GET | `/apartments/{id}` | Konkretny lokal |
| POST | `/apartments` | Dodaj |
| PUT | `/apartments/{id}` | Edytuj |
| DELETE | `/apartments/{id}` | Usuń |

### 8.4 Issues (zgłoszenia)
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/issues?userId=&userRole=` | Lista zgłoszeń (zależnie od roli) |
| GET | `/issues/user/{userId}` | Zgłoszenia użytkownika |
| GET | `/issues/{id}` | Pojedyncze zgłoszenie |
| POST | `/issues` | Utworzenie (mieszkaniec) |
| PUT | `/issues/{id}` | Aktualizacja (manager) |
| PUT | `/issues/{id}/assign` | Przypisz operatora – body: `operatorId` |
| PUT | `/issues/{id}/status` | Zmień status – body: `"nowy_status"` |
| DELETE | `/issues/{id}` | Usuń |

### 8.5 Orders (zlecenia)
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/orders?userId=&userRole=` | Lista zleceń |
| GET | `/orders/{id}` | Pojedyncze zlecenie |
| POST | `/orders` | Utworzenie (manager) |
| PUT | `/orders/{id}` | Aktualizacja |
| DELETE | `/orders/{id}` | Usunięcie |

### 8.6 Payments (płatności)
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/payments?userId=&userRole=` | Lista płatności |
| GET | `/payments/{id}` | Pojedyncza płatność |
| GET | `/payments/user/{userId}` | Płatności powiązane z mieszkaniami użytkownika |
| POST | `/payments` | Utwórz płatność |
| POST | `/payments/from-order/{orderId}` | Płatność z ukończonego zlecenia – body: `approverId` |
| PUT | `/payments/{id}` | Aktualizacja |
| DELETE | `/payments/{id}` | Usunięcie |

### 8.7 Notifications (powiadomienia)
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/notifications?userId=&userRole=` | Lista powiadomień |
| GET | `/notifications/user/{userId}` | Powiadomienia użytkownika |
| GET | `/notifications/{id}` | Pojedyncze powiadomienie |
| POST | `/notifications` | Utwórz własne powiadomienie |
| PUT | `/notifications/{id}` | Aktualizacja (np. status przeczytane) |
| PUT | `/notifications/{id}/read` | Oznacz jako przeczytane |
| DELETE | `/notifications/{id}` | Usuń |

### 8.8 Tickets (eksperymentalne)
| GET `/tickets` · POST `/tickets` |

Wszystkie endpointy zwracają standardowe kody HTTP (`200`, `201`, `204`, `400`, `401`, `404`) oraz JSON-owe DTO opisane w Swagger UI.

---

## 9. Dane startowe i konta domyślne
Przy pierwszym uruchomieniu metoda `SeedData.Initialize` wypełnia bazę przykładowymi danymi (budynki, mieszkania, użytkownicy…).  Dodatkowo skrypt `server/add-zorik-admin.sql` tworzy konto admina:
```
login: zorik
hasło: admin123  (zapisane w bazie w postaci zahashowanej)
```
W razie potrzeby zmodyfikuj lub wyłącz seeding w `server/Data/SeedData.cs`.

---

## 10. Współtworzenie
Chętnie przyjmujemy pull requesty!  Przed większymi zmianami otwórz issue.  Pamiętaj, aby:
1. Stosować istniejący styl kodu (ESLint / dotnet format).
2. Dodawać testy jednostkowe lub integracyjne dla nowych funkcjonalności.
3. Upewnić się, że `npm run lint` i `dotnet build` przechodzą bez błędów.

---

## 11. Licencja
Projekt udostępniony na licencji MIT – szczegóły w pliku `LICENSE`.
