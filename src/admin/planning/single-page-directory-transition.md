# Single-Page Filterable Directory Transition Plan

## Executive Summary

This document outlines a comprehensive implementation plan to transform the Canadian Oil Companies website from a multi-page directory structure (115+ individual company pages) into a single-page filterable directory on the homepage. The new design will display a streamlined company listing with only essential data points: **Company Name**, **Short Description**, **Corporate Office Location**, and **Official Website Link**.

---

## Current Architecture Analysis

### Existing Site Structure

```
src/
├── pages/
│   ├── index.astro              # Homepage (hero + featured companies)
│   ├── directory.astro          # Full directory listing (~88KB, 2777 lines)
│   ├── about.astro              # About page
│   ├── services.astro           # Services page
│   └── companies/               # Individual company pages (115 files)
│       ├── arc-resources.astro
│       ├── suncor-energy.astro
│       └── ... (113 more files)
├── components/
│   ├── Hero.astro
│   ├── CompanyCard.astro
│   ├── SectionHeader.astro
│   ├── CTASection.astro
│   └── ... (5 more)
├── layouts/
│   ├── BaseLayout.astro
│   └── CompanyPageLayout.astro
├── data/
│   └── list of canadian oil companies/
│       └── Canadian Oil Companies Data - For Upload.csv
└── styles/
    └── globals.css
```

### Current Data Model (Per Company Page)

Each company `.astro` file contains:
- `name` - Company name
- `website` - Official website URL
- `description` - Full company description
- `address` - Corporate office address
- `stockSymbol` - Stock ticker symbol
- `exchange` - Stock exchange
- `keyHighlights[]` - Array of key business highlights
- `landHoldings` - Land holdings information
- `capitalOutlook` - Capital outlook information

### CSV Data Source

The CSV file (`Canadian Oil Companies Data - For Upload.csv`) contains 126 companies with:
- Company Name
- Website URL
- Description
- Corporate Office Address
- Status

**Company Categories in CSV:**
1. **Oil & Gas Producers** (Rows 2-79) - ~78 companies
2. **Midstream Companies** (Rows 83-90) - ~8 companies
3. **Service Companies** (Rows 96-126) - ~31 companies

---

## Target Architecture

### New Site Structure

```
src/
├── pages/
│   ├── index.astro              # TRANSFORMED: Homepage with filterable directory
│   ├── about.astro              # Keep as-is
│   └── services.astro           # Keep as-is
├── components/
│   ├── Hero.astro               # Keep (slightly modified hero text)
│   ├── DirectoryFilters.astro   # NEW: Filter controls component
│   ├── CompanyListItem.astro    # NEW: Simplified company row/card
│   ├── SectionHeader.astro      # Keep as-is
│   ├── CTASection.astro         # Keep as-is
│   └── ... (existing components)
├── data/
│   └── companies.json           # NEW: Centralized company data
├── layouts/
│   └── BaseLayout.astro         # Keep as-is
└── styles/
    └── globals.css              # ADD: New filter/list styles
```

### New Data Model (Simplified)

```typescript
interface Company {
  id: string;                    // Slug identifier
  name: string;                  // Company name
  shortDescription: string;      // Truncated description (~150 chars)
  location: string;              // City, Province (extracted from address)
  website: string;               // Official website URL
  category: 'producer' | 'midstream' | 'services';
}
```

---

## Implementation Phases

## Phase 1: Data Preparation
**Estimated Time: 1-2 hours**

### Step 1.1: Create Centralized JSON Data File

Create `src/data/companies.json` with all companies in simplified format.

**Tasks:**
1. Parse existing CSV data
2. Extract and simplify data fields:
   - `id`: Generate slug from company name
   - `name`: Company name (as-is)
   - `shortDescription`: Truncate description to 150 characters + ellipsis
   - `location`: Extract city and province from address (e.g., "Calgary, AB")
   - `website`: Website URL (as-is)
   - `category`: Assign based on CSV section (producer/midstream/services)
3. Create JSON file with array of company objects

**Example Output:**
```json
{
  "companies": [
    {
      "id": "arc-resources",
      "name": "ARC Resources Ltd.",
      "shortDescription": "ARC Resources Ltd. is a leading Canadian energy producer focused on developing high-quality crude oil, condensate, and natural gas assets...",
      "location": "Calgary, AB",
      "website": "https://www.arcresources.com/",
      "category": "producer"
    }
  ]
}
```

