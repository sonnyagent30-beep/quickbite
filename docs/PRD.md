# QuickBite — Product Requirements Document

**Version:** 1.0  
**Date:** May 28, 2026  
**Status:** Draft  
**Owner:** Product Team, QuickBite

---

## 1. Problem Statement

### Why Food Delivery in Nigeria Is Broken

Nigerian food delivery is broken at every layer of the value chain:

**For Consumers:**
- **Unreliable platforms:** Jumia Food is exiting the market, leaving a vacuum. Existing players (Glovo, HeyFood) suffer from inconsistent rider availability, long delivery times (often 60–90+ minutes), and poor communication.
- **Hidden costs:** Service fees, delivery fees, and small-order surcharges stack up invisibly. Users discover total cost only at checkout.
- **Limited local options:** Most aggregators focus on fast-food chains and upscale restaurants. The ~500,000+ local bukas (small restaurants) — which serve the majority of Nigerians — are largely invisible online.
- **Trust deficit:** Photos on platforms don't match reality. No verifiable review system. Orders arrive cold or incomplete with no recourse.
- **Payment friction:** Many users lack debit cards or prefer USSD / mobile money. Most platforms support only one or two payment methods, creating drop-off at checkout.

**For Restaurants (especially bukas and cloud kitchens):**
- **Exorbitant commissions:** Aggregators charge 20–35% commission, making delivery economics unviable for low-margin local food businesses.
- **Opaque dashboards:** No clear visibility into which items sell, when, and why. No data to optimize operations.
- **No control over discovery:** Restaurants have no way to promote themselves or manage their ranking.
- **Delayed payouts:** Settlement periods of 7–14 days create cash flow pressure for small operators.

**For Riders:**
- **Below minimum wage earnings:** Base pay is insufficient; riders depend on tips. No transparency in fare calculations.
- **No insurance or protection:** Accidents on the job have no safety net.
- **Poor routing:** No smart dispatch; riders waste time and fuel on inefficient routes.

**Market Context:**
- Nigerian food delivery market: USD 1B+ growing at ~10% CAGR (PwC, 2024 estimates).
- Lagos and Abuja account for ~60% of demand.
- Average order value: N2,500–4,500.
- Delivery fee sensitivity: Users resist anything above N400–600 for standard delivery.
- Commission rates in market: 15–25% (Chowdeck at 15%, others at 20–25%).
- Key competitor **Chowdeck** raised USD 9M, is profitable, and scaling — they are the benchmark to beat.

---

## 2. Target Users

### Persona Card 1: Tobi (Urban Professional, Primary Customer)

**Profile:** 28–38, works in Ikeja/Victoria Island, earns N300,000–1,200,000/month. Lives in a serviced apartment or mini-flat. Has a debit card and uses mobile banking.

**Behaviors:**
- Orders food 2–4x per week, typically lunch (12–1pm) and dinner (7–8pm).
- Uses phone primarily (iOS or Android),厌恶等待太长。
- Compares options across 2–3 apps before ordering.
- Will pay for quality and reliability but wants to see clear total cost upfront.
- Leaves reviews if the experience is notably good or bad.
- Shares deals with colleagues via WhatsApp.

**Pain Points:**
- Existing apps show restaurants that are actually closed or out of stock.
- Cold food by the time it arrives.
- No real-time tracking that is actually accurate.
- Complicated menus with no filter for dietary preferences (no pork, no dairy, etc.).

**Goals:**
- Get food in ≤45 minutes, reliably.
- Know exactly when food arrives so they can plan their time.
- Find local Buka food — not just KFC and Domino's.

---

### Persona Card 2: Ada (Office Worker / Administrator)

**Profile:** 22–30, works in a corporate office (lekki, Ajah, or mainland). Earns N80,000–250,000/month. Shares a flat with colleagues or family.

**Behaviors:**
- Orders 1–2x per week, often for the whole team (group orders).
- Budget-conscious; sensitive to delivery fees and minimum order thresholds.
- Uses USSD or mobile money (Opay, PalmPay) more than debit cards.
- WhatsApp is primary communication channel.
- Often picks up food herself if delivery fee is too high.

**Pain Points:**
- Many apps require card payment, which she doesn't prefer.
- Minimum order amounts are too high for individual meals.
- Restaurant menus don't show what's actually available.

