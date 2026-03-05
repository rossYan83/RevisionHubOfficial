# RevisionHub - Responsive Design Implementation Guide

## Quick Reference

### 1. Mobile Menu ARIA Implementation
```javascript
// Set on button
menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
menuBtn.setAttribute('aria-expanded', 'false'); // Updated on toggle

// Close on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});
```

### 2. Accordion with ARIA Labels
```javascript
// Update button state
btn.setAttribute('aria-expanded', content.classList.contains('open'));

// Mobile smooth scroll
if (window.innerWidth < 768) {
    header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
```

### 3. Filter with Screen Reader Support
```javascript
// Add aria-pressed to filter tabs
tab.setAttribute('aria-pressed', tabIsActive);

// Announce filter results to screen readers
const announcer = document.createElement('div');
announcer.setAttribute('aria-live', 'polite');
announcer.setAttribute('aria-atomic', 'true');
announcer.className = 'sr-only';
announcer.textContent = `Showing ${visibleCount} subject${visibleCount !== 1 ? 's' : ''}`;
```

### 4. Focus Visible Styles
```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 2px solid #5eb3f6;
    outline-offset: 2px;
}
```

### 5. Touch Target Optimization
```css
@media (max-width: 768px) {
    button, .action-btn, .filter-tab {
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
```

### 6. Responsive Typography
```css
/* Desktop */
h1 { font-size: 4rem; }

/* Tablet */
@media (max-width: 768px) {
    h1 { font-size: 2.2rem; }
}

/* Mobile */
@media (max-width: 480px) {
    h1 { font-size: 1.8rem; }
}
```

### 7. Screen Reader Only Class
```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

---

## Responsive Breakpoints Structure

### CSS Media Query Order (Mobile-First)
```css
/* Base styles (mobile) */
body { font-size: 1rem; }

/* Tablets and up */
@media (min-width: 769px) { }

/* Large tablets and desktops */
@media (min-width: 1025px) { }

/* Large desktops */
@media (min-width: 1401px) { }

/* OR Approach: Desktop-First */

/* Large screens (base) */
@media (max-width: 1400px) { /* Adjust for tablets */ }
@media (max-width: 768px) { /* Adjust for mobile */ }
@media (max-width: 480px) { /* Adjust for small mobile */ }
```

---

## Common Responsive Patterns Used

### 1. Flexible Grid
```css
.subjects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .subjects-grid { grid-template-columns: 1fr; }
}
```

### 2. Flex Stack on Mobile
```css
.topic-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .topic-actions { flex-direction: column; }
    .action-btn { width: 100%; }
}
```

### 3. Conditional Padding
```css
.main-content {
    padding: 0 3rem 4rem;
}

@media (max-width: 768px) {
    .main-content { padding: 0 1.5rem 4rem; }
}

@media (max-width: 480px) {
    .main-content { padding: 0 1rem 2rem; }
}
```

### 4. Text Truncation & Collapsing
```css
.topic-card-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.topic-card-content.open {
    max-height: 400px;
}
```

---

## Testing Commands (Command Line)

### Check CSS for Errors
```bash
# Using CSS Validator API
curl -F "file=@css/main.css" https://jigsaw.w3.org/css-validator/validator
```

### Lighthouse Testing (Chrome DevTools)
```javascript
// Run in DevTools Console
await fetch('https://www.google.com/recaptcha/api.js')
  .then(() => console.log('Performance test ready'))
```

### AccessibilityTree Inspector
```javascript
// Find all focusable elements
document.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
).length
```

---

## Performance Tips

### 1. Optimize Media Queries
```css
/* ❌ Avoid */
@media (max-width: 768px) and (max-width: 500px) { }

/* ✅ Good */
@media (max-width: 500px) { }

/* ✅ Best - Use single rule */
@media (max-width: 768px) { 
    /* All adjustments for mobile */ 
}
```

### 2. Reduce Repaints
```css
/* ❌ Avoid multiple transitions */
* { transition: 0.3s all; }

/* ✅ Good - Specific transitions */
button { transition: transform 0.2s, background 0.2s; }
```

### 3. Use GPU Acceleration
```css
/* Enables hardware acceleration */
.card {
    transform: translateZ(0);
    will-change: transform;
}
```

---

## Accessibility Checklist

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+Tab to go backwards
- [ ] Enter/Space to activate buttons
- [ ] Escape to close modals/menus
- [ ] Arrow keys for carousel (if applicable)

### Screen Reader Testing
- [ ] All buttons have labels (visible or ARIA)
- [ ] Form inputs have associated labels
- [ ] Images have alt text
- [ ] Landmarks properly defined
- [ ] Live regions announce updates

### Visual Testing
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Focus indicator clearly visible
- [ ] Touch targets ≥ 48x48px on mobile
- [ ] Text scales properly to 200%
- [ ] No text locked to specific sizes

### Mobile Testing
- [ ] Viewport meta tag present
- [ ] Fonts readable without zoom
- [ ] Touch targets easily tappable
- [ ] No horizontal scroll on 320px
- [ ] Buttons/links spaced properly

---

## Browser Support

### CSS Features Used
- ✅ CSS Grid (95%+ support)
- ✅ Flexbox (99%+ support)
- ✅ CSS Variables (95%+ support)
- ✅ Focus-visible (95%+ support)
- ✅ Backdrop-filter (90%+ support)

### JavaScript Features
- ✅ Arrow functions (99%+ support)
- ✅ Template literals (99%+ support)
- ✅ classList API (99%+ support)
- ✅ setAttribute (100% support)
- ✅ Event listeners (100% support)

### Recommended Minimum
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers from 2020+

---

## Future Enhancement Ideas

### Level 1: High Priority
- [ ] Dark mode support with prefers-color-scheme
- [ ] Form validation with ARIA alerts
- [ ] Image lazy loading
- [ ] Reduced motion support

### Level 2: Medium Priority
- [ ] Service worker for offline support
- [ ] Progressive image loading
- [ ] Prefetch navigation links
- [ ] Keyboard shortcuts guide

### Level 3: Advanced
- [ ] Custom color themes
- [ ] User preference persistence
- [ ] Analytics tracking (privacy-friendly)
- [ ] A/B testing framework

---

## Resources

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast](https://webaim.org/resources/contrastchecker/)

### Responsive Design
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Testing Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Implementation Timeline

| Phase | Timeline | Tasks |
|-------|----------|-------|
| Phase 1: Analysis | ✅ Done | Reviewed existing design, identified issues |
| Phase 2: Core Updates | ✅ Done | CSS media queries, accessibility features |
| Phase 3: JavaScript | ✅ Done | ARIA labels, keyboard navigation |
| Phase 4: Testing | 📋 Upcoming | QA across devices and browsers |
| Phase 5: Deployment | 📋 Upcoming | Release and monitor performance |

---

## Quick Fixes for Common Issues

### Issue: Focus not visible
```css
/* Add to any element that needs focus */
:focus-visible { outline: 2px solid #5eb3f6; outline-offset: 2px; }
```

### Issue: Mobile touch too small
```css
/* Wrap button to ensure 48x48px */
button { min-height: 48px; min-width: 48px; }
```

### Issue: Menu overlapping content
```css
/* Prevent scroll while menu open */
body.menu-open { overflow: hidden; }
```

### Issue: Text blur on mobile
```css
/* Enable font smoothing */
body { -webkit-font-smoothing: antialiased; }
```

---

*This guide serves as a reference for maintaining and extending the responsive design system.*
