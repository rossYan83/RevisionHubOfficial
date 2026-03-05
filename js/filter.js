 function filterSubjects(category) {
            const cards = document.querySelectorAll('.subject-card-detailed');
            const tabs = document.querySelectorAll('.filter-tab');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        }