**Goals:**
- Find affordable meal combos under N2,000.
- Split bills easily across colleagues for group orders.
- Get cashback or discount to make ordering feel "worth it."

---

### Persona Card 3: Emeka (University Student / Young Professional)

**Profile:** 20–26, lives in Bodija, Yaba, or Garki. Student or early-career professional earning under N100,000/month.

**Behaviors:**
- Orders 1–3x per week, mostly on weekends and late evenings.
- Price is the primary decision factor.
- Uses Android phone; highly price-sensitive.
- Will wait longer for cheaper food.
- Active on Twitter/X and Telegram for food deals.

**Pain Points:**
- Most platforms target middle-to-high income. No real budget option.
- Late-night options are severely limited.
- Quality and hygiene are hard to verify.

**Goals:**
- Discover cheap eats in their area.
- Order from multiple vendors in one cart (future feature).
- Get promotional codes regularly.

---

## 3. Core Features for MVP

### MVP Definition

**MVP (Minimum Viable Product)** is a consumer mobile app (iOS + Android) and a restaurant partner web portal. The goal is to launch in **Lagos (Ikeja/Victoria Island pilot)**, prove the core loop, then expand.

### Consumer App — MVP Feature List

| # | Feature | Description |
|---|---------|-------------|
| F1 | Browse restaurants | Grid/list view of restaurants sorted by rating, delivery time, distance. Filters: cuisine type, price range, dietary (halal, no pork). |
| F2 | Restaurant detail page | Menu items with photos, descriptions, prices. Availability status (live). Add to cart. |
| F3 | Search | Text search for restaurant names and food items. Auto-suggest with popular searches. |
| F4 | Cart management | Add/remove items, adjust quantities, view item-level subtotal. Clear cart. |
| F5 | Checkout + delivery address | Address input with save-to-address-book. Delivery instructions (gate code, landmarks). |
| F6 | Payment (Flutterwave + Moniepoint USSD) | Pay via debit card (Flutterwave), Moniepoint/Opay wallet, or USSD. Show total breakdown before confirming. |
| F7 | Order tracking | Real-time map with rider location, estimated arrival. Push notifications at: order confirmed, rider assigned, rider en route, delivered. |
| F8 | Order history | Past orders with reorder capability. |
| F9 | Rate and review | 1–5 star + optional text review. Prompted 30 minutes after delivery. Photo upload optional. |
| F10 | Push notifications | Order status updates, promotional offers. |

### Restaurant Partner Portal — MVP Feature List

| # | Feature | Description |
|---|---------|-------------|
| R1 | Menu management | Add, edit, deactivate menu items. Set prices, photos, descriptions, prep time estimates. |
| R2 | Order management | Receive new orders with audio alert. Accept/decline orders. Mark items as out-of-stock. |
| R3 | Order dashboard | View pending, in-progress, completed orders. Timer showing time since order placed. |
| R4 | Availability toggle | One-tap to go online/offline. Auto-scheduling for opening hours. |
| R5 | Earnings summary | Daily/weekly GMV, order count, average order value. Payout schedule. |

### Admin / Operations Portal (MVP scope: minimal)

| # | Feature | Description |
|---|---------|-------------|
| A1 | Partner onboarding queue | Approve/reject restaurant applications. Upload agreements. |
| A2 | Rider management | Assign orders to riders (manual dispatch for MVP). Track rider location. |
| A3 | Basic analytics | GMV, order volume, delivery time stats. |

---

## 4. User Stories

### 4.1 Browse Restaurants

**As a** consumer, **I want to** see nearby restaurants with estimated delivery time and minimum order, **so that** I can decide quickly where to order from.

**Acceptance Criteria:**
- Restaurant list shows: name, cuisine tag, rating (out of 5), estimated delivery time (e.g., "25–35 min"), minimum order, delivery fee.
- Filter by cuisine type (Nigerian, Chinese, Fast Food, etc.).
- Sort by: Recommended (default), Rating, Delivery Time, Minimum Order.
- Each restaurant card shows 1 hero image.
- Pull-to-refresh updates restaurant availability status.
- Tap card → navigates to restaurant detail page.

---

### 4.2 Search Food

**As a** consumer, **I want to** search by dish name or cuisine, **so that** I can find what I'm craving quickly.

