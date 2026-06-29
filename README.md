# QuickBite

MultiRestaurant Food Delivery Platform — Nigeria

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL + Auth + Realtime)
- **Styling:** Tailwind CSS
- **State:** React Context + localStorage
- **Deployment:** Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin dashboard routes
│   ├── (customer)/        # Customer-facing routes
│   ├── (restaurant)/     # Restaurant partner routes
│   └── api/              # API routes
├── components/            # Reusable React components
└── lib/                  # Utilities and Supabase client
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.
