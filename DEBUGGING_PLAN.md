# RevisionHub - Debugging & Testing Plan

## Project Overview
RevisionHub is a student-designed GCSE revision website with subject-specific resources, interactive features, and a contact system.

---

## 1. CRITICAL FUNCTIONALITY CHECKS

### 1.1 Navigation System
- [ ] **Mobile menu toggle** works on all screen sizes (< 768px)
  - Test: Click hamburger menu, verify it opens/closes
  - Test: Click nav links, verify menu closes
  - Test: Click outside menu, verify it closes
  - Test: Press ESC key, verify menu closes

- [ ] **Active link highlighting** works correctly
  - Test: Navigate to each page, verify active link updates
  - Test: Check if active link styling is visible
  - Test: Test on deep-linked pages (subjects folder)

- [ ] **Logo/home link** works from all pages
  - Test: Navigate to different pages and click logo
  - Verify redirect works from roots and subdirectories

### 1.2 Email System (Ask Me Page)
- [ ] **Form validation** 
  - Test: Submit empty form → should show alert
  - Test: Submit with missing fields → should show alert
  - Test: Submit with valid data → should send successfully
  
- [ ] **EmailJS integration**
  - Verify API key `001fh5cX5stgnhi7K` is correct and active
  - Verify service ID `service_evhbotl` exists
  - Verify template ID `template_8pq4y4h` exists and is configured
  - Test: Send test email and verify it arrives
  - Check: Is button disabled while sending?
  - Check: Does success message appear after 5 seconds?
  - Test: Error handling when email fails

- [ ] **Form reset after submission**
  - Test: Submit form, verify all fields clear
  - Test: Verify success message shows/hides correctly

### 1.3 Subject Filter
- [ ] **Filter functionality**
  - Test: Click "All Subjects" → all cards display
  - Test: Click "Sciences" → only science subjects show
  - Test: Click "Maths" → only math card shows
  - Test: Click "Computing" → only computing card shows
  - Test: Verify aria-announced text updates

- [ ] **Category data attributes**
  - Verify each subject card has correct `data-category` attribute
  - Check for typos: "sciences", "maths", "computing"

### 1.4 Game Functionality
- [ ] **Snake Game loads correctly**
  - Test: Navigate to game page
  - Verify canvas renders without errors
  - Test: Keyboard controls (arrow keys) work
  - Test: Touch controls work on mobile
  - Test: Canvas resizes on window resize
  - Test: Score updates correctly
  - Test: Game over screen displays properly

---

## 2. RESPONSIVE DESIGN & LAYOUT

### 2.1 Breakpoints to Test
- [ ] **Mobile (320px - 640px)**
  - Icons display correctly
  - Text is readable
  - Mobile menu functions
  - No horizontal scrolling
  - Cards stack properly

- [ ] **Tablet (641px - 1024px)**
  - Layout adjusts appropriately
  - Images scale correctly
  - Navigation transitions from mobile to desktop

- [ ] **Desktop (1025px+)**
  - Full navigation displays
  - Maximum width applies (1400px in header)
  - Hover effects work

### 2.2 Common Responsive Issues
- [ ] **Font sizes** are readable at all sizes
- [ ] **Images and icons** scale properly
- [ ] **Padding/margins** don't cause overflow
- [ ] **Buttons and inputs** have adequate touch targets (44px minimum)
- [ ] **Line lengths** for text are not too long (readability)

---

## 3. IMAGE & ASSET LOADING

- [ ] **Favicon loads** (./assets/images/logo.png)
  - Test on each page, verify no 404 errors
  
- [ ] **All page icons** load correctly
  - 📘, 📚, 📐, 🧬, ⚛️, 💻, 📊 (check if using emoji or image files)