### Step 1.2: Address Parsing Logic

Create consistent location extraction:
- Input: `"1200, 308 – 4th Avenue SW, Calgary, Alberta T2P 0H7, Canada"`
- Output: `"Calgary, AB"`

**Province Abbreviation Map:**
```javascript
const provinceMap = {
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Ontario': 'ON',
  'Saskatchewan': 'SK',
  'Manitoba': 'MB',
  'Quebec': 'QC',
  // Add other provinces as needed
};
```

---

## Phase 2: Component Development
**Estimated Time: 2-3 hours**

### Step 2.1: Create `DirectoryFilters.astro`

A new component for filtering the company directory.

**Filter Options:**
1. **Search Input** - Full-text search across name, description, location
2. **Category Filter** - Dropdown/buttons for: All, Producers, Midstream, Services
3. **Location Filter** - Optional: Filter by province

**Component Structure:**
```astro
---
interface Props {
  categories: string[];
  locations: string[];
}
---

<div class="directory-filters">
  <!-- Search Input -->
  <input type="search" id="company-search" placeholder="Search companies..." />
  
  <!-- Category Filter Tabs/Buttons -->
  <div class="filter-tabs">
    <button data-category="all" class="active">All Companies</button>
    <button data-category="producer">Oil & Gas Producers</button>
    <button data-category="midstream">Midstream</button>
    <button data-category="services">Services</button>
  </div>
  
  <!-- Results Count -->
  <div id="results-count"></div>
</div>

<script>
  // Client-side filtering logic (covered in Phase 3)
</script>
```

**Styling Guidelines:**
- Maintain existing color scheme (deep-navy, petroleum-gold, etc.)
- Professional, clean filter bar design
- Mobile-responsive layout
- Subtle shadow and border-radius for inputs

### Step 2.2: Create `CompanyListItem.astro`

A simplified company card/row component.

**Display Fields:**
1. **Company Name** - Prominent, linked to external website
2. **Short Description** - 1-2 lines, truncated
3. **Location** - City, Province with location icon
4. **Website Link** - External link button/icon

**Component Structure:**
```astro
---
interface Props {
  name: string;
  shortDescription: string;
  location: string;
  website: string;
  category: string;
}

const { name, shortDescription, location, website, category } = Astro.props;
---

<article class="company-list-item" data-category={category}>
  <div class="company-info">
    <h3 class="company-name">{name}</h3>
    <p class="company-description">{shortDescription}</p>
    <div class="company-meta">
      <span class="company-location">
        <svg><!-- Location Icon --></svg>
        {location}
      </span>
    </div>
  </div>
  <a href={website} target="_blank" rel="noopener noreferrer" class="website-link">
    Visit Website →
  </a>
</article>
```

**Styling:**
- Card-based or table-row design (recommend cards for mobile)
- Hover effects with subtle shadow/border changes
- Consistent spacing and typography
- Category-based accent colors (optional)

---

## Phase 3: Homepage Transformation
**Estimated Time: 2-3 hours**

### Step 3.1: Modify `index.astro`

**New Structure:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import DirectoryFilters from '../components/DirectoryFilters.astro';
import CompanyListItem from '../components/CompanyListItem.astro';
import CTASection from '../components/CTASection.astro';

import companiesData from '../data/companies.json';

// Extract unique categories and locations for filters
const categories = [...new Set(companiesData.companies.map(c => c.category))];
const locations = [...new Set(companiesData.companies.map(c => c.location))].sort();
---

<BaseLayout
  title="Canadian Oil Companies | Corporate Directory"
  description="Comprehensive directory of Canada's largest oil companies..."
>
  <!-- Hero Section (Updated messaging) -->
  <Hero
    badge="Trusted Industry Resource"
    title="Canadian Oil & Energy Company Directory"
    subtitle="Browse the complete directory of Canadian energy companies"
  />

  <!-- Directory Section -->
  <section class="directory-section" id="directory">
    <div class="container">
      <DirectoryFilters categories={categories} locations={locations} />
      
      <div id="company-list" class="company-grid">
        {companiesData.companies.map(company => (
          <CompanyListItem
            name={company.name}
            shortDescription={company.shortDescription}
            location={company.location}
            website={company.website}
            category={company.category}
          />
        ))}
      </div>
      
      <!-- No Results Message -->
      <div id="no-results" class="hidden">
        <p>No companies found matching your criteria.</p>
      </div>
    </div>
  </section>

  <!-- CTA Section (Keep) -->
  <CTASection ... />
