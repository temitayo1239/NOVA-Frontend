# NOVA E-Commerce Frontend

Production-oriented Next.js + TypeScript e-commerce frontend scaffold based on the supplied specification.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- React Hook Form
- Zod-ready form architecture
- Framer Motion-ready architecture
- Lucide React

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment

`NEXT_PUBLIC_API_URL` points to the NestJS API. The supplied backend specification indicates a base URL such as:

`http://localhost:5000/api/v1`

`NEXT_PUBLIC_USE_MOCKS=true` keeps the project usable without the backend. Set it to `false` when real endpoints are ready.

## API integration

Axios is centralized in:
- `src/lib/api/client.ts`

Domain API modules:
- `src/lib/api/auth.ts`
- `src/lib/api/products.ts`
- `src/lib/api/cart.ts`
- `src/lib/api/payments.ts`
- `src/lib/api/users.ts`

Mock data:
- `src/lib/mock/data.ts`

The intended flow is:

UI → hooks/providers → API layer → NestJS backend

## Current placeholders / backend requirements

The exact backend API implementation was not supplied, so this project deliberately does not pretend that unverified endpoints exist.

Likely integration points:
- Authentication: login, register, current user
- Products: list, detail, create, update, delete
- Cart: get, add, update quantity, remove
- Payments: create payment, payment history/status
- Users: current user, admin user list
- Orders: an Order resource plus order history/detail endpoints
- Admin analytics: dashboard statistics
- User suspension: authorized suspend/unsuspend endpoint

Payment success is never fabricated. A real payment provider/backend confirmation should be wired into checkout.

## Notes

The storefront is fully usable in mock mode and is structured so API endpoint changes remain localized. Before production, align request/response types and endpoint paths with the real NestJS DTOs/controllers, implement server-enforced authorization, connect a real payment provider, and add automated tests.
