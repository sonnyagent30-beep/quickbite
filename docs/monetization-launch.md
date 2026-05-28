# QuickBite — Monetization Strategy & MVP Launch Plan

**Version:** 1.0  
**Date:** May 28, 2026  
**Status:** Draft  
**Purpose:** Define how QuickBite makes money and exactly how to launch in the first 30 days

---

## 1. Revenue Model

QuickBite operates as a two-sided marketplace. Revenue flows from restaurants (primary) and delivery fees (secondary). Every revenue stream is designed to be transparent — no hidden fees that erode trust.

### 1.1 Commission per Order (Primary Revenue Stream)

Commission is charged as a percentage of the order subtotal (excludes delivery fee and service fee).

| Tier | Commission Rate | Conditions |
|------|---------------|------------|
| Launch Promo | **5%** | First 3 months for first 20 restaurant partners |
| Standard | **12%** | Default rate for all restaurants post-promo |
| QuickBite Pro | **10%** | Restaurants on Pro subscription (see Section 8) |

- Commission is deducted from the restaurant's payout — the customer pays the full order value, QuickBite takes its cut, restaurant receives the remainder.
- Payout frequency: **Weekly** (every Monday for prior week's earnings). This is a differentiator vs competitors who settle bi-weekly or monthly.
- Payment processing fee (Flutterwave 1.5–3%) is deducted from QuickBite's commission share, not added on top.
- Minimum order value for commission calculation: N1,500

**Example:** Customer orders N4,500 worth of food.
- QuickBite commission (12%): N540
- Restaurant receives: N3,960
- Payment processing (~2% on N4,500): ~N90 deducted from QuickBite's N540 → Net commission revenue: N450

### 1.2 Delivery Fee (Passed to Customer)

Delivery fees are charged to the customer at checkout, not to the restaurant.

| Distance Zone | Standard Fee | Peak Hours (12–1pm, 7–8pm) |
|--------------|-------------|---------------------------|
| 0–3 km | N250 | N300 (1.2x) |
| 3–7 km | N400 | N480 |
| 7–15 km | N600 | N720 |
| 15+ km | N800 + N100/km beyond 15km | N960 + N120/km |

- **Free delivery** for orders above N10,000 (MVP promotional offer, months 1–3)
- **Minimum order:** N1,500
- Delivery fee is not subject to commission — it passes through to cover rider costs
- Rider receives N150–250 per delivery (based on distance) as their fee; QuickBite nets the remainder

### 1.3 Restaurant Subscription Tiers

Three tiers designed to serve restaurants at different growth stages. The Pro tier is the primary upsell mechanism (detailed in Section 8).

| Feature | Free | Standard | Pro (N9,999/mo) |
|---------|------|----------|----------------|
| Commission rate | 12% | 12% | 10% |
| Priority placement in search | No | No | Yes (top 3) |
| Analytics dashboard | Basic | Full | Full + insights |
| Promoted listing in app | No | No | Yes (weekly rotation) |
| Featured on homepage banner | No | No | Yes (one week/month) |
| Dedicated account manager | No | No | Yes |
| Platform fee | N0 | N0 | N9,999/month |

- Standard tier is identical to Free in functionality — the distinction exists for future pricing evolution
- Commission rate reduction for Pro pays for the monthly fee at ~83 orders/month (N9,999 / 2% savings ≈ 500K in orders, or about 17 orders/day, which is achievable for a busy restaurant)

### 1.4 Advertised Placement Fees

Promotional slots within the app that restaurants can pay for to increase visibility.

| Placement | Fee | Duration |
|-----------|-----|----------|
| "Featured Restaurant" banner on homepage | N15,000 | 7 days |
| Category top pick (e.g., "Best Jollof Rice") | N7,500 | 7 days |
| Push notification to users in delivery zone | N5 per notification | Per send |
| "New on QuickBite" onboarding badge | N5,000 | 14 days |
| Search result highlight (top 3 for specific cuisine) | N20,000 | 30 days |

- Only available to Standard and Pro restaurants for the first 3 months; Free tier gets one free "New on QuickBite" badge upon onboarding
- Revenue from placement fees is secondary but becomes significant at 100+ restaurants (N500K–N2M/month potential at maturity)

### 1.5 Late-Night Order Surge Pricing

Captures demand during high-effort, low-supply hours. Targets the Emeka persona (student/young professional) who orders late.

- **Surge window:** 10pm–2am daily
- **Surge multiplier:** 1.3x on delivery fee only (not commission)
- **Restaurants opted in:** Automatically included unless they set unavailable hours
- **Not applied to:** Orders below N2,000

**Example:** A N3,500 order at 11pm in the 3–7km zone:
- Normal delivery fee: N400
- With surge (1.3x): N520
- Rider earns: N200 (distance-based)
- QuickBite nets: N320 from delivery fee

---

## 2. Pricing Strategy

### MVP Launch Pricing (Months 1–3)

The goal during MVP is to build supply (restaurants) and prove demand (customers). Pricing is intentionally aggressive to break into the market dominated by 15–30% commission platforms.

| Action | Rationale |
|--------|-----------|
| 5% commission for first 20 restaurants (3-month lock-in) | Acquires anchor restaurants with a compelling offer they can't get elsewhere |
| Free delivery for orders above N10,000 | Encourages larger orders, improving unit economics |
| Free Standard tier for first 6 months (then N2,500/mo) | Builds habit with restaurants before introducing Pro |
| Free delivery zone: Ikeja + VI only | Concentrates supply and demand, enabling reliable 40-min delivery |

### Commission Increase Timeline

| Milestone | New Rate | Condition |
|-----------|----------|-----------|
| Month 1–3 | 5% (Promo) | First 20 restaurants only |
| Month 4+ | 12% (Standard) | All new restaurants |
| Month 7+ | 15% (Competitive) | Market rate; allows margin for operations |
| Pro tier always | 10% | Restaurants on Pro subscription |

**Rationale for gradual increase:**
- Month 1–3: Prove the platform works. Low commission = easier restaurant acquisition.
- Month 4–6: Demonstrate demand. Restaurants who renew are committed. 12% is still below market (Chowdeck at 15%, Glovo at 15–30%).
- Month 7+: Build sustainable margins. At 200+ daily orders, operational costs are covered by the spread.

### Premium Features by Phase

| Phase | Timeline | New Revenue Features |
|-------|----------|---------------------|
| MVP Launch | Month 1–3 | Basic commission + delivery fees |
| Post-MVP | Month 4–6 | Advertised placement, late-night surge |
| Pro Launch | Month 6–9 | QuickBite Pro subscription tier |
| Expansion | Month 9–12 | Corporate catering accounts, bulk ordering fees |

---

## 3. First 30 Days Launch Plan

### Pre-Launch Setup (Days 1–7): Seed Restaurants + Internal Testing

**Goal:** 8 restaurant partners fully onboarded, app tested internally by team.

| Day | Action | Owner |
|-----|--------|-------|
| Day 1 | Finalize restaurant outreach list (20 target restaurants in Ikeja/VI). Prepare pitch deck one-pager. Send initial outreach emails/WhatsApp messages. | Founder + Ops |
| Day 2 | Follow up on all Day 1 outreach. Schedule 5 in-person meetings for Days 3–5. Finalize onboarding checklist for restaurants. | Ops |
| Day 3 | In-person pitches to first 5 restaurants. Offer: first month at 5% commission, free Pro trial for 3 months. Sign LOIs. | Founder |
| Day 4 | Continue pitches. Sign 3–4 more restaurants. Set up restaurant portal accounts for signed partners. | Ops |
| Day 5 | Sign remaining restaurants. Begin menu entry for all 8+ restaurants. Test payment flow on staging environment. | Ops |
| Day 6 | Configure delivery zones in app (Ikeja centroid, VI centroid). Sync with Max.ng for rider availability check. Internal team places test orders. | Tech |
| Day 7 | Fix all bugs found in internal testing. Confirm restaurant opening hours in portal. Confirm rider coverage for Ikeja + VI. Launch readiness review. | Tech + Ops |

**Day 7 Targets:**
- 8 restaurants fully onboarded (menu live, portal trained)
- 10 test orders completed with zero payment failures
- Delivery time averaging under 45 minutes in test runs
- All team members have ordered and received food via the app

### Soft Launch (Days 8–14): 50 Users + Real Orders

**Goal:** 50 real customers placing real orders. Prove the full order-to-delivery loop works.

| Day | Action |
|-----|--------|
| Day 8 | Launch to internal team (20 people) + 30 carefully selected early adopters (friends, family, network). Send personal WhatsApp invites with direct download link. |
| Day 9 | First real orders expected. Monitor all orders closely. Assign dedicated ops person per order. Call restaurant and rider manually if any issue arises. |
| Day 10 | Collect feedback from first 20 customers via WhatsApp. Identify top 3 complaints. Ship fixes same day. |
| Day 11 | Open waitlist to 20 more users from referral waitlist. Begin encouraging sharing. |
| Day 12 | Review restaurant performance — which menus are popular, which items need photos. Add 2 more restaurants (total: 10). |
| Day 13 | Push notification to all 50 users: "Order again this week — N250 off your second order." Measure reorders. |
| Day 14 | End-of-week review: GMV, order count, delivery time, customer feedback. Prepare for referral program launch. |

**Day 14 Targets:**
- 50 daily active users on platform
- 50+ orders placed (target: 1 order/user/week average)
- Average order value: N3,500–N4,500
- Delivery time: ≤50 minutes (internal target is 45, giving 5-min buffer for real-world conditions)
- Zero failed payments
- Restaurant satisfaction rating: ≥4.0/5.0

### Referral Activation (Days 15–21): Viral Loop + Network Effects

**Goal:** Turn early users into acquisition channels. Each user should invite 2–3 friends.

| Day | Action |
|-----|--------|
| Day 15 | Launch referral program officially. Push notification to all 50 users: "Give N200, Get N200 — Share with friends." Generate unique referral codes for each user. |
| Day 16 | Identify top 3 referrers from Day 15. Send personal thank-you WhatsApp + N500 credit bonus. Social proof drives more referrals. |
| Day 17 | Onboard 5 new restaurants (total: 15). Focus on restaurants recommended by existing restaurant partners (warm leads). |
| Day 18 | Partner with 1–2 food-related WhatsApp groups (Lagos Foodies, VI Expats, Ikeja Professionals). Post authentic review of QuickBite experience. Don't hard sell — build trust. |
| Day 19 | Reach 100 cumulative users (50 existing + 50 new via referrals). Collect NPS score from first 30 users via short WhatsApp survey. |
| Day 20 | Instagram/TikTok content push: post "Day 1 vs Day 10" type content showing restaurant expansion. Partner with 1 micro-influencer food blogger (10K–50K followers) for honest review. |
| Day 21 | Mid-point review: which restaurants have highest repeat orders, which delivery zones are strongest. Prepare for final sprint. |

**Day 21 Targets:**
- 100 registered users
- 80+ orders placed (some users ordering twice)
- At least 2 viral loops confirmed (user invited 3+ friends who ordered)
- NPS score ≥30 (target for Month 3 is 40, starting lower is expected)
- Restaurant retention: 100% (no restaurants churned in first 14 days)

### Iteration Sprint (Days 22–30): Data Review + Rapid Improvements

**Goal:** Use real data to fix what isn't working before going wider.

| Day | Action |
|-----|--------|
| Day 22 | Analyze all data from Days 1–21. Identify: top-selling restaurants, peak ordering hours, most common drop-off points in funnel. |
| Day 23 | Fix top 3 issues from data analysis. Deploy to production. |
| Day 24 | Onboard 5 more restaurants (target: 20 total). Prioritize restaurants in underserved delivery zones to improve coverage. |
| Day 25 | Launch "Popular near you" section in app based on actual order data from first 3 weeks. |
| Day 26 | Target corporate lunch orders — contact 5 offices in VI/Ikeja offering "team lunch" group ordering. |
| Day 27 | Send personalized "We'd love your feedback" message to top 20 users. Offer N300 credit for 15-minute phone interview. |
| Day 28 | Review feedback from interviews. Identify recurring themes. |
| Day 29 | Prepare launch report: GMV, AOV, retention, NPS, delivery time, top restaurants, issues resolved. |
| Day 30 | Internal debrief. Decide: ready for public launch or need another 2-week sprint? Document learnings for Phase 2. |

**Day 30 Targets:**
- GMV: N700,000+ (50 orders/day × N3,500 avg × 4 days in this period, accounting for growth trajectory)
- Order count: 200+ cumulative orders since launch
- AOV: N4,000 (improved from N3,500 as users discover higher-value restaurants)
- 30-day retention: ≥30% (users who ordered in Week 1 and again in Week 4)
- Delivery time: ≤45 minutes average
- Restaurant retention: ≥90% (1–2 restaurants may churn, acceptable for MVP)
- App rating: ≥3.8 stars (from early user reviews)

---

## 4. Restaurant Acquisition Strategy

### Target: First 20 Restaurants in Ikeja / Victoria Island, Lagos

**Why Ikeja and VI?** These areas have:
- High population density of target personas (Tobi + Ada)
- Existing delivery infrastructure (Max.ng, Gokada coverage)
- Concentration of both local bukas and upscale restaurants
- Office complexes driving lunch demand

### Outreach Script (WhatsApp/Phone First Contact)

> **Message:** "Hi [Name], I'm [Your Name] from QuickBite — a new food delivery platform launching in [VI/Ikeja] next month. We're different from other platforms because we charge just 12% commission (vs the industry 15–30%), pay restaurants weekly, and focus on helping local restaurants grow their online orders. We'd love to have [Restaurant Name] on our launch team. Would you have 10 minutes this week for a quick call?"

**Key talking points in call:**
1. Lower commission = more money per order. Show calculation: "On a N5,000 order, you keep N4,400 with us vs ~N3,750 on other platforms."
2. Weekly payouts = better cash flow. "You won't wait 14–30 days for your money."
3. First month at 5% commission — almost free to try.
4. We bring you customers you wouldn't otherwise reach. No extra effort from your team.
5. Quick onboarding — "We set up your menu on QuickBite. You just need to accept orders."

**Script if restaurant says commission is too high:**
> "We can offer 5% for the first 3 months as a launch partner rate. After that, 12% is still below Glovo (15–20%) and Chowdeck (15%). You're not locked in — after 3 months, you can see your actual order data before deciding."

### Pitch Deck One-Pager

**Title:** "Grow Your Orders. Keep More of Your Money."

**Section 1: The Problem**
- Customers want your food but can't find you online
- Other platforms take 20–30% of every order
- You wait weeks for payment while they hold your money

**Section 2: QuickBite Solution**
- 12% commission (25–50% less than competitors)
- Weekly payouts — get paid Monday for orders from last week
- We market your restaurant to thousands of hungry customers in VI and Ikeja
- Your menu, your prices, your brand — we just bring the orders

**Section 3: The Offer for Launch Partners**
- First 3 months at 5% commission (vs your current platform's 15–25%)
- Free onboarding and menu photography
- Priority placement in our app when we launch
- Dedicated support from our team

**Section 4: What We Need From You**
- Menu items with prices and photos
- Confirm your opening hours
- Accept orders through our tablet app or phone — no extra hardware needed
- Target: 20+ orders per week from QuickBite customers

**Section 5: Social Proof** (add after first restaurants signed)
- "Join [Restaurant Name] and 15 other VI restaurants already on QuickBite"
- Logos of early partners → builds FOMO

### Incentive Structure for First 20 Restaurants

| Incentive | Details |
|-----------|---------|
| Launch commission rate | 5% for first 3 months (standard is 12%) |
| Free Pro trial | 3 months free (then N9,999/month, cancel anytime) |
| Featured placement | Homepage banner for 2 weeks upon joining |
| Zero onboarding fee | Normal setup cost is N15,000 |
| White-glove support | Dedicated WhatsApp support line for launch partners |
| Minimum commitment | None — exit anytime after 3 months |

**Estimated cost of incentives per restaurant:**
- Commission discount (5% vs 12%): ~N6,000–N10,000 per month in lost revenue per restaurant (acceptable for MVP stage as acquisition cost)
- Onboarding support: N0 (staff time)
- Total CAC per restaurant: ~N18,000–N30,000 (spread over 3-month promo period)

---

## 5. Customer Acquisition Strategy

**Zero-budget approach.** No paid ads in the first 30 days. All acquisition is organic or referral-driven.

### Channel 1: WhatsApp Groups (Primary Acquisition Tool)

WhatsApp is the dominant communication channel in Lagos. It is where deals spread, where friends share restaurant recommendations, and where office workers coordinate lunch orders.

**Target Groups:**
- Lagos Expats (Ikoyi, VI, Lekki): International community sharing food recommendations
- Ikeja Professionals: Office workers comparing lunch options
- VI Foodies: Food enthusiasts who try new restaurants first
- UNILAG/Yabacon Valley students: Price-sensitive, high frequency, late-night orders
- Estate WhatsApp groups (特定社区): Neighbors sharing vendor recommendations

**Tactics:**
1. **Organic seeding:** Share in relevant groups (not spam — contribute real value first). "Has anyone tried [Restaurant]? Just ordered through QuickBite and it arrived in 38 minutes."
2. **Group admin relationships:** DM group admins first. Offer complimentary delivery for their group as a "test." Get permission before posting.
3. **Office group ordering:** Target the Ada persona — offer to set up a "team lunch" WhatsApp thread for specific offices. One person orders for the whole team.
4. **Frequency:** 2–3 posts per group per week max. Focus on quality over quantity.

### Channel 2: Instagram / TikTok Food Content (Partnership Model)

**Strategy:** Partner with food bloggers and micro-influencers for honest content rather than paying for ads. In the MVP stage, offer free food in exchange for coverage.

**Target Creators:**
- Lagos Foodie (50K–200K followers): Restaurant reviews, "best of" content
- Nigerian Food Explorer (20K–50K): Local cuisine focus, authentic storytelling
- Student-focused accounts (UNILAG, Yaba Tech): Budget meal content

**Content Types:**
1. **"I tried QuickBite so you don't have to"** — Honest, relatable review format. Shows the process of ordering, the delivery, the unboxing.
2. **Restaurant spotlight posts:** Feature a restaurant on QuickBite's Instagram with their menu. Micro-influencer reposts to their audience. This is valuable for both the restaurant (new customers) and QuickBite (platform awareness).
3. **Behind-the-scenes:** Show the tech team building QuickBite, show restaurant partner onboarding. Builds human connection to the brand.

**Deliverables for influencer partnership (no cash, product only):**
- Free meals (N3,000–N8,000 value per post)
- Exclusive discount code for their audience (e.g., "LAUNCH15" for 15% off)
- Mention in QuickBite's own social posts as a "launch partner"

### Channel 3: Referral Program Design

**The referral mechanic:** Every user gets a unique referral code upon sign-up. When a new user uses that code on their first order, both parties receive N200 credit.

- **Referrer credit:** N200 added to wallet, usable on next order
- **Referee credit:** N200 off first order (minimum order: N2,000)
- **Credit expiry:** 30 days from issuance
- **Cap:** Maximum 10 referrals per user per month (prevents abuse)

**Why N200?** At an average order value of N4,000, N200 is a 5% discount — meaningful enough to drive action without being so generous it attracts abusers. It also roughly equals the value of one delivery fee, making it feel tangible.

**Activation timeline:**
- Days 1–7: Internal team tests the referral flow
- Days 8–14: Personal invites to 50 early adopters with referral codes pre-loaded
- Day 15: Official referral program launch with push notification + WhatsApp announcement

**Optimizing referrals:**
- Send reminder WhatsApp to users who haven't referred anyone after 5 days: "Your friends are missing out on N200 off their first order. Share your code: [CODE]"
- Celebrate top referrers publicly (with permission): "Ayoka has brought 8 friends to QuickBite this month!"

### Channel 4: Campus Outreach (UNILAG, Yabacon Valley, Others)

**Target:** University students and nearby tech workers (Yabacon Valley area). Price-sensitive, high frequency, late-night orders — all core to the Emeka persona.

**Tactics:**
1. **Campus rep program:** Recruit 1–2 students per campus to be "QuickBite Ambassadors." They get N500/month stipend + N200 per referred friend who orders. Role: organize group orders for hostels, report issues, spread word on campus.
2. **Post-exam promotions:** "Finished exams? Celebrate with free delivery on QuickBite." Target known exam periods via campus social media.
3. **WhatsApp group integration:** Set up class/group WhatsApp threads specifically for bulk orders from nearby restaurants. One person collects money, one order is placed, one delivery arrives.
4. **Flyering (low cost):** N500 for 500 flyers distributed at campus cafes and accommodation gates. QR code links directly to download/app page.

---

## 6. Metrics to Track from Day 1

### Core Business Metrics

| Metric | Definition | Week 1 Target | Week 4 Target |
|--------|------------|---------------|---------------|
| **GMV** | Gross Merchandise Value — total value of orders placed | N175,000 (50 orders × N3,500 avg) | N1,200,000 (300 orders × N4,000 avg) |
| **Order Count** | Total completed orders | 50 orders | 300 orders |
| **Average Order Value (AOV)** | GMV ÷ Order Count | N3,500 | N4,000 |
| **Daily Active Orders** | Orders per day averaged across week | 7 orders/day | 43 orders/day |
| **Revenue (Gross)** | Commission (12%) + delivery fees collected | N26,250 (commission) + N12,500 (delivery) = N38,750 | N180,000 (commission) + N90,000 (delivery) = N270,000 |
| **Revenue (Net)** | Gross revenue minus payment processing (2%) and rider fees | ~N20,000 | ~N150,000 |

### Operations Metrics

| Metric | Definition | Week 1 Target | Week 4 Target |
|--------|------------|---------------|---------------|
| **Average Delivery Time** | Time from order placed to delivered | ≤55 minutes | ≤45 minutes |
| **Rider Utilization** | Deliveries per rider per shift | ≥1.5 deliveries/shift | ≥2.5 deliveries/shift |
| **Order Accuracy Rate** | Orders delivered with correct items and quantity | ≥90% | ≥95% |
| **First-Order Fulfillment Rate** | Orders not cancelled after payment | ≥95% | ≥98% |
| **Restaurant Response Time** | Time for restaurant to accept/decline an order | ≤2 minutes | ≤1.5 minutes |
| **Payout Accuracy** | Percentage of payouts processed correctly and on time | 100% | 100% |

### Restaurant Partner Metrics

| Metric | Definition | Week 1 Target | Week 4 Target |
|--------|------------|---------------|---------------|
| **Active Restaurant Partners** | Restaurants with at least 1 order in period | 8 | 20 |
| **Restaurant Retention Rate** | Restaurants who remain active month-over-month | 100% | ≥90% |
| **Average Orders per Restaurant** | Total orders ÷ active restaurants | 6.25 | 15 |
| **Restaurant NPS** | Restaurant satisfaction score (survey) | ≥35 | ≥40 |

### Customer Metrics

| Metric | Definition | Week 1 Target | Week 4 Target |
|--------|------------|---------------|---------------|
| **Registered Users** | Users who signed up on the platform | 50 | 200 |
| **Monthly Active Users (MAU)** | Users who placed at least 1 order | 50 | 120 |
| **Customer Retention (30-day)** | Users who ordered in Week 1 and ordered again in Week 4 | N/A (first cohort) | ≥30% |
| **Repeat Order Rate** | Orders from returning customers ÷ total orders | N/A | ≥20% |
| **NPS Score** | Net Promoter Score from in-app survey | ≥20 | ≥30 |
| **App Store Rating** | Average rating on Google Play / App Store | ≥3.5 | ≥3.8 |
| **Push Notification Open Rate** | Percentage of notifications opened | ≥50% | ≥60% |

### How to Track

| Tool | Metrics Tracked |
|------|----------------|
| **Supabase Analytics** | GMV, orders, AOV, user signups, retention |
| **Flutterwave Dashboard** | Payment success rate, refund rate, settlement tracking |
| **Google Analytics (web app)** | Web traffic, conversion rates |
| **PostHog (self-hosted)** | Funnel analysis, user behavior, NPS |
| **WhatsApp Survey (manual)** | Restaurant NPS, customer satisfaction |
| **Spreadsheet tracker** | Daily log of all metrics, updated every morning |

---

## 7. Cost Structure (MVP)

### Fixed Costs (Monthly)

| Item | Provider | Cost | Notes |
|------|----------|------|-------|
| Backend/Database | Supabase | $0–$25/mo | Free tier until 50K users, then $25/mo for Pro |
| Web App Hosting | Netlify | $0 | Free tier for static/SSR |
| Consumer App (React Native) | Expo | $0 | Free tier |
| Payment Gateway | Flutterwave | N0 | Transaction fees only, no monthly fee. Test mode = N0 |
| SMS / OTP | Termii | N0 | Free tier for MVP (up to 100 SMS/mo) |
| Analytics | PostHog (self-hosted) | N0 | Free open-source tier |
| Error Monitoring | Sentry | $0 | Free tier for < 5K events/mo |
| Maps | Google Maps API | $0 | $200/month credit for startups; within free tier for MVP |
| **Total Fixed Cost** | | **~$0–$25/mo** | Primarily Supabase when we exceed free tier |

### Variable Costs (Per Order)

| Item | Cost | Notes |
|------|------|-------|
| Payment processing | 1.5–3% of order subtotal | Flutterwave rate; deducted from our commission revenue |
| Delivery rider fee | N150–250/delivery | Based on distance zone; passed through from delivery fee |
| Customer support | N0–50/order | WhatsApp-based support for MVP; minimal human time |
| **Total Variable Cost per Order** | **~N150–350** | Payment processing (2% × N4,000 = N80) + rider fee (N150–250) |

### Break-Even Calculation

**Assumptions:**
- Average order value: N4,000
- Commission rate: 12% → Gross commission per order: N480
- Delivery fee collected: N350 (average)
- Rider fee paid out: N200 (average)
- Payment processing (2% on N4,000): N80

**Per Order Economics:**

| Revenue Component | Amount |
|-------------------|--------|
| Commission earned (12% × N4,000) | N480 |
| Delivery fee collected | N350 |
| **Gross Revenue** | N830 |
| Payment processing | -N80 |
| Rider fee | -N200 |
| **Net Revenue per Order** | **N550** |

**Monthly Fixed Costs:** N0 (MVP stage, Supabase free tier)

**Break-Even Point:**
- Net revenue per order: N550
- Monthly fixed costs: N0
- **Break-even: 0 orders** (we are already profitable per order at MVP stage!)

**Reality Check:**
- Payment processing is deducted from the N480 commission — so actually:
  - Commission net of processing: N480 - N80 = N400
  - Delivery fee net of rider cost: N350 - N200 = N150
  - **Total net per order: N550**
- At 0 fixed costs, we are immediately contribution-margin positive.
- However, in months 1–3 with 5% commission promo, commission is N200/order (5% × N4,000):
  - Commission net of processing: N200 - N80 = N120
  - Delivery net: N150
  - **Total net per order during promo: N270**
- At Month 3 target of 300 orders/month: N270 × 300 = N81,000 net contribution (before any operational overhead)
- **True break-even including operational costs (ops team, tech maintenance) requires ~500 orders/month**, which aligns with the Phase 2 target of Month 4–5.

**Cost Milestones:**
| Orders/Month | Net Revenue (12% commission) | Operational Costs | Status |
|-------------|------------------------------|-------------------|--------|
| 50 | N27,500 | N0 | Profitable per order, but no ops coverage |
| 200 | N110,000 | ~N80,000 (part-time ops) | Break-even on cash |
| 500 | N275,000 | ~N150,000 (full ops) | Profitable |
| 1,000 | N550,000 | ~N250,000 (scaled ops) | Sustainable |

---

## 8. QuickBite Pro — Premium Tier

### Tier Architecture

QuickBite Pro is the upsell to restaurant partners who see measurable value from the platform. It combines a lower commission rate with visibility features and analytics that help restaurants grow.

| Feature | Free | Standard | Pro (N9,999/month) |
|---------|------|----------|-------------------|
| Commission rate | 12% | 12% | 10% |
| Priority placement in search results | No | No | Yes (top 3 positions) |
| "Pro" badge on restaurant profile | No | No | Yes |
| Featured homepage banner | No | No | 1 week per month |
| Promoted in category listings | No | No | Yes (top spot) |
| Analytics dashboard | Basic (today's orders, revenue) | Full (weekly trends, top items, peak hours) | Full + AI-powered insights |
| Dedicated account manager | No | No | Yes (WhatsApp direct line) |
| Priority support (response time) | 24 hours | 12 hours | 2 hours |
| Free platform features | Yes | Yes | Yes |
| Monthly fee | N0 | N0 | N9,999 |

### The Math: Is Pro Worth It for a Restaurant?

At Pro tier, commission is 10% vs 12% on Standard. The N9,999 monthly fee translates to:
- **Commission savings:** 2% of monthly GMV
- **Break-even GMV:** N9,999 / 2% = **N499,950/month in orders**

A restaurant doing N500,000/month in QuickBite orders would:
- Save N10,000 in commission fees (2% × N500,000)
- Pay N9,999 for Pro
- **Net benefit: ~N1/month — essentially free upgrade**

For a restaurant doing **N750,000/month**, the savings are N15,000 - N9,999 = **N5,001 net monthly benefit**.

**Therefore, Pro is attractive to any restaurant doing N500K+ monthly on QuickBite.**

### Upsell Path

| Stage | Customer Journey | Pro Upsell Moment |
|-------|-----------------|-------------------|
| **Onboarding (Day 1)** | Restaurant joins at 5% promo rate | Mention Pro as "what happens after your promo ends" |
| **Month 3 (Promo ends)** | Restaurant moves to 12% standard | Show their GMV data; "You did N400K last month — Pro would save you N8K" |
| **Month 4–5** | Restaurant is regular user, sees value | Offer free 1-week Pro trial to let them feel the benefit |
| **Month 6+** | Pro is presented as growth tool | "Pro restaurants get 3x more orders from visibility features" |

### Target: 20% of Active Restaurants on Pro by Month 9

- Start with 3–5 Pro restaurants as case studies (select highest-volume partners)
- Build case study content: "How [Restaurant X] grew from N200K to N600K/month with QuickBite Pro"
- Pro become ambassadors for the tier, referring other restaurants

---

## 9. Growth Levers for Month 3–6

### Growth Lever 1: Corporate Catering Accounts (Month 3–4)

**Opportunity:** Lagos office complexes (Eko Atlantic, VI CBD, Ikeja GRA) have thousands of office workers who order lunch daily. Corporate accounts provide predictable, high-volume orders.

**Approach:**
1. Identify 10 office complexes within delivery zone
2. Contact facility managers / HR departments
3. Offer: "QuickBite for Teams" — group ordering with one invoice at end of month
4. Value prop: No individual payment friction, consolidated reporting, dedicated account manager
5. Pricing: Standard commission + N500/month corporate account fee
6. Target: 5 corporate accounts by Month 4, each ordering 5+ times/week

**Corporate Account Features:**
- Monthly invoicing (net-15 payment terms)
- Designated menu for corporate (set menus for team lunch, away-from-desk meals)
- Bulk order discount: 5% off orders above N50,000
- Priority delivery SLA: 35 minutes max for corporate orders

### Growth Lever 2: Geographic Expansion — Lekki / Ajah (Month 4–5)

**Why:** Lekki and Ajah are rapidly growing residential areas with high-income residents (Tobi persona) but currently underserved by food delivery platforms. Expansion requires:
- Onboard 15+ new restaurants in Lekki/Ajah
- Confirm Max.ng rider coverage in these areas
- Extend delivery zones in app

**Expansion checklist:**
1. Identify restaurant density in target area (minimum: 10 restaurants within 5km radius)
2. Run outreach campaign (2 weeks before launch)
3. Launch with "Lekki Launch Promo" — free delivery for first 2 weeks
4. Target: 30% of total orders from new zones by Month 6

### Growth Lever 3: Scheduled Orders — Weekly Meal Prep Subscriptions (Month 4–5)

**Opportunity:** Target busy professionals who want consistent meal planning. Partner with 3–5 meal prep restaurants to offer subscription boxes.

**Model:**
- "QuickBite Meal Plan" — users subscribe to a weekly menu (e.g., "Healthy Nigerian Meals, 5 days/week")
- Subscription: N18,000–N25,000/month
- Delivery: 3 scheduled deliveries per week (Mon, Wed, Fri mornings)
- Commission: 15% on subscription orders (higher due to predictability)

**MVP for this feature:** Partner with 1 meal prep restaurant. Offer "Weekly Jollof Plan" — same dish every Tuesday, delivered. Measure interest before building out.

### Growth Lever 4: "Party Jollof" Bulk Ordering for Events (Month 5–6)

**Opportunity:** Nigeria's event culture (birthdays, owambe, corporate events) generates massive food demand. A bulk ordering feature targets this.

**Model:**
- "QuickBite Events" — bulk order from single restaurant for 20–200 people
- Minimum order: N50,000
- Service fee: 10% of order value
- Includes: dedicated coordinator, guaranteed delivery 1 hour before event start
- Promoted during festive seasons (December, Easter, Sallah)

**Execution:**
1. Partner with 5 restaurants known for party Jollof (popular with large groups)
2. Create "Event Menu" landing page
3. Outreach to event planners, university student unions, corporate HR
4. Target: 5+ event orders in first month, average order value N80,000+

---

## Appendix: 30-Day Critical Path Checklist

### Week 1 (Foundation)
- [ ] Finalize 8 restaurant partners signed
- [ ] All restaurant menus entered in portal
- [ ] Payment flow tested 10+ times on staging
- [ ] Rider coverage confirmed with Max.ng for VI and Ikeja
- [ ] Delivery zone boundaries set in app
- [ ] Push notifications tested (Firebase)

### Week 2 (Soft Launch)
- [ ] 50 users onboarded with real orders
- [ ] Every order manually monitored for issues
- [ ] Feedback collected via WhatsApp
- [ ] 2+ bugs fixed and deployed
- [ ] Restaurant ratings visible on app

### Week 3 (Referral Launch)
- [ ] Referral codes live for all users
- [ ] WhatsApp group seeding begins (3+ groups)
- [ ] 1 micro-influencer partnership active
- [ ] 100 registered users milestone
- [ ] NPS survey sent to first 30 users

### Week 4 (Iteration + Evaluation)
- [ ] Data review: GMV, AOV, retention, NPS
- [ ] Top 3 issues identified and fixed
- [ ] 20 restaurants active (target: 20)
- [ ] Ready/not-ready decision for public launch
- [ ] Month 2 plan finalized

---

*Document prepared for QuickBite internal strategic planning*
*Next review: June 28, 2026 (30-day post-launch)*