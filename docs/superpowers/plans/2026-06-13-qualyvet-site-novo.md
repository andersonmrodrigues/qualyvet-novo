# Qualyvet Site Novo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 16-page static website for Qualyvet Consultoria replacing the broken template-based current site with a clean, responsive, conversion-focused design.

**Architecture:** Pure HTML + CSS (custom properties) + Vanilla JS. No build system, no frameworks, no jQuery. Shared header/footer repeated across pages. One CSS file (`assets/css/style.css`) defines the entire design system. One JS file (`assets/js/main.js`) handles nav, scroll, and article filtering.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JS ES6, Google Fonts (Roboto + Roboto Slab), Font Awesome 6 CDN.

**Assets source:** Copy all images from `/Users/andersonrodrigues/iCloud Drive (Archive)/Desktop/Workspace/qualyvet/assets/images/` into `assets/images/`.

**Reference design:** `homepage-light.html` in `.superpowers/brainstorm/` — white/light background, green accents, split-screen hero, dark footer.

---

## Phase 1 — Foundation

### Task 1: Project setup + copy assets

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`
- Create: `assets/images/` (copy from source)

- [ ] **Step 1: Create directory structure**

```bash
cd "/Users/andersonrodrigues/iCloud Drive (Archive)/Desktop/Workspace/qualyvet-site-novo"
mkdir -p assets/css assets/js assets/images servicos artigos
```

- [ ] **Step 2: Copy all images from existing site**

```bash
cp "/Users/andersonrodrigues/iCloud Drive (Archive)/Desktop/Workspace/qualyvet/assets/images/"* \
   assets/images/
```

- [ ] **Step 3: Create style.css with full design system**

```css
/* =============================================
   QUALYVET — Design System
   ============================================= */

/* --- Custom Properties --- */
:root {
  --color-primary:       #2f6535;
  --color-primary-dark:  #1a3d1f;
  --color-primary-light: #4a8c52;
  --color-accent:        #99b533;
  --color-text:          #1e1e1e;
  --color-text-muted:    #666666;
  --color-surface:       #f4f7f4;
  --color-bg:            #ffffff;
  --color-border:        #e0e8e0;
  --color-footer:        #111e12;
  --color-whatsapp:      #25d366;

  --radius:     12px;
  --radius-sm:  6px;
  --shadow-sm:  0 1px 4px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 16px rgba(47,101,53,0.10);
  --shadow-lg:  0 8px 24px rgba(47,101,53,0.14);
  --transition: .2s ease;
}

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Roboto', sans-serif; background: var(--color-bg); color: var(--color-text); line-height: 1.6; }
img { max-width: 100%; display: block; }
a { text-decoration: none; }

/* --- Typography --- */
h1, h2 { font-family: 'Roboto Slab', serif; font-weight: 900; line-height: 1.1; color: var(--color-primary-dark); }
h3, h4 { font-weight: 700; color: var(--color-primary-dark); }
h1 { font-size: clamp(32px, 5vw, 52px); }
h2 { font-size: clamp(26px, 3.5vw, 36px); }
h3 { font-size: 18px; }
p  { font-size: 15px; color: var(--color-text-muted); line-height: 1.75; }

.section-label {
  display: block;
  font-size: 11px; font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase; letter-spacing: 2px;
  margin-bottom: 10px;
}

/* --- Layout --- */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
section { padding: 80px 0; }
section.surface { background: var(--color-surface); }
section.dark    { background: var(--color-primary-dark); }