</BaseLayout>
```

### Step 3.2: Client-Side Filtering Logic

Add JavaScript for real-time filtering:

```javascript
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('company-search');
    const categoryButtons = document.querySelectorAll('[data-category]');
    const companyItems = document.querySelectorAll('.company-list-item');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    
    let currentCategory = 'all';
    let currentSearch = '';
    
    function filterCompanies() {
      let visibleCount = 0;
      
      companyItems.forEach(item => {
        const matchesCategory = currentCategory === 'all' || 
          item.dataset.category === currentCategory;
        
        const itemText = item.textContent.toLowerCase();
        const matchesSearch = currentSearch === '' || 
          itemText.includes(currentSearch.toLowerCase());
        
        if (matchesCategory && matchesSearch) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      resultsCount.textContent = `Showing ${visibleCount} companies`;
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
    
    // Search input handler
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      filterCompanies();
    });
    
    // Category button handlers
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        filterCompanies();
      });
    });
    
    // Initialize
    filterCompanies();
  });
</script>
```

---

## Phase 4: Styling & Polish
**Estimated Time: 1-2 hours**

### Step 4.1: Update `globals.css`

Add new styles for the directory components:

```css
/* Directory Section */
.directory-section {
  padding: 4rem 2rem;
  background: var(--off-white);
}

.directory-section .container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Filter Bar */
.directory-filters {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.directory-filters input[type="search"] {
  width: 100%;
  max-width: 400px;
  padding: 0.875rem 1rem;
  border: 2px solid #e1e5ea;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.directory-filters input[type="search"]:focus {
  outline: none;
  border-color: var(--petroleum-gold);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.filter-tabs button {
  padding: 0.625rem 1.25rem;
  border: 2px solid var(--deep-navy);
  background: transparent;
  color: var(--deep-navy);
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.filter-tabs button:hover,
.filter-tabs button.active {
  background: var(--deep-navy);
  color: white;
}

/* Company Grid */
.company-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

/* Company List Item */
.company-list-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-left: 4px solid var(--petroleum-gold);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.company-list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.company-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--deep-navy);
  margin: 0;
}

.company-description {
  font-size: 0.95rem;
  color: var(--charcoal);
  line-height: 1.6;
  margin: 0;
}

.company-location {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.website-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--petroleum-gold);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
  margin-top: auto;
}

.website-link:hover {
  color: var(--rich-amber);
}

/* Responsive */
@media (max-width: 768px) {
  .company-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tabs {
    justify-content: center;
  }
}

/* Utility */
.hidden {
  display: none !important;
}
```

---

## Phase 5: Cleanup & Removal
**Estimated Time: 30 minutes**

### Step 5.1: Archive Old Files (Optional)

Before deletion, optionally archive for reference:

```bash
# Create archive directory
mkdir -p src/admin/archived

# Move old files
mv src/pages/companies src/admin/archived/companies-pages
mv src/pages/directory.astro src/admin/archived/directory.astro.bak
mv src/layouts/CompanyPageLayout.astro src/admin/archived/
```

### Step 5.2: Delete Redundant Files

Files to remove:
- `src/pages/companies/` - Entire directory (115 files)
- `src/pages/directory.astro` - Old directory page
- `src/layouts/CompanyPageLayout.astro` - No longer needed

### Step 5.3: Update Navigation

Update `Header.astro` and `Nav.astro`:
- Remove link to `/directory/` (now integrated into homepage)
- Keep anchor link to `#directory` section if desired

### Step 5.4: Update Internal Links

Search and update any links pointing to:
- `/directory/` → `/` or `/#directory`
- `/companies/[slug]/` → Remove or redirect to `/`

---

## Phase 6: Testing & Validation
**Estimated Time: 1 hour**

### Step 6.1: Functional Testing

| Test Case | Expected Result |
|-----------|-----------------|
| Page loads with all companies | 120+ companies displayed |
| Search by company name | Filters to matching companies |
| Search by location | Filters to matching locations |
| Category filter: Producers | Shows only producer companies |
| Category filter: Midstream | Shows only midstream companies |
| Category filter: Services | Shows only service companies |
| Category filter: All | Shows all companies |
| External links open correctly | Opens in new tab |
| No results message | Displays when no matches |
| Clear search | Returns to full list |

