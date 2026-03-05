 function toggleCard(header) {
            const card = header.parentElement;
            const content = card.querySelector('.topic-card-content');
            const btn = header.querySelector('.view-more-btn');
            
            const isOpen = content.classList.contains('open');
            
            // Close all cards
            document.querySelectorAll('.topic-card-content').forEach(c => {
                c.classList.remove('open');
            });
            document.querySelectorAll('.view-more-btn').forEach(b => {
                b.textContent = 'View More';
                b.setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked card if it was closed
            if (!isOpen) {
                content.classList.add('open');
                btn.textContent = 'View Less';
                btn.setAttribute('aria-expanded', 'true');
                
                // Scroll into view for mobile users
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        }