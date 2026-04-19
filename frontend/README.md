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

## Deploy To Vercel

1. Import repository in Vercel.
2. Set Root Directory to `frontend`.
3. Add environment variable:

```bash
VITE_API_BASE_URL=https://your-backend-project.vercel.app/api
```

4. Deploy.

The `vercel.json` file is configured for Vite output and SPA route rewrites.

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