### Step 6.2: Cross-Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome (Android)

### Step 6.3: Performance Testing

- Page load time < 2 seconds
- Filter response time < 100ms
- Check for layout shifts

### Step 6.4: Accessibility Testing

- Keyboard navigation works
- Focus states visible
- Screen reader compatibility
- Color contrast meets WCAG AA

---

## Phase 7: SEO Considerations
**Estimated Time: 30 minutes**

### Step 7.1: Meta Tags Update

Update homepage meta tags:
```html
<title>Canadian Oil Companies Directory | Complete Industry Guide</title>
<meta name="description" content="Browse the complete directory of 120+ Canadian oil and energy companies. Filter by category, search by name, and access company information." />
```

### Step 7.2: Structured Data

Add JSON-LD for ItemList:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Canadian Oil Companies Directory",
  "numberOfItems": 120,
  "itemListElement": [...]
}
```

### Step 7.3: 301 Redirects

Configure redirects in `netlify.toml` or equivalent:
```toml
[[redirects]]
  from = "/directory/"
  to = "/#directory"
  status = 301

[[redirects]]
  from = "/companies/*"
  to = "/"
  status = 301
```

---

## Implementation Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Data Preparation | 1-2 hours |
| 2 | Component Development | 2-3 hours |
| 3 | Homepage Transformation | 2-3 hours |
| 4 | Styling & Polish | 1-2 hours |
| 5 | Cleanup & Removal | 30 minutes |
| 6 | Testing & Validation | 1 hour |
| 7 | SEO Considerations | 30 minutes |
| **Total** | **Complete Transition** | **8-12 hours** |

---

## Risk Mitigation

### Risk 1: SEO Traffic Loss
**Mitigation:** Implement 301 redirects for all old URLs

### Risk 2: Missing Data
**Mitigation:** Validate all 126 companies are included in JSON

### Risk 3: Filter Performance
**Mitigation:** Use vanilla JavaScript, avoid heavy frameworks

### Risk 4: Design Inconsistency
**Mitigation:** Strictly follow existing Tailwind config colors/fonts

---

## Files to Create

1. `src/data/companies.json` - Centralized company data
2. `src/components/DirectoryFilters.astro` - Filter controls
3. `src/components/CompanyListItem.astro` - Simplified company card

## Files to Modify

1. `src/pages/index.astro` - Transform into directory page
2. `src/styles/globals.css` - Add directory styles
3. `src/components/Header.astro` - Update navigation
4. `netlify.toml` - Add redirects

## Files to Delete

1. `src/pages/directory.astro` (after archiving)
2. `src/pages/companies/` directory (115 files)
3. `src/layouts/CompanyPageLayout.astro`

---

## Appendix A: Category Mapping

Based on CSV analysis:

| Category | CSV Row Range | Company Count |
|----------|---------------|---------------|
| producer | 2-79 | ~78 |
| midstream | 83-90 | ~8 |
| services | 96-126 | ~31 |

---

## Appendix B: Sample companies.json Structure

```json
{
  "meta": {
    "totalCount": 126,
    "lastUpdated": "2026-01-30",
    "categories": ["producer", "midstream", "services"]
  },
  "companies": [
    {
      "id": "advantage-energy",
      "name": "Advantage Energy Ltd.",
      "shortDescription": "Advantage Energy is a Canadian natural gas-focused energy company with operations in the Montney Formation in Alberta...",
      "location": "Calgary, AB",
      "website": "https://www.advantageog.com/",
      "category": "producer"
    },
    // ... 125 more companies
  ]
}
```

---

## Appendix C: Design Tokens Reference

From `tailwind.config.mjs`:

```javascript
colors: {
  'deep-navy': '#0A2647',
  'petroleum-gold': '#D4A846',
  'rich-amber': '#E8A027',
  'off-white': '#F8F9FA',
  'charcoal': '#2D3436',
  'light-gold': '#F5E6D3',
}

fontFamily: {
  'serif': ['Playfair Display', 'serif'],
  'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
}
```

---

*Document prepared for Canadian Oil Companies website transition*
*Version 1.0 | January 30, 2026*