**Acceptance Criteria:**
- Search bar on home screen; always visible.
- Auto-suggestions appear after 2 characters typed, showing matched restaurant names and dish names.
- "Popular searches" shown when search bar is empty.
- Search results show matched restaurants and dishes in separate sections.
- No results state shows "No restaurants found for '[query]'" with suggestion to try different keywords.

---

### 4.3 Add to Cart

**As a** consumer, **I want to** add items to my cart and see a running total, **so that** I can confirm my order before checkout.

**Acceptance Criteria:**
- "Add to Cart" button on every menu item.
- Tapping adds 1 unit; long-press or quantity selector opens quantity stepper (+/-).
- Cart icon in header shows item count badge.
- Cart drawer slides up from bottom; shows all items, quantities, item-level prices, subtotal.
- Delivery fee and total shown only at checkout (not in cart drawer) to reduce friction.
- Can remove items from cart drawer.
- If restaurant is closed or out of stock on an item, show inline warning and prevent checkout of that item.
- Cart persists for 48 hours (even if app is closed).

---

### 4.4 Checkout and Payment

**As a** consumer, **I want to** pay for my order using my preferred payment method, **so that** I can complete the transaction.

**Acceptance Criteria:**
- Checkout page shows: delivery address (editable), order summary, payment methods.
- Payment methods supported:
  - Debit/Credit Card via Flutterwave (Visa, Mastercard, Verve)
  - Moniepoint / Opay / PalmPay wallet via Flutterwave
  - USSD (GTC, UBA, First Bank) via Flutterwave
- Total breakdown shown: Subtotal + Delivery Fee + Service Fee = Total.
- "Place Order" button triggers payment flow; button disabled during processing.
- On successful payment: order confirmed screen, push notification, redirect to tracking page.
- On failed payment: show error message, allow retry.
- Order ID sent to user via push notification and on-screen.

---

### 4.5 Track Order

**As a** consumer, **I want to** see where my food is in real time, **so that** I can plan my time and know when to be available.

**Acceptance Criteria:**
- Order tracking page shows: order status (Confirmed → Preparing → Rider Assigned → En Route → Arriving → Delivered), live map with rider location, estimated arrival time.
- Map shows: restaurant pin (where food is picked up), delivery address pin, rider icon moving along route.
- Status updates pushed as notifications (not just in-app polling).
- "Contact Rider" button (shows phone number, opens dialer) available once rider is assigned.
- "Contact Restaurant" button available once order is confirmed.
- Delivery time promise shown prominently (e.g., "Arriving by 12:45 PM").

---

### 4.6 Rate and Review

**As a** consumer, **I want to** rate my order after delivery, **so that** I can help other users make informed decisions and give feedback to the restaurant.

**Acceptance Criteria:**
- Push notification prompted 30 minutes after delivery: "How was your order from [Restaurant]?"
- Rating screen: 1–5 star selector, text input (optional), "submit" button.
- Rating appears on restaurant's profile after submission (pending moderation for MVP).
- Cannot rate an order that hasn't been delivered.
- Can edit rating within 24 hours of submission.

---

### 4.7 Restaurant Partner Onboarding

**As a** restaurant owner/manager, **I want to** apply to list my restaurant on QuickBite, **so that** I can receive online orders and grow my business.

**Acceptance Criteria:**
- Landing page has "Partner with us" CTA.
- Restaurant application form: Business name, address, cuisine type, contact person name, phone, email, CAC registration number (optional for MVP), average daily covers.
- Documents upload: Business license (optional), food handling certificate (optional for MVP).
- Submission confirmation: "Application received. Our team will review and respond within 24–48 hours."
- Approved restaurants receive onboarding call + portal access credential email.

---

## 5. Restaurant Dashboard Features

### 5.1 Menu Management

- **Add item:** Name, description, price (N), category, photo (upload from device), prep time (minutes), dietary tags (Halal, No Pork, Vegetarian, Spicy).
- **Edit item:** All fields editable; changes reflect on consumer app within 2 minutes.
- **Deactivate item:** Soft-delete; item hidden from app but order history preserved.
- **Category management:** Create/reorder categories (e.g., Soups, Swallows, Proteins, Drinks).
- **Bulk actions:** Deactivate all out-of-stock items at once during rush hours.
- **Image guidelines:** All photos must be ≤1MB, .jpg or .png, minimum 400×300px.

### 5.2 Order Management

