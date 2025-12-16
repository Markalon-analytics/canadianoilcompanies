# Problematic Company Pages Audit

**Date:** December 16, 2025  
**Issue:** Escaped single quotes (`\'`) causing build syntax errors  
**Total Company Pages:** 115  
**Total Files Affected:** 36 (31% of all pages)

---

## High Priority (16-17 matches - entire file corrupted)

| # | File | Match Count |
|---|------|-------------|
| 1 | petrotal-corp.astro | 17 |
| 2 | south-bow-corp.astro | 17 |
| 3 | tc-energy.astro | 17 |
| 4 | tidewater-midstream.astro | 17 |
| 5 | step-energy-services.astro | 16 |

---

## Medium Priority (2-3 matches)

| # | File | Match Count |
|---|------|-------------|
| 6 | arc-resources.astro | 3 |
| 7 | canacol-energy.astro | 3 |
| 8 | saturn-oil-gas.astro | 3 |
| 9 | atlas-energy.astro | 2 |
| 10 | bonterra-energy.astro | 2 |
| 11 | condor-energies.astro | 2 |
| 12 | criterium-energy.astro | 2 |
| 13 | ensign-energy-services.astro | 2 |
| 14 | fiddlehead-resources.astro | 2 |
| 15 | imperial-oil.astro | 2 |
| 16 | inter-pipeline.astro | 2 |
| 17 | mullen-group.astro | 2 |
| 18 | peyto-exploration.astro | 2 |
| 19 | strathcona-resources.astro | 2 |
| 20 | suncor-energy.astro | 2 |
| 21 | tourmaline-oil.astro | 2 |
| 22 | valeura-energy.astro | 2 |

---

## Low Priority (1 match - likely apostrophe in text)

| # | File | Match Count |
|---|------|-------------|
| 23 | altima-energy.astro | 1 |
| 24 | alvopetro-energy.astro | 1 |
| 25 | argo-gold.astro | 1 |
| 26 | barnwell-industries.astro | 1 |
| 27 | coelacanth-energy.astro | 1 |
| 28 | crown-point-energy.astro | 1 |
| 29 | decimus-oil.astro | 1 |
| 30 | falcon-oil-gas.astro | 1 |
| 31 | inplay-oil.astro | 1 |
| 32 | journey-energy.astro | 1 |
| 33 | kelt-exploration.astro | 1 |
| 34 | keyera-corp.astro | 1 |
| 35 | kiwetinohk-energy.astro | 1 |
| 36 | obsidian-energy.astro | 1 |

---

## Already Fixed (8 files)

| # | File | Status |
|---|------|--------|
| 1 | russel-metals.astro | ✅ Fixed |
| 2 | phx-energy-services.astro | ✅ Fixed |
| 3 | peak-discovery-capital.astro | ✅ Fixed |
| 4 | questor-technology.astro | ✅ Fixed |
| 5 | parex-resources.astro | ✅ Fixed |
| 6 | source-energy-services.astro | ✅ Fixed |
| 7 | secure-energy-services.astro | ✅ Fixed |
| 8 | pembina-pipeline.astro | ✅ Fixed |

---

## Clean Files (71 files - no errors)

These 71 company pages have no escaped quote issues and are ready for build.

---

## Summary

- **Total pages:** 115
- **Problematic:** 36 (need fixing)
- **Already fixed:** 8
- **Remaining to fix:** 36
- **Clean pages:** 71

## Root Cause

The escaped quotes (`\'`) were introduced during page creation, likely from a copy/paste or encoding issue. Valid JavaScript/Astro syntax requires regular single quotes (`'`) or double quotes (`"`).

## Fix Required

Replace all `\'` with `'` in each file. For strings containing apostrophes (like "company's"), use double quotes instead: `"company's"`.
