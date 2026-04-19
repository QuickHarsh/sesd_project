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

## Project Milestones

- Layered backend architecture wired with controllers, services, and repositories.
- Frontend organized by domain models, use-cases, and reusable components.
- JWT-based auth and protected API routes integrated across the stack.

## Development Checklist

- Keep domain logic inside services/repositories instead of route handlers.
- Validate API payloads and return readable error messages.
- Keep frontend use-cases as the integration boundary with API services.
- Update `.env.example` files whenever new configuration keys are introduced.

## Deploy On Vercel

Deploy frontend and backend as two separate Vercel projects from this same repository.

### Backend (Vercel Project 1)

1. Create a new Vercel project and set Root Directory to `backend`.
2. Add environment variables:
	- `MONGODB_URI`
	- `JWT_SECRET`
	- `JWT_EXPIRES_IN` (optional, default `7d`)
	- `CLIENT_ORIGINS` (comma-separated, include your frontend Vercel URL)
	- `NODE_ENV=production`
3. Deploy. The API will serve routes such as:
	- `/api/health`
	- `/api/auth/login`
	- `/api/expenses`

### Frontend (Vercel Project 2)

1. Create another Vercel project and set Root Directory to `frontend`.
2. Add environment variable:
	- `VITE_API_BASE_URL=https://your-backend-project.vercel.app/api`
3. Deploy.

### CORS Notes

- Backend CORS is controlled by `CLIENT_ORIGINS`.
- Add your exact frontend URL (for example `https://spendsmart-frontend.vercel.app`).
- You can also use wildcard entries like `*.vercel.app` when needed.

## Architecture Notes

- Controllers only orchestrate request and response handling.
- Services hold business rules and validation.
- Repositories isolate persistence and query concerns.

## Troubleshooting

- If login fails unexpectedly, confirm backend and frontend use the same API base URL.
- If CORS errors appear, ensure CLIENT_ORIGINS includes your frontend dev host.
- If Mongo connection fails, verify MONGODB_URI and local database availability.
