 function filterSubjects(category) {
            const cards = document.querySelectorAll('.subject-card-detailed');
            const tabs = document.querySelectorAll('.filter-tab');
            
            tabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-pressed', 'false');
            });
            event.target.classList.add('active');
            event.target.setAttribute('aria-pressed', 'true');
            
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
            const ariaLive = document.querySelector('[aria-live]');
            if (!ariaLive) {
                const announcer = document.createElement('div');
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.className = 'sr-only';
                announcer.textContent = announcement;
                document.body.appendChild(announcer);
                setTimeout(() => announcer.remove(), 1000);
            }
        }