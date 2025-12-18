# Church Landing Page Design Guidelines

## Design Approach
**Reference-Based Design** drawing from Airbnb's warmth and community focus + Apple's clarity and minimalism. This creates a welcoming, inspiring experience while maintaining professional credibility.

**Core Principle:** Warmth through generosity of space, clarity through intentional hierarchy, community through authentic imagery.

---

## Typography System

**Font Families:**
- Primary: Inter or Open Sans (body text, navigation, forms)
- Display: Playfair Display or Cormorant (hero headlines, section titles)

**Hierarchy:**
- Hero Headline: 4xl-6xl, display font, font-bold
- Section Titles: 3xl-4xl, display font, font-semibold
- Subsection Headers: xl-2xl, primary font, font-semibold
- Body Text: base-lg, primary font, font-normal, leading-relaxed
- Captions/Meta: sm-base, primary font, font-medium

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section vertical spacing: py-16 to py-24 (mobile), py-20 to py-32 (desktop)
- Content gaps: gap-6 to gap-12

**Container Strategy:**
- Full-width sections with inner `max-w-7xl mx-auto px-6`
- Text-heavy content: `max-w-4xl`
- Forms: `max-w-2xl`

---

## Page Structure & Sections

### 1. Hero Section (100vh on desktop, auto on mobile)
- Full-width background image: Warm church interior or gathering community
- Centered content overlay with blurred background buttons
- Church name (display font, 5xl-6xl)
- Inspiring tagline (lg-xl, lighter weight)
- Primary CTA: "Join Us This Sunday" + Secondary: "Watch Online"
- Scroll indicator at bottom

### 2. Welcome/About Section (py-24)
**Two-column layout (lg:grid-cols-2):**
- Left: Mission statement + welcoming paragraph (max-w-prose)
- Right: Image of pastor or community gathering
- Include trust indicators: "Serving [City] since [Year]" + "Join 500+ members"

### 3. Service Times (py-20)
**Card-based layout with 2-3 columns (md:grid-cols-2 lg:grid-cols-3):**
- Each service as elevated card (shadow-lg, rounded-xl)
- Service name, time, description, audience
- Icon for service type (traditional, contemporary, etc.)
- "Plan Your Visit" button

### 4. Ministries Showcase (py-24)
**Masonry-style grid (md:grid-cols-2 lg:grid-cols-3, gap-8):**
- Ministry cards with image, title, brief description
- Include: Youth, Children, Music, Outreach, Small Groups, Seniors
- Each card links to more info
- Mix of card heights for visual interest

### 5. Upcoming Events (py-20)
**Timeline or calendar preview:**
- 3-4 featured upcoming events
- Date badge, event name, location, register button
- Single column on mobile, 2 columns on desktop

### 6. Location & Contact (py-24)
**Split layout (lg:grid-cols-2):**
- Left: Contact form (name, email, message, subject dropdown)
- Right: Address, phone, email, office hours + embedded map placeholder
- Add "Need Prayer?" quick link

### 7. Footer (py-16)
**Multi-column footer (grid-cols-2 md:grid-cols-4):**
- Column 1: Church logo, short mission
- Column 2: Quick links (About, Ministries, Events, Give)
- Column 3: Service times summary
- Column 4: Social media icons, newsletter signup
- Bottom bar: Copyright, privacy policy

---

## Component Library

**Navigation:**
- Sticky header with blur backdrop
- Logo left, nav links center, "Give" CTA button right
- Mobile: Hamburger menu with slide-out drawer

**Buttons:**
- Primary: Rounded-lg, px-8 py-3, font-semibold
- Secondary: Outline variant
- Hero buttons: Backdrop blur (backdrop-blur-md) with semi-transparent backgrounds

**Cards:**
- Rounded-xl, shadow-md, hover:shadow-xl transition
- Generous padding (p-6 to p-8)
- Image aspect ratios: 16:9 or 4:3

**Forms:**
- Input fields: rounded-lg, border, px-4 py-3
- Labels: font-medium, mb-2
- Focus states: ring offset pattern

**Icons:**
- Use Heroicons via CDN
- Consistent sizing: w-6 h-6 for inline, w-8 h-8 for features

---

## Images

**Required Images:**
1. **Hero:** Full-width inspiring church interior with natural light OR community gathering (warmth priority)
2. **About Section:** Pastor/leadership or community service image
3. **Ministry Cards:** 6 ministry-specific images (youth group, worship team, children's ministry, etc.)
4. **Events:** 3-4 event thumbnails
5. **Map:** Embedded Google Maps or placeholder

**Image Treatment:** Subtle overlays for text readability, rounded corners on content images (rounded-lg to rounded-xl)

---

## Responsive Strategy

**Breakpoints:**
- Mobile-first: Stack all multi-column layouts
- md (768px): 2-column grids where appropriate
- lg (1024px): Full multi-column layouts
- Hero: Reduce text size by 2 levels on mobile

**Mobile Optimizations:**
- Reduce section padding (py-12 instead of py-24)
- Single column forms and content
- Simplified navigation (hamburger menu)
- Touch-friendly button sizes (min 44px height)

---

This design creates a warm, welcoming digital home that reflects the church's community spirit while maintaining professional credibility and clear pathways to engagement.