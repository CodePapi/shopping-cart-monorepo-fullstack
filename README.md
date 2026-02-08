# Shop Cart — Full-Stack E‑Commerce (Pet Project)

<img width="2936" height="1568" alt="image" src="https://github.com/user-attachments/assets/ee842a4d-8a0f-4ba9-aa2f-99125cbbc584" />


Shop Cart is a personal full‑stack e‑commerce project built to showcase end‑to‑end user sign-up, product, cart, and ordering workflows with a modern React frontend and a NestJS + Prisma backend. It is intentionally small, clean, and production‑ready in structure so features can evolve quickly.

## Highlights
- Monorepo with shared TypeScript schemas
- NestJS backend with Prisma + PostgreSQL
- React + Vite frontend with Tailwind CSS
- Authentication with JWT and admin‑only product creation
- Docker Compose for local development

## Architecture
- FE: React, Vite, Tailwind, Typescript
- BE: NestJS, Prisma, PostgreSQL, Typescript
- shared: shared Zod schemas and types

## Project Structure
```
shop-cart-project/
├── BE/        # Backend (NestJS)
├── FE/        # Frontend (Vite + React)
├── shared/    # Shared types/schemas
├── package.json
└── docker-compose.yml
```

## Running Locally (Docker)
### Prerequisites
- Docker and Docker Compose

### Start the stack
```
npm run dev
```

Services:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Postgres: localhost:5432

### Stop containers
```
npm run dev:down
```

## Environment Variables
Create BE/.env with:
```
DATABASE_URL=postgresql://user:password@shop-cart-pg:5432/shop-cart?schema=public
JWT_SECRET=your_jwt_secret
ADMIN_CREATION_SECRET=your_admin_secret
```

## Auth & Admin Flow
- Register/login via /auth/register and /auth/login
- To create an admin account, pass the header x-admin-secret with ADMIN_CREATION_SECRET when registering
- Only admins can create products

## Scripts
- npm run dev — start full stack with Docker
- npm run dev:build — rebuild and start
- npm run dev:down — stop containers
- npm run test:be — backend tests
- npm run test:fe — frontend tests

## CI Pipeline (GitHub Actions)
On pull requests, the CI workflow runs:
- Lint and format checks (Biome)
- Backend tests
- Frontend tests


## API Documentation
Swagger UI is available when the backend is running:
- http://localhost:3000/api

### Auth
- POST /auth/register
- POST /auth/login

### Products
- GET /products
- POST /products (admin only)

### Orders
- POST /orders
- GET /orders/:id

## Notes
This is a pet project intended for learning and showcasing best‑practice structure. It is not production‑deployed and favors clarity over scale.
