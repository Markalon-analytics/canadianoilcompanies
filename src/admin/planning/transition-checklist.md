# Single-Page Directory Transition - Quick Reference Checklist

## Overview
Transform multi-page directory (115+ pages) → Single-page filterable directory on homepage

## Simplified Data Model
| Field | Source | Example |
|-------|--------|---------|
| Company Name | As-is | "ARC Resources Ltd." |
| Short Description | Truncate to 150 chars | "ARC Resources Ltd. is a leading Canadian energy producer..." |
| Location | Extract from address | "Calgary, AB" |
| Website | As-is | "https://www.arcresources.com/" |
| Category | From CSV section | producer / midstream / services |

---

## Checklist

### Phase 1: Data Preparation (1-2 hours) ✅ COMPLETE
- [x] Create `src/data/companies.json`
- [x] Parse all 117 companies from CSV
- [x] Truncate descriptions to 150 characters
- [x] Extract city/province from addresses
- [x] Assign categories (producer/midstream/services)
- [x] Validate JSON structure

### Phase 2: Component Development (2-3 hours) ✅ COMPLETE
- [x] Create `src/components/DirectoryFilters.astro`
  - [x] Search input field
  - [x] Category filter buttons
  - [x] Results counter
- [x] Create `src/components/CompanyListItem.astro`
  - [x] Company name heading
  - [x] Short description
  - [x] Location with icon
  - [x] Website link button

### Phase 3: Homepage Transformation (2-3 hours) ✅ COMPLETE
- [x] Modify `src/pages/index.astro`
  - [x] Import new components
  - [x] Import companies.json data
  - [x] Update Hero section text
  - [x] Add directory section with filters
  - [x] Render company list items
  - [x] Add "no results" message element
- [x] Add client-side JavaScript filtering
  - [x] Search filter logic
  - [x] Category filter logic
  - [x] Results counter update
  - [x] Show/hide "no results" message

### Phase 4: Styling & Polish (1-2 hours) ✅ COMPLETE
- [x] Styles included in components (scoped CSS)
  - [x] Directory section styles
  - [x] Filter bar styles
  - [x] Search input styles
  - [x] Category button styles
  - [x] Company grid layout
  - [x] Company card styles
  - [x] Hover effects
  - [x] Mobile responsive styles

### Phase 5: Cleanup & Removal (30 min) ✅ COMPLETE
- [x] Archive (optional):
  - [x] `src/pages/companies/` → `src/admin/archived/companies-pages`
  - [x] `src/pages/directory.astro` → `src/admin/archived/directory.astro.bak`
  - [x] `src/layouts/CompanyPageLayout.astro` → `src/admin/archived/CompanyPageLayout.astro.bak`
- [x] Update navigation in `Nav.astro` (changed /directory/ to /#directory)

### Phase 6: Testing & Validation (1 hour) ⏳ PENDING
- [ ] All companies display (117 expected)
- [ ] Search by name works
- [ ] Search by location works
- [ ] Category filter: Producers
- [ ] Category filter: Midstream
- [ ] Category filter: Services
- [ ] Category filter: All
- [ ] External links open in new tab
- [ ] "No results" message shows correctly
- [ ] Mobile responsiveness
- [ ] Cross-browser testing

### Phase 7: SEO & Redirects (30 min) ✅ COMPLETE
- [x] Update homepage meta title/description
- [ ] Add ItemList structured data (optional - skipped)
- [x] Configure 301 redirects in `netlify.toml`:
  - [x] `/directory/` → `/#directory`
  - [x] `/companies/*` → `/`

---

## File Changes Summary

### CREATE
```
src/data/companies.json
src/components/DirectoryFilters.astro
src/components/CompanyListItem.astro
```

### MODIFY
```
src/pages/index.astro
src/styles/globals.css
src/components/Header.astro
netlify.toml
```

### DELETE (after archiving)
```
src/pages/directory.astro
src/pages/companies/ (all 115 files)
src/layouts/CompanyPageLayout.astro
```

---

## Company Categories (from CSV)

| Category | Count | CSV Rows |
|----------|-------|----------|
| producer | ~78 | 2-79 |
| midstream | ~8 | 83-90 |
| services | ~31 | 96-126 |
| **Total** | **~117** | |

---

## Design Tokens (use these consistently)

| Token | Value | Usage |
|-------|-------|-------|
| deep-navy | #0A2647 | Headings, primary buttons |
| petroleum-gold | #D4A846 | Accents, borders, links |
| rich-amber | #E8A027 | Hover states |
| off-white | #F8F9FA | Backgrounds |
| charcoal | #2D3436 | Body text |
| light-gold | #F5E6D3 | Subtle highlights |

---

## Estimated Total Time: 8-12 hours