- **Incoming orders:** Audio chime + visual badge. Order card shows: order ID, items, customer name (first name only), delivery address (area only, not full address for rider privacy), total, time elapsed.
- **Accept/Decline:** Must respond within 3 minutes or order auto-accepted. Decline requires reason selection (Out of ingredients, Too busy, Other).
- **Mark preparing:** "Preparing" status notifies consumer.
- **Mark ready for pickup:** Triggers rider assignment.
- **Order timer:** Red warning when order > 20 minutes old with no action.

### 5.3 Availability Management

- **Online/Offline toggle:** Immediate effect on consumer app.
- **Scheduled hours:** Set weekly opening/closing times. Auto-switch online/offline.
- **Temporary closure:** Set "closed until [time]" override.
- **Unavailable slots:** Block specific time slots (e.g., fully booked for lunch rush).

### 5.4 Analytics and Payouts

- **Dashboard:** Today's orders, revenue, average order value. Comparison to yesterday.
- **Weekly report:** GMV trend, top-selling items, peak hours chart.
- **Payout:** Weekly auto-settlement every Monday for previous week's earnings. Minimum withdrawal: N10,000. Payout to bank account (WEMA, Opay, Moniepoint).

---

## 6. Success Metrics

### 6.1 Business Metrics

| Metric | Target (Month 3) | Target (Month 6) |
|--------|-------------------|-------------------|
| GMV (Gross Merchandise Value) | N15M/month | N80M/month |
| Active restaurant partners | 30 | 100 |
| Total orders completed | 2,000/month | 12,000/month |
| Average Order Value (AOV) | N3,500 | N4,000 |
| Order frequency (repeat customers) | 1.8 orders/customer/month | 2.5 orders/customer/month |

### 6.2 Operations Metrics

| Metric | Target |
|--------|--------|
| Average delivery time | ≤ 45 minutes |
| Order accuracy rate | ≥ 95% (correct items, correct quantity) |
| Rider efficiency | ≥ 2.5 deliveries/rider/shift |
| First-order fulfillment rate | ≥ 98% (no cancellations after payment) |
| Payout accuracy | 100% (no errors) |

### 6.3 Customer Metrics

| Metric | Target (Month 3) |
|--------|------------------|
| App installs | 5,000 |
| Monthly active users (MAU) | 2,000 |
| Customer retention (30-day) | ≥ 40% |
| App Store rating | ≥ 4.2 stars |
| NPS (Net Promoter Score) | ≥ 30 |
| Push notification open rate | ≥ 60% |

---

## 7. Out of Scope for MVP

The following features are explicitly **out of scope** for MVP (Phase 1). They will be revisited in Phase 2 or 3:

- **Multi-vendor cart:** Ordering from two different restaurants in one checkout. MVP: one restaurant per order.
- **Scheduled/advance orders:** Ordering food for delivery at a future time. MVP: immediate orders only.
- **Live chat with restaurant:** In-app messaging between consumer and restaurant. MVP: phone call only.
- **Rider app (in-house):** Building our own rider dispatch app. MVP: third-party integration (Max.ng or manual dispatch).
- **Subscription / membership tiers:** Loyalty programs, Pro subscriptions. MVP: pay-per-order only.
- **In-app wallet:** QuickBite balance for faster checkout. MVP: direct payment each order.
- **Table reservation / dine-in:** Not a delivery product.
- **Grocery or quick commerce:** Pure food delivery focus only.
- **Corporate / B2B meal plans:** Enterprise accounts with invoicing. Future phase.
- **Referral program:** Viral loops. MVP launch without referral engine.
- **Native iOS app:** MVP is React Native / Flutter (cross-platform). Separate iOS build deferred.
- **Admin analytics dashboard:** Basic stats only; full BI/deck deferred.
- **Automated rider dispatch:** Manual assignment for MVP.

---

## 8. MoSCoW Prioritized Backlog

### Must Have (MVP launch requirement)

