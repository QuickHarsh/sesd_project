# SpendSmart Frontend

React + Vite client for SpendSmart expense tracking.

## Features

- Authentication flow (login/register)
- Dashboard with KPI card, spend chart, and recent activity
- Expense history with create, update, delete, and filtering
- Protected routes with auth-aware redirects

## Environment

Create a local env file from the template:

```bash
cp .env.example .env
```

Required value:

```bash
VITE_API_BASE_URL=http://localhost:5001/api
```

## Local Development

```bash
npm install
npm run dev
```

Default dev URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
