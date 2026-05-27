# Portfolio Expansion Plan (Gradual)

## Current Status
- Main portfolio site complete (index.html, style.css, main.js)
- Z-index fix applied to hero chips ✅

## Phase 1: Projects Page ✅ DONE
- [x] Create `/projects/index.html` - grid of 9 projects
- [x] Add navigation links to main site (main button now points to /projects/)
- [x] Style projects grid consistently (desktop 3-col, tablet 2-col, mobile 1-col)
- [x] Add CSS for projects grid page header and cards

## Phase 2: Individual Project Pages (Next)
- [ ] Create `/projects/project-1/index.html` template (case study page)
- [ ] Build case study layout with gallery slider
- [ ] Create 2-3 sample project pages to test
- [ ] Add "Related Projects" section at bottom

## Phase 3: Blog Setup
- [ ] Create `/blog/index.html` - blog listing page
- [ ] Create `/blog/post-1/index.html` template
- [ ] Add blog link to navigation

## Phase 4: Navigation & Polish
- [ ] Update main navbar on all pages
- [ ] Add breadcrumbs where needed
- [ ] Internal linking (blog → projects, etc.)

## Priority Order
1. **Projects grid page** (most SEO impact, users expect this)
2. **Individual project templates** (case studies)
3. **Blog structure** (content can be added gradually)
4. **Navigation linking** (ties everything together)

## Folder Structure We'll Create
```
portfolio/
├── index.html (main - already exists)
├── projects/
│   ├── index.html (all projects grid)
│   ├── project-1/
│   │   └── index.html
│   ├── project-2/
│   │   └── index.html
│   └── ...
├── blog/
│   ├── index.html (blog listing)
│   ├── post-1/
│   │   └── index.html
│   └── ...
├── css/
│   ├── style.css (main - already exists)
│   └── pages.css (new - shared page styles)
└── js/
    ├── main.js (already exists)
    └── nav.js (new - shared navigation logic)
```

## Notes
- Keep changes small per session
- Reuse existing CSS variables and design system
- Maintain consistent navigation across all pages
- Each message/session = 1-2 files max