| ID | Feature | Notes |
|----|---------|-------|
| M1 | Consumer app: Browse + restaurant detail | Grid/list, filters, sort |
| M2 | Consumer app: Menu + add to cart | Item photos, prices, quantity |
| M3 | Consumer app: Checkout flow | Address input, order summary |
| M4 | Consumer app: Payment (Flutterwave) | Card, USSD, wallet |
| M5 | Consumer app: Order tracking | Map + status updates |
| M6 | Consumer app: Order history + reorder | Past 30 days |
| M7 | Consumer app: Rate order | 1–5 stars + text |
| M8 | Restaurant portal: Menu management | Add/edit items |
| M9 | Restaurant portal: Order management | Accept/decline, status update |
| M10 | Restaurant portal: Online/offline toggle | Manual |
| M11 | Restaurant portal: Earnings view | Payout schedule |
| M12 | Admin: Partner onboarding approval | Manual review |
| M13 | Admin: Rider dispatch (manual) | Via phone/WhatsApp for MVP |
| M14 | Push notifications | Firebase Cloud Messaging |
| M15 | Geolocation + address autocomplete | Google Maps / Mapbox |
| M16 | Delivery fee calculation | By distance + surge logic |

### Should Have (Post-MVP, Phase 2)

| ID | Feature | Notes |
|----|---------|-------|
| S1 | Search with auto-suggest + popular queries | |
| S2 | Scheduled availability / opening hours | Restaurant-side |
| S3 | Coupon/promotion codes | Single-use codes, manual generation |
| S4 | Push notification for reviews | 30 min post-delivery |
| S5 | Restaurant analytics dashboard | Top items, peak hours |
| S6 | Customer support chat | In-app, not phone |
| S7 | Group order (one person pays for others) | WhatsApp share link |
| S8 | Filter by dietary preference | Halal, No Pork, Vegetarian |

### Could Have (Differentiated but not critical)

| ID | Feature | Notes |
|----|---------|-------|
| C1 | Photo reviews | Camera integration |
| C2 | Reorder in one tap | "Order same as last time" |
| C3 | Restaurant promotions | BOGO, discounts on app |
| C4 | Estimated prep time per item | Based on restaurant data |
| C5 | Share to WhatsApp with order link | |
| C6 | Multi-vendor cart | Huge complexity, de-risk later |

### Won't Have (Will not implement in foreseeable future)

| ID | Feature | Reason |
|----|---------|--------|
| W1 | In-house rider fleet | Capex heavy; partner with Max.ng |
| W2 | Native iOS separate build | React Native covers iOS |
| W3 | In-app wallet/balance | Payment complexity |
| W4 | Corporate invoicing | B2B is a separate product |

---

## 9. Tech Stack Recommendation

### Consumer App: React Native (Expo)

**Why:** Single codebase for iOS + Android. Faster iteration than native. Large talent pool in Nigeria/Lagos. Expo managed workflow reduces DevOps overhead.

**Alternatives considered:**
- Flutter: Strong, but React Native ecosystem in Nigeria is more established for web-to-mobile bridges. Flutter also requires dedicated mobile devs.
- PWA: Too slow for a food delivery app UX; poor push notification support on iOS.

### Admin / Restaurant Portal: Next.js (React)

**Why:** SSR for SEO (restaurant public pages), fast page loads, unified language (TypeScript) with consumer app. Vercel/Netlify deployable.

**Alternative:** Vue.js (Nuxt) — equally valid, but React ecosystem for complex dashboards is deeper.

### Backend / Database: Supabase

**Why:** PostgreSQL under the hood, built-in auth (email + phone OTP), row-level security (RLS) for multi-tenant data isolation, real-time subscriptions (for order updates), built-in file storage (for menu photos), generous free tier for MVP.

**Alternatives considered:**
- Firebase: More established but vendor-lock-in is heavy. Firestore is NoSQL which makes relational queries (earnings, reporting) painful.
- Custom Node.js + PostgreSQL: More control but 3–4x the setup time for auth, file upload, real-time.

### Key Infrastructure Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Maps | Google Maps SDK (React Native) | Best Nigeria coverage for addresses. Mapbox as fallback. |
| Push Notifications | Firebase Cloud Messaging (FCM) | Works with React Native; supports iOS + Android. |
| Payment | Flutterwave | Best Nigeria coverage: card, USSD, transfer, Opay/Moniepoint wallets. Direct API integration. |
| Image CDN | Supabase Storage + Cloudflare | Supabase for upload; Cloudflare CDN for delivery. |
| Deployment | Vercel (Next.js), Expo (React Native) | Managed; minimal DevOps. |
| Error monitoring | Sentry | Real-time error tracking across app and portal. |
| Analytics | Mixpanel or PostHog | Event-based funnel analysis. PostHog is open-source and self-hostable. |
| SMS / OTP | Termii or Africa's Talking | OTP for phone auth. Termii is cheaper for Nigeria. |

