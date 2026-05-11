 function filterSubjects(category) {
            const cards = document.querySelectorAll('.subject-card-detailed');
            const tabs = document.querySelectorAll('.filter-tab');
            
            // Get the clicked button element
            let clickedTab = null;
            if (event && event.target && event.target.classList.contains('filter-tab')) {
                clickedTab = event.target;
            } else {
                // Fallback: find tab by data attribute or match category
                clickedTab = Array.from(tabs).find(tab => {
                    const onclick = tab.getAttribute('onclick');
                    return onclick && onclick.includes(`'${category}'`);
                });
            }
            
            tabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-pressed', 'false');
            });
            
            if (clickedTab) {
                clickedTab.classList.add('active');
                clickedTab.setAttribute('aria-pressed', 'true');
            }
            
            let visibleCount = 0;
            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            const announcement = `Showing ${visibleCount} subject${visibleCount !== 1 ? 's' : ''}`;
            
            // Remove existing announcer if any
            const existingAnnouncer = document.querySelector('[aria-live="polite"]');
            if (existingAnnouncer) {
                existingAnnouncer.remove();
            }
            
            // Create and add new announcer
            const announcer = document.createElement('div');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.textContent = announcement;
            document.body.appendChild(announcer);
            
            setTimeout(() => announcer.remove(), 1000);
        }