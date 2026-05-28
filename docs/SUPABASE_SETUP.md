# Supabase Setup Guide for QuickBite

This guide walks you through setting up Supabase for the QuickBite food delivery MVP.

---

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js 18+ installed locally
- Access to the QuickBite repository

---

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click **New Project**
3. Fill in the details:
   - **Organization**: QuickBite (or your organization)
   - **Name**: `quickbite-dev` (or `quickbite-prod` for production)
   - **Region**: Choose `West Africa (Cape Town)` for lowest latency to Nigeria
   - **Database Password**: Generate a strong password and save it securely
4. Click **Create new project**
5. Wait for the project to be provisioned (usually 2-3 minutes)

---

## Step 2: Get Your API Keys

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIs...` (safe to use in frontend)
   - **service_role key**: `eyJhbGciOiJIUzI1NiIs...` (ONLY for server-side, never expose)

3. Create a `.env.local` file in `/frontend/`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## Step 3: Run Database Migration

### Option A: Run via Supabase SQL Editor (Recommended for MVP)

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste the contents of `/supabase/migrations/001_initial_schema.sql`
3. Click **Run** to execute

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
cd /root/workspace/quickbite
supabase link --project-ref your-project-id

# Push migrations
supabase db push
```

### Option C: Manual Setup

Run each SQL statement from `docs/architecture.md` Section 2 (Database Schema) in the Supabase SQL Editor.

---

## Step 4: Configure Authentication

### Phone OTP Setup (Recommended for Nigeria)

1. Go to **Authentication** → **Providers** → **Phone**
2. Enable **Phone** provider
3. For testing, you can use the default Supabase OTP service
4. For production, configure a custom SMS provider (Termii, Africa's Talking)

### Auth Settings

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (development)
   - **Redirect URLs**: Add your Netlify domain after deployment
   - **Enable Email Confirm**: `true` for better security

---

## Step 5: Configure Row Level Security (RLS)

The migration in Step 3 already includes RLS policies. Verify they are working:

1. Go to **Table Editor** → select any table (e.g., `users`)
2. Click **Policies** tab
3. You should see policies like:
   - `Users read own` - Users can only read their own data
   - `Restaurants public read` - Anyone can read restaurants
   - `Restaurant owners manage menu` - Owners can manage their menu

---

## Step 6: Set up Storage (Optional - for menu images)

1. Go to **Storage** in the sidebar
2. Create a new bucket called `menu-images`
3. Set public access for reading (images need to be publicly accessible)
4. Create a policy for restaurant owners to upload images

---

## Step 7: Verify Setup

Test your setup by running the development server:

```bash
cd /root/workspace/quickbite/frontend
npm run dev
```

Visit `http://localhost:3000` and verify:
- [ ] App loads without errors
- [ ] Database connection works (check browser console)
- [ ] Authentication flow works

---

## Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only key | Settings → API → service_role key |

---

## Troubleshooting

### "Connection refused" errors
- Verify your project is not paused (Supabase free tier pauses after 7 days of inactivity)
- Check your IP is not blocked in Supabase dashboard

### RLS Policy errors
- Use Supabase's `auth.uid()` function to reference the current user
- Test policies in the SQL Editor with `SELECT auth.uid()`

### OTP not sending
- Check your SMS quota at https://supabase.com/dashboard
- Consider using WhatsApp OTP instead for higher delivery rates in Nigeria

---

## Next Steps

After setting up Supabase:

1. Configure Flutterwave (see `docs/FLUTTERWAVE_SETUP.md`)
2. Update your `.env.local` with all required keys
3. Deploy to Netlify
4. Test the full payment flow