---

## 10. Payment Integration

### Primary Gateway: Flutterwave

Flutterwave is the recommended primary payment gateway for the following reasons:

- **Local coverage:** Supports all Nigerian banks via USSD, card (Visa/MC/Verve), mobile money (Opay, PalmPay, Moniepoint), and bank transfer.
- **Settlement:** Same-day or next-day settlement to business bank account.
- **PCI-DSS compliant:** Tokenized cards; no raw card data touches our servers.
- **Pricing:** 1.5% per transaction (capped at N200 for lower-value orders). Competitive for our GMV scale.
- **Maturity:** Powers Jumia Pay, PalmPay, and dozens of Nigerian e-commerce platforms. Stable.

### Integration Flow

1. Consumer taps "Place Order" → frontend calls QuickBite backend to create order record with `pending` payment status.
2. Backend calls Flutterwave API to create a payment reference for that order.
3. Frontend receives payment reference and redirects consumer to Flutterwave inline widget (card/USSD/wallet selection).
4. Consumer completes payment on Flutterwave's hosted page.
5. Flutterwave sends webhook to QuickBite backend (`payment.completed` event) → backend updates order status to `paid`.
6. Backend notifies consumer app via real-time channel (Supabase realtime) and pushes FCM notification.
7. Order flows to restaurant's portal for fulfillment.

### Payment Options to Enable at Launch

| Method | Implementation | Notes |
|--------|---------------|-------|
| Debit Card | Flutterwave inline widget | Visa, Mastercard, Verve. Most common. |
| USSD | Flutterwave USSD flow | Works on all feature phones + smartphones. Critical for Ada persona. |
| Opay / Moniepoint Wallet | Flutterwave wallet API | Growing adoption in Lagos. |
| Bank Transfer | Flutterwave Rave pay | Less preferred due to settlement delay; include as fallback. |

### Moniepoint as Secondary (Optional)

Moniepoint (formerly TeamA) is rapidly growing as a payment aggregator with lower fees than Flutterwave for small merchants. Consider integrating Moniepoint as a secondary gateway for restaurant payouts (B2B side) while keeping consumer payments on Flutterwave for consistency.

**Note:** Do not integrate Paystack (Stripe-owned) as primary. Paystack's consumer payment product in Nigeria is less complete than Flutterwave for USSD and mobile money. Paystack is better for enterprise/B2B use cases.

---

## 11. Delivery Model

### Decision: Hybrid — Third-Party Rider Network with Manual Dispatch

For MVP, QuickBite will **not** build an in-house rider fleet. The rationale:
- In-house riders require: HR, insurance, hardware (phones), training, dispute resolution, and scheduling logic. This is a separate business unit.
- Third-party networks (Max.ng, Gokada, ORide) already have rider density in Lagos and Abuja.

### Recommended Third-Party Partners

| Provider | Strength | Weakness | Integration |
|----------|---------|---------|-------------|
| **Max.ng** | Largest bike-hailing network in Nigeria. App-based dispatch, insurance on riders, GPS tracking. Active in Ikeja, VI, Lekki. | No API for automatic dispatch; manual assignment required. | REST API for status updates; manual order-to-rider assignment. |
| **Gokada** | Strong last-mile delivery brand in Lagos. Corporate partnerships (Restaurants). | Coverage gaps outside core Lagos zones. | No public API; phone/WhatsApp dispatch for MVP. |
| **ORide (Opay)** | Opay ecosystem (wallet + delivery). Growing fast. | Newer player; service quality inconsistent. | No API; manual dispatch. |

### MVP Dispatch Flow

1. Restaurant marks order **Ready for Pickup**.
2. Admin (operations team) receives notification.
3. Admin assigns order to available rider via phone/WhatsApp (manual for MVP).
4. Rider picks up from restaurant, delivers to customer.
5. Rider updates status via their own app (Max.ng / Gokada).
6. QuickBite receives status via webhook or manual update by ops team.
7. Consumer receives push notification: "Rider is on the way."

### Delivery Fee Structure (MVP)

