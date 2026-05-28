# QuickBite Launch Checklist

Comprehensive checklist for launching QuickBite MVP in Lagos, Nigeria.

---

## Pre-Launch Checklist (1-2 Weeks Before Go-Live)

### Infrastructure & Deployment

- [ ] **Netlify deployment configured**
  - [ ] `netlify.toml` created and verified
  - [ ] `.github/workflows/deploy.yml` created and working
  - [ ] Auto-deploy on push to main branch tested
  - [ ] Custom domain configured (optional)
  - [ ] SSL certificate active

- [ ] **GitHub repository configured**
  - [ ] Repository exists at https://github.com/sonnyagent30-beep/quickbite
  - [ ] GitHub Actions secrets configured:
    - `NETLIFY_AUTH_TOKEN`
    - `NETLIFY_SITE_ID`
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`
    - `FLUTTERWAVE_SECRET_KEY`
    - `NEXT_PUBLIC_BASE_URL`

### Supabase Setup

- [ ] **Supabase project created and configured**
  - [ ] Database migration run successfully
  - [ ] All tables created (users, restaurants, menu_items, orders, etc.)
  - [ ] Row Level Security (RLS) policies verified
  - [ ] Authentication configured (phone OTP or WhatsApp)
  - [ ] Storage bucket created for menu images

### Flutterwave Setup

- [ ] **Flutterwave account configured**
  - [ ] API keys obtained (public, secret, encryption)
  - [ ] Webhook URL configured (`/api/webhooks/flutterwave`)
  - [ ] Payment methods enabled (Card, USSD, Transfer, Wallets)
  - [ ] Test mode verified working

### Code Quality

- [ ] **All environment variables set**
  - [ ] `.env.local` exists with all required keys
  - [ ] Environment variables documented

- [ ] **Build verified**
  - [ ] `npm run build` completes without errors
  - [ ] No TypeScript errors
  - [ ] No console errors in production build

- [ ] **Testing complete**
  - [ ] Core user flows tested (browse, cart, checkout, payment)
  - [ ] Restaurant portal tested (menu management, order handling)
  - [ ] Admin functions tested (onboarding, dispatch)

---

## Day 1 Checklist (Launch Day)

### Morning Tasks

- [ ] **Final deployment**
  - [ ] Deploy to production Netlify site
  - [ ] Verify site is live at https://dulcet-panda-80d15a.netlify.app
  - [ ] Check all routes are working

- [ ] **Database verification**
  - [ ] Can create a test user
  - [ ] Can add a test restaurant (via restaurant portal)
  - [ ] Can add menu items

- [ ] **Payment verification**
  - [ ] Test payment flow works end-to-end
  - [ ] Webhook receives payment confirmation
  - [ ] Order status updates correctly

### Monitoring Setup

- [ ] **Netlify dashboard checked**
  - [ ] Deploys showing success
  - [ ] No errors in deployment logs

- [ ] **Error monitoring active**
  - [ ] Sentry or similar error tracking configured
  - [ ] Can receive error notifications

### Stakeholder Notification

- [ ] **Team notified**
  - [ ] Internal team aware of launch
  - [ ] Support contacts ready
  - [ ] Escalation path established

---

## Week 1 Checklist (Days 1-7 Post-Launch)

### Operations Monitoring

- [ ] **Order flow monitored**
  - [ ] Orders are being created successfully
  - [ ] Payments processing correctly
  - [ ] Restaurant orders appear in restaurant portal
  - [ ] Order status transitions work

- [ ] **Error monitoring**
  - [ ] Check Netlify function logs daily
  - [ ] Monitor Supabase query performance
  - [ ] Check for any RLS policy failures

### User Testing (Internal)

- [ ] **Internal team testing**
  - [ ] Complete 5 full order flows as different user types
  - [ ] Test as restaurant owner
  - [ ] Test as rider (manual dispatch)
  - [ ] Test edge cases (empty cart, payment failure, etc.)

### Bug Fixes

- [ ] **Issues tracked and resolved**
  - [ ] Any critical bugs fixed within 24 hours
  - [ ] Non-critical bugs tracked for Week 2

---

## Week 1 Metrics to Track

### Business Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Orders completed | Track daily | Supabase `orders` table count |
| Gross Merchandise Value (GMV) | N/A yet | Sum of `total` column in orders |
| Average Order Value (AOV) | N3,500 target | GMV / Orders |
| New user registrations | Track daily | Supabase `users` table |
| Active restaurants | Count | Supabase `restaurants` table |

### Technical Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Deployment success rate | 100% | GitHub Actions history |
| Page load time | < 3s | Netlify analytics |
| API response time | < 500ms | Supabase dashboard |
| Payment success rate | > 90% | Orders with `payment_status = 'paid'` |
| Error rate | < 1% | Netlify function errors |

### User Behavior Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Cart abandonment rate | Track | Created carts vs completed orders |
| Checkout completion rate | > 50% | Orders / cart sessions |
| Push notification open rate | > 50% | Firebase/analytics |

---

## Launch Critical Contacts

| Role | Name | Contact | Responsibility |
|------|------|---------|----------------|
| Tech Lead | TBD | TBD | Infrastructure, deployments |
| Backend | TBD | TBD | Supabase, API issues |
| Payments | TBD | TBD | Flutterwave integration |
| Operations | TBD | TBD | Restaurant onboarding, rider dispatch |

---

## Post-Launch Issues & Escalation

### If Payment Fails

1. Check Flutterwave dashboard for transaction status
2. Verify webhook is being received
3. Check Netlify function logs for errors
4. Escalate to payments contact if unresolved after 1 hour

### If Site is Down

1. Check Netlify deployment status
2. Verify GitHub Actions hasn't broken the build
3. Check Supabase is not paused (free tier issue)
4. Rollback to previous working deployment if needed

### If Database Issues

1. Check Supabase dashboard for database status
2. Verify RLS policies haven't blocked legitimate requests
3. Check for query performance issues

---

## Rollback Plan

If major issues occur:

1. **Revert to previous deployment**:
   ```bash
   # In Netlify dashboard
   # Deploys → select previous successful deploy → Deploy
   ```

2. **Disable payments**:
   - Set `FLUTTERWAVE_TEST_MODE=true` to disable real payments
   - Or temporarily remove payment step from checkout

3. **Put site in maintenance mode**:
   - Add redirect for all routes to `/maintenance` page

---

## Additional Resources

- Netlify Dashboard: https://app.netlify.com
- Supabase Dashboard: https://supabase.com/dashboard
- Flutterwave Dashboard: https://dashboard.flutterwave.com
- GitHub Repository: https://github.com/sonnyagent30-beep/quickbite

---

*Last updated: May 2026*