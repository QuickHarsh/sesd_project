# SpendSmart

SpendSmart is a full-stack expense tracker MVP built with OOP principles and clean layered architecture.

## Tech Stack

- Frontend: React + Vite + Recharts
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: JWT (real user accounts)

## Folder Structure

```text
sesd_project/
├── frontend/
│   └── src/
│       ├── application/use-cases/
│       ├── components/
│       ├── config/
│       ├── constants/
│       ├── domain/models/
│       ├── domain/services/
│       ├── layouts/
│       └── pages/
├── backend/
│   └── src/
│       ├── app/
│       ├── config/
│       ├── controllers/
│       ├── domain/
│       │   ├── entities/
│       │   └── value-objects/
│       ├── models/
│       ├── middleware/
│       ├── repositories/
│       ├── routes/
│       └── services/
├── classDiagram.md
├── ErDiagram.md
├── sequenceDiagram.md
└── useCaseDiagram.md
```

## Run Locally

1. Install backend dependencies:

```bash
cd backend
npm install
cp .env.example .env
```

2. Configure backend env in `.env`:

```bash
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/spendsmart
JWT_SECRET=replace_with_long_secure_value
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Start backend server:

```bash
cd ../backend
npm run dev
```

5. Start frontend dev server:

```bash
cd ../frontend
npm run dev
```

Frontend runs on `http://localhost:5173` (or next available port).
Backend runs on `http://localhost:5001`.

## API Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/expenses`
- `GET /api/expenses/:id`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `GET /api/dashboard/summary`

Note: all expense and dashboard endpoints require `Authorization: Bearer <token>`.
