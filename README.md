# 🛡️ Military Asset Management System

A secure and role-based system to manage the procurement, transfers, assignments, and expenditure of critical military assets like vehicles, weapons, and ammunition across multiple bases.

---

## 🚀 Features

### 🔍 Dashboard
- Displays key metrics: Opening Balance, Closing Balance, Net Movement (Purchases + Transfers In - Transfers Out), Assigned, and Expended.
- Filtering by Date, Base, and Equipment Type.
- Clickable popups for Net Movement breakdowns (Purchases, Transfers In/Out).

### 💼 Purchases
- Record asset purchases by base.
- View historical purchases with filters.

### 🔄 Transfers
- Transfer assets between bases.
- Full audit trail with timestamps and asset logs.

### 🧑 Assignments & Expenditures
- Assign assets to personnel.
- Track and record expended assets.

---

## 🛠️ Tech Stack

| Layer      | Technology            | Why?                                     |
|------------|------------------------|------------------------------------------|
| Frontend   | React + TypeScript     | Scalable, interactive, responsive UI     |
| Backend    | Node.js + Express.js   | Lightweight, performant REST APIs        |
| Database   | SQLite (proto) / PostgreSQL (prod) | Relational data modeling & joins   |
| Deployment | Render.com             | Simple auto-deploy pipeline              |

---

## 🔐 Role-Based Access Control (RBAC)

| Role            | Permissions                                                      |
|------------------|------------------------------------------------------------------|
| Admin            | Full access to all bases and modules                             |
| Base Commander   | Access limited to own base's data and transfers                  |
| Logistics Officer| Can perform purchases and transfers within assigned base         |

RBAC is enforced using Express middleware and JWT-based authentication.

---

## 🧾 API Logging

All transactions (Purchases, Transfers, Assignments, Expenditures) are logged with:
- User ID and Role
- Action performed
- Endpoint hit
- Payload summary
- Timestamp

Logs are stored in a separate `api_logs` table for auditing.

---

## 🧩 Data Models

Core Tables:
- `users`: id, name, role, base_id
- `bases`: id, name, location
- `assets`: id, name, type, unit
- `inventory`: asset_id, base_id, balances and movement info
- `purchases`, `transfers`, `assignments`, `expenditures`: log tables

---

## ⚙️ Setup Instructions

### 🔧 Backend
```bash
cd backend
npm install
node index.js
```
Uses Express.js

Exposes routes like /api/purchases, /api/transfers, etc.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Built with React + Tailwind

Connects to the deployed backend via REST APIs

### 🗄️ Database
SQLite auto-creates database.db

Schema defined in schema.sql

