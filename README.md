# XYZ Layers

Storefront and admin panel for a 3D-printing shop, built with [Next.js](https://nextjs.org), Tailwind CSS and [Supabase](https://supabase.com). Originally bootstrapped with [v0](https://v0.app).

## What it does

**Storefront**

- Shop with category filters, search, sorting and shareable URLs (`/shop?category=Toys&q=dragon`)
- Product pages driven by the database: price, stock, photos, specifications, related products
- Cart (saved in the browser), checkout, and order placement. Prices and stock are checked by the database when the order is placed, never trusted from the browser
- Custom order requests with file uploads, and a contact form

**Admin** (`/admin`, sign-in required)

- Dashboard with live counts and recent activity
- Products: create, edit, delete, upload photos, set featured / trending / hidden
- Orders: view items and delivery details, update status
- Custom requests: view the brief and attachments, set status, priority, quote and notes
- Messages from the contact form

No payment is taken at checkout. After an order is placed you contact the customer to confirm shipping and payment. See [Not included](#not-included).

## Setup

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in the two Supabase values (Supabase dashboard → Project Settings → API). Set the same variables in your hosting provider (on Vercel: Project → Settings → Environment Variables).

Without them the site still runs using a built-in demo catalogue, but checkout, the forms and the admin panel need the database.

### 2. Database

In the Supabase **SQL editor**, run [`supabase/migrations/0001_storefront.sql`](supabase/migrations/0001_storefront.sql). It is safe to re-run, and it keeps your existing `products` rows. It creates the order, request and message tables, the security rules, and the storage buckets for product photos and customer uploads.

> **This turns on row level security for `products`.** Until you finish step 3, the admin panel cannot save changes. It also removes any older, more permissive policy on `products`.

Optional: run [`supabase/seed.sql`](supabase/seed.sql) to load the 12 demo products. It only inserts when the table is empty.

### 3. Create your admin account

1. Supabase dashboard → **Authentication → Users → Add user** (email and password).
2. In the SQL editor, make that user an admin:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict do nothing;
   ```
3. Sign in at `/admin/login`.

Recommended: Authentication → Providers → Email → turn off **Allow new users to sign up**. Even if you don't, only users listed in `admins` can access anything private.

### 4. Optional: contact details and social links

Set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_TWITTER_URL`, `NEXT_PUBLIC_LINKEDIN_URL`. They appear on the contact page and in the footer; anything left empty is not shown.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (type errors now fail the build)
```

Product, shop and home pages are cached and re-fetched at most every 30 seconds, so admin changes appear on the storefront within about 30 seconds.

## How access control works

The admin screens check that you are signed in and listed in `admins`, but that is only to decide what to show. The real protection is in the database: every private table has row level security that allows only admins, and customers can reach orders only through the `place_order` function. A signed-up stranger, or someone calling the API directly with the public key, gets nothing.

## Not included

- **Online payments.** Orders are recorded and you follow up. Adding a gateway (for example Razorpay) means taking payment before or after `place_order`.
- **Order emails.** Nobody is emailed automatically when an order or request arrives. Check the admin dashboard, or add a Supabase database webhook.
- **Rate limiting.** The forms have a hidden-field spam trap but no rate limit.
- **Legal pages.** There are no Privacy, Terms, Shipping or Returns pages, and the custom order form still mentions the Terms and Privacy Policy.

## Built with v0

This repository is linked to a [v0](https://v0.app) project: [continue working on v0](https://v0.app/chat/projects/prj_aAMV2wDwAr2mFPNOueZD4t3Rhept). Every merge to `main` deploys automatically.