- [ ] **Asset paths are correct**
  - Check relative paths from each page level
  - /index.html → ./assets/images/
  - /pages/*.html → ../assets/images/

- [ ] **No broken images**
  - Run browser DevTools → Console
  - Check for any 404 errors

---

## 4. JAVASCRIPT ISSUES

### 4.1 Error Detection
- [ ] **Check browser console** for errors on each page
  - Open DevTools (F12) → Console tab
  - Test on Chrome, Firefox, Safari, Edge

- [ ] **Check for undefined variables/functions**
  - Verify `emailjs` library is loaded before use
  - Verify DOM elements exist before manipulation

### 4.2 Code Quality Issues
- [ ] **Duplicate code in email.js and navigation.js**
  - `toggleMenu()` and `closeMenu()` defined in both files
  - **Action:** Consolidate to single location to avoid conflicts
  - Risk: Event listeners attached twice = performance issue

- [ ] **DOMContentLoaded timing issues**
  - navigation.js listens for DOMContentLoaded
  - Verify it runs AFTER DOM is ready
  - Check script tag placement in HTML

- [ ] **Event delegation potential issues**
  - `filterSubjects()` uses inline `onclick` attribute
  - Alternative: Use event delegation with data attributes
  - Current system works but less maintainable

### 4.3 Specific Function Tests
- [ ] **filterSubjects() accessibility**
  - Check: aria-pressed attribute updates
  - Check: aria-live announcer is created/removed properly
  - Verify: announcer is removed after 1 second

- [ ] **setActiveNavLink() path matching**
  - Test: window.location.pathname split correctly
  - Test: Works with and without trailing slashes
  - Test: Windows vs. Linux path separators (both use /)

---

## 5. PERFORMANCE & OPTIMIZATION

### 5.1 Load Time
- [ ] **Measure First Contentful Paint (FCP)**
  - DevTools → Lighthouse
  - Target: < 2 seconds

- [ ] **Check unused CSS/JS**
  - loader.css is included but loader might be removed via JS
  - Verify loader-wrapper is removed after page load

- [ ] **Google Fonts loading**
  - preconnect is set up correctly
  - Font-swap strategy to avoid FOUT (Flash of Unstyled Text)

### 5.2 Canvas & Game Performance
- [ ] **Snake game frame rate**
  - Check if using requestAnimationFrame
  - Monitor for lag on lower-end devices
  - Test on mobile browsers

---

## 6. ACCESSIBILITY (WCAG 2.1 AA)

### 6.1 Semantic HTML
- [ ] **Heading hierarchy** (h1 > h2 > h3, no skips)
- [ ] **Form labels** properly associated with inputs
- [ ] **Button vs Div** - interactive elements use proper tags
- [ ] **Link purposes** are clear ("About" vs "Click Here")

### 6.2 ARIA Attributes
- [ ] **aria-label** on mobile menu button ✓ (navigation.js adds this)
- [ ] **aria-expanded** toggles correctly ✓
- [ ] **aria-pressed** on filter buttons ✓
- [ ] **aria-live** on announcer element ✓

### 6.3 Keyboard Navigation
- [ ] **Tab order** is logical
- [ ] **Focus indicators** are visible
- [ ] **ESC key** closes mobile menu ✓
- [ ] **Enter/Space** activates buttons

### 6.4 Color & Contrast
- [ ] **CSS custom properties**:
  - --text-primary: #ffffff (primary text)
  - --text-secondary: rgba(255,255,255,0.7)
  - --text-muted: rgba(255,255,255,0.5)
  - Test: Contrast ratio ≥ 4.5:1 for normal text
  - Test: Contrast ratio ≥ 3:1 for large text (18pt+)

---

## 7. BROWSER COMPATIBILITY

- [ ] **Chrome/Edge** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Mobile Chrome** (Android)

### Known Potential Issues
- [ ] **CSS custom properties** (widely supported, but IE11 doesn't support)
- [ ] **Canvas API** (gameCanvas) - widely supported
- [ ] **EmailJS CDN** dependency - verify always available
- [ ] **Google Fonts CDN** - verify loading in all regions

---

## 8. CROSS-PAGE CONSISTENCY

- [ ] **Styling matches** across all pages
- [ ] **Header/navigation** is identical
- [ ] **Footer** (if applicable)
- [ ] **Color scheme** consistency
- [ ] **Typography** consistency

---

## 9. SEO & METADATA

- [ ] **Page titles** are descriptive
  - Current: All say "RevisionHub" - make unique per page
  - Suggested: "Mathematics Revision | RevisionHub GCSE"

- [ ] **Meta descriptions** (currently missing)
  - Add: `<meta name="description" content="...">`
  - Should summarize page content ~155 characters

- [ ] **Canonical URLs** (if needed)

- [ ] **Open Graph tags** (optional, for social sharing)

---

## 10. KNOWN ISSUES TO INVESTIGATE

### High Priority
1. **Duplicate function definitions** (toggleMenu, closeMenu in two files)
   - Status: ⚠️ May cause conflicts
   - Action: Consolidate to single JS file

2. **EmailJS credentials exposed** in client-side code
   - Status: ⚠️ Not critical for test, but bad practice
   - Note: Only service ID/template ID exposed, not sensitive keys
   - Consider: Use environment variables or backend proxy in production

3. **Filter page path consistency**
   - Check: subjects.html references work from all pages

### Medium Priority
1. **No error logging system**
   - Consider: Add basic try-catch blocks around critical functions
   
2. **Hard-coded active-link logic**
   - May fail if URLs change (e.g., query parameters)

3. **Game responsiveness edge cases**
   - Test: Very small screens (< 320px)
   - Test: Very large screens (> 2560px)

---

## 11. TESTING CHECKLIST

### Manual Testing Order
1. [ ] Desktop Chrome
2. [ ] Desktop Firefox
3. [ ] Mobile Chrome (Android)
4. [ ] Mobile Safari (iOS)
5. [ ] Tablet view (DevTools responsive mode)

### Actions to Test on Each Browser/Device
1. [ ] Load index.html - check loader, layout, no errors
2. [ ] Navigate to each page via menu
3. [ ] Test mobile menu on small screens
4. [ ] Test form submission on ask-me.html
5. [ ] Test subject filters on subjects.html
6. [ ] Play snake game on game.html
7. [ ] Check console for errors (F12 → Console)
8. [ ] Check DevTools → Lighthouse scores

---

## 12. TEST RESULTS TEMPLATE

### Test Date: _______
### Browser/Device: _______

#### Navigation
- [ ] Pass  [ ] Fail - Mobile menu toggle
- [ ] Pass  [ ] Fail - Active link highlighting
- [ ] Pass  [ ] Fail - All links work

#### Ask Me Form
- [ ] Pass  [ ] Fail - Validation works
- [ ] Pass  [ ] Fail - Email sends
- [ ] Pass  [ ] Fail - Form resets

#### Filtering
- [ ] Pass  [ ] Fail - All filters work
- [ ] Pass  [ ] Fail - Aria announcements work

#### Game
- [ ] Pass  [ ] Fail - Canvas loads
- [ ] Pass  [ ] Fail - Controls work
- [ ] Pass  [ ] Fail - Score updates

#### Performance
- [ ] Pass  [ ] Fail - No console errors
- [ ] Pass  [ ] Fail - Loads quickly
- [ ] Pass  [ ] Fail - No broken images

**Notes:**
_________________________________

---

## 13. DEBUGGING TOOLS & COMMANDS

### Browser DevTools Commands
```javascript
// Check all click listeners
monitorEvents(document.body, 'click');

// Check all fetch/XHR requests
// Network tab → check EmailJS requests

// Performance profiling
performance.mark('start');
// ... run code ...
performance.mark('end');
performance.measure('myMeasure', 'start', 'end');
console.log(performance.getEntriesByName('myMeasure'));

// Check DOM elements
document.querySelectorAll('[data-category]').forEach(el => {
  console.log(el.getAttribute('data-category'));
});

// Verify EmailJS loaded
console.log(typeof emailjs); // should be 'object'
```

### Local Testing (if using local server)
```bash
# Python simple server
python -m http.server 8000

# Node.js http-server
npx http-server

# Live Server (VS Code extension)
# Right-click on index.html → "Open with Live Server"
```

---

## 14. PRIORITY FIXES

### 🔴 Critical (Fix Immediately)
1. Remove duplicate function definitions

### 🟡 High (Fix Before Deployment)
1. Make page titles unique per page
2. Add meta descriptions
3. Test EmailJS thoroughly

### 🟢 Low (Nice to Have)
1. Add error logging
2. Consolidate CSS custom properties
3. Add more comprehensive testing

---

## Notes
- This is a student EPQ project - balance functionality with learning
- Focus on core features: navigation, email, and filtering
- Game is a bonus feature, not critical
- Document any bugs found in Issues section below

### Issues Found
_________________________________

---

**Last Updated:** [Date]
**Tested By:** [Name]
**Status:** Ready for Testing ✓
