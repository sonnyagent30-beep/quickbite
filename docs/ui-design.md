# QuickBite — Complete UI/UX Design Specification

**Version:** 1.0  
**Date:** May 28, 2026  
**Status:** Ready for Development  
**Author:** QuickBite Product Team

---

## Table of Contents

1. [Brand Guide](#1-brand-guide)
2. [Consumer App Screens](#2-consumer-app-screens)
3. [Restaurant Partner Portal](#3-restaurant-partner-portal)
4. [Admin Panel](#4-admin-panel)
5. [Component Library](#5-component-library)

---

## 1. Brand Guide

### 1.1 Brand Overview

**Brand Name:** QuickBite  
**Tagline:** "Your local food, delivered fast"  
**Brand Personality:** Warm, trustworthy, vibrant, distinctly Nigerian — not a foreign clone.  
**Brand Voice:** Friendly, clear, confident, never robotic.

### 1.2 Color Palette

#### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Burnt Orange** | `#E85D04` | Primary CTA buttons, brand accents, active states, icons |
| **Deep Orange** | `#D45103` | Button hover states, pressed states |
| **Dark Ember** | `#9D3C02` | Button disabled states, deep accents |

#### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Forest Green** | `#2D6A4F` | Success states, verified badges, positive metrics, delivery status |
| **Light Sage** | `#40916C` | Secondary success, progress bars, tags |
| **Dark Forest** | `#1B4332` | Dark mode accents, footer backgrounds |

#### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Nigerian Gold** | `#FFB703` | Star ratings, highlights, featured badges, premium indicators |
| **Light Gold** | `#FFD166` | Rating stars (filled), notifications |
| **Pale Gold** | `#FFF3CD` | Rating background, callout backgrounds |

#### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Charcoal Black** | `#1A1A1A` | Primary text, headings |
| **Dark Gray** | `#333333` | Body text |
| **Medium Gray** | `#666666` | Secondary text, captions |
| **Light Gray** | `#CCCCCC` | Borders, dividers |
| **Pale Gray** | `#F5F5F5` | Card backgrounds, input backgrounds |
| **Pure White** | `#FFFFFF` | Page backgrounds, button text on dark |

#### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Error Red** | `#DC3545` | Error states, declined orders, failed payments |
| **Warning Amber** | `#FD7E14` | Warnings, order delays, out-of-stock |
| **Info Blue** | `#0D6EFD` | Informational alerts, links |
| **Success Green** | `#198754` | Success messages, delivered status |

#### Background Colors (App Theme)

| Name | Hex | Usage |
|------|-----|-------|
| **App Background** | `#FEFEFE` | Main page background |
| **Card Background** | `#FFFFFF` | Cards, modals, sheets |
| **Surface Gray** | `#F8F9FA` | Section backgrounds, input fields |
| **Overlay** | `rgba(0,0,0,0.5)` | Modal overlays, bottom sheets scrim |

### 1.3 Typography

#### Font Families (Google Fonts)

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings** | Poppins | 600 (SemiBold), 700 (Bold) | Screen titles, section headers, card titles, brand name |
| **Body / UI** | Inter | 400 (Regular), 500 (Medium), 600 (SemiBold) | Body text, buttons, labels, captions, inputs |
| **Monospace** | JetBrains Mono | 400 | Order IDs, transaction IDs, prices in tables |

#### Type Scale

| Name | Size | Line Height | Font | Weight | Usage |
|------|------|-------------|------|--------|-------|
| Display | 32px | 40px (1.25) | Poppins | 700 | Hero headlines, onboarding title |
| H1 | 28px | 36px (1.286) | Poppins | 700 | Screen titles |
| H2 | 24px | 32px (1.333) | Poppins | 600 | Section headers |
| H3 | 20px | 28px (1.4) | Poppins | 600 | Card titles,subsection headers |
| H4 | 18px | 24px (1.333) | Poppins | 600 | Small section headers, prominent labels |
| Body Large | 16px | 24px (1.5) | Inter | 400 | Primary body text, menu item descriptions |
| Body | 14px | 20px (1.429) | Inter | 400 | Secondary body text, form labels |
| Body Small | 13px | 18px (1.384) | Inter | 400 | Captions, metadata, timestamps |
| Caption | 12px | 16px (1.333) | Inter | 400 | Helper text, placeholders, legal |
| Button | 16px | 24px (1.5) | Inter | 600 | Button text (capitalized) |
| Tab Label | 12px | 16px (1.333) | Inter | 500 | Bottom nav labels, tab bar |
| Badge | 11px | 14px (1.273) | Inter | 600 | Status badges, count badges (uppercase) |

#### Letter Spacing

| Style | Value | Usage |
|-------|-------|-------|
| Headings | -0.02em | All heading text |
| Body | 0em | Default body text |
| Buttons | 0.04em | CTA button text (uppercase) |
| Caps | 0.08em | Badge text, status labels |

#### Text Overflow

- Single line: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
- Multi-line: `overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;`

### 1.4 Spacing System

#### Base Unit

**Base unit = 4px.** All spacing values are multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight internal spacing (icon to label) |
| `space-2` | 8px | Internal padding (button internal, list item gaps) |
| `space-3` | 12px | Small component padding |
| `space-4` | 16px | Standard padding, margins |
| `space-5` | 20px | Medium padding |
| `space-6` | 24px | Large padding, section gaps |
| `space-8` | 32px | Section separators |
| `space-10` | 40px | Large section gaps |
| `space-12` | 48px | Screen header padding |
| `space-16` | 64px | Major section breaks |
| `space-20` | 80px | Onboarding page bottom padding |

#### Layout Spacing

| Context | Value |
|---------|-------|
| Screen horizontal padding | 16px (space-4) |
| Card internal padding | 16px (space-4) |
| Card gap (grid) | 12px (space-3) |
| Section gap (vertical) | 24px (space-6) |
| List item vertical padding | 12px (space-3) |
| Bottom nav height | 64px + safe area |
| Header height | 56px |
| Tab bar icon size | 24px |
| Bottom sheet handle width | 40px |
| Bottom sheet handle height | 4px |

#### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Small tags, badges, chips |
| `radius-md` | 12px | Cards, inputs, buttons |
| `radius-lg` | 16px | Bottom sheets, modals |
| `radius-xl` | 24px | Large modals, feature cards |
| `radius-full` | 9999px | Avatars, FAB, pills |

### 1.5 Elevation / Shadow System

| Level | Shadow | Usage |
|-------|--------|-------|
| Elevation 1 | `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)` | Cards at rest, input fields |
| Elevation 2 | `0 4px 6px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)` | Raised cards, bottom nav |
| Elevation 3 | `0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)` | Bottom sheets, modals |
| Elevation 4 | `0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)` | Full-screen modals, dialogs |

### 1.6 Grid System

#### Consumer App Grid

- **Mobile-first:** 375px base width (iPhone SE / average Android)
- **Max content width:** 428px (large phones)
- **Columns:** 4-column grid for layouts, 2-column for restaurant/food cards
- **Gutter:** 12px between columns

#### Restaurant Portal Grid (Web)

- **Breakpoints:** 768px (tablet), 1024px (desktop), 1440px (wide)
- **Columns:** 12-column grid
- **Gutter:** 24px
- **Max width:** 1280px centered

#### Admin Panel Grid (Web)

- **Breakpoints:** 1024px, 1440px, 1920px
- **Sidebar:** 260px fixed
- **Content area:** Fluid, max 1200px

### 1.7 Icon System

**Icon Library:** Lucide Icons (open source, consistent 24px stroke icons)  
**Secondary:** Heroicons for specific branded moments

| Icon Size | Usage |
|-----------|-------|
| 16px | Inline with text, badges |
| 20px | List item leading icon, small actions |
| 24px | Navigation icons, primary actions |
| 32px | Empty state illustrations, large CTA icons |
| 48px | Onboarding illustrations |

**Icon Style:** 2px stroke weight, rounded caps and joins, 24x24 viewbox.

### 1.8 Motion & Animation Guidelines

#### Animation Principles

1. **Purposeful:** Every animation communicates state change, not decoration
2. **Fast:** Animations should enhance perceived performance, not delay it
3. **Natural:** Use ease-out curves for entrances, ease-in for exits
4. **Consistent:** Same interaction always produces same animation

#### Animation Specifications

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Microinteraction (tap feedback) | 100ms | ease-out | Button press, toggle |
| State change (loading spinner) | 800ms | linear | Loaders, refresh |
| Element enter (slide up) | 300ms | cubic-bezier(0.4, 0, 0.2, 1) | Bottom sheets, modals |
| Element exit (slide down) | 250ms | cubic-bezier(0.4, 0, 0.2, 1) | Bottom sheets close |
| Page transition (fade + slide) | 350ms | cubic-bezier(0.4, 0, 0.2, 1) | Navigation between screens |
| Skeleton shimmer | 1500ms | ease-in-out (loop) | Loading skeletons |
| Rating star fill | 200ms | ease-out | Star rating tap |
| Map marker bounce | 400ms | spring | New rider location |
| Toast enter | 300ms | ease-out (from top) | Notifications |
| Toast exit | 200ms | ease-in | Notifications auto-dismiss |

#### Easing Reference

```
ease-out:           cubic-bezier(0.0, 0.0, 0.2, 1)
ease-in:            cubic-bezier(0.4, 0.0, 1, 1)
ease-in-out:        cubic-bezier(0.4, 0.0, 0.2, 1)
sharp:              cubic-bezier(0.4, 0.0, 0.6, 1)
spring (bounce):    cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

#### Specific Animation Examples

**Bottom Sheet:**
- Enter: translateY(100%) → translateY(0), 300ms, ease-out
- Exit: translateY(0) → translateY(100%), 250ms, ease-in
- Scrim: opacity 0 → 0.5, 300ms

**Button Press:**
- Scale: 1.0 → 0.96 → 1.0, 100ms
- Background darkens by 10%

**Page Transition (Push):**
- Outgoing page: translateX(0) → translateX(-30%), 250ms, ease-in
- Incoming page: translateX(30%) → translateX(0), 350ms, ease-out

**Skeleton Loading:**
- Gradient shimmer moves left to right
- Colors: `#F0F0F0` → `#E0E0E0` → `#F0F0F0`
- 1.5s per cycle, infinite

**Pull to Refresh:**
- Threshold: 80px pull distance
- Spinner appears at threshold
- Haptic feedback at threshold

**Cart Badge Bounce:**
- On item add: scale 1 → 1.3 → 1, 200ms, spring
- Number increment: count rolls like a digit display

### 1.9 Visual Assets

#### Logo

- **Primary Logo:** "QuickBite" in Poppins Bold + Fork & Knife icon
- **Icon-only:** Orange circle with white "qb" letters (32x32px for favicon)
- **Clear space:** 8px minimum around logo on all sides
- **Minimum size:** 80px width for full logo, 24px for icon

#### Illustrations

- **Style:** Flat design with warm tones, minimal detail, expressive characters
- **Usage:** Onboarding screens, empty states, error states, success confirmations
- **Color integration:** Use brand palette colors within illustrations

#### Food Photography Style

- **Composition:** 4:3 aspect ratio, food centered, slight overhead or 45-degree angle
- **Lighting:** Natural, warm, slightly underexposed background to make food pop
- **Mood:** Appetizing, authentic, not stock-photo generic
- **Branding:** QuickBite watermark in corner (subtle, 20% opacity)

### 1.10 Responsive Behavior

| Screen Width | Behavior |
|-------------|----------|
| 320–375px | 1-column layouts, tighter padding (12px) |
| 375–428px | Default design baseline |
| 428px+ | Cards may expand to fill, horizontal scroll for categories |
| Tablet (768px+) | 2-column restaurant grid, side padding increases to 24px |
| Desktop (1024px+) | Restaurant portal and admin panel layouts |

---

## 2. Consumer App Screens

### 2.1 App Shell

#### Global Elements (All Screens)

**Status Bar:**
- Background: white (#FFFFFF) or transparent with dark icons
- Height: system-defined (44px iPhone, varies Android)

**App Bar (56px height):**
- Background: white
- Left: Back button (chevron-left) or menu icon
- Center: Screen title (Poppins 600 18px) or logo
- Right: Action icons (search, notification, profile avatar)
- Bottom border: 1px #E5E5E5

**Bottom Navigation (64px + safe area):**
- Background: white
- 4 tabs: Home, Search, Orders, Profile
- Active state: Burnt Orange icon + label; inactive: Medium Gray
- Center FAB (optional): Cart icon with badge count

**Safe Area:**
- iPhone X+ notch: top 44px, bottom 34px
- Android: handle with `SafeArea` widget

---

### 2.2 Screen 1: Splash Screen

#### Purpose
App launch branding moment; establish visual identity before transitioning to onboarding or home.

#### Layout

```
┌──────────────────────────┐
│                          │
│      [Logo + Tagline]    │  ← Centered vertically
│                          │
│      Loading indicator   │
│                          │
└──────────────────────────┘
```

#### Key Elements

| Element | Specification |
|---------|---------------|
| Logo | "QuickBite" wordmark + fork icon, burnt orange |
| Tagline | "Your local food, delivered fast" — Inter 400 14px, medium gray, below logo |
| Loading | Custom animated fork/spoon icon, rotates 360° over 1.5s, infinite |
| Background | Pure white (#FFFFFF) |

#### States

| State | Behavior |
|-------|----------|
| Loading | Logo fades in over 500ms, spinner starts at 300ms |
| Error (network fail) | After 5s timeout, show "Check your connection" text below spinner, tap to retry |

#### Transition
After 2s total, fade to next screen (Onboarding or Home) over 400ms.

---

### 2.3 Screen 2: Onboarding (3 Pages)

#### Purpose
Introduce QuickBite's value proposition to new users. Swipeable carousel.

#### Layout Structure

```
┌──────────────────────────┐
│  [Skip]            [1 2 3]│  ← Top bar
│                          │
│                          │
│     [Illustration]       │  ← 60% of screen height
│                          │
│   [Headline - 28px]      │  ← Poppins 700, centered
│                          │
│   [Body - 16px]          │  ← Inter 400, medium gray, centered
│                          │
│   [Get Started CTA]      │  ← Primary button, bottom
│                          │
│   [Sign In instead]      │  ← Text link below
└──────────────────────────┘
```

#### Onboarding Page 1: "Food from your favorite local spots"

| Element | Content |
|---------|--------|
| Illustration | 3 diverse Nigerian dishes (Jollof, Egusi, Fried Rice) with delivery rider |
| Headline | "Food from your favorite local spots" |
| Body | "Discover authentic Nigerian cuisine from bukas and kitchens in your neighborhood." |

#### Onboarding Page 2: "Track your order in real time"

| Element | Content |
|---------|--------|
| Illustration | Phone mockup showing live map with rider moving toward destination |
| Headline | "Track your order in real time" |
| Body | "Know exactly when your food arrives with live driver tracking." |

#### Onboarding Page 3: "Pay your way"

| Element | Content |
|---------|--------|
| Illustration | Phone mockup showing payment options (card, USSD, Opay, Moniepoint) |
| Headline | "Pay your way" |
| Body | "Card, USSD, or mobile money — however you prefer to pay." |

#### Page Indicators

- 3 dots, 8px diameter, spaced 12px
- Inactive: Light Gray (#CCCCCC)
- Active: Burnt Orange (#E85D04)
- Transition: scale 1.0 → 1.2 over 200ms on activation

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Swipe left/right | Animate to next page, 400ms ease-out |
| Tap "Skip" | Skip to last page |
| Tap dot indicator | Jump to that page |
| Tap "Get Started" (last page) | Navigate to Phone Login screen |
| Tap "Sign in instead" | Navigate to Login screen |

#### States

| State | Behavior |
|-------|----------|
| Default | Page 1 shown, dot 1 active |
| Swiping | Previous page slides out, next slides in simultaneously |
| Last page | "Get Started" button is full-width orange; skip hidden |
| Animation | Page transition: outgoing slides left, incoming slides from right |

---

### 2.4 Screen 3: Phone Login

#### Purpose
Authenticate user via phone number + OTP. Primary auth method for Nigerian users.

#### Layout

```
┌──────────────────────────┐
│ [← Back]                 │
│                          │
│   Welcome to QuickBite   │  ← H1, Poppins 700, centered
│                          │
│   Enter your phone       │  ← Body, Inter 400, centered
│   number to continue     │
│                          │
│  ┌────────────────────┐  │
│  │ 🇳🇬 +234  │ [input] │  │  ← Country code locked, input right
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │    Send Code        │  │  ← Primary CTA, disabled until 10 digits
│  └────────────────────┘  │
│                          │
│  By continuing, you      │
│  agree to our Terms and  │
│  Privacy Policy          │  ← Caption, centered
└──────────────────────────┘
```

#### Key Elements

| Element | Specification |
|---------|---------------|
| Back button | Chevron icon, top-left |
| Headline | "Welcome to QuickBite" — Poppins 700 24px |
| Subtext | "Enter your phone number to continue" — Inter 400 16px, #666666 |
| Phone input | Country code "+234" prefix locked, 10-digit input, numeric keyboard |
| Input border | 1.5px solid #CCCCCC, radius 12px, 56px height |
| Input focus state | Border changes to Burnt Orange (#E85D04), 2px |
| CTA button | Full-width, 56px height, radius 12px, Poppins 600 16px |
| CTA disabled state | Background #CCCCCC, text #888888, not clickable |
| Legal text | "By continuing, you agree to our Terms and Privacy Policy" — 12px, #999999 |

#### Input States

| State | Visual |
|-------|--------|
| Empty | Placeholder "812 345 6789", border #CCCCCC |
| Typing | Text entered, border #E85D04 |
| Filled | Valid 10-digit, CTA enabled |
| Invalid | Border #DC3545, helper text "Enter a valid phone number" |
| Error | Shake animation (translateX ±4px, 3 cycles, 300ms), red helper text |

#### OTP Screen (Second Step)

```
┌──────────────────────────┐
│ [← Back]                 │
│                          │
│   Enter verification     │
│   code                   │
│                          │
│   Sent to +234 812 345   │
│   6789  [Change]         │  ← Tappable link
│                          │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐     │  ← 4 OTP boxes, 56x56px, spaced 12px
│  │ 1│ │ 2│ │ 3│ │ 4│     │
│  └──┘ └──┘ └──┘ └──┘     │
│                          │
│  Resend code in 00:59    │  ← Countdown timer
│  [Resend Code]           │  ← Appears after countdown, disabled for 30s
└──────────────────────────┘
```

#### Key Elements

| Element | Specification |
|---------|---------------|
| OTP boxes | 4 boxes, 56x56px each, 12px gap, border 2px #CCCCCC, centered |
| Box focus | Active box border #E85D04, font 24px Poppins 600 |
| Auto-advance | After 1 digit, cursor moves to next box automatically |
| Paste | If 4-digit code pasted, distribute across 4 boxes |
| Timer | "Resend code in 00:59" — Inter 400 14px, counts down |
| Resend link | Appears after timer expires, Inter 500 14px burnt orange |
| Resend disabled | 30-second cooldown between resend requests, button shows countdown |

#### Error States

| Error | Display |
|-------|---------|
| Wrong OTP | "Incorrect code. Please try again." — boxes border #DC3545, shake animation |
| Expired OTP | "Code expired. Request a new one." — option to resend |
| Too many attempts | "Too many attempts. Try again in 5 minutes." — resend disabled |
| Network error | "Couldn't send code. Check your connection." — retry button |

---

### 2.5 Screen 4: Home

#### Purpose
Primary discovery surface — let users find food based on location, browse categories, see featured restaurants.

#### Layout

```
┌──────────────────────────┐
│ [📍 Ikeja, Lagos ▼]  [🔔] [👤] │  ← Location bar + actions
├──────────────────────────┤
│ ┌────────────────────────┐│
│ │ 🔍 Search restaurants...││  ← Search bar
│ └────────────────────────┘│
├──────────────────────────┤
│ [All] [Nigerian] [Chinese]│ ← Horizontal scrollable categories
│ [Fast Food] [Pizza] ...  │
├──────────────────────────┤
│ ✨ Featured near you      │  ← Section header
│ ┌────────────┐            │
│ │ [Restaurant Card - wide]││  ← Featured restaurant, full width
│ └────────────┘            │
├──────────────────────────┤
│ 🍴 Popular in Ikeja       │  ← Section header
│ [Card] [Card] [Card]      │  ← Horizontal scroll
├──────────────────────────┤
│ 🏪 All Restaurants        │  ← Section header
│ [Grid: 2 cols]            │
│ [Card] [Card]             │
│ [Card] [Card]             │
│ [Card] [Card]             │
└──────────────────────────┘
│ 🏠  🔍  📋  👤 │ ← Bottom nav (64px)
└──────────────────────────┘
```

#### Key Elements

**Location Bar:**
- Height: 48px
- Left: Map pin icon (Burnt Orange) + "Ikeja, Lagos" text (Poppins 500 15px) + chevron-down
- Right: Notification bell icon (24px, Medium Gray) + Profile avatar (32px circle)
- Tap location → opens location selection sheet
- Tap notification → goes to notifications screen
- Tap avatar → goes to Profile

**Search Bar:**
- Height: 48px, background #F5F5F5, border-radius 24px
- Icon: Search icon (20px, Medium Gray), left-aligned, 16px from edge
- Text: "Search restaurants or dishes" — Inter 400 15px, #999999
- Tap → navigate to Search Results screen
- Background: #F8F9FA

**Category Chips:**
- Horizontal ScrollView, no visible scrollbar
- Chips: "All", "Nigerian", "Chinese", "Fast Food", "Pizza", "Buka", "Healthy", "Dessert", "Drinks"
- Chip style: 32px height, 12px horizontal padding, border-radius 16px
- Active: Background Burnt Orange (#E85D04), text white, Poppins 500 13px
- Inactive: Background #F0F0F0, text #333333
- Transition: 200ms background-color change
- Scroll behavior: Smooth scroll, momentum

**Section Headers:**
- Text: Poppins 600 18px, left-aligned
- Right side: "See all →" link — Inter 500 14px, Burnt Orange
- Vertical spacing between sections: 24px

#### Restaurant Card (Standard)

```
┌─────────────────────┐
│ [Image 4:3 ratio]   │ ← Restaurant hero image, rounded top corners
│ [Favorite heart]    │ ← Top-right overlay, white heart on transparent
├─────────────────────┤
│ Restaurant Name     │ ← Poppins 600 16px, max 1 line ellipsis
│ Nigerian • Buka      │ ← Inter 400 13px, #666666, cuisine tags
│ ⭐ 4.5 (234) • 25-35 min • ₦1,500 min│ ← Rating, time, min order
└─────────────────────┘
```
- Size: 2-column grid, width = (screen_width - 44px) / 2
- Image aspect ratio: 4:3
- Border radius: 12px
- Shadow: Elevation 1
- Gap between cards: 12px

#### Restaurant Card (Featured / Wide)

- Full width (minus 32px margins)
- Image aspect ratio: 16:9
- Contains badge: "Featured" — Burnt Orange background, white text, top-left corner
- Restaurant name: Poppins 700 20px

#### All Restaurants Grid

- 2 columns, 12px gap
- Infinite scroll (pagination: 20 restaurants per page)
- Pull-to-refresh: refreshes restaurant list, recalculates distances

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton cards (shimmer animation) for first 6 restaurants |
| Empty | "No restaurants found. Try a different category or location." with illustration |
| Error | "Couldn't load restaurants. Tap to retry." with retry button |
| Location not set | Prompt user to enable location with explanation |

---

### 2.6 Screen 5: Search Results

#### Purpose
Full search experience with text input, filters, and categorized results.

#### Layout

```
┌──────────────────────────┐
│ [←] [🔍 Search input    ] [✕]│  ← Sticky search bar
├──────────────────────────┤
│ Popular Searches         │  ← Section (when input empty)
│ [Chip] [Chip] [Chip]     │
├──────────────────────────┤
│ Restaurants (12)         │  ← Section header
│ [Restaurant Card]        │
│ [Restaurant Card]        │
├──────────────────────────┤
│ Dishes (8)               │  ← Section header
│ [Dish Card - horizontal] │
│ [Dish Card - horizontal] │
└──────────────────────────┘
```

#### Key Elements

**Sticky Search Bar:**
- Background: white
- Back button (chevron), then text input field, then X to clear
- Input pre-populated with query
- Auto-focus on screen enter
- Keyboard: text, auto-correct on

**Popular Searches (when empty):**
- 6 chips in 2 rows: "Jollof rice", "Suya", "Fried rice", "Banga soup", "Pizza", "Chinese"
- Chip style: border 1px #CCCCCC, radius 20px, Inter 400 14px

**Search Results — Restaurants:**
- Vertical list of restaurant cards (full-width variant)
- Each shows: image, name, cuisine tags, rating, delivery time, min order

**Search Results — Dishes:**
- Horizontal card: left image (80x80px, radius 8px), right side: dish name, restaurant name, price, add button

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton rows (3 restaurant cards + 3 dish cards) |
| No results | "No results for '[query]'" with suggestion to try different keywords |
| Network error | "Search failed. Check connection." + retry |

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Type 2+ chars | Auto-suggest dropdown appears below search bar |
| Tap suggestion | Navigate to that result directly |
| Tap X | Clear search, show popular searches |
| Pull down | Refresh results |
| Tap restaurant | Navigate to restaurant detail |
| Tap dish | Navigate to restaurant detail (pre-scrolled to dish) |

---

### 2.7 Screen 6: Restaurant Listing (Filtered View)

#### Purpose
Shows list of restaurants filtered by category, sorted by selected criteria.

#### Layout

```
┌──────────────────────────┐
│ [←] Nigerian Restaurants │  ← "Nigerian Restaurants" title
│              [Filter] [Sort]│
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ Restaurant Card      │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Restaurant Card      │ │
│ └──────────────────────┘ │
│ ...                      │
└──────────────────────────┘
```

#### Filter Sheet (Bottom Sheet)

```
┌──────────────────────────┐
│ ─────  (handle)          │
│ Filters            [Clear]│
├──────────────────────────┤
│ Cuisine Type             │
│ [Nigerian✓] [Chinese✓]   │
│ [Fast Food] [Pizza]      │
├──────────────────────────┤
│ Price Range              │
│ ● ○ ○ ○ ○               │  ← 1-5 price indicators
│ ₦₦   ₦₦₦  ₦₦₦₦           │
├──────────────────────────┤
│ Dietary                  │
│ [Halal] [No Pork] [Veg]  │
├──────────────────────────┤
│ Delivery Time            │
│ ○ Under 30 min           │
│ ● Under 45 min (default) │
│ ○ Any time               │
├──────────────────────────┤
│ [ Apply Filters (12) ]    │  ← Shows count of matching restaurants
└──────────────────────────┘
```

#### Sort Bottom Sheet

Options:
- Recommended (default)
- Rating: High to Low
- Delivery Time: Fastest
- Minimum Order: Low to High
- Distance: Nearest

---

### 2.8 Screen 7: Restaurant Detail + Menu

#### Purpose
Show restaurant info, menu categories, and items. Primary ordering surface.

#### Layout

```
┌──────────────────────────┐
│ [←] [Share] [♡]         │  ← Sticky header, transparent → white on scroll
├──────────────────────────┤
│ [Hero Image - 250px]     │  ← Parallax scroll effect
│ [Restaurant name overlay]│
├──────────────────────────┤
│ ⭐ 4.5 (234 reviews)     │  ← Rating row
│ Nigerian • Buka          │  ← Cuisine tags
│ 📍 0.8 km away • 25-35min│  ← Distance and time
│ ₦1,500 minimum            │
├──────────────────────────┤
│ ┌─────────┐ ┌─────────┐  │  ← Info chips (scrollable)
│ │ Info 1  │ │ Info 2  │  │
│ └─────────┘ └─────────┘  │
├──────────────────────────┤
│ 🔍 Search this menu      │  ← In-menu search
├──────────────────────────┤
│ [Category: Soups]        │  ← Sticky category tabs
│ [Category: Swallows]     │
│ [Category: Proteins]     │
│ [Category: Drinks]       │
├──────────────────────────┤
│ Soups                    │  ← Category header
│ ┌──────────────────────┐ │
│ │ Food Item Card        │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Food Item Card        │ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ Swallows                 │
│ [Food Item Cards...]    │
└──────────────────────────┘
│ 🛒 [View Cart (3)]      │  ← Floating cart bar, shows count + total
└──────────────────────────┘
```

#### Restaurant Header

| Element | Specification |
|---------|---------------|
| Hero image | 250px height, parallax on scroll, restaurant photo |
| Restaurant name | Overlay on image, bottom-left, Poppins 700 24px white, drop shadow |
| Share button | Top-right, share icon |
| Favorite button | Top-right (next to share), heart outline → filled on tap |

#### Info Section

| Element | Content |
|---------|---------|
| Rating | Yellow star + "4.5" + "(234 reviews)" — tappable to scroll to reviews |
| Cuisine | "Nigerian • Buka" — tags |
| Distance | "0.8 km away" |
| Delivery time | "25-35 min" |
| Minimum order | "₦1,500 minimum" |
| Info chips | "₤60 delivery" [soft-chip], "15-20 min prep" |

#### Sticky Category Tabs

- Horizontal scrollable tab bar, below info section
- Tabs: Category names (Soups, Swallows, Proteins, Drinks, Sides, Desserts)
- Active tab: Burnt Orange underline (3px), text Burnt Orange
- Inactive: Medium Gray text
- On scroll: tabs stick below header when category section reaches top

#### Food Item Card

```
┌─────────────────────────────────┐
│ [Photo] │ Dish Name             │
│ 100x100 │ Description text...   │
│         │ ₦1,200      [+]       │
└─────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Layout | Horizontal: image left (100x100px, radius 8px), content right |
| Image | Placeholder: 100x100 gray with fork icon if no photo |
| Name | Poppins 600 15px, max 2 lines |
| Description | Inter 400 13px, #666666, max 2 lines, ellipsis |
| Price | Poppins 600 16px, Burnt Orange |
| Add button | Circle 36px, white background, orange border, "+" icon |
| Tap card | Expands to show full description + customization options |

#### Food Item — Expanded / Customization View

```
┌─────────────────────────────────┐
│ [X]  Chicken Fried Rice         │
│   (Full description)             │
│                                 │
│   Special instructions:         │
│   ┌─────────────────────────┐   │
│   │ e.g., No onions         │   │
│   └─────────────────────────┘   │
│                                 │
│   Quantity:  [-]  1  [+]        │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Add to Cart - ₦1,200  │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

- Modal bottom sheet, slides up 400ms
- Overlay: 50% black scrim
- Close: X button top-right, or tap scrim
- Quantity stepper: - and + buttons, min 1, max 10
- Special instructions: text input, 100 char limit
- "Add to Cart" shows running total (price × quantity)

#### States

| State | Visual |
|-------|--------|
| Loading | Menu sections show skeleton cards (3 per section) |
| Out of stock | Grayed out card, "Currently unavailable" badge, add button disabled |
| Restaurant closed | "Closed • Opens at 11:00 AM" banner at top, add buttons disabled |
| Empty category | "No items in this category yet" |

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Tap category tab | Smooth scroll to that section |
| Scroll past category | Tab highlights to match current section |
| Tap "+" on item | Add 1 to cart, badge bounces, toast "Added to cart" |
| Tap item row | Expands to customization sheet |
| Long press item | Quick-add to cart (1 unit, no customization) |
| Pull down on menu | Refreshes availability status |

---

### 2.9 Screen 8: Cart

#### Purpose
Review cart items, see running total, proceed to checkout.

#### Layout

```
┌──────────────────────────┐
│ [←] Your Cart            │  ← Header with back, title
│ [Clear All]               │  ← Right action
├──────────────────────────┤
│ ┌────────────────────────┐│
│ │ [Img] Dish Name    ₦1,200││
│ │       [-] 2 [+]   ×     ││
│ │ Restaurant: Name        ││
│ └────────────────────────┘│
│ ┌────────────────────────┐│
│ │ [Img] Dish Name    ₦800 ││
│ │       [-] 1 [+]   ×     ││
│ │ Restaurant: Name        ││
│ └────────────────────────┘│
├──────────────────────────┤
│ ┌────────────────────────┐│
│ │ Have a promo code?     ││  ← Expandable section
│ │ [Enter code]   [Apply] ││
│ └────────────────────────┘│
├──────────────────────────┤
│ Subtotal          ₦3,200 ││
│ Delivery          ₦400   ││
│ Service Fee        ₦150   ││
│ ──────────────────────────│
│ Total             ₦3,750  │  ← Bold, larger
│                                │
│ ┌────────────────────────┐│
│ │    Proceed to Checkout ││  ← Primary CTA
│ └────────────────────────┘│
└──────────────────────────┘
```

#### Cart Item Row

| Element | Specification |
|---------|---------------|
| Image | 64x64px, radius 8px, left |
| Name | Poppins 600 15px |
| Price | Poppins 600 14px, right-aligned |
| Quantity stepper | 32px height, - [count] +, inline |
| Restaurant name | Inter 400 12px, #999999, below name |
| Remove | X button at far right of row |
| Swipe left | Reveals "Remove" action |

#### Price Summary

| Line | Value |
|------|-------|
| Subtotal | Right-aligned, Inter 400 16px |
| Delivery | Right-aligned, Inter 400 14px |
| Service Fee | Right-aligned, Inter 400 14px, gray |
| Total | Poppins 700 20px, bold |

#### States

| State | Behavior |
|-------|----------|
| Empty cart | Illustration of empty plate, "Your cart is empty", "Browse Restaurants" button |
| Item unavailable | Warning banner above item, item shows "Unavailable" badge, still in cart (user must remove) |
| Restaurant closed | Banner: "This restaurant is currently closed. Remove items or wait for it to reopen." |
| Promo code invalid | Red helper text "Invalid code", field border red |

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Tap +/- | Increment/decrement quantity, animate number change |
| Tap - at quantity 1 | Remove item from cart, confirm with toast |
| Swipe item left | Reveal "Remove" button, release to delete |
| Tap "Clear All" | Confirmation dialog: "Remove all items from cart?" |
| Tap promo code | Expand input field, keyboard appears |
| Apply valid code | Show discount line, update total |
| Tap checkout | Validate cart, navigate to Checkout |

---

### 2.10 Screen 9: Checkout

#### Purpose
Collect delivery address, select payment method, place order with Flutterwave payment.

#### Layout

```
┌──────────────────────────┐
│ [←] Checkout             │
├──────────────────────────┤
│ 📍 Delivery Address      │
│ ┌────────────────────────┐│
│ │ 15 Admiralty Way       ││
│ │ Lekki Phase 1, Lagos   ││
│ │ [Change]               ││  ← Tappable
│ └────────────────────────┘│
│ ┌────────────────────────┐│
│ │ Delivery instructions   ││
│ │ ┌──────────────────────┐││
│ │ │ Gate code: 1234      │││  ← Expandable
│ │ └──────────────────────┘│
│ │ ┌──────────────────────┐││
│ │ │ Landmark: Near Zoo   │││
│ │ └──────────────────────┘│
│ └────────────────────────┘│
├──────────────────────────┤
│ 📋 Order Summary         │
│ ┌────────────────────────┐│
│ │ 2× Chicken Fried Rice  ││
│ │ 1× Jollof Rice         ││
│ │ [See all]              ││  ← Expands to full list
│ └────────────────────────┘│
├──────────────────────────┤
│ 💳 Payment Method        │
│ ┌────────────────────────┐│
│ │ 💳 Card (Visa/MC)      ││
│ │ 💵 USSD               ││
│ │ 📱 Opay/Moniepoint    ││
│ └────────────────────────┘│
├──────────────────────────┤
│ Total Breakdown          │
│ Subtotal        ₦3,200   │
│ Delivery        ₦400    │
│ Service Fee     ₦150     │
│ ──────────────────────────│
│ Total           ₦3,750   │
│                          │
│ ┌────────────────────────┐│
│ │   Place Order ₦3,750   ││  ← Primary CTA
│ └────────────────────────┘│
└──────────────────────────┘
```

#### Address Section

| Element | Specification |
|---------|---------------|
| Saved address | Shows formatted address, 3 saved addresses max |
| Add new address | Opens address input form |
| Address fields | Street, Area, City (locked to Lagos for MVP), instructions |
| Change button | Right-aligned, Burnt Orange text |
| Instructions | Optional text fields: Gate code, Landmark, Delivery notes |

#### Payment Methods

Payment method cards are radio-button style selection:

| Method | Icon | Description |
|--------|------|-------------|
| Card | Credit card icon | "Pay with Visa, Mastercard, or Verve" |
| USSD | Mobile phone icon | "Pay via USSD (GTC, UBA, First Bank)" |
| Opay/Moniepoint | Wallet icon | "Pay with Opay or Moniepoint wallet" |

- Selected: Border 2px Burnt Orange, background #FFF5EE
- Unselected: Border 1px #E5E5E5

#### Flutterwave Integration

When user taps "Place Order":
1. Button shows spinner, text changes to "Processing..."
2. Backend creates Flutterwave payment reference
3. App opens Flutterwave inline widget (card/USSD/wallet based on selection)
4. User completes payment on Flutterwave hosted page
5. On success: webhook updates order to "paid", navigate to Order Tracking
6. On failure: show error message, allow retry

#### States

| State | Behavior |
|-------|----------|
| No address | Prompt to add delivery address before proceeding |
| Address editing | Inline form to add/edit address |
| Payment processing | CTA disabled, shows spinner |
| Payment failed | Show error: "Payment failed. Please try again or use a different method." |
| Network error | "Connection lost. Your order was not placed. Please try again." |

---

### 2.11 Screen 10: Order Confirmation

#### Purpose
Affirm successful order placement, transition to tracking.

#### Layout

```
┌──────────────────────────┐
│                          │
│       ✓ (animated)       │  ← Green checkmark, scale-in animation
│                          │
│   Order Confirmed!       │  ← Poppins 700 24px, centered
│                          │
│   Order #QB-284759       │  ← Monospace, 14px
│                          │
│   Your order is being    │
│   prepared. You can      │
│   track it in real time. │
│                          │
│   ┌──────────────────┐   │
│   │  Estimated arrival│   │
│   │    12:45 PM      │   │  ← Large time display
│   │   (35 minutes)   │   │
│   └──────────────────┘   │
│                          │
│   [Track Order]          │  ← Primary CTA
│                          │
│   [Back to Home]         │  ← Text link
└──────────────────────────┘
```

#### Animation

- Checkmark: Scale 0 → 1.2 → 1.0 over 500ms, ease-out
- Number: Types in from left (typewriter effect, 50ms per digit)
- Background: Subtle confetti animation (Nigerian flag colors: green-white-green)

#### Post-Confirmation Flow

1. Push notification sent: "Order #QB-284759 confirmed"
2. Supabase realtime subscription starts for order status updates
3. Rider assignment happens (admin manually dispatches)
4. Consumer can navigate to tracking immediately or return home

---

### 2.12 Screen 11: Order Tracking (Live Map)

#### Purpose
Real-time visibility into order progress with live map, status steps, and communication options.

#### Layout

```
┌──────────────────────────┐
│ [←] Track Order          │
├──────────────────────────┤
│ Order #QB-284759         │
│ ┌────────────────────────┐│
│ │                        ││
│ │   [Live Map]           ││  ← Mapbox/Google Maps
│ │   📍 Restaurant        ││
│ │   🛵 Rider (animated)  ││
│ │   📍 Delivery Address  ││
│ │                        ││
│ └────────────────────────┘│
├──────────────────────────┤
│ ● Restaurant preparing   │  ← Status steps (vertical)
│ ● Rider assigned         │
│ ○ En route               │
│ ○ Arriving               │
│ ○ Delivered              │
├──────────────────────────┤
│ 🛵 David O.              │  ← Rider info card
│    Rating: ⭐ 4.8        │
│ [📞 Call] [💬 Message]   │  ← Contact actions
├──────────────────────────┤
│ Arriving by 12:45 PM     │  ← Prominent ETA
│ (35 minutes)             │
├──────────────────────────┤
│ [Cancel Order] (text link)│ ← Only if status is before "Preparing"
└──────────────────────────┘
```

#### Map Details

| Element | Specification |
|---------|---------------|
| Map | Full width, 240px height, interactive |
| Restaurant pin | Orange marker with fork icon |
| Delivery address pin | Green marker with house icon |
| Rider icon | Burnt Orange motorcycle icon, animates along route |
| Route line | Dashed orange line from restaurant to address |
| Auto-follow | Map centers on rider location, follows as it moves |

#### Rider Info Card

| Element | Specification |
|---------|---------------|
| Avatar | 48px circle, rider photo or initials |
| Name | "David O." (first name + last initial) |
| Rating | "⭐ 4.8" with rating count |
| Call button | Phone icon, opens dialer with rider number |
| Message button | Opens SMS app with pre-filled message |

#### Status Steps

| Step | Status Icon | Description |
|------|-------------|-------------|
| Confirmed | ● (filled orange) | Order received by restaurant |
| Preparing | ○ → ● when active | Restaurant is cooking |
| Rider Assigned | ○ → ● when active | Rider has been dispatched |
| En Route | ○ → ● when active | Rider is moving to you |
| Arriving | ○ → ● when active | Rider is within 500m |
| Delivered | ○ → ● when active | Order complete |

- Completed steps: Orange fill, checkmark icon
- Current step: Pulsing animation (scale 1.0 → 1.1, 1s loop)
- Future steps: Gray outline

#### ETA Display

- "Arriving by 12:45 PM" — Poppins 700 24px
- "(35 minutes)" — Inter 400 14px, gray
- Updates every 30 seconds as rider moves

#### States

| State | Behavior |
|-------|----------|
| Order confirmed, no rider | "Restaurant is preparing your order. Rider will be assigned soon." |
| Rider assigned | Rider card appears with call/message options |
| En route | Map tracks rider movement |
| Near arrival | "Rider is almost there!" push notification |
| Delivered | Status shows ✓, "Enjoy your meal!" message |
| Delivery delayed | "Your order is running late. We're sorry for the wait." + new ETA |
| Order cancelled | "Order cancelled. Refund will be processed." |

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Tap map | Maximizes to full-screen map with zoom controls |
| Tap rider card | Expands to show full rider profile |
| Tap "Call" | Opens phone dialer with rider's number |
| Tap "Message" | Opens SMS with template "Hi, I'm expecting order #QB-284759" |
| Tap "Cancel Order" | Shows confirmation: "Are you sure? Cancellation fees may apply." |
| Pull to refresh | Refreshes order status from server |

---

### 2.13 Screen 12: Order History

#### Purpose
View past orders, reorder, track active orders.

#### Layout

```
┌──────────────────────────┐
│ [←] My Orders            │
├──────────────────────────┤
│ [Active] [Past]          │  ← Segmented control
├──────────────────────────┤
│ Active Order             │  ← Section (if any)
│ ┌────────────────────────┐│
│ │ Order #QB-284759       ││
│ │ Track →                ││
│ │ [Mini status bar]      ││
│ └────────────────────────┘│
├──────────────────────────┤
│ May 2026                 │  ← Date section header
│ ┌────────────────────────┐│
│ │ [Img] Chicken Fried Rice││
│ │ Restaurant Name         ││
│ │ #QB-284759 • 12:45 PM  ││
│ │ ₦1,200 • Delivered ✓   ││
│ │ [Reorder] [Rate]       ││
│ └────────────────────────┘│
│ ┌────────────────────────┐│
│ │ [Img] Jollof Rice      ││
│ │ Restaurant Name         ││
│ │ #QB-284731 • May 25    ││
│ │ ₦2,400 • Delivered ✓   ││
│ │ [Reorder] [Rate]       ││
│ └────────────────────────┘│
└──────────────────────────┘
```

#### Order Card

| Element | Specification |
|---------|---------------|
| Image | 60x60px, left |
| Item name | Poppins 600 14px, primary item |
| "+X more" | If multiple items, Inter 400 12px gray |
| Restaurant name | Inter 400 13px, gray |
| Order ID + time | Inter 400 12px, #999999 |
| Total price | Poppins 600 14px |
| Status badge | Delivered / Cancelled / Refunded |
| Actions | "Reorder" (primary outline), "Rate" (text link) |

#### Segment Control

| Tab | Content |
|-----|---------|
| Active | Orders with status: Confirmed, Preparing, En Route, Arriving |
| Past | Orders with status: Delivered, Cancelled, Refunded |

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton cards (3 items) |
| Empty - Active | "No active orders" with illustration of relaxed person |
| Empty - Past | "No past orders yet. Place your first order!" |
| Reorder loading | "Adding items..." button state |

---

### 2.14 Screen 13: Rate & Review

#### Purpose
Collect post-delivery rating and optional feedback.

#### Layout

```
┌──────────────────────────┐
│ [←] Rate Your Order      │
├──────────────────────────┤
│ [Large restaurant image]  │
│ How was your order from  │
│ Mama's Kitchen?          │  ← Restaurant name
├──────────────────────────┤
│ ☆ ☆ ☆ ☆ ☆               │  ← 5 large tap targets
│                          │
│ Tap to rate              │  ← Helper text
├──────────────────────────┤
│ Tell us more (optional)  │
│ ┌────────────────────────┐│
│ │ What did you think?   ││  ← Text area, 150 char max
│ │                       ││
│ └────────────────────────┘│
├──────────────────────────┤
│ Upload a photo (optional) │
│ [📷 Add Photo]           │
│ [Photo thumbnail] [X]     │
├──────────────────────────┤
│ [    Submit Review    ]  │  ← Disabled until star selected
└──────────────────────────┘
```

#### Star Rating

| Element | Specification |
|---------|---------------|
| Stars | 5 stars, 48px each, 16px gap |
| Tap target | Entire star row is tappable |
| Empty state | All stars outline, gray (#CCCCCC) |
| Filled state | Filled gold (#FFB703), scale animation on tap |
| Half-star | Tap left half of star = half fill, right half = full fill |
| Rating labels | 1=Terrible, 2=Bad, 3=Okay, 4=Good, 5=Great — shown below stars |

#### States

| State | Behavior |
|-------|----------|
| No rating | Stars empty, helper text "Tap to rate", CTA disabled |
| 1-2 stars | Stars filled red (#DC3545), question expands: "What went wrong?" |
| 3 stars | Stars filled orange (#FD7E14), "What could be better?" |
| 4-5 stars | Stars filled gold, "Great! What did you love?" |
| Text optional | Submit button enabled when star selected, regardless of text |
| Photo optional | Camera icon, tapping opens camera roll |
| Submitting | Button shows spinner, "Submitting..." |
| Submitted | Success screen: "Thank you for your feedback!", then navigate back |
| Already rated | Shows existing rating, "Edit your review" option |

---

### 2.15 Screen 14: Profile

#### Purpose
User account management, settings, saved addresses, order history access.

#### Layout

```
┌──────────────────────────┐
│ [←] Profile              │
├──────────────────────────┤
│ ┌────────────────────────┐│
│ │ 👤 Tobi Adeyemi       ││  ← User card with avatar
│ │ tobi@email.com         ││
│ │ +234 812 345 6789      ││
│ │ [Edit Profile]         ││
│ └────────────────────────┘│
├──────────────────────────┤
│ 📍 Saved Addresses        │
│   3 addresses listed     │
│   [Manage Addresses →]   │
├──────────────────────────┤
│ 📋 Order History         │
│   View all orders        │
├──────────────────────────┤
│ 💳 Payment Methods       │
│   Visa ****4242          │
│   [Manage →]            │
├──────────────────────────┤
│ 🔔 Notifications         │
│   [Toggle switches]      │
├──────────────────────────┤
│ ❓ Help & Support        │
│   FAQs, Contact us       │
├──────────────────────────┤
│ 🚪 Log Out               │
├──────────────────────────┤
│ v1.0.0                  │  ← App version, centered, gray
└──────────────────────────┘
```

#### Profile Sections

| Section | Contents |
|---------|----------|
| User card | Avatar (80px, initials fallback), name, email, phone |
| Saved addresses | List of up to 5 addresses, default indicated |
| Payment methods | List of saved cards (tokenized, last 4 digits) |
| Notifications | Toggle switches for: Order updates, Promotions, Recommendations |
| Help | FAQ link, Contact support (email/WhatsApp) |
| Legal | Terms of Service, Privacy Policy |
| About | App version, licenses |

#### Settings Options

| Item | Action |
|------|--------|
| Edit profile | Navigate to Edit Profile screen |
| Manage addresses | Navigate to Address Management screen |
| Manage payment | Navigate to Payment Methods screen |
| Notification preferences | Toggle switches in-place |
| Change phone | Verify with OTP before changing |
| Delete account | Confirmation dialog + reason survey |

---

### 2.16 Screen 15: Location Selection

#### Purpose
Allow user to change or confirm delivery location.

#### Layout (Bottom Sheet)

```
┌──────────────────────────┐
│ ─────  Deliver to        │
│                          │
│ [📍 Use current location]│  ← Primary action
│                          │
│ Or enter address         │
│ ┌────────────────────────┐│
│ │ 🔍 Search address...   ││
│ └────────────────────────┘│
│                          │
│ Saved Addresses          │
│ ● Home - 15 Admiralty... │  ← Radio buttons
│ ○ Work - 12 Ajose Ade.. │
│ ○ Other                 │
│                          │
│ ┌────────────────────────┐│
│ │ [Confirm Location]     ││
│ └────────────────────────┘│
└──────────────────────────┘
```

#### Interaction Details

| Interaction | Behavior |
|-------------|----------|
| Tap "Use current location" | Request GPS permission if not granted, auto-fill coordinates |
| Type in search | Google Places Autocomplete suggestions appear |
| Tap suggestion | Populate address field |
| Tap saved address | Select as delivery point |
| Confirm | Save location to user profile, update home screen, close sheet |

---

## 3. Restaurant Partner Portal

### 3.1 Portal Overview

**Platform:** Web application (Next.js)  
**URL Pattern:** restaurant.quickbite.ng  
**Authentication:** Email + password, JWT-based sessions  
**Target Users:** Restaurant owners, kitchen managers, staff taking orders

### 3.2 Screen 1: Login

#### Layout (Desktop Centered)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     ┌────────────────────────────────────┐              │
│     │                                    │              │
│     │        [Logo] QuickBite            │              │
│     │                                    │              │
│     │   Partner Portal                   │              │
│     │                                    │              │
│     │   Email                            │              │
│     │   ┌────────────────────────────┐  │              │
│     │   │ email@restaurant.com       │  │              │
│     │   └────────────────────────────┘  │              │
│     │                                    │              │
│     │   Password                         │              │
│     │   ┌────────────────────────────┐  │              │
│     │   │ •••••••••••                │  │              │
│     │   └────────────────────────────┘  │              │
│     │                                    │              │
│     │   ┌────────────────────────────┐  │              │
│     │   │        Sign In             │  │              │
│     │   └────────────────────────────┘  │              │
│     │                                    │              │
│     │   Forgot password?                │              │
│     │                                    │              │
│     └────────────────────────────────────┘              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Login Card

- Width: 420px, centered vertically and horizontally
- Background: white
- Border radius: 16px
- Shadow: Elevation 3
- Padding: 48px

#### Input Fields

| Field | Specification |
|-------|---------------|
| Label | Inter 500 14px, #333333, above input |
| Input | 48px height, border 1.5px #CCCCCC, radius 8px, Inter 400 15px |
| Focus | Border #E85D04, 2px |
| Error | Border #DC3545, helper text below in red |
| Email validation | Real-time, shows error on blur if invalid |

#### States

| State | Behavior |
|-------|----------|
| Default | Both fields empty, sign in button disabled |
| Filling | Button enables when both fields filled and valid |
| Loading | Button shows spinner, text "Signing in..." |
| Error | "Invalid email or password." below form, shake animation |
| Forgot password | "Forgot password?" link → modal with email input for reset link |

---

### 3.3 Screen 2: Dashboard (Home)

#### Purpose
At-a-glance view of today's orders, revenue, and key metrics.

#### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] Mama's Kitchen  ▼    [🔔 3] [Profile ▼]              │  ← Top bar
├──────────┬───────────────────────────────────────────────────┤
│ Dashboard│                                                   │
│ Orders   │  Today, May 28 2026                   [Period ▼] │
│ Menu     │                                                   │
│ Analytics│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│ Payouts  │  │ ₦145,200│ │   12   │ │  3.2   │ │  45min │   │
│ Settings │  │ Revenue │ │ Orders │ │ AOV    │ │ AvgTime│   │
│          │  └────────┘ └────────┘ └────────┘ └────────┘   │
│          │                                                   │
│          │  Active Orders (3)                                │
│          │  ┌──────────────────────────────────────────┐   │
│          │  │ #QB-284760  •  12:45 PM  •  Tobi A.     │   │
│          │  │ 2× Jollof, 1× Fish  •  ₦3,400           │   │
│          │  │ [Accept] [Decline]           ⏱ 5:32     │   │
│          │  └──────────────────────────────────────────┘   │
│          │  ┌──────────────────────────────────────────┐   │
│          │  │ #QB-284759  •  12:30 PM  •  Ada N.       │   │
│          │  │ 1× Fried Rice  •  ₦1,800                 │   │
│          │  │ [Preparing ✓]               ⏱ 12:05     │   │
│          │  └──────────────────────────────────────────┘   │
│          │                                                   │
│          │  ┌──────────────────────────────────────────┐   │
│          │  │ #QB-284758  •  12:15 PM  •  Emeka K.    │   │
│          │  │ 3× Amala, 2× Ewedu  •  ₦4,200           │   │
│          │  │ [Ready for Pickup]          ⏱ 18:22      │   │
│          │  └──────────────────────────────────────────┘   │
│          │                                                   │
└──────────┴───────────────────────────────────────────────────┘
        260px sidebar                       Content area
```

#### Sidebar

| Item | Icon | Active State |
|------|------|--------------|
| Dashboard | Grid icon | Background #FFF5EE, text #E85D04 |
| Orders | Clipboard icon | — |
| Menu | Utensils icon | — |
| Analytics | Bar chart icon | — |
| Payouts | Wallet icon | — |
| Settings | Gear icon | — |

#### Metric Cards (4 Cards)

| Metric | Value | Comparison |
|--------|-------|------------|
| Revenue | ₦145,200 | +12% vs yesterday |
| Orders | 12 | +3 vs yesterday |
| Avg Order Value | ₦3,200 | -5% vs yesterday |
| Avg Delivery Time | 45 min | +2 min vs yesterday |

- Card: white background, border-radius 12px, padding 20px
- Metric value: Poppins 700 28px, #1A1A1A
- Label: Inter 400 14px, #666666
- Comparison badge: green (up) or red (down) arrow + percentage

#### Order Card

| Element | Specification |
|---------|---------------|
| Order ID | Monospace, #QB-XXXXXX |
| Time placed | 12:45 PM |
| Customer name | First name + last initial |
| Items | "2× Jollof, 1× Fish" |
| Total | ₦3,400 |
| Timer | Elapsed time since order placed |
| Actions | Contextual buttons based on status |

#### Order Status Actions

| Status | Available Actions |
|--------|-------------------|
| New | [Accept] [Decline] — must respond within 3 minutes |
| Accepted | [Mark Preparing] |
| Preparing | [Mark Ready for Pickup] |
| Ready for Pickup | (Waiting for rider) — no action |
| Picked Up | (Auto-updates when rider scans) |

#### Timer Behavior

- Timer starts at order creation time
- 0–10 min: Green text
- 10–20 min: Amber text
- 20+ min: Red text, pulsing animation
- At 3 minutes with no response: Auto-accept

#### States

| State | Behavior |
|-------|----------|
| No orders today | "No orders yet today. Orders will appear here as they come in." with illustration |
| Loading | Skeleton metric cards + 3 skeleton order cards |
| Connection lost | "Connection lost. Reconnecting..." banner at top, auto-retry |
| New order | Audio chime, order card slides in from top with highlight animation |

#### Interactions

| Interaction | Behavior |
|-------------|----------|
| Click order row | Expand to full order details panel on right |
| Tap Accept | Confirm dialog → status changes to "Accepted" |
| Tap Decline | Modal with reason dropdown (Out of ingredients, Too busy, Other) + confirm |
| Click customer name | Show phone number, call button |
| Pull down | Refresh all data |

---

### 3.4 Screen 3: Order Details

#### Purpose
Full view of a single order with customer info, items, and actions.

#### Layout (Slide-in Panel or Full Page)

```
┌────────────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                        │
├────────────────────────────────────────────────────────────┤
│ Order #QB-284760                                           │
│ Received at 12:45 PM • Status: [Preparing ▼]              │
├────────────────────────────────────────────────────────────┤
│ Customer                                                    │
│ ┌──────────────────────────────────────────────────────────┐│
│ │ Tobi Adeyemi                                    [📞 Call] ││
│ │ +234 812 345 6789                                        ││
│ │ 📍 15 Admiralty Way, Lekki Phase 1, Lagos               ││
│ │ 🏠 Gate code: 1234                                      ││
│ └──────────────────────────────────────────────────────────┘│
├────────────────────────────────────────────────────────────┤
│ Items                                                       │
│ ┌──────────────────────────────────────────────────────────┐│
│ │ 2×  Jollof Rice with Chicken              ₦4,000          ││
│ │     Special: Extra pepper                                ││
│ │ 1×  Grilled Fish                                 ₦2,500  ││
│ │                                                        ││
│ │ Subtotal                                    ₦6,500      ││
│ │ Delivery Fee                                  ₦400       ││
│ │ Service Fee                                   ₦200       ││
│ │ ─────────────────────────────────────────────────────── ││
│ │ Total                                       ₦7,100      ││
│ └──────────────────────────────────────────────────────────┘│
├────────────────────────────────────────────────────────────┤
│ Notes                                                       │
│ "Please include extra napkins"                              │
├────────────────────────────────────────────────────────────┤
│ [Mark Preparing] [Print]                                    │
└────────────────────────────────────────────────────────────┘
```

#### Status Dropdown

| Status | Color | Available Transitions |
|--------|-------|----------------------|
| New | Gray | Accept, Decline |
| Accepted | Blue | Mark Preparing |
| Preparing | Orange | Mark Ready |
| Ready for Pickup | Green | (Awaiting rider) |
| Picked Up | Green | (Auto) |
| Completed | Green | (Auto) |
| Cancelled | Red | — |
| Declined | Red | — |

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton placeholders for all fields |
| No order found | "Order not found" with back button |
| Declined | Red banner: "Order declined: [reason]", no actions available |

---

### 3.5 Screen 4: Menu Management

#### Purpose
Add, edit, organize menu items and categories.

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Menu Management                            [+ Add Item]    │
├────────────────────────────────────────────────────────────┤
│ Categories                                                 │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [Soups] [Swallows] [Proteins] [+ Add Category]        │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Soups                                          [Edit] [⋮] │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [Img] Egusi Soup                        ₦1,200   [●] │  │
│ │      Assorted meat and stockfish                    │  │
│ │      Prep time: 15 min                [Edit] [Delete]│  │
│ ├──────────────────────────────────────────────────────┤  │
│ │ [Img] Ewedu Soup                        ₦800     [●]  │  │
│ │      Fresh jute leaves with locust beans            │  │
│ │      Prep time: 10 min                [Edit] [Delete]│  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Swallows                                        [Edit] [⋮] │
│ [Item cards...]                                           │
└────────────────────────────────────────────────────────────┘
```

#### Category Management

| Action | Behavior |
|--------|----------|
| Drag category | Reorder categories (drag handle on left) |
| Tap Edit | Inline rename field |
| Tap ⋮ | Dropdown: Rename, Reorder items, Delete category |
| Add Category | Opens modal: "New Category" name input |

#### Menu Item Card

| Element | Specification |
|---------|---------------|
| Image | 80x80px, left, radius 8px, placeholder if none |
| Name | Poppins 600 16px |
| Description | Inter 400 14px, gray, max 2 lines |
| Price | Poppins 600 16px, Burnt Orange |
| Availability toggle | ● (green = available, gray = unavailable) |
| Prep time | "15 min" — Inter 400 13px |
| Actions | Edit (pencil icon), Delete (trash icon) — appear on hover |

#### Add/Edit Item Modal

```
┌─────────────────────────────────────────────────────────┐
│ Add Menu Item                                    [×]      │
├─────────────────────────────────────────────────────────┤
│ Photo                                                   │
│ ┌─────────────┐                                        │
│ │ [📷 Upload] │    Current image preview               │
│ └─────────────┘    (max 1MB, .jpg/.png, 400x300px)     │
│                                                         │
│ Name *                                                  │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ e.g., Egusi Soup                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Description                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ e.g., Assorted meat and stockfish in melon seed...  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Price (₦) *                                             │
│ ┌─────────────────┐                                     │
│ │ 1200            │                                     │
│ └─────────────────┘                                     │
│                                                         │
│ Category *                                              │
│ ┌─────────────────────────────┐                       │
│ │ Soups                      ▼ │                       │
│ └─────────────────────────────┘                       │
│                                                         │
│ Prep Time (minutes)                                    │
│ ┌─────────────────┐                                     │
│ │ 15              │                                     │
│ └─────────────────┘                                     │
│                                                         │
│ Dietary Tags                                           │
│ [ ] Halal   [ ] No Pork   [ ] Vegetarian   [ ] Spicy  │
│                                                         │
│ Availability                                            │
│ [●] Available   [ ] Unavailable                         │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                    Save Item                        │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Form Validation

| Field | Rules |
|-------|-------|
| Name | Required, 3–100 chars, no special characters |
| Description | Optional, max 300 chars |
| Price | Required, numeric, ₦500–₦100,000 |
| Category | Required, must select one |
| Prep time | Optional, numeric, 5–120 minutes |
| Photo | Optional, max 1MB, .jpg/.png, 400×300px minimum |
| Availability | Default: Available |

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton item cards (3 per category) |
| Empty category | "No items in Soups yet. Add your first dish!" + Add button |
| Saving | Button shows spinner, "Saving..." |
| Saved | Modal closes, toast "Item saved", list updates |
| Error | Field-level errors shown below inputs in red |
| Delete confirm | Modal: "Delete Egusi Soup? This cannot be undone." |

---

### 3.6 Screen 5: Payouts

#### Purpose
View earnings history and upcoming payout.

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Payouts                                                    │
├────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Available Balance                                    │  │
│ │ ₦87,450                              [Withdraw]      │  │
│ │                                      ─────────────── │  │
│ │ Next payout: Monday, June 2, 2026                      │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Payout Schedule                                           │
│ Weekly auto-payout every Monday for previous week's       │
│ earnings. Minimum withdrawal: ₦10,000                     │
├────────────────────────────────────────────────────────────┤
│ Earnings This Week                                        │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Mon  May 26   │ 12 orders │ ₦42,300                  │  │
│ │ Tue  May 27   │ 15 orders │ ₦51,200                  │  │
│ │ Wed  May 28   │ 8 orders  │ ₦27,950  (today)         │  │
│ │ Thu  May 29   │ —         │ —                        │  │
│ │ Fri  May 30   │ —         │ —                        │  │
│ │ Sat  May 31   │ —         │ —                        │  │
│ │ Sun  Jun 1   │ —         │ —                        │  │
│ │ ──────────────────────────────────────────────────────│  │
│ │ Total         │ 35 orders │ ₦121,450                  │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Transaction History                                       │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ May 22, 2026  │ Payout        │ -₦98,200            │  │
│ │ May 15, 2026  │ Payout        │ -₦76,500            │  │
│ │ May 8, 2026   │ Payout        │ -₦54,300            │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Bank Account                                               │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ WEMA Bank ****4521                      [Update Bank] │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

#### Bank Account Card

| Element | Specification |
|---------|---------------|
| Bank name | WEMA Bank, Opay, or Moniepoint |
| Account number | Masked: ****4521 |
| Update button | Opens modal to change bank details |

#### Withdraw Modal

```
┌─────────────────────────────────────────────┐
│ Withdraw Earnings                    [×]    │
├─────────────────────────────────────────────┤
│ Available: ₦87,450                         │
│                                             │
│ Amount to withdraw                         │
│ ┌─────────────────────────────────────────┐ │
│ │ ₦ 87,450                               │ │
│ └─────────────────────────────────────────┘ │
│ Minimum: ₦10,000                           │
│                                             │
│ To: WEMA Bank ****4521                     │
│                                             │
│ Expected arrival: 1–2 business days        │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │         Withdraw ₦87,450               │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

#### States

| State | Behavior |
|-------|----------|
| No earnings | "No earnings yet. Start accepting orders to see your earnings here." |
| Below minimum | "Earn ₦10,000 to withdraw. Current balance: ₦X,XXX." |
| Processing payout | "Payout of ₦X,XXX is being processed. Expected by [date]." |
| Bank not set | "Set up your bank account to receive payouts." + Setup button |

---

### 3.7 Screen 6: Restaurant Settings

#### Purpose
Manage restaurant profile, hours, and configuration.

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Restaurant Settings                                        │
├────────────────────────────────────────────────────────────┤
│ Profile                                                    │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Restaurant Name: Mama's Kitchen                      │  │
│ │ Cuisine: Nigerian                                     │  │
│ │ Phone: +234 801 234 5678                             │  │
│ │ Address: 12 Ajose Adekunle, VI, Lagos               │  │
│ │ [Edit Profile]                                       │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Availability                                               │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [●] Online  [ ] Offline                            │  │
│ │                                                      │  │
│ │ Opening Hours                                        │  │
│ │ Mon: 8:00 AM – 10:00 PM                             │  │
│ │ Tue: 8:00 AM – 10:00 PM                             │  │
│ │ Wed: 8:00 AM – 10:00 PM                             │  │
│ │ Thu: 8:00 AM – 10:00 PM                             │  │
│ │ Fri: 8:00 AM – 11:00 PM                             │  │
│ │ Sat: 9:00 AM – 11:00 PM                             │  │
│ │ Sun: 9:00 AM – 9:00 PM                              │  │
│ │ [Edit Hours]                                         │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Delivery Zone                                              │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Serving: Ikeja, Victoria Island, Lekki               │  │
│ │ [Update Zone]                                        │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Admin Panel

### 4.1 Admin Overview

**Platform:** Web application (Next.js)  
**URL Pattern:** admin.quickbite.ng  
**Authentication:** Admin credentials, JWT sessions  
**Target Users:** QuickBite operations team

### 4.2 Screen 1: Admin Login

- Same style as restaurant portal login
- Credentials: admin@quickbite.ng / password

### 4.3 Screen 2: Order Management

#### Layout

```
┌──────────┬────────────────────────────────────────────────────┐
│ [Logo]   │ Orders          [Search] [Filter ▼] [Export]     │
├──────────┤                                                    │
│ Dashboard│                                                    │
│ Orders   │ Filter: [All ▼] [Today ▼] [Date range]           │
│ Riders   │                                                    │
│ Restaurants│ Order ID    │ Restaurant │ Customer│ Status │Amt │
│ Analytics│ ─────────────────────────────────────────────────│
│ Settings │ QB-284760   │ Mama's    │ Tobi A. │ Preparing│₦7k│
│          │ QB-284759   │ Buka Spot │ Ada N.  │ En Route │₦3k│
│          │ QB-284758   │ EATery    │ Emeka K.│ Delivered│₦5k│
│          │ ...                                                │
│          │                                                    │
│          │ ◀ Page 1 of 12 ▶                     [50 per page]│
└──────────┴────────────────────────────────────────────────────┘
```

#### Order Table Columns

| Column | Content |
|--------|---------|
| Order ID | Monospace #QB-XXXXXX |
| Restaurant | Restaurant name |
| Customer | First name + last initial |
| Status | Color-coded badge |
| Amount | ₦X,XXX |
| Time | 12:45 PM or date |
| Actions | View, Assign Rider, Cancel |

#### Status Badges (Admin View)

| Status | Color | Badge |
|--------|-------|-------|
| Pending Payment | Red | PENDING |
| Paid | Blue | PAID |
| Confirmed | Blue | CONFIRMED |
| Preparing | Orange | PREPARING |
| Ready | Green | READY |
| En Route | Green | EN ROUTE |
| Delivered | Green | DELIVERED |
| Cancelled | Red | CANCELLED |
| Refunded | Gray | REFUNDED |

#### Filter Options

- Status (multi-select)
- Restaurant (dropdown)
- Date range (calendar picker)
- Amount range

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton table rows (10 rows) |
| Empty | "No orders match your filters." + Clear filters button |
| Search no results | "No orders for '#QB-284XXX'." |

---

### 4.4 Screen 3: Rider Dispatch

#### Purpose
Manually assign orders to riders via third-party networks (Max.ng, Gokada).

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Rider Dispatch                                             │
├────────────────────────────────────────────────────────────┤
│ Pending Assignment (5)                                    │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ #QB-284760 • Mama's Kitchen • ₦7,100                │  │
│ │ Pickup: 12 Ajose Adekunle, VI                       │  │
│ │ Drop: 15 Admiralty Way, Lekki                       │  │
│ │ [Assign Rider ▼]                                    │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ #QB-284759 • Buka Spot • ₦3,200                    │  │
│ │ [Assign Rider ▼]                                    │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Available Riders (3)                                      │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 👤 David O.  • Max.ng  • 4.8⭐  • Active: 12:30 PM  │  │
│ │ Current order: #QB-284757 (en route)                 │  │
│ │ Last delivery: 12:15 PM                             │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 👤 Kunle A.  • Gokada  • 4.5⭐  • Available         │  │
│ │ [Assign to #284760]                                 │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

#### Assign Rider Flow

1. Admin clicks "Assign Rider" dropdown on pending order
2. Sees list of available riders (from Max.ng/Gokada contacts)
3. Selects rider → confirmation modal: "Assign #QB-284760 to David O.?"
4. Confirm → order status changes to "Rider Assigned", rider receives WhatsApp/SMS notification
5. Rider picks up, updates status on their own app
6. QuickBite receives webhook or ops team manually updates

#### Rider Card

| Element | Specification |
|---------|---------------|
| Avatar | 48px circle with initials fallback |
| Name | First name + last initial |
| Network | Max.ng / Gokada / ORide badge |
| Rating | Star rating |
| Status | "Active since X" or "Available" |
| Current order | If busy, show current order ID + status |

#### Dispatch Confirmation Modal

```
┌─────────────────────────────────────┐
│ Assign Rider                         │
├─────────────────────────────────────┤
│ Order: #QB-284760                   │
│ Restaurant: Mama's Kitchen           │
│ Rider: David O. (Max.ng)             │
│                                     │
│ Rider will receive:                 │
│ • SMS with pickup address           │
│ • Order details                     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   Confirm Assignment           │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### States

| State | Behavior |
|-------|----------|
| No pending orders | "All orders have been assigned. Check back later." |
| Rider unavailable | "David is currently on another delivery. Try Kunle." |
| Dispatch failed | "Couldn't send to rider. Try again or call rider directly." |

---

### 4.5 Screen 4: Restaurant Approval

#### Purpose
Review and approve/reject restaurant partner applications.

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Restaurant Approvals                      [Pending (4)]    │
├────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [Logo] Mama's Kitchen              ⏳ Pending        │  │
│ │ Cuisine: Nigerian Buka                                 │  │
│ │ Address: 12 Ajose Adekunle, VI, Lagos                │  │
│ │ Contact: Chinedu Okonkwo (+234 801 234 5678)          │  │
│ │ Email: mama.kitchen@gmail.com                        │  │
│ │ CAC: SC-12345678                                      │  │
│ │ Avg daily covers: 50                                  │  │
│ │                                                     │  │
│ │ [📄 View Documents]  [📞 Call]  [✉ Email]            │  │
│ │                                                     │  │
│ │ ┌────────────┐  ┌────────────┐  ┌────────────┐      │  │
│ │ │  Approve   │  │   Reject   │  │  Flag for   │      │  │
│ │ │    ✓       │  │    ✕       │  │  Review     │      │  │
│ │ └────────────┘  └────────────┘  └────────────┘      │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [Logo] EATery                    ⏳ Pending          │  │
│ │ ...                                                    │  │
│ └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

#### Application Card Details

| Field | Content |
|-------|---------|
| Restaurant name | As submitted |
| Logo | Uploaded image or placeholder |
| Cuisine type | Nigerian, Chinese, Fast Food, etc. |
| Address | Full address |
| Contact person | Name |
| Phone | Contact number |
| Email | Contact email |
| CAC number | Business registration number (optional) |
| Daily covers | Self-reported estimate |
| Documents | License, food handling certificate (downloadable) |

#### Action Buttons

| Button | Behavior |
|--------|----------|
| Approve | Confirmation: "Send onboarding email to mama.kitchen@gmail.com?" → Send credentials |
| Reject | Modal: Select reason (Incomplete info, Out of area, Doesn't meet standards, Other) + optional note |
| Flag for Review | Moves to "Under Review" tab for team discussion |
| View Documents | Opens document in new tab |
| Call/Email | Opens phone/email client |

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton application cards (3) |
| No pending | "All caught up! No pending applications." + illustration |
| Approved | Card slides out with success toast |
| Rejected | Card slides out, confirmation modal for reason |
| Flagged | Card moves to "Under Review" tab |

---

### 4.6 Screen 5: Analytics Dashboard

#### Purpose
High-level business metrics, operational data, growth indicators.

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│ Analytics                               [Today ▼] [Export] │
├────────────────────────────────────────────────────────────┤
│ Overview                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ ₦2.4M   │ │   342    │ │  ₦7,016  │ │  94.2%   │        │
│ │ GMV     │ │ Orders   │ │ AOV      │ │ Accuracy │        │
│ │ +18%    │ │ +12%     │ │ -2%      │ │ +1.2%   │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├────────────────────────────────────────────────────────────┤
│ Orders This Week                                            │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ 100k ─│                                              │  │
│ │  80k ─│            ╭──╮                              │  │
│ │  60k ─│      ╭────╯  ╰───╮                          │  │
│ │  40k ─│  ────╯           ╰────                      │  │
│ │  20k ─│                                              │  │
│ │    0 ─└───────────────────────────────────────────   │  │
│ │       Mon  Tue  Wed  Thu  Fri  Sat  Sun              │  │
│ └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ Top Restaurants (by orders)  │  Delivery Performance      │
│ 1. Mama's Kitchen: 42       │  Avg time: 42 min         │
│ 2. Buka Spot: 38            │  <30 min: 28%             │
│ 3. EATery: 31               │  30-45 min: 55%           │
│                               │  >45 min: 17%             │
├────────────────────────────────────────────────────────────┤
│ Revenue by Cuisine                                        │
│ Nigerian: ₦1.2M (52%)  ████████████                    │
│ Chinese: ₦0.6M (24%)   ██████                            │
│ Fast Food: ₦0.4M (16%) ████                              │
│ Other: ₦0.2M (8%)      ██                                │
└────────────────────────────────────────────────────────────┘
```

#### Chart Types

| Chart | Type | Used For |
|-------|------|---------|
| Line chart | Orders over time | Weekly/monthly trends |
| Bar chart | Revenue by restaurant | Top performers |
| Donut chart | Revenue by cuisine | Category mix |
| Table | Top items, top riders | Operational detail |

#### Date Range Selector

- Options: Today, Yesterday, Last 7 days, Last 30 days, This month, Custom range
- Custom range opens calendar picker
- All charts update on selection change

#### Export Function

- Export data as CSV
- Options: Current view, All data, Date range
- Filename: quickbite-analytics-[date].csv

#### States

| State | Behavior |
|-------|----------|
| Loading | Skeleton cards + chart placeholders (animated bars) |
| No data (new) | "Not enough data yet. Data will appear as orders come in." |
| Error | "Couldn't load analytics. Please try again." + retry |

---

## 5. Component Library

### 5.1 Restaurant Card (Consumer App)

#### Standard Card (Grid)

```
┌─────────────────┐
│ [Image 4:3] [♥] │  ← Image with favorite overlay
├─────────────────┤
│ Name            │  ← Poppins 600 16px, 1 line max
│ Cuisine • Tags   │  ← Inter 400 13px, #666666, 1 line
│ ⭐ 4.5 • 25-35min│  ← Inter 400 13px
│ ₦1,500 min      │  ← Inter 400 13px
└─────────────────┘
```

| State | Visual |
|-------|--------|
| Default | As above |
| Loading | Shimmer skeleton, image area gray, text lines gray |
| Closed | Image 50% opacity, "Closed" banner overlay |
| Favorited | Heart icon filled orange |
| Out of delivery zone | Grayed out, "Not delivering here" badge |

#### Wide / Featured Card

```
┌─────────────────────────────────────────────────┐
│ [Image 16:9]                      [Featured]   │
│                                      [♥]        │
├─────────────────────────────────────────────────┤
│ Featured Restaurant Name                        │
│ Nigerian • Buka                                 │
│ ⭐ 4.5 (234) • 0.8 km • 25-35 min              │
│ ₦1,500 minimum • ₦60 delivery                   │
└─────────────────────────────────────────────────┘
```

---

### 5.2 Food Item Card (Consumer App)

```
┌─────────────────────────────────────────────────┐
│ [Image]  │ Dish Name                      ₦1,200 │
│  100x100 │ Description text here...            │ │
│          │                              [+]   │ │
└─────────────────────────────────────────────────┘
```

| State | Visual |
|-------|--------|
| Default | As above |
| Loading | Shimmer skeleton |
| Out of stock | Grayed image, "Unavailable" badge, + disabled |
| Unavailable | 50% opacity, strikethrough price |
| In cart | "+" becomes quantity badge (e.g., "2") |

#### Expanded / Customizable View

See Section 2.8 for expanded bottom sheet design.

---

### 5.3 Search Bar (Consumer App)

```
┌─────────────────────────────────────────────────┐
│ 🔍  Search restaurants or dishes...         [×] │
└─────────────────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Container | 48px height, background #F8F9FA, border-radius 24px |
| Icon | 20px search icon, #999999, left, 16px padding |
| Text | "Search restaurants or dishes" — Inter 400 15px, #999999 |
| Clear button | X icon, right, appears when text present |
| Active/focus | Background white, border 1.5px #E85D04, shadow Elevation 1 |

#### Auto-suggest Dropdown

```
┌─────────────────────────────────────────────────┐
│ Restaurants                                     │
│ 🔍 Mama's Kitchen (Nigerian)                   │
│ 🔍 Mama's Dishes (Buka)                        │
├─────────────────────────────────────────────────┤
│ Dishes                                          │
│ 🍜 Jollof Rice (Mama's Kitchen)                │
│ 🍜 Fried Rice (EATery)                         │
└─────────────────────────────────────────────────┘
```

- Dropdown: white background, Elevation 2 shadow, border-radius 12px
- Section headers: Inter 500 12px, #999999, uppercase
- Items: Inter 400 14px, 48px height, hover background #F8F9FA
- Tapping suggestion navigates to result

---

### 5.4 Bottom Navigation (Consumer App)

```
┌─────────────────────────────────────────────────┐
│   🏠        🔍         📋         👤           │
│  Home    Search    Orders    Profile           │
│   ●         ○         ○         ○             │  ← Active dot under home
└─────────────────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Height | 64px + safe area (34px on iPhone X+) |
| Background | White, top border 1px #E5E5E5 |
| Icons | 24px, inactive #999999, active #E85D04 |
| Labels | Inter 500 11px, inactive #999999, active #E85D04 |
| Active indicator | Dot 4px below icon, #E85D04 |
| Press animation | Icon scales 0.9 → 1.0, 100ms |
| Cart badge | Red circle (#DC3545), white text, top-right of Orders icon |

---

### 5.5 Order Tracker (Consumer App)

#### Compact (In-line status bar)

```
┌─────────────────────────────────────────────────┐
│ 🛵 En route • ETA 12:45 PM (8 min)     [Track →]│
└─────────────────────────────────────────────────┘
```

- Tap "Track →" expands to full tracking screen

#### Full Tracker (Tracking Screen)

See Section 2.12 for complete layout.

#### Map View

| Element | Specification |
|---------|---------------|
| Provider | Google Maps SDK or Mapbox |
| Pins | Custom markers: restaurant (orange), delivery (green), rider (motorcycle icon) |
| Route | Dashed line, orange |
| Rider icon | Animated motorcycle, rotates to face direction of travel |
| Auto-zoom | Fits all markers + route in view, min zoom 12, max zoom 18 |
| Tap map | Toggle between default view and full-screen |

#### Status Stepper (Vertical)

| Step | Icon | Color | Description |
|------|------|-------|-------------|
| Confirmed | ● | Orange | "Order received" |
| Preparing | ● | Orange | "Restaurant is preparing" |
| Rider Assigned | ● | Orange | "Rider is on the way" |
| En Route | ● | Green | "Out for delivery" |
| Arriving | ● | Green | "Almost there!" |
| Delivered | ✓ | Green | "Delivered" |

- Completed: filled icon, checkmark
- Current: pulsing ring animation (2s loop)
- Future: hollow circle

---

### 5.6 Rating Stars (Consumer App)

```
┌─────────────────────────────────────────────────┐
│ ☆ ☆ ☆ ☆ ☆                                      │
└─────────────────────────────────────────────────┘
```

| State | Visual |
|-------|--------|
| Empty | All stars outlined, #CCCCCC |
| Partial (1.5) | First star half-filled gold, rest gray |
| Filled (5) | All stars filled gold (#FFB703) |
| Tap feedback | Star scales 1.0 → 1.2 → 1.0, 200ms |
| Hover (web) | Stars fill up to hovered star |

#### Rating Labels

| Rating | Label | Color |
|--------|-------|-------|
| 1 | Terrible | Red (#DC3545) |
| 2 | Bad | Orange (#FD7E14) |
| 3 | Okay | Yellow (#FFC107) |
| 4 | Good | Light Green (#40916C) |
| 5 | Great | Green (#198754) |

---

### 5.7 CTA Buttons

#### Primary Button

```
┌─────────────────────────────────────────────────┐
│              Place Order ₦3,750                │
└─────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 56px |
| Background | #E85D04 (Burnt Orange) |
| Text | White, Poppins 600 16px, letter-spacing 0.04em |
| Border radius | 12px |
| Disabled | Background #CCCCCC, text #888888 |
| Loading | Spinner replaces text, background stays same |
| Press | Background darkens to #D45103, scale 0.98, 100ms |

#### Secondary Button

```
┌─────────────────────────────────────────────────┐
│            [ View Cart ]                       │
└─────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 56px |
| Background | Transparent |
| Border | 2px #E85D04 |
| Text | #E85D04, Poppins 600 16px |
| Border radius | 12px |
| Press | Background #FFF5EE |

#### Ghost Button / Text Link

```
┌─────────────────────────────────────────────────┐
│                  Forgot password?                │
└─────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Style | Inter 500 14px, #E85D04, no background |
| Press | Underline appears, 100ms |

#### Icon Button

```
┌───┐
│ + │  ← 36px circle, 2px orange border, white +
└───┘
```

| Property | Value |
|----------|-------|
| Size | 36px diameter |
| Background | White |
| Border | 2px #E85D04 |
| Icon | + (plus), 20px, #E85D04 |
| Press | Background #FFF5EE |

#### Floating Action Button (Cart)

```
┌─────────────────────┐
│  🛒  (3)           │  ← Orange pill, white text + count badge
└─────────────────────┘
```

| Property | Value |
|----------|-------|
| Shape | Pill/rounded rectangle |
| Background | #E85D04 |
| Icon + Text | White, Inter 600 14px |
| Badge | Red circle (#DC3545) with white count, top-right |
| Position | Bottom center, 16px above bottom nav |
| Bounce on add | Scale 1 → 1.15 → 1, 200ms spring |
| Tap | Opens cart bottom sheet |

---

### 5.8 Common Component States

#### Loading States

| Component | Loading State |
|-----------|---------------|
| Card list | 3 skeleton cards with shimmer animation |
| Full page | Centered spinner (64px, orange) + "Loading..." text |
| Button | Text replaced with spinner, button disabled |
| Map | Gray placeholder with centered spinner |
| Image | Gray placeholder with spinner |
| Form submit | Button shows spinner, form fields disabled |

#### Empty States

| Screen | Empty State Content |
|--------|---------------------|
| Cart | Plate illustration + "Your cart is empty" + "Browse Restaurants" button |
| Orders | Illustration + "No orders yet" + "Place your first order" |
| Search (no results) | "No results for '[query]'" + suggestions |
| Restaurant menu | "No items in this category yet" |

#### Error States

| Context | Error State |
|---------|-------------|
| Network error | "Connection lost. Check your internet." + "Try Again" button |
| Payment failed | "Payment failed. Please try again or use a different method." |
| Order not found | "Order not found" + "Go Home" button |
| Server error | "Something went wrong. We're on it." + retry button |
| Location denied | "Enable location to see nearby restaurants" + "Enable" button |

---

### 5.9 Typography Styles Quick Reference

| Style Name | Font | Size | Weight | Line Height | Usage |
|------------|------|------|--------|-------------|-------|
| display | Poppins | 32px | 700 | 40px | Onboarding hero |
| h1 | Poppins | 28px | 700 | 36px | Screen titles |
| h2 | Poppins | 24px | 600 | 32px | Section headers |
| h3 | Poppins | 20px | 600 | 28px | Card titles |
| h4 | Poppins | 18px | 600 | 24px | Subsection headers |
| body-lg | Inter | 16px | 400 | 24px | Primary body |
| body | Inter | 14px | 400 | 20px | Secondary body |
| body-sm | Inter | 13px | 400 | 18px | Captions |
| caption | Inter | 12px | 400 | 16px | Helper text |
| button | Inter | 16px | 600 | 24px | Button text |
| tab | Inter | 12px | 500 | 16px | Bottom nav |
| badge | Inter | 11px | 600 | 14px | Status badges |

---

### 5.10 Spacing Token Reference

| Token | Value | Common Usage |
|-------|-------|--------------|
| space-1 | 4px | Icon-to-label gap |
| space-2 | 8px | Button internal padding |
| space-3 | 12px | List item padding, chip padding |
| space-4 | 16px | Card padding, screen margins |
| space-5 | 20px | Section padding |
| space-6 | 24px | Section gaps |
| space-8 | 32px | Large separators |
| space-10 | 40px | Screen top/bottom padding |
| space-12 | 48px | Large section breaks |
| space-16 | 64px | Onboarding page padding |
| space-20 | 80px | Maximum safe area |

---

*Document maintained by: QuickBite Product Team*  
*Last updated: May 28, 2026*  
*Status: Ready for Development handoff*