/* --- Buttons --- */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 8px;
  font-size: 14px; font-weight: 700;
  transition: opacity var(--transition), transform var(--transition);
  cursor: pointer; border: none;
}
.btn:hover { opacity: .9; transform: translateY(-1px); }
.btn-whatsapp { background: var(--color-whatsapp); color: #fff; box-shadow: 0 4px 12px rgba(37,211,102,.3); }
.btn-outline   { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
.btn-white     { background: #fff; color: var(--color-primary); }
.btn-ghost     { background: transparent; color: rgba(255,255,255,.85); border: 1.5px solid rgba(255,255,255,.3); }

/* --- Badges --- */
.badge-green { display: inline-block; padding: 4px 12px; border-radius: 30px; font-size: 11px; font-weight: 700; background: #f0f7f0; color: var(--color-primary); border: 1px solid #b8d4b8; }
.badge-lime  { display: inline-block; padding: 4px 12px; border-radius: 30px; font-size: 11px; font-weight: 700; background: #f5f8e8; color: #6a7e1a;              border: 1px solid #c8d870; }
.badge-tag   { display: inline-flex; align-items: center; gap: 6px; background: #f0f7f0; border: 1px solid #b8d4b8; color: var(--color-primary); padding: 5px 14px; border-radius: 30px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
.badge-tag::before { content: ''; width: 6px; height: 6px; background: var(--color-primary); border-radius: 50%; }

/* =============================================
   HEADER
   ============================================= */
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: #fff;
  height: 68px;
  display: flex; align-items: center;
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 8px rgba(47,101,53,.06);
  transition: box-shadow var(--transition);
}
.site-header.scrolled { box-shadow: 0 2px 16px rgba(47,101,53,.12); }
.header-inner {
  width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.site-logo { display: flex; align-items: center; gap: 10px; }
.site-logo img { height: 44px; width: auto; }
.site-logo .logo-text { font-family: 'Roboto Slab', serif; font-size: 20px; font-weight: 900; color: var(--color-primary-dark); }
.site-logo .logo-text span { color: var(--color-primary); }

.main-nav { display: flex; align-items: center; gap: 6px; }
.main-nav a { font-size: 13px; font-weight: 500; color: #555; padding: 6px 10px; border-radius: 6px; transition: color var(--transition), background var(--transition); }
.main-nav a:hover, .main-nav a.active { color: var(--color-primary); background: var(--color-surface); }

.header-actions { display: flex; align-items: center; gap: 8px; }
.btn-platform { font-size: 12px; font-weight: 600; color: var(--color-primary); border: 1.5px solid var(--color-primary); padding: 8px 14px; border-radius: 7px; transition: background var(--transition); }
.btn-platform:hover { background: var(--color-surface); }

/* Hamburger */
.nav-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
.nav-toggle span { display: block; width: 24px; height: 2px; background: var(--color-primary-dark); border-radius: 2px; transition: var(--transition); }

/* =============================================
   HERO
   ============================================= */
.hero {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 68px);
  overflow: hidden;
}
.hero-left {
  background: #fff;
  padding: 80px 48px 80px 64px;
  display: flex; flex-direction: column; justify-content: center;
}
.hero-left .badge-tag { margin-bottom: 28px; }
.hero-left h1 { margin-bottom: 20px; }
.hero-left p { font-size: 16px; max-width: 420px; margin-bottom: 36px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.hero-right {
  position: relative;
  background: url('../images/qualyvet.jpg') center/cover no-repeat;
}
.hero-right::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,.75) 0%, rgba(47,101,53,.15) 100%);
}
.hero-stats {
  position: absolute; bottom: 40px; left: 40px; right: 40px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
.stat-card {
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(47,101,53,.15);
  border-radius: var(--radius); padding: 18px;
  box-shadow: var(--shadow-md);
}
.stat-card.green { background: rgba(47,101,53,.88); border-color: transparent; }
.stat-card .stat-num { font-family: 'Roboto Slab', serif; font-size: 32px; font-weight: 900; color: var(--color-primary); line-height: 1; }
.stat-card.green .stat-num { color: var(--color-accent); }
.stat-card .stat-label { font-size: 10px; color: #777; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
.stat-card.green .stat-label { color: rgba(255,255,255,.65); }

/* =============================================
   BADGES BAR
   ============================================= */
.badges-bar {
  background: #fff;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 14px 0;
}
.badges-bar .container { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.badges-bar .label { font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-right: 6px; }

/* =============================================
   STATS STRIP
   ============================================= */
.stats-strip { background: var(--color-primary-dark); padding: 32px 0; }
.stats-strip .container { display: flex; justify-content: space-around; align-items: center; }
.strip-stat { text-align: center; }
.strip-num { font-family: 'Roboto Slab', serif; font-size: 38px; font-weight: 900; color: var(--color-accent); line-height: 1; }
.strip-label { font-size: 11px; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
.strip-divider { width: 1px; height: 48px; background: rgba(255,255,255,.1); }

/* =============================================
   SERVICES GRID
   ============================================= */
.services-section { background: var(--color-surface); }
.services-intro { text-align: center; max-width: 600px; margin: 0 auto 48px; }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

.service-card {
  background: #fff; border-radius: var(--radius);
  padding: 28px 24px;
  border: 1.5px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  transition: box-shadow var(--transition), transform var(--transition);
}
.service-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.service-card.lime { border-top-color: var(--color-accent); }
.service-card.dark-card {
  background: var(--color-primary-dark);
  border-color: var(--color-primary);
  border-top-color: var(--color-accent);
}
.service-icon { font-size: 30px; margin-bottom: 14px; }
.service-card h3 { font-size: 15px; margin-bottom: 8px; }
.service-card.dark-card h3 { color: #fff; }
.service-card p { font-size: 13px; margin-bottom: 14px; }
.service-card.dark-card p { color: rgba(255,255,255,.6); }
.service-link { font-size: 12px; font-weight: 700; color: var(--color-primary); }
.service-card.dark-card .service-link { color: var(--color-accent); }

/* =============================================
   ABOUT SPLIT
   ============================================= */
.about-section { background: #fff; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 400px; }
.about-content { padding: 64px 48px 64px 64px; display: flex; flex-direction: column; justify-content: center; }
.about-content h2 { margin-bottom: 20px; }
.about-content p { margin-bottom: 14px; }
.about-img {
  background: url('../images/qualyvet.jpg') center/cover no-repeat;
  position: relative;
}
.about-img::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to left, transparent 60%, #fff); }

/* =============================================
   QUALYSYS
   ============================================= */
.qualysys-section { background: var(--color-primary-dark); }
.qualysys-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.qualysys-text .section-label { color: var(--color-accent); }
.qualysys-text h2 { color: #fff; margin-bottom: 16px; }
.qualysys-text p { color: rgba(255,255,255,.65); margin-bottom: 24px; }
.qualysys-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.qualysys-mockup {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius); min-height: 200px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.3); font-size: 13px;
  overflow: hidden;
}
.qualysys-mockup img { width: 100%; height: 100%; object-fit: cover; }

/* =============================================
   TESTIMONIALS
   ============================================= */
.testimonials-section { background: var(--color-surface); }
.testimonials-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.testimonial-card { background: #fff; border-radius: var(--radius); padding: 28px; border: 1.5px solid var(--color-border); border-left: 4px solid var(--color-primary); }
.testimonial-card:nth-child(2) { border-left-color: var(--color-accent); }
.testimonial-text { font-size: 14px; color: #444; font-style: italic; line-height: 1.75; margin-bottom: 20px; }
.testimonial-author { display: flex; align-items: center; gap: 10px; }
.author-avatar { width: 38px; height: 38px; background: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.testimonial-card:nth-child(2) .author-avatar { background: var(--color-accent); }
.author-name { font-size: 13px; font-weight: 700; color: var(--color-primary-dark); }
.author-role { font-size: 11px; color: #888; }

/* =============================================
   ARTICLES
   ============================================= */
.articles-section { background: #fff; }
.articles-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; }
.articles-header a { font-size: 13px; color: var(--color-primary); font-weight: 700; border-bottom: 1.5px solid var(--color-primary); padding-bottom: 2px; }
.articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

.article-card { background: var(--color-surface); border-radius: var(--radius); overflow: hidden; border: 1.5px solid var(--color-border); transition: box-shadow var(--transition), transform var(--transition); }
.article-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.article-img { height: 140px; background: var(--color-border); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.article-img img { width: 100%; height: 100%; object-fit: cover; }
.article-body { padding: 16px; }
.article-cat { font-size: 10px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.article-card h3 { font-size: 14px; font-weight: 700; color: var(--color-primary-dark); line-height: 1.4; }

/* =============================================
   CTA SECTION
   ============================================= */
.cta-section { background: var(--color-primary); text-align: center; }
.cta-section .section-label { color: var(--color-accent); }
.cta-section h2 { color: #fff; margin-bottom: 14px; }
.cta-section p { color: rgba(255,255,255,.75); max-width: 520px; margin: 0 auto 36px; font-size: 16px; }
.cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* =============================================
   FOOTER
   ============================================= */
.site-footer { background: var(--color-footer); padding: 56px 0 32px; }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer-brand { font-family: 'Roboto Slab', serif; font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 16px; }
.footer-brand span { color: var(--color-accent); }
.footer-info p { font-size: 12px; color: rgba(255,255,255,.4); line-height: 2.1; }
.footer-col-title { font-size: 10px; font-weight: 700; color: var(--color-accent); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; }
.footer-col a { display: block; font-size: 12px; color: rgba(255,255,255,.4); line-height: 2.1; transition: color var(--transition); }
.footer-col a:hover { color: rgba(255,255,255,.8); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,.06); padding-top: 24px; font-size: 11px; color: rgba(255,255,255,.2); text-align: center; }

/* =============================================
   PAGE HERO (inner pages)
   ============================================= */
.page-hero {
  background: var(--color-primary-dark);
  padding: 64px 0 56px;
}
.breadcrumb { font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 12px; }
.breadcrumb a { color: rgba(255,255,255,.5); }
.breadcrumb a:hover { color: rgba(255,255,255,.8); }
.breadcrumb span { color: rgba(255,255,255,.8); }
.page-hero h1 { color: #fff; font-size: clamp(28px, 4vw, 44px); margin-bottom: 12px; }
.page-hero p { color: rgba(255,255,255,.7); font-size: 16px; max-width: 600px; }

/* =============================================
   SERVICE PAGE
   ============================================= */
.service-detail { background: #fff; }
.service-detail-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: start; }
.service-detail-img { border-radius: var(--radius); overflow: hidden; }
.service-detail-img img { width: 100%; height: 360px; object-fit: cover; }
.checklist { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
.checklist li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; }
.checklist li::before { content: '✓'; color: var(--color-primary); font-weight: 900; flex-shrink: 0; margin-top: 1px; }

.related-services { background: var(--color-surface); }
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

/* =============================================
   ARTICLE PAGE
   ============================================= */
.article-layout { background: #fff; }
.article-layout .container { display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start; }
.article-content { max-width: 720px; }
.article-content h2 { font-size: 24px; margin: 36px 0 14px; }
.article-content h3 { font-size: 18px; margin: 28px 0 10px; }
.article-content p  { font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 16px; }
.article-content ul { margin: 0 0 16px 20px; }
.article-content ul li { font-size: 15px; color: #444; line-height: 1.75; }
.article-meta { display: flex; gap: 16px; align-items: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--color-border); }
.article-meta span { font-size: 12px; color: #888; }
.article-sidebar { position: sticky; top: 88px; display: flex; flex-direction: column; gap: 20px; }
.sidebar-cta { background: var(--color-primary-dark); border-radius: var(--radius); padding: 24px; }
.sidebar-cta h3 { color: #fff; font-size: 16px; margin-bottom: 10px; }
.sidebar-cta p { color: rgba(255,255,255,.65); font-size: 13px; margin-bottom: 16px; }
.sidebar-related { background: var(--color-surface); border-radius: var(--radius); padding: 20px; }
.sidebar-related h4 { font-size: 13px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 14px; }
.sidebar-related a { display: block; font-size: 12px; color: var(--color-primary); line-height: 1.6; margin-bottom: 8px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
.sidebar-related a:last-child { border-bottom: none; margin-bottom: 0; }

/* =============================================
   ARTICLES INDEX
   ============================================= */
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.filter-btn { padding: 7px 16px; border-radius: 30px; font-size: 12px; font-weight: 700; border: 1.5px solid var(--color-border); background: #fff; color: #555; cursor: pointer; transition: all var(--transition); }
.filter-btn.active, .filter-btn:hover { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.articles-index-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* =============================================
   CONTACT / WORK-WITH PAGE
   ============================================= */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.contact-info h3 { font-size: 16px; margin-bottom: 8px; color: var(--color-primary-dark); }
.contact-info p { font-size: 14px; color: #555; margin-bottom: 20px; }
.contact-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
.contact-icon { width: 40px; height: 40px; background: var(--color-surface); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--color-primary); font-size: 16px; flex-shrink: 0; }

/* =============================================
   RESPONSIVE
   ============================================= */

/* Tablet */
@media (max-width: 1024px) {
  section { padding: 60px 0; }
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero-left { padding: 60px 24px; }
  .hero-right { min-height: 400px; }
  .hero-stats { position: relative; bottom: auto; left: auto; right: auto; margin: 0 24px 24px; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; }
  .about-img { min-height: 300px; order: -1; }
  .about-img::before { display: none; }
  .about-content { padding: 48px 24px; }
  .qualysys-grid { grid-template-columns: 1fr; gap: 32px; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .service-detail-grid { grid-template-columns: 1fr; }
  .article-layout .container { grid-template-columns: 1fr; }
  .article-sidebar { position: static; }
  .contact-grid { grid-template-columns: 1fr; }
  .stats-strip .container { flex-wrap: wrap; gap: 24px; }
  .strip-divider { display: none; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 768px) {
  section { padding: 48px 0; }
  h1 { font-size: 32px; }
  h2 { font-size: 24px; }

  .main-nav, .header-actions .btn-platform { display: none; }
  .nav-toggle { display: flex; }

  .main-nav.open {
    display: flex; flex-direction: column;
    position: fixed; inset: 68px 0 0;
    background: #fff; padding: 24px;
    gap: 4px; z-index: 99;
    border-top: 1px solid var(--color-border);
  }
  .main-nav.open a { font-size: 16px; padding: 12px 16px; border-radius: 8px; }

  .hero-left { padding: 40px 20px; }
  .hero-left h1 { font-size: 32px; }
  .hero-left p { font-size: 14px; }
  .hero-right { min-height: 280px; }
  .hero-stats { grid-template-columns: 1fr 1fr; gap: 8px; margin: 0 16px 16px; }
  .stat-card { padding: 12px; }
  .stat-card .stat-num { font-size: 24px; }

  .services-grid { grid-template-columns: 1fr; }
  .articles-grid { grid-template-columns: 1fr; }
  .articles-index-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
  .related-grid { grid-template-columns: 1fr; }

  .cta-section h2 { font-size: 26px; }
  .badges-bar .container { gap: 6px; }
  .strip-num { font-size: 28px; }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .cta-actions { flex-direction: column; align-items: center; }
  .cta-actions .btn { width: 100%; max-width: 320px; justify-content: center; }
}
```

- [ ] **Step 4: Create main.js**

```js
/* Qualyvet — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky header shadow ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Nav hamburger toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Article filter (artigos/index.html) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card[data-cat]');
  if (filterBtns.length && articleCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        articleCards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

});
```

- [ ] **Step 5: Verify files exist**

```bash
ls assets/css/style.css assets/js/main.js assets/images/qualyvet.png
```

Expected: all three files listed without errors.

- [ ] **Step 6: Commit**

```bash
git init
git add assets/
git commit -m "feat: add design system CSS, main.js and copy image assets"
```

---

### Task 2: Shared HTML snippet (header + footer)

**Files:**
- Reference only — header and footer HTML is repeated in every page

The header and footer HTML below are pasted into EVERY page. Keep a copy of this task open while building pages.

**Header snippet** (paste inside `<body>`, before page content):
```html
<header class="site-header">
  <div class="header-inner">
    <a href="/index.html" class="site-logo">
      <img src="/assets/images/qualyvet.png" alt="Qualyvet Consultoria">
    </a>
    <nav class="main-nav" aria-label="Menu principal">
      <a href="/index.html">Início</a>
      <a href="/sobre.html">Quem Somos</a>
      <a href="/servicos/gestao-de-qualidade.html">Serviços</a>
      <a href="/artigos/index.html">Artigos</a>
      <a href="/contato.html">Contato</a>
    </nav>
    <div class="header-actions">
      <a href="https://plataforma.qualyvetconsultoria.com.br/" target="_blank" rel="noopener" class="btn-platform">🔐 Plataforma</a>
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp">💬 WhatsApp</a>
      <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
```

**Footer snippet** (paste before `</body>`):
```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-info">
        <div class="footer-brand">Qualyvet<span>.</span></div>
        <p>R. Ver. Ivo Cláudio Weigel, 228<br>Renascença — Santa Cruz do Sul / RS</p>
        <p>(51) 3121-3066</p>
        <p>contato@qualyvetconsultoria.com.br</p>
        <p style="margin-top:16px; font-size:11px; color:rgba(255,255,255,.2);">CNPJ 24.184.899/0001-08</p>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Serviços</div>
        <a href="/servicos/gestao-de-qualidade.html">Gestão de Qualidade</a>
        <a href="/servicos/planejamento-industrial.html">Planejamento Industrial</a>
        <a href="/servicos/treinamento-e-capacitacao.html">Treinamento</a>
        <a href="/servicos/assessoria-e-consultoria.html">Assessoria e Consultoria</a>
        <a href="/servicos/acompanhamento-de-processos.html">Acompanhamento</a>
        <a href="/servicos/sistemas-informatizados.html">Sistema QualySys</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Artigos</div>
        <a href="/artigos/o-que-e-sif.html">O que é o SIF?</a>
        <a href="/artigos/sisbi-poa-vs-sif.html">SISBI-POA vs SIF</a>
        <a href="/artigos/programas-de-autocontrole.html">Programas de Autocontrole</a>
        <a href="/artigos/como-obter-registro-mapa.html">Como obter registro MAPA</a>
        <a href="/artigos/haccp-o-que-e.html">O que é HACCP?</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Links</div>
        <a href="/index.html">Início</a>
        <a href="/sobre.html">Quem Somos</a>
        <a href="/trabalhe-conosco.html">Trabalhe Conosco</a>
        <a href="https://plataforma.qualyvetconsultoria.com.br/" target="_blank">Plataforma QualySys</a>
        <a href="/contato.html">Contato</a>
      </div>
    </div>
    <div class="footer-bottom">© 2025 Qualyvet Consultoria e Assessoria LTDA. Todos os direitos reservados.</div>
  </div>
</footer>
```

**Note:** For pages inside `/servicos/` and `/artigos/`, change absolute paths to relative: `/assets/` → `../assets/`, `/index.html` → `../index.html`, etc.

---

## Phase 2 — Homepage

### Task 3: index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Qualyvet Consultoria | Gestão da Qualidade Agroindustrial</title>
  <meta name="description" content="Consultoria especializada em Produtos de Origem Animal: programas de autocontrole, registro SIF/SIE/SIM/SISBI-POA, planejamento industrial e treinamento. Rio Grande do Sul.">
  <meta property="og:title" content="Qualyvet Consultoria | Gestão da Qualidade Agroindustrial">
  <meta property="og:description" content="Consultoria especializada em Produtos de Origem Animal no Rio Grande do Sul.">
  <meta property="og:image" content="https://qualyvetconsultoria.com.br/assets/images/qualyvet.jpg">
  <meta property="og:url" content="https://qualyvetconsultoria.com.br/">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://qualyvetconsultoria.com.br/">
  <link rel="icon" href="assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Qualyvet Consultoria",
    "url": "https://qualyvetconsultoria.com.br",
    "logo": "https://qualyvetconsultoria.com.br/assets/images/qualyvet.png",
    "telephone": "+55-51-3121-3066",
    "email": "contato@qualyvetconsultoria.com.br",
    "address": { "@type": "PostalAddress", "streetAddress": "R. Ver. Ivo Cláudio Weigel, 228", "addressLocality": "Santa Cruz do Sul", "addressRegion": "RS", "postalCode": "96815-542", "addressCountry": "BR" },
    "description": "Consultoria em gestão da qualidade para empresas de produtos de origem animal.",
    "areaServed": "BR",
    "serviceType": "Consultoria agroindustrial"
  }
  </script>
</head>
<body>

<!-- HEADER (from Task 2 header snippet) -->

<!-- HERO -->
<section class="hero">
  <div class="hero-left">
    <span class="badge-tag">Especialistas em POA</span>
    <h1>Conformidade<br>que vira<br><em style="color:var(--color-primary);font-style:normal;">resultado.</em></h1>
    <p>Gestão da qualidade, registro junto ao MAPA e planejamento industrial para agroindústrias de Produtos de Origem Animal no Rio Grande do Sul.</p>
    <div class="hero-actions">
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp">
        <i class="fab fa-whatsapp"></i> Falar pelo WhatsApp
      </a>
      <a href="#servicos" class="btn btn-outline">Conheça os serviços</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-stats">
      <div class="stat-card">
        <div class="stat-num">10+</div>
        <div class="stat-label">Anos de mercado</div>
      </div>
      <div class="stat-card green">
        <div class="stat-num">N+</div>
        <div class="stat-label">Clientes ativos</div>
      </div>
      <div class="stat-card green">
        <div class="stat-num">SIF</div>
        <div class="stat-label">Federal · SIE · SIM</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">RS</div>
        <div class="stat-label">Rio Grande do Sul</div>
      </div>
    </div>
  </div>
</section>

<!-- BADGES BAR -->
<div class="badges-bar">
  <div class="container">
    <span class="label">Atuamos com:</span>
    <span class="badge-green">SIF</span>
    <span class="badge-green">SIE</span>
    <span class="badge-green">SIM</span>
    <span class="badge-lime">SISBI-POA</span>
    <span class="badge-lime">SUSAF</span>
    <span class="badge-green">BPF</span>
    <span class="badge-green">PPHO</span>
    <span class="badge-green">HACCP / APPCC</span>
  </div>
</div>

<!-- STATS STRIP -->
<div class="stats-strip">
  <div class="container">
    <div class="strip-stat"><div class="strip-num">10+</div><div class="strip-label">Anos de mercado</div></div>
    <div class="strip-divider"></div>
    <div class="strip-stat"><div class="strip-num">N+</div><div class="strip-label">Clientes ativos</div></div>
    <div class="strip-divider"></div>
    <div class="strip-stat"><div class="strip-num">N+</div><div class="strip-label">Estabelecimentos registrados</div></div>
    <div class="strip-divider"></div>
    <div class="strip-stat"><div class="strip-num">RS</div><div class="strip-label">Rio Grande do Sul</div></div>
  </div>
</div>

<!-- SERVIÇOS -->
<section id="servicos" class="services-section">
  <div class="container">
    <div class="services-intro">
      <span class="section-label">O que fazemos</span>
      <h2>Soluções completas para sua agroindústria POA</h2>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">🏭</div>
        <h3>Gestão de Qualidade</h3>
        <p>Programas de autocontrole (BPF, PPHO, HACCP) conforme a legislação vigente do MAPA.</p>
        <a href="servicos/gestao-de-qualidade.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card">
        <div class="service-icon">📐</div>
        <h3>Planejamento Industrial</h3>
        <p>Projetos de construção, reforma e ampliação para adequação às normas regulatórias.</p>
        <a href="servicos/planejamento-industrial.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card">
        <div class="service-icon">🎓</div>
        <h3>Treinamento e Capacitação</h3>
        <p>Desenvolvimento de equipes in loco para melhoria contínua de qualidade e produtividade.</p>
        <a href="servicos/treinamento-e-capacitacao.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card lime">
        <div class="service-icon">📋</div>
        <h3>Assessoria e Consultoria</h3>
        <p>Otimização da produção, eficiência e conformidade regulatória contínua.</p>
        <a href="servicos/assessoria-e-consultoria.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card lime">
        <div class="service-icon">🔍</div>
        <h3>Acompanhamento de Processos</h3>
        <p>Monitoramento contínuo com transparência — você sempre sabe o que está acontecendo.</p>
        <a href="servicos/acompanhamento-de-processos.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card dark-card">
        <div class="service-icon">💻</div>
        <h3>Sistema QualySys</h3>
        <p>Plataforma exclusiva de documentos na nuvem. Acesse seus POPs e registros de qualquer lugar.</p>
        <a href="servicos/sistemas-informatizados.html" class="service-link">Acessar plataforma →</a>
      </div>
    </div>
  </div>
</section>

<!-- QUEM SOMOS -->
<section class="about-section">
  <div class="about-grid">
    <div class="about-content">
      <span class="section-label">Quem Somos</span>
      <h2>Especialistas em POA com sede no Rio Grande do Sul</h2>
      <p>A Qualyvet atua no segmento agroindustrial de Produtos de Origem Animal há mais de 10 anos, auxiliando empresas na gestão da qualidade e planejamento industrial.</p>
      <p>Realizamos o acompanhamento in loco dos processos produtivos, promovendo a capacitação dos colaboradores e registrando estabelecimentos junto ao SIM, SIE, SIF, SISBI-POA e SUSAF.</p>
      <a href="sobre.html" class="btn btn-outline" style="margin-top:8px;width:fit-content;">Conheça nossa história →</a>
    </div>
    <div class="about-img"></div>
  </div>
</section>

<!-- QUALYSYS -->
<section class="qualysys-section">
  <div class="container">
    <div class="qualysys-grid">
      <div class="qualysys-text">
        <span class="section-label">Diferencial exclusivo</span>
        <h2>QualySys — seus documentos na nuvem, sempre acessíveis</h2>
        <p>A Qualyvet oferece uma plataforma exclusiva onde todos os documentos do seu estabelecimento ficam centralizados, seguros e acessíveis a qualquer hora, de qualquer lugar. Nenhum concorrente oferece isso.</p>
        <div class="qualysys-actions">
          <a href="https://plataforma.qualyvetconsultoria.com.br/" target="_blank" rel="noopener" class="btn btn-white">Acessar Plataforma</a>
          <a href="servicos/sistemas-informatizados.html" class="btn btn-ghost">Saiba mais</a>
        </div>
      </div>
      <div class="qualysys-mockup">
        <img src="assets/images/qualyvet.jpg" alt="Plataforma QualySys">
      </div>
    </div>
  </div>
</section>

<!-- DEPOIMENTOS -->
<section class="testimonials-section">
  <div class="container">
    <span class="section-label">Clientes</span>
    <h2 style="margin-bottom:32px;">O que dizem sobre nós</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <p class="testimonial-text">"A Qualyvet nos ajudou a conquistar o SIF em tempo recorde. Processo claro, sem stress e com acompanhamento constante em cada etapa."</p>
        <div class="testimonial-author">
          <div class="author-avatar">C</div>
          <div>
            <div class="author-name">Cliente</div>
            <div class="author-role">Frigorífico — Rio Grande do Sul</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-text">"Equipe extremamente competente. Implantaram todos os programas de autocontrole e ainda treinaram nossa equipe internamente."</p>
        <div class="testimonial-author">
          <div class="author-avatar">C</div>
          <div>
            <div class="author-name">Cliente</div>
            <div class="author-role">Laticínio — Rio Grande do Sul</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ARTIGOS -->
<section class="articles-section">
  <div class="container">
    <div class="articles-header">
      <div>
        <span class="section-label">Artigos</span>
        <h2>Entenda o universo POA</h2>
      </div>
      <a href="artigos/index.html">Ver todos os artigos →</a>
    </div>
    <div class="articles-grid">
      <a href="artigos/o-que-e-sif.html" class="article-card">
        <div class="article-img"><img src="assets/images/qualidade1.jpg" alt="O que é o SIF"></div>
        <div class="article-body">
          <div class="article-cat">Registro</div>
          <h3>O que é o SIF e como conseguir o registro federal?</h3>
        </div>
      </a>
      <a href="artigos/sisbi-poa-vs-sif.html" class="article-card">
        <div class="article-img"><img src="assets/images/qualidade2.jpg" alt="SISBI-POA vs SIF"></div>
        <div class="article-body">
          <div class="article-cat">Inspeção</div>
          <h3>SISBI-POA vs SIF: qual sistema de inspeção escolher?</h3>
        </div>
      </a>
      <a href="artigos/programas-de-autocontrole.html" class="article-card">
        <div class="article-img"><img src="assets/images/industrial1.jpg" alt="Programas de Autocontrole"></div>
        <div class="article-body">
          <div class="article-cat">Qualidade</div>
          <h3>Programas de Autocontrole: guia completo para POA</h3>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="cta-section">
  <div class="container">
    <span class="section-label">Vamos começar?</span>
    <h2>Pronto para regularizar sua empresa?</h2>
    <p>Atendemos frigoríficos, laticínios, abatedouros, beneficiadoras de pescado e muito mais. Fale agora com nossos especialistas.</p>
    <div class="cta-actions">
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp">
        <i class="fab fa-whatsapp"></i> Iniciar conversa no WhatsApp
      </a>
      <a href="#servicos" class="btn btn-ghost">Ver serviços</a>
    </div>
  </div>
</section>

<!-- FOOTER (from Task 2 footer snippet) -->

<script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in browser (double-click or `open index.html`).

Check:
- Hero displays with split layout (left text, right photo with stats)
- Badges bar visible below hero
- Dark stats strip with green numbers
- 6 service cards in 3×2 grid
- QualySys section dark background
- WhatsApp buttons present throughout
- Footer with 4 columns

- [ ] **Step 3: Check mobile at 375px**

Open DevTools → toggle device toolbar → set width to 375px.

Check:
- Hero stacks vertically (text above, photo below)
- Nav links hidden, hamburger icon visible
- All sections in single column
- Buttons full width

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add homepage"
```

---

## Phase 3 — Service Pages

### Task 4: Service page template + gestao-de-qualidade.html

**Files:**
- Create: `servicos/gestao-de-qualidade.html`

This is the reference template for all 6 service pages.

- [ ] **Step 1: Create servicos/gestao-de-qualidade.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gestão de Qualidade | Qualyvet Consultoria</title>
  <meta name="description" content="Desenvolvemos programas de autocontrole (BPF, PPHO, HACCP) para empresas de Produtos de Origem Animal conforme a legislação do MAPA.">
  <link rel="icon" href="../assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

<header class="site-header">
  <div class="header-inner">
    <a href="../index.html" class="site-logo">
      <img src="../assets/images/qualyvet.png" alt="Qualyvet Consultoria">
    </a>
    <nav class="main-nav">
      <a href="../index.html">Início</a>
      <a href="../sobre.html">Quem Somos</a>
      <a href="gestao-de-qualidade.html" class="active">Serviços</a>
      <a href="../artigos/index.html">Artigos</a>
      <a href="../contato.html">Contato</a>
    </nav>
    <div class="header-actions">
      <a href="https://plataforma.qualyvetconsultoria.com.br/" target="_blank" rel="noopener" class="btn-platform">🔐 Plataforma</a>
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="page-hero">
  <div class="container">
    <div class="breadcrumb">
      <a href="../index.html">Início</a> / <a href="gestao-de-qualidade.html">Serviços</a> / <span>Gestão de Qualidade</span>
    </div>
    <h1>Gestão de Qualidade</h1>
    <p>Programas de autocontrole desenvolvidos conforme a legislação vigente do MAPA para cada tipo de estabelecimento.</p>
  </div>
</div>

<section class="service-detail">
  <div class="container">
    <div class="service-detail-grid">
      <div>
        <span class="section-label">O que oferecemos</span>
        <h2>Programas de autocontrole para sua empresa</h2>
        <p>Desenvolvemos programas de autocontrole para as empresas de acordo com a classificação do estabelecimento, atendendo à legislação vigente do MAPA, garantindo conformidade total e segurança alimentar.</p>
        <p>Nossa equipe realiza o acompanhamento in loco dos processos produtivos, promovendo a capacitação dos colaboradores envolvidos em busca de melhorias na qualidade e produtividade.</p>
        <ul class="checklist" style="margin-top:24px;">
          <li>Boas Práticas de Fabricação (BPF)</li>
          <li>Procedimentos Padrão de Higiene Operacional (PPHO)</li>
          <li>Análise de Perigos e Pontos Críticos de Controle (HACCP/APPCC)</li>
          <li>Controle de água e higienização de instalações</li>
          <li>Controle de pragas e vetores</li>
          <li>Controle de temperaturas e calibração</li>
          <li>Rastreabilidade e controle de matérias-primas</li>
          <li>Treinamento de colaboradores</li>
          <li>Controle de qualidade microbiológico</li>
          <li>Elaboração de 20 Programas de Autocontrole (POPs/PAs)</li>
        </ul>
      </div>
      <div>
        <div class="service-detail-img">
          <img src="../assets/images/qualidade1.jpg" alt="Gestão de Qualidade em agroindústria">
        </div>
        <div style="background:var(--color-surface);border-radius:var(--radius);padding:24px;margin-top:16px;">
          <h3 style="font-size:15px;margin-bottom:12px;">Atendemos estabelecimentos</h3>
          <ul class="checklist">
            <li>Frigoríficos e abatedouros</li>
            <li>Laticínios e queijarias</li>
            <li>Beneficiadoras de pescado</li>
            <li>Produtores de ovos e mel</li>
            <li>Charqueadas e defumadoras</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <span class="section-label">Fale conosco</span>
    <h2>Precisa regularizar sua empresa?</h2>
    <p>Entre em contato agora e descubra como a Qualyvet pode ajudar sua agroindústria.</p>
    <div class="cta-actions">
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp">
        <i class="fab fa-whatsapp"></i> Falar pelo WhatsApp
      </a>
      <a href="../contato.html" class="btn btn-ghost">Enviar mensagem</a>
    </div>
  </div>
</section>

<section class="related-services surface">
  <div class="container">
    <span class="section-label">Outros serviços</span>
    <h2 style="margin-bottom:28px;">Conheça nossas outras soluções</h2>
    <div class="related-grid">
      <div class="service-card">
        <div class="service-icon">📐</div>
        <h3>Planejamento Industrial</h3>
        <p>Projetos de construção, reforma e ampliação para adequação às normas.</p>
        <a href="planejamento-industrial.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card">
        <div class="service-icon">🎓</div>
        <h3>Treinamento e Capacitação</h3>
        <p>Desenvolvimento de equipes in loco para melhoria contínua.</p>
        <a href="treinamento-e-capacitacao.html" class="service-link">Ver detalhes →</a>
      </div>
      <div class="service-card lime">
        <div class="service-icon">💻</div>
        <h3>Sistema QualySys</h3>
        <p>Plataforma exclusiva de documentos na nuvem para clientes.</p>
        <a href="sistemas-informatizados.html" class="service-link">Conhecer →</a>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-info">
        <div class="footer-brand">Qualyvet<span>.</span></div>
        <p>R. Ver. Ivo Cláudio Weigel, 228<br>Renascença — Santa Cruz do Sul / RS</p>
        <p>(51) 3121-3066</p>
        <p>contato@qualyvetconsultoria.com.br</p>
        <p style="margin-top:16px;font-size:11px;color:rgba(255,255,255,.2);">CNPJ 24.184.899/0001-08</p>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Serviços</div>
        <a href="gestao-de-qualidade.html">Gestão de Qualidade</a>
        <a href="planejamento-industrial.html">Planejamento Industrial</a>
        <a href="treinamento-e-capacitacao.html">Treinamento</a>
        <a href="assessoria-e-consultoria.html">Assessoria e Consultoria</a>
        <a href="acompanhamento-de-processos.html">Acompanhamento</a>
        <a href="sistemas-informatizados.html">Sistema QualySys</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Artigos</div>
        <a href="../artigos/o-que-e-sif.html">O que é o SIF?</a>
        <a href="../artigos/sisbi-poa-vs-sif.html">SISBI-POA vs SIF</a>
        <a href="../artigos/programas-de-autocontrole.html">Programas de Autocontrole</a>
        <a href="../artigos/como-obter-registro-mapa.html">Como obter registro MAPA</a>
        <a href="../artigos/haccp-o-que-e.html">O que é HACCP?</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Links</div>
        <a href="../index.html">Início</a>
        <a href="../sobre.html">Quem Somos</a>
        <a href="../trabalhe-conosco.html">Trabalhe Conosco</a>
        <a href="https://plataforma.qualyvetconsultoria.com.br/" target="_blank">Plataforma QualySys</a>
        <a href="../contato.html">Contato</a>
      </div>
    </div>
    <div class="footer-bottom">© 2025 Qualyvet Consultoria e Assessoria LTDA. Todos os direitos reservados.</div>
  </div>
</footer>

<script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open and verify**

Open `servicos/gestao-de-qualidade.html` in browser. Check: dark page hero with breadcrumb, 2-column content layout with checklist, CTA section, 3 related service cards, footer.

- [ ] **Step 3: Commit**

```bash
git add servicos/gestao-de-qualidade.html
git commit -m "feat: add gestao-de-qualidade service page"
```

---

### Task 5: Remaining 5 service pages

**Files:**
- Create: `servicos/planejamento-industrial.html`
- Create: `servicos/treinamento-e-capacitacao.html`
- Create: `servicos/assessoria-e-consultoria.html`
- Create: `servicos/acompanhamento-de-processos.html`
- Create: `servicos/sistemas-informatizados.html`

For each page, copy `servicos/gestao-de-qualidade.html` and replace:

| Page | `<title>` | `<h1>` | `<meta description>` | Image | Checklist items |
|---|---|---|---|---|---|
| `planejamento-industrial.html` | Planejamento Industrial | Planejamento Industrial | Projetos de construção, reforma e ampliação para adequação às normas do MAPA. | `industrial1.jpg` | Projetos de layout industrial; Construção e reforma de instalações; Adequação de fluxos para inspeção; Cálculo de capacidade produtiva; Memorial descritivo e plantas; Acompanhamento da obra |
| `treinamento-e-capacitacao.html` | Treinamento e Capacitação | Treinamento e Capacitação | Capacitamos equipes in loco para melhoria contínua da qualidade e produtividade nas agroindústrias. | `treinamento1.jpg` | Boas Práticas de Fabricação (BPF); Higiene pessoal e manipulação de alimentos; HACCP / APPCC na prática; Controle de temperaturas; Procedimentos de limpeza e sanitização; Registros e documentação |
| `assessoria-e-consultoria.html` | Assessoria e Consultoria | Assessoria e Consultoria | Otimizamos produção, eficiência e conformidade regulatória para empresas de Produtos de Origem Animal. | `assesoria1.jpeg` | Diagnóstico de conformidade regulatória; Otimização de processos produtivos; Melhoria de eficiência operacional; Acompanhamento de auditorias; Orientação em não conformidades; Relatórios periódicos de desempenho |
| `acompanhamento-de-processos.html` | Acompanhamento de Processos | Acompanhamento de Processos | Monitoramento contínuo in loco com transparência total em cada etapa da sua produção. | `acompanhamento.jpeg` | Visitas periódicas in loco; Monitoramento de pontos críticos; Relatórios de acompanhamento; Verificação de registros e documentos; Suporte em auditorias do MAPA; Acesso à plataforma QualySys |
| `sistemas-informatizados.html` | Sistema QualySys | Sistema QualySys — Plataforma de Documentos | Plataforma exclusiva de gestão de documentos na nuvem para clientes Qualyvet. | `qualyvet.jpg` | Login exclusivo por cliente; Documentos sempre atualizados; Acesso de qualquer dispositivo; Base legal da fiscalização; Histórico de documentos; Ambiente seguro e criptografado |

- [ ] **Step 1: Create each file** (copy + update content per table above)

- [ ] **Step 2: Verify all 6 service pages open without errors**

```bash
open servicos/planejamento-industrial.html
open servicos/treinamento-e-capacitacao.html
open servicos/assessoria-e-consultoria.html
open servicos/acompanhamento-de-processos.html
open servicos/sistemas-informatizados.html
```

- [ ] **Step 3: Commit**

```bash
git add servicos/
git commit -m "feat: add remaining 5 service pages"
```

---

## Phase 4 — Institutional Pages

### Task 6: sobre.html, contato.html, trabalhe-conosco.html

**Files:**
- Create: `sobre.html`
- Create: `contato.html`
- Create: `trabalhe-conosco.html`

- [ ] **Step 1: Create sobre.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quem Somos | Qualyvet Consultoria</title>
  <meta name="description" content="Conheça a Qualyvet: 10+ anos de atuação no segmento agroindustrial de Produtos de Origem Animal no Rio Grande do Sul.">
  <link rel="icon" href="assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<!-- HEADER (Task 2 snippet, paths without ../) -->

<div class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a> / <span>Quem Somos</span></div>
    <h1>Quem Somos</h1>
    <p>Especialistas em Produtos de Origem Animal com mais de 10 anos de atuação no Rio Grande do Sul.</p>
  </div>
</div>

<section class="about-section">
  <div class="container" style="max-width:800px;">
    <span class="section-label">Nossa história</span>
    <h2 style="margin-bottom:24px;">A Qualyvet Consultoria</h2>
    <p>A Qualyvet Consultoria e Assessoria atua no segmento agroindustrial de Produtos de Origem Animal, auxiliando as empresas na gestão da qualidade e planejamento industrial. Com sede no Rio Grande do Sul, nossa equipe realiza consultoria e assessoria em diversas empresas do estado.</p>
    <p>Somos responsáveis pela implantação dos programas de autocontrole, bem como consultoria e assessoria contínua nos clientes atendidos. Realizamos o acompanhamento in loco dos processos produtivos, promovendo a capacitação dos colaboradores envolvidos em busca de melhorias na qualidade e produtividade da empresa.</p>
    <p>Desempenhamos também o registro das empresas junto aos órgãos de fiscalização (SIM, SIE, SIF), bem como o registro de produtos e o desenvolvimento de projetos de planejamento industrial (construção, reforma e ampliação). Auxiliamos as empresas em busca da certificação junto ao SISBI-POA e SUSAF.</p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:40px;">
      <div style="text-align:center;background:var(--color-surface);border-radius:var(--radius);padding:28px;">
        <div style="font-family:'Roboto Slab',serif;font-size:42px;font-weight:900;color:var(--color-primary);">10+</div>
        <div style="font-size:13px;color:var(--color-text-muted);margin-top:4px;">Anos de mercado</div>
      </div>
      <div style="text-align:center;background:var(--color-surface);border-radius:var(--radius);padding:28px;">
        <div style="font-family:'Roboto Slab',serif;font-size:42px;font-weight:900;color:var(--color-primary);">RS</div>
        <div style="font-size:13px;color:var(--color-text-muted);margin-top:4px;">Rio Grande do Sul</div>
      </div>
      <div style="text-align:center;background:var(--color-primary-dark);border-radius:var(--radius);padding:28px;">
        <div style="font-family:'Roboto Slab',serif;font-size:42px;font-weight:900;color:var(--color-accent);">POA</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:4px;">Especialização total</div>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <span class="section-label">Vamos trabalhar juntos?</span>
    <h2>Entre em contato com nossa equipe</h2>
    <p>Atendemos frigoríficos, laticínios, abatedouros e beneficiadoras em todo o Rio Grande do Sul.</p>
    <div class="cta-actions">
      <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Falar pelo WhatsApp</a>
      <a href="contato.html" class="btn btn-ghost">Enviar mensagem</a>
    </div>
  </div>
</section>

<!-- FOOTER (Task 2 snippet) -->
<script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create contato.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contato | Qualyvet Consultoria</title>
  <meta name="description" content="Fale com a Qualyvet Consultoria: (51) 3121-3066 | contato@qualyvetconsultoria.com.br | Santa Cruz do Sul - RS.">
  <link rel="icon" href="assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<!-- HEADER -->

<div class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Início</a> / <span>Contato</span></div>
    <h1>Fale Conosco</h1>
    <p>Entre em contato e descubra como podemos ajudar sua empresa.</p>
  </div>
</div>

<section>
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <span class="section-label">Informações de contato</span>
        <h2 style="margin-bottom:24px;">Estamos prontos para atender você</h2>
        <div class="contact-item">
          <div class="contact-icon"><i class="fas fa-phone"></i></div>
          <div><h3>Telefone</h3><p>(51) 3121-3066</p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon"><i class="fab fa-whatsapp" style="color:#25d366;"></i></div>
          <div><h3>WhatsApp</h3><p><a href="https://wa.me/5551998658690" target="_blank" rel="noopener" style="color:var(--color-primary);font-weight:700;">(51) 9 9865-8690</a></p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon"><i class="fas fa-envelope"></i></div>
          <div><h3>E-mail</h3><p><a href="mailto:contato@qualyvetconsultoria.com.br" style="color:var(--color-primary);">contato@qualyvetconsultoria.com.br</a></p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
          <div><h3>Endereço</h3><p>R. Ver. Ivo Cláudio Weigel, 228 — Renascença<br>Santa Cruz do Sul — RS, 96815-542</p></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon"><i class="fas fa-clock"></i></div>
          <div><h3>Horário de atendimento</h3><p>Segunda a Sexta-feira<br>07:30 às 12:00 | 13:30 às 17:48</p></div>
        </div>
      </div>
      <div>
        <div style="background:var(--color-surface);border-radius:var(--radius);padding:32px;border:1.5px solid var(--color-border);">
          <h3 style="margin-bottom:20px;">Mande uma mensagem</h3>
          <p style="font-size:13px;margin-bottom:20px;">Preencha seus dados e entraremos em contato o mais breve possível.</p>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <label style="font-size:12px;font-weight:700;color:var(--color-primary-dark);display:block;margin-bottom:5px;">Nome *</label>
              <input type="text" placeholder="Seu nome" style="width:100%;padding:10px 14px;border:1.5px solid var(--color-border);border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:700;color:var(--color-primary-dark);display:block;margin-bottom:5px;">E-mail *</label>
              <input type="email" placeholder="seu@email.com" style="width:100%;padding:10px 14px;border:1.5px solid var(--color-border);border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:700;color:var(--color-primary-dark);display:block;margin-bottom:5px;">Empresa</label>
              <input type="text" placeholder="Nome da empresa" style="width:100%;padding:10px 14px;border:1.5px solid var(--color-border);border-radius:8px;font-size:14px;outline:none;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:700;color:var(--color-primary-dark);display:block;margin-bottom:5px;">Mensagem *</label>
              <textarea placeholder="Como podemos ajudar?" rows="4" style="width:100%;padding:10px 14px;border:1.5px solid var(--color-border);border-radius:8px;font-size:14px;outline:none;resize:vertical;"></textarea>
            </div>
            <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp" style="justify-content:center;">
              <i class="fab fa-whatsapp"></i> Enviar pelo WhatsApp
            </a>
            <p style="font-size:11px;color:#aaa;text-align:center;">Ao clicar, você será redirecionado ao WhatsApp com sua mensagem.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create trabalhe-conosco.html**

Copy `contato.html`, change title to "Trabalhe Conosco | Qualyvet Consultoria", page-hero h1 to "Trabalhe Conosco", description to "Faça parte da equipe Qualyvet. Envie seu currículo e entre em contato.", and replace the form textarea label to "Fale um pouco sobre você e sua experiência *".

- [ ] **Step 4: Commit**

```bash
git add sobre.html contato.html trabalhe-conosco.html
git commit -m "feat: add institutional pages (sobre, contato, trabalhe-conosco)"
```

---

## Phase 5 — Articles

### Task 7: artigos/index.html

**Files:**
- Create: `artigos/index.html`

- [ ] **Step 1: Create artigos/index.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Artigos sobre POA | Qualyvet Consultoria</title>
  <meta name="description" content="Artigos e guias sobre SIF, SISBI-POA, HACCP, programas de autocontrole e registro MAPA para empresas de Produtos de Origem Animal.">
  <link rel="icon" href="../assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<!-- HEADER with ../ paths -->

<div class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Início</a> / <span>Artigos</span></div>
    <h1>Artigos sobre POA</h1>
    <p>Guias e conteúdos educativos sobre qualidade, inspeção e registro para agroindústrias de Produtos de Origem Animal.</p>
  </div>
</div>

<section>
  <div class="container">
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">Todos</button>
      <button class="filter-btn" data-filter="registro">Registro</button>
      <button class="filter-btn" data-filter="inspecao">Inspeção</button>
      <button class="filter-btn" data-filter="qualidade">Qualidade</button>
    </div>
    <div class="articles-index-grid">
      <a href="o-que-e-sif.html" class="article-card" data-cat="registro">
        <div class="article-img"><img src="../assets/images/qualidade1.jpg" alt="O que é o SIF"></div>
        <div class="article-body">
          <div class="article-cat">Registro</div>
          <h3>O que é o SIF e como conseguir o registro federal?</h3>
        </div>
      </a>
      <a href="sisbi-poa-vs-sif.html" class="article-card" data-cat="inspecao">
        <div class="article-img"><img src="../assets/images/qualidade2.jpg" alt="SISBI-POA vs SIF"></div>
        <div class="article-body">
          <div class="article-cat">Inspeção</div>
          <h3>SISBI-POA vs SIF: qual sistema de inspeção escolher?</h3>
        </div>
      </a>
      <a href="programas-de-autocontrole.html" class="article-card" data-cat="qualidade">
        <div class="article-img"><img src="../assets/images/industrial1.jpg" alt="Programas de Autocontrole"></div>
        <div class="article-body">
          <div class="article-cat">Qualidade</div>
          <h3>Programas de Autocontrole: guia completo para POA</h3>
        </div>
      </a>
      <a href="como-obter-registro-mapa.html" class="article-card" data-cat="registro">
        <div class="article-img"><img src="../assets/images/industrial2.jpg" alt="Registro MAPA"></div>
        <div class="article-body">
          <div class="article-cat">Registro</div>
          <h3>Como obter registro no MAPA: passo a passo completo</h3>
        </div>
      </a>
      <a href="haccp-o-que-e.html" class="article-card" data-cat="qualidade">
        <div class="article-img"><img src="../assets/images/treinamento1.jpg" alt="O que é HACCP"></div>
        <div class="article-body">
          <div class="article-cat">Qualidade</div>
          <h3>O que é HACCP/APPCC e por que sua empresa precisa?</h3>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- FOOTER with ../ paths -->
<script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify filter buttons work** — open in browser, click "Registro", confirm only registro articles show.

- [ ] **Step 3: Commit**

```bash
git add artigos/index.html
git commit -m "feat: add articles index page with category filter"
```

---

### Task 8: Article template + 5 articles

**Files:**
- Create: `artigos/o-que-e-sif.html`
- Create: `artigos/sisbi-poa-vs-sif.html`
- Create: `artigos/programas-de-autocontrole.html`
- Create: `artigos/como-obter-registro-mapa.html`
- Create: `artigos/haccp-o-que-e.html`

- [ ] **Step 1: Create artigos/o-que-e-sif.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>O que é o SIF e como conseguir o registro federal? | Qualyvet</title>
  <meta name="description" content="Entenda o que é o Serviço de Inspeção Federal (SIF), para que serve, quais estabelecimentos precisam e como conseguir o registro junto ao MAPA.">
  <link rel="icon" href="../assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Slab:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "O que é o SIF e como conseguir o registro federal?",
    "description": "Entenda o que é o Serviço de Inspeção Federal (SIF), para que serve e como conseguir o registro junto ao MAPA.",
    "author": { "@type": "Organization", "name": "Qualyvet Consultoria" },
    "publisher": { "@type": "Organization", "name": "Qualyvet Consultoria", "url": "https://qualyvetconsultoria.com.br" },
    "datePublished": "2025-01-01",
    "inLanguage": "pt-BR"
  }
  </script>
</head>
<body>
<!-- HEADER with ../ paths -->

<div class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Início</a> / <a href="index.html">Artigos</a> / <span>O que é o SIF</span></div>
    <span class="badge-lime" style="margin-bottom:14px;display:inline-block;">Registro</span>
    <h1>O que é o SIF e como conseguir o registro federal?</h1>
    <p>Tudo o que você precisa saber sobre o Serviço de Inspeção Federal para sua agroindústria.</p>
  </div>
</div>

<section class="article-layout">
  <div class="container">
    <article class="article-content">
      <div class="article-meta">
        <span><i class="far fa-calendar"></i> Janeiro de 2025</span>
        <span><i class="far fa-clock"></i> 5 min de leitura</span>
        <span>Por Qualyvet Consultoria</span>
      </div>

      <h2>O que é o SIF?</h2>
      <p>O Serviço de Inspeção Federal (SIF) é o sistema de inspeção mantido pelo Ministério da Agricultura, Pecuária e Abastecimento (MAPA), vinculado ao Departamento de Inspeção de Produtos de Origem Animal (DIPOA). O SIF é obrigatório para estabelecimentos que comercializam produtos de origem animal fora do estado de origem ou para exportação.</p>

      <h2>Quais produtos precisam do SIF?</h2>
      <p>O SIF abrange todos os produtos de origem animal destinados ao consumo humano:</p>
      <ul>
        <li>Carnes e derivados (bovinos, suínos, aves)</li>
        <li>Leite e derivados (queijos, manteiga, iogurte)</li>
        <li>Pescado e derivados</li>
        <li>Ovos e derivados</li>
        <li>Mel e derivados</li>
      </ul>

      <h2>Qual a diferença entre SIF, SIE e SIM?</h2>
      <p>Os três sistemas de inspeção funcionam em diferentes esferas e definem onde o produto pode ser comercializado:</p>
      <ul>
        <li><strong>SIM (Municipal):</strong> Permite comercialização apenas no município de origem.</li>
        <li><strong>SIE (Estadual):</strong> Permite comercialização em todo o estado.</li>
        <li><strong>SIF (Federal):</strong> Permite comercialização em todo o Brasil e exportação.</li>
        <li><strong>SISBI-POA:</strong> Equivalência federal, permite comercialização nacional como o SIF.</li>
      </ul>

      <h2>Como conseguir o SIF?</h2>
      <p>O processo de obtenção do SIF envolve as seguintes etapas principais:</p>
      <ul>
        <li>Adequação das instalações às normas do RIISPOA (Decreto nº 9.013/2017)</li>
        <li>Elaboração e implantação dos Programas de Autocontrole (BPF, PPHO, HACCP)</li>
        <li>Regularização junto ao CREA/CFM (responsável técnico habilitado)</li>
        <li>Cadastro no SIGSIF (Sistema de Gerenciamento de Informações do SIF)</li>
        <li>Solicitação formal ao MAPA e visita de inspeção</li>
        <li>Aprovação e concessão do número SIF</li>
      </ul>

      <h2>Quanto tempo leva para obter o SIF?</h2>
      <p>O prazo varia conforme as condições do estabelecimento e a demanda do MAPA na região. Com as instalações já adequadas e documentação completa, o processo pode levar de 3 a 12 meses. A Qualyvet acompanha todo o processo para garantir que nenhum detalhe seja esquecido.</p>

      <h2>Posso ter a Qualyvet como apoio nesse processo?</h2>
      <p>Sim. A Qualyvet oferece consultoria completa para obtenção do SIF: desde o diagnóstico inicial das instalações, passando pela elaboração dos programas de autocontrole, até o acompanhamento das visitas do MAPA. <a href="../contato.html" style="color:var(--color-primary);font-weight:700;">Entre em contato</a> para saber mais.</p>
    </article>

    <aside class="article-sidebar">
      <div class="sidebar-cta">
        <h3>Precisa do SIF?</h3>
        <p>A Qualyvet cuida de todo o processo para sua empresa.</p>
        <a href="https://wa.me/5551998658690" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%;justify-content:center;margin-top:4px;">
          <i class="fab fa-whatsapp"></i> Falar agora
        </a>
      </div>
      <div class="sidebar-related">
        <h4>Artigos relacionados</h4>
        <a href="sisbi-poa-vs-sif.html">SISBI-POA vs SIF: qual escolher?</a>
        <a href="programas-de-autocontrole.html">Programas de Autocontrole: guia completo</a>
        <a href="como-obter-registro-mapa.html">Como obter registro no MAPA</a>
        <a href="haccp-o-que-e.html">O que é HACCP/APPCC?</a>
      </div>
    </aside>
  </div>
</section>

<!-- FOOTER with ../ paths -->
<script src="../assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the remaining 4 articles**

Use the same template above for each. Key content per article:

**`sisbi-poa-vs-sif.html`**
- Title: "SISBI-POA vs SIF: qual sistema de inspeção escolher?"
- Category badge: Inspeção
- H2s: O que é o SISBI-POA? / O que é o SIF? / Principais diferenças / Qual escolher para minha empresa? / Como a Qualyvet pode ajudar?
- Key content: SISBI-POA é equivalente ao SIF para comercialização nacional, mas gerido pelos estados através do SUASA. SIF é gerido diretamente pelo MAPA federal. Ambos permitem venda em todo o Brasil.

**`programas-de-autocontrole.html`**
- Title: "Programas de Autocontrole: guia completo para POA"
- Category badge: Qualidade
- H2s: O que são os Programas de Autocontrole? / Quais são obrigatórios? / BPF / PPHO / HACCP / Como implementar / Papel da consultoria
- Key content: Os 20 POPs/PAs exigidos pelo MAPA. Portaria 46/1998. Importância para auditorias.

**`como-obter-registro-mapa.html`**
- Title: "Como obter registro no MAPA: passo a passo completo"
- Category badge: Registro
- H2s: O que é o registro no MAPA? / Quem precisa? / Passo a passo / Documentação necessária / Prazos / Erros comuns
- Key content: Diferença entre registro de estabelecimento e registro de produto. SIF, SIE, SIM. Documentação: planta baixa, RT, programas de autocontrole.

**`haccp-o-que-e.html`**
- Title: "O que é HACCP/APPCC e por que sua empresa precisa?"
- Category badge: Qualidade
- H2s: O que é HACCP? / Diferença entre HACCP e APPCC / Os 7 princípios do HACCP / Obrigatoriedade no Brasil / Como implementar / Benefícios
- Key content: HACCP = Hazard Analysis Critical Control Points = APPCC em português. Portaria MAPA 46/1998 torna obrigatório para SIF. Os 7 princípios. Benefícios: redução de recalls, segurança alimentar, credencial para exportação.

- [ ] **Step 3: Verify all articles open**

```bash
open artigos/o-que-e-sif.html
open artigos/sisbi-poa-vs-sif.html
open artigos/programas-de-autocontrole.html
open artigos/como-obter-registro-mapa.html
open artigos/haccp-o-que-e.html
```

Check: sidebar sticky, breadcrumb correct, related links work, WhatsApp CTA in sidebar visible.

- [ ] **Step 4: Commit**

```bash
git add artigos/
git commit -m "feat: add articles index and 5 SEO articles"
```

---

## Phase 6 — SEO & Polish

### Task 9: sitemap.xml + robots.txt

**Files:**
- Create: `sitemap.xml`
- Create: `robots.txt`

- [ ] **Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://qualyvetconsultoria.com.br/</loc><priority>1.0</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/sobre.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/contato.html</loc><priority>0.7</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/trabalhe-conosco.html</loc><priority>0.5</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/gestao-de-qualidade.html</loc><priority>0.9</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/planejamento-industrial.html</loc><priority>0.9</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/treinamento-e-capacitacao.html</loc><priority>0.9</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/assessoria-e-consultoria.html</loc><priority>0.9</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/acompanhamento-de-processos.html</loc><priority>0.9</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/servicos/sistemas-informatizados.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/index.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/o-que-e-sif.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/sisbi-poa-vs-sif.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/programas-de-autocontrole.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/como-obter-registro-mapa.html</loc><priority>0.8</priority></url>
  <url><loc>https://qualyvetconsultoria.com.br/artigos/haccp-o-que-e.html</loc><priority>0.8</priority></url>
</urlset>
```

- [ ] **Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://qualyvetconsultoria.com.br/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

### Task 10: Responsiveness audit

- [ ] **Step 1: Open index.html in browser DevTools**

Test at these widths: 320px, 375px, 768px, 1024px, 1440px.

Verify at each breakpoint:
- Navigation: hamburger at ≤768px, full nav at >768px
- Hero: split at >1024px, stacked at ≤1024px
- Stats strip: wraps at ≤768px
- Service cards: 3 cols > 1024px, 2 cols 768–1024px, 1 col < 768px
- Footer: 4 cols > 1024px, 2 cols 768–1024px, 1 col < 768px
- Article layout: sidebar hidden below tablet, full width content

- [ ] **Step 2: Test hamburger menu**

At 375px width: tap hamburger → nav opens. Tap a link → nav closes. Tap hamburger again → nav closes.

- [ ] **Step 3: Fix any issues found**

Edit `assets/css/style.css` as needed. Commit fixes:

```bash
git add assets/css/style.css
git commit -m "fix: responsive layout adjustments"
```

---

### Task 11: Final verification

- [ ] **Step 1: Verify all 16 pages exist**

```bash
ls index.html sobre.html contato.html trabalhe-conosco.html \
   servicos/gestao-de-qualidade.html \
   servicos/planejamento-industrial.html \
   servicos/treinamento-e-capacitacao.html \
   servicos/assessoria-e-consultoria.html \
   servicos/acompanhamento-de-processos.html \
   servicos/sistemas-informatizados.html \
   artigos/index.html \
   artigos/o-que-e-sif.html \
   artigos/sisbi-poa-vs-sif.html \
   artigos/programas-de-autocontrole.html \
   artigos/como-obter-registro-mapa.html \
   artigos/haccp-o-que-e.html
```

Expected: all 16 files listed without "No such file" errors.

- [ ] **Step 2: Verify zero broken internal links**

Open each page and click every internal link. Confirm no 404s.

- [ ] **Step 3: Verify WhatsApp number**

Search all HTML files for the WhatsApp number and confirm consistency:

```bash
grep -r "wa.me" . --include="*.html" | grep -v ".git"
```

All links should use `https://wa.me/5551998658690`.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete qualyvet-site-novo — 16 pages, responsive, SEO-ready"
```

---

## Checklist de entrega

- [ ] 16 páginas HTML sem erros
- [ ] Zero links quebrados (404)
- [ ] Site responsivo em 320px, 768px, 1024px e 1440px
- [ ] Menu hambúrguer funcional no mobile
- [ ] Botão WhatsApp visível em todas as páginas
- [ ] Filtro de categorias funcional na listagem de artigos
- [ ] Schema.org na homepage e em todos os artigos
- [ ] sitemap.xml e robots.txt presentes
- [ ] Imagens com atributo alt em todas as ocorrências
- [ ] Números reais preenchidos (substituir "N+" pelos valores reais do cliente)
- [ ] Screenshot da plataforma QualySys adicionado à seção QualySys
- [ ] Depoimentos reais validados com o cliente
