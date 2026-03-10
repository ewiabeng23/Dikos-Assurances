# Diko's Assurances SARL — Web Application

Full-stack insurance broker management system built with React + FastAPI.

## Stack
| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React + Vite + Tailwind CSS             |
| Backend     | FastAPI (Python)                        |
| Database    | PostgreSQL                              |
| Auth        | JWT (single owner login)                |
| Reminders   | APScheduler (daily cron at 08:00)       |
| Deployment  | AWS EC2                                 |

---

## Project Structure

```
dikos-assurances/
├── frontend/               # React + Vite
│   └── src/
│       ├── context/        # LanguageContext (FR/EN), AuthContext (JWT)
│       ├── components/     # Shared: Navbar, LangToggle, Modal, Badges
│       ├── pages/
│       │   ├── public/     # Home.jsx, Login.jsx
│       │   └── dashboard/  # DashboardLayout + views/
│       └── utils/          # Sample data, helpers
├── backend/                # FastAPI
│   ├── core/               # config, database, security (JWT)
│   ├── models/             # SQLAlchemy: Client, Policy, Reminder
│   ├── schemas/            # Pydantic schemas
│   ├── routers/            # auth, clients, policies, reminders
│   └── main.py             # App entrypoint + CORS + lifespan
└── README.md
```

---

## Quick Start

### 1. Database (PostgreSQL)
```bash
psql -U postgres
CREATE DATABASE dikos_db;
CREATE USER dikos_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE dikos_db TO dikos_user;
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your DB credentials, secret key, and SMTP/WhatsApp config

pip install -r requirements.txt

# Run (from project root)
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
API docs available at: `http://localhost:8000/docs`

### 3. Frontend
```bash
cd frontend
npm install

# Create .env.local
echo "VITE_API_URL=http://localhost:8000" > .env.local

npm run dev
# App runs at http://localhost:5173
```

---

## Default Login
- **Username:** admin  (set in `.env` → `ADMIN_USERNAME`)
- **Password:** changeme123 (set in `.env` → `ADMIN_PASSWORD`)

---

## Routes

| Path         | Description                     |
|--------------|---------------------------------|
| `/`          | Public website (FR/EN)          |
| `/login`     | Owner login                     |
| `/dashboard` | Protected management portal     |

## API Endpoints

| Method | Path                    | Description              |
|--------|-------------------------|--------------------------|
| POST   | /auth/login             | Get JWT token            |
| GET    | /clients/               | List all clients         |
| POST   | /clients/               | Create client            |
| PUT    | /clients/{id}           | Update client            |
| DELETE | /clients/{id}           | Delete client            |
| GET    | /policies/              | List all policies        |
| GET    | /policies/expiring      | Expiring within 30 days  |
| POST   | /policies/              | Create policy            |
| GET    | /reminders/             | List sent reminders      |
| POST   | /reminders/trigger      | Manually trigger check   |

---

## Reminder Schedule
APScheduler runs daily at 08:00 and sends email + WhatsApp reminders at:
- **30 days** before expiry
- **14 days** before expiry
- **7 days** before expiry

Configure SMTP and Twilio/WhatsApp credentials in `.env`.

---

## Deployment (AWS EC2)
1. Launch Ubuntu EC2 instance (t3.small or better)
2. Install Node 18+, Python 3.11+, PostgreSQL, Nginx
3. Clone repo, configure `.env`, run backend with `uvicorn` + `systemd`
4. Build frontend: `npm run build` → serve `/dist` via Nginx
5. Point domain → EC2 IP, configure SSL with Certbot

---

## Phase 2 (Planned)
- PDF quote generation
- Client self-service portal
- Multi-staff roles
