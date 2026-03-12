# RevisionHub - Bug Report
**Generated:** March 12, 2026  
**Project:** RevisionHub GCSE Revision Website  
**Status:** 🔴 Critical Issues Found

---

## Executive Summary

Found **12 bugs** across the project:
- 🔴 **3 Critical** - Break functionality or cause errors
- 🟡 **5 High Priority** - Affect user experience
- 🟢 **4 Low Priority** - Code quality/optimization

---

## 🔴 CRITICAL ISSUES

### 1. Missing JavaScript File Reference
**File:** [index.html](index.html#L163)  
**Severity:** 🔴 Critical  
**Issue:** Line 163 references a non-existent file  
```html
<script src="./js/fix.js"></script>
```
**What's Wrong:** File `js/fix.js` does not exist in the project. This causes a 404 error in browser console.  
**Impact:** Browser console will show error. No functional impact currently but sloppy code.  
**Fix:** 
- Option A: Remove the line if not needed
- Option B: Create the file if it's supposed to exist
- Recommendation: **Remove it** - project runs fine without it

---

### 2. SVG Syntax Error in Loader
**File:** [index.html](index.html#L23)  
**Severity:** 🔴 Critical  
**Issue:** Line 23 has invalid text node "vg" in SVG  
```html
<!-- Brain outline -->
 vg
<path d="M70,80 
```
**What's Wrong:** Between the HTML comment and SVG `<path>` tag, there's a stray "vg" text node. This breaks the SVG rendering.  
**Impact:** SVG logo in loader may not render correctly or display "vg" text.  
**Fix:** Delete the "vg" text. The corrected code should be:
```html
<!-- Brain outline -->
<path d="M70,80 
```

---

### 3. Navigation Link Path Errors in Ask Me Page
**File:** [pages/ask-me.html](pages/ask-me.html#L18-L27)  
**Severity:** 🔴 Critical (Navigation Broken)  
**Issue:** Navigation links have wrong relative paths  
```html
<li><a href="../index.html" class="active">Home</a></li>
<li><a href="../pages/subjects.html">Subjects</a></li>
<li><a href="../pages/my-experience.html">My Experience</a></li>
<li><a href="../pages/about.html">About</a></li>
<li><a href="../pages/ask-me.html">Ask Me</a></li>
```
**What's Wrong:** 
- File: `pages/ask-me.html` (in pages folder)
- Should reference: `./subjects.html`, `./my-experience.html`, `./about.html`, `./ask-me.html`
- Currently references: Want to go to pages folder which is already current location

**Impact:** 
- "Subjects", "My Experience", "About", "Ask Me" links all break (404)
- Only "Home" link works

**How to Fix:**
Change line 18-27 to:
```html
<li><a href="../index.html">Home</a></li>
<li><a href="./subjects.html">Subjects</a></li>
<li><a href="./my-experience.html">My Experience</a></li>
<li><a href="./about.html">About</a></li>
<li><a href="./ask-me.html" class="active">Ask Me</a></li>
```

**Affected Pages:**
- The same navigation appears in: about.html, my-experience.html, ask-me.html (pages folder)
- They all have incorrect relative paths

---

## 🟡 HIGH PRIORITY ISSUES

### 4. Duplicate Function Definitions
**Files:** [js/navigation.js](js/navigation.js#L1-L24) and [js/email.js](js/email.js#L4-L12)  
**Severity:** 🟡 High  
**Issue:** Functions `toggleMenu()` and `closeMenu()` are defined in BOTH files
```javascript
// In navigation.js
function toggleMenu() { ... }
function closeMenu() { ... }

// In email.js (duplicate!)
function toggleMenu() { ... }
function closeMenu() { ... }
```
**What's Wrong:** On the ask-me.html page, both files are loaded:
```html
<script src="../js/navigation.js"></script>
<script src="../js/email.js"></script>
```
This means the functions are defined twice, causing the second definition to override the first.

**Impact:** Event listeners might be attached twice. Email.js versions override navigation.js versions, which is incomplete.  
**Fix:** 
- Option A: Remove toggleMenu() and closeMenu() from email.js (preferred)
- Option B: Remove the email.js script tag and consolidate into navigation.js

**Recommendation:** Keep the navigation.js versions as they're more complete. Delete duplicate functions from email.js.

---

### 5. Hardcoded Active Navigation Links
**Files:** Multiple pages  
**Severity:** 🟡 High  
**Issue:** Active link class is hardcoded on wrong links

**Evidence:**
```javascript
// setActiveNavLink() in navigation.js correctly sets active class
// But HTML has hardcoded class="active" that overrides it
```

**Specific Problems:**
1. **[index.html](index.html#L49)** - "Home" has `class="active"` ✓ Correct
2. **[pages/about.html](pages/about.html#L26)** - "Home" has `class="active"` ✗ Wrong (should be "About")
3. **[pages/my-experience.html](pages/my-experience.html#L27)** - "Home" has `class="active"` ✗ Wrong (should be "My Experience")
4. **[pages/ask-me.html](pages/ask-me.html#L23)** - "Home" has `class="active"` ✗ Wrong (should be "Ask Me")
5. **[pages/subjects.html](pages/subjects.html#L23)** - "Subjects" has `class="active"` ✓ Correct

**What's Wrong:** The JavaScript function `setActiveNavLink()` tries to remove active class and add it to the correct link based on current page. But hardcoded classes override the JavaScript logic.

**Impact:** Active link highlighting doesn't match current page visually.

**How to Fix:** Remove hardcoded `class="active"` from HTML. The JavaScript will handle it automatically:

For pages/about.html, change:
```html
<!-- BEFORE -->
<li><a href="../index.html" class="active">Home</a></li>

<!-- AFTER -->
<li><a href="../index.html">Home</a></li>
```
Same for all other pages - remove the class="active" attribute, let JavaScript set it.

---

### 6. Missing Page Titles (SEO Issue)
**Files:** Most HTML pages  
**Severity:** 🟡 High (SEO)  
**Issue:** All pages have generic titles

**Current:**
```html
<title>RevisionHub</title>
```

**Should Be:**
- index.html: `<title>RevisionHub - GCSE Revision Resources</title>`
- pages/about.html: `<title>About RevisionHub - GCSE Tutor</title>`
- pages/ask-me.html: `<title>Ask Me - RevisionHub</title>`
- pages/my-experience.html: `<title>My Experience - RevisionHub</title>`
- pages/subjects.html: `<title>Browse All Subjects - RevisionHub</title>`
- subjects/mathematics.html: `<title>Mathematics Revision - RevisionHub</title>`
- subjects/biology.html: `<title>Biology Revision - RevisionHub</title>`
- subjects/chemistry.html: `<title>Chemistry Revision - RevisionHub</title>`
- subjects/physics.html: `<title>Physics Revision - RevisionHub</title>`
- subjects/computer-science.html: `<title>Computer Science / OCR Revision - RevisionHub</title>`

**Impact:** Poor SEO, unclear in browser tabs, bad user experience.

---

### 7. Missing Meta Descriptions
**Files:** All HTML pages  
**Severity:** 🟡 High (SEO)  
**Issue:** No meta description tags found

**Fix:** Add to `<head>` of each page:
```html
<meta name="description" content="[Unique description of page content, ~155 characters]">
```

**Examples:**
- index.html: `<meta name="description" content="RevisionHub provides free, exam board-aligned GCSE revision resources for Mathematics, Sciences, and Computer Science. Student-created EPQ project with active recall techniques.">`
- ask-me.html: `<meta name="description" content="Have questions about GCSE revision? Contact the RevisionHub creator directly with your questions and get personalized advice.">`

**Impact:** Pages don't show preview text in Google search results. Bad SEO ranking.

---

### 8. Duplicate DOM Event Listeners Loading
**File:** [pages/ask-me.html](pages/ask-me.html#L64-L65)  
**Severity:** 🟡 High  
**Issue:** Both navigation.js and email.js listen to DOMContentLoaded

In navigation.js:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Sets up menu, active links, smooth scroll
});
```

But email.js has its own initialization code that doesn't wait for DOMContentLoaded. Since both scripts load on ask-me.html, there could be timing issues.

**Impact:** Possible race conditions. Menu might not initialize properly.

**Fix:** Email.js should validate that DOM elements exist before manipulating them:
```javascript
// Add checks like:
if (document.getElementById('name')) {
    // Only initialize if element exists
}
```

---

### 9. Incorrect Filter Tab Button Styling
**File:** [pages/subjects.html](pages/subjects.html#L44)  
**Severity:** 🟡 High (UX)  
**Issue:** Only first filter tab has `class="active"`

```html
<button class="filter-tab active" onclick="filterSubjects('all')">All Subjects</button>
<button class="filter-tab" onclick="filterSubjects('sciences')">Sciences</button>
```

**What's Wrong:** 
- "All Subjects" button starts with active class ✓
- But other buttons don't toggle active class visually when clicked
- The JavaScript removes active from all buttons and adds to clicked one

**Potential Issues:**
1. If setActiveNavLink() doesn't run on this page, Subjects link won't be highlighted
2. User visual feedback for which filter is active depends entirely on inline onclick

**Impact:** Users might not know which filter category is currently active.

**Fix:** Ensure filter.js properly updates visual states (appears to do this already, but verify).

---

## 🟢 LOW PRIORITY ISSUES

### 10. Typography Error in Homepage
**File:** [index.html](index.html#L77)  
**Severity:** 🟢 Low (Cosmetic)  
**Issue:** Missing space before text

```html
<h3><span class="feature-icon">🧠</span>Exam Style Questions</h3>
```

**Should be:**
```html
<h3><span class="feature-icon">🧠</span> Exam Style Questions</h3>
```

**Impact:** Minor - slight visual spacing issue. Text runs too close to emoji.

---

### 11. Game Page Navigation Issue
**File:** [subjects/game.html](subjects/game.html#L1-L27)  
**Severity:** 🟢 Low  
**Issue:** 
1. No header/navigation on game page
2. Only has a "Go Back" button at bottom
3. Inconsistent with other pages

**What's Wrong:** User lands on game.html with no way to navigate the site except go back. Hard to discover other content.

**Fix:** Add header/navigation like other pages:
```html
<header>
    <nav>
        <div class="logo-container">...</div>
        <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
        <ul class="nav-links" id="navLinks">
            <!-- navigation links -->
        </ul>
    </nav>
</header>
```

---

### 12. No Error Handling in Email Form
**File:** [js/email.js](js/email.js#L15-L50)  
**Severity:** 🟢 Low  
**Issue:** 
```javascript
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
// No null checks - assumes elements exist
```

**What's Wrong:** If HTML structure changes and elements don't exist, this throws TypeError.

**Fix:** Add safety checks:
```javascript
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
if (!nameEl || !emailEl) {
    console.error('Form elements not found');
    return;
}
```

---

## Summary Table

| # | Issue | File | Severity | Fix Difficulty |
|---|-------|------|----------|-----------------|
| 1 | Missing fix.js | index.html | 🔴 Critical | Easy (delete line) |
| 2 | SVG "vg" text | index.html | 🔴 Critical | Easy (delete 2 chars) |
| 3 | Navigation paths | pages/*.html | 🔴 Critical | Medium (5 pages to fix) |
| 4 | Duplicate functions | js/*.js | 🟡 High | Medium (consolidate) |
| 5 | Hardcoded active links | pages/*.html | 🟡 High | Medium (remove from 4 pages) |
| 6 | Missing page titles | All HTML | 🟡 High | Medium (add to each page) |
| 7 | Missing meta descriptions | All HTML | 🟡 High | Medium (add to each page) |
| 8 | Event listener timing | pages/ask-me.html | 🟡 High | Low (add null checks) |
| 9 | Filter button styling | pages/subjects.html | 🟡 High | Low (verify, may already work) |
| 10 | Missing space in text | index.html | 🟢 Low | Easy (add 1 space) |
| 11 | Game page nav missing | subjects/game.html | 🟢 Low | Medium (copy header) |
| 12 | No error handling | js/email.js | 🟢 Low | Easy (add null checks) |

---

## Testing Recommendations

### Manual Tests (After Fixes)
1. [ ] Open index.html - no console errors
2. [ ] Click all navigation links from each page
3. [ ] Check active link highlights current page
4. [ ] Test mobile menu on small screens
5. [ ] Fill and submit ask-me form
6. [ ] Try all subject filters
7. [ ] Play snake game
8. [ ] Check all pages load without 404 errors

### Browser Console (F12)
Look for:
- ❌ Failed to load resource errors
- ❌ TypeError / ReferenceError
- ❌ Duplicate function definition warnings

### DevTools Network Tab
- Check all JavaScript files load without 404
- Verify no broken image/icon requests

---

## Recommended Fix Priority

**Do First (Critical):**
1. Delete "fix.js" line from index.html
2. Fix SVG "vg" text error
3. Fix navigation paths in pages/ask-me.html (and other page files)

**Do Next (High Priority):**
4. Remove hardcoded active class from navigation links
5. Remove duplicate functions from email.js
6. Add unique page titles
7. Add meta descriptions

**Do Last (Nice to Have):**
8. Add navigation to game page
9. Add error handling
10. Fix typography spacing

---

## Additional Notes

- Project is well-structured overall
- Code is mostly readable and organized
- No major architecture issues
- Main problems are relative paths and hardcoded values

---

**Report Created:** March 12, 2026  
**Debugger:** Code Analysis  
**Status:** ✅ Ready for fixes
