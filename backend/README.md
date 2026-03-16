# SpendSmart Backend

Node.js + Express API that powers the SpendSmart frontend.

## Core Modules

- Auth: register, login, profile
- Expenses: CRUD operations scoped per user
- Dashboard: monthly summary + recent activity + chart data

## Environment Setup

```bash
cp .env.example .env
```

Expected keys:

- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- CLIENT_ORIGINS

## Run

```bash
npm install
npm run dev
```

Health check endpoint: `GET /api/health`

## Request Lifecycle

1. Route receives request and applies auth middleware where needed.
2. Controller validates input boundaries and delegates to service.
3. Service applies business rules and calls repository.
4. Repository returns persisted data to service/controller.
