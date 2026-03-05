

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    const menuBtn = document.getElementById('mobileMenuBtn');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    menuBtn.classList.toggle('active');
    
    menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    const menuBtn = document.getElementById('mobileMenuBtn');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
    menuBtn.classList.remove('active');
    
    menuBtn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (menuBtn) {
        menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        menuBtn.setAttribute('aria-expanded', 'false');
        
        menuBtn.addEventListener('click', toggleMenu);
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function(event) {
        const nav = document.getElementById('navLinks');
        const menuBtn = document.getElementById('mobileMenuBtn');
        
        if (nav && menuBtn) {
            if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    setActiveNavLink();
});
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}