| Distance | Delivery Fee |
|----------|-------------|
| 0–3 km | N250 |
| 3–7 km | N400 |
| 7–15 km | N600 |
| 15+ km | N800 + N100/km beyond 15km |

- Minimum order: N1,500 (to ensure viable order economics).
- Free delivery for orders above N10,000 (promotion for MVP launch).
- Surge pricing: 1.2x multiplier during peak hours (12–1pm, 7–8pm) in high-demand zones.

### Phase 2 Transition

Once QuickBite reaches **200+ orders per day**, invest in a custom rider dispatch system:
- Integrate Max.ng API for automated order assignment.
- Build rider-facing app (React Native) for status updates.
- Implement dynamic routing and ETA optimization.

---

## 12. Launch Roadmap

### Phase 1: MVP Launch (Months 1–3)

**Goal:** Prove the core loop — consumer orders food, restaurant receives and prepares, food is delivered.

**Timeline:** May–August 2026

**Milestones:**

| Week | Deliverable |
|------|-------------|
| 1–2 | Finalize designs (consumer app + restaurant portal). Set up Supabase project, Flutterwave sandbox. |
| 3–6 | Build consumer app core (browse, menu, cart, checkout, payment, tracking). Build restaurant portal (menu mgmt, order mgmt). |
| 7–8 | Internal testing (team + friends/family). Bug fixes. |
| 9–10 | Restaurant onboarding: sign 10 restaurant partners in Ikeja/VI. Configure delivery zones. |
| 11–12 | Soft launch (private beta) — 50 users, invitation-only. Collect feedback. |
| 13 | Public launch. 30 active restaurant partners. Start organic marketing (WhatsApp, Instagram). |

**Success criteria:** 200 orders completed in first month, ≥ 3.8 app rating, ≤ 10% order cancellation rate.

---

### Phase 2: Growth (Months 4–9)

**Goal:** Expand to 100+ restaurants, improve operational efficiency, launch referral loop.

**Milestones:**

| Month | Deliverable |
|-------|-------------|
| 4–5 | Launch search functionality, dietary filters, push notification review prompts. |
| 5–6 | Integrate Max.ng API for semi-automated rider dispatch. Launch promo codes (N500 off first order). |
| 6–7 | Expand delivery zone to Lekki/Ajah. Onboard 50 additional restaurants. |
| 7–8 | Launch referral program (referrer gets N1,000 credit, referee gets N500 off). |
| 8–9 | Launch restaurant analytics dashboard. Launch scheduled availability (restaurant opening hours). |
| 9 | Target: 3,000 orders/month, 30% 30-day retention. |

---

### Phase 3: Scale (Months 10–18)

**Goal:** National expansion (Abuja, Port Harcourt), corporate accounts, subscription tier.

**Milestones:**

| Month | Deliverable |
|-------|-------------|
| 10–12 | Expand to Abuja (Garki, Wuse, Maitama). Onboard 50 Abuja restaurants. |
| 12–14 | Launch corporate/B2B meal plans (company invoicing, bulk orders). |
| 14–16 | Build in-house rider dispatch system (automated, not manual). |
| 16–18 | Launch QuickBite Pro subscription (N2,500/month): free delivery, 5% cashback, priority support. |
| 18 | Target: 12,000 orders/month, 15+ cities. Break-even on operations. |

---

## Appendix: Competitive Analysis Summary

| Competitor | Strengths | Weaknesses | QuickBite Differentiation |
|------------|-----------|------------|---------------------------|
| **Chowdeck** | Profitable, funded, fast delivery (30 min avg), 15% commission | Limited to major cities, focus on chains | Lower commission (12%), better local Buka coverage, superior UX |
| **Glovo** | International brand, multi-category | High fees, confusing UX, poor local food selection | Simpler app, local focus, better commissions for restaurants |
| **HeyFood** | Growing, good restaurant selection | Inconsistent delivery times, limited coverage | Faster onboarding for restaurant partners, real-time tracking guarantee |
| **Jumia Food** | Exiting market — opportunity to capture abandoned users | Retiring brand, negative sentiment | New brand = fresh slate, modern tech stack |
| **FoodCo** | Strong in Abuja | Limited online presence, outdated app | Next-gen app experience, better mobile UX |

---

*Document maintained by: QuickBite Product Team*  
*Last updated: May 28, 2026*  
*Next review: June 15, 2026*