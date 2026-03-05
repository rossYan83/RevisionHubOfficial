
        (function(){
            emailjs.init("001fh5cX5stgnhi7K");
        })();

        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        function closeMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }

        function handleSubmit() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const question = document.getElementById('question').value;
            const submitBtn = document.querySelector('.submit-btn');

            if (!name || !email || !question) {
                alert('Please fill in all fields');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            emailjs.send("service_evhbotl", "template_8pq4y4h", {
                from_name: name,
                from_email: email,
                message: question,
                to_name: "RevisionHub Team",
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                document.getElementById('successMessage').classList.add('show');

                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('question').value = '';

                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Question';

                setTimeout(() => {
                    document.getElementById('successMessage').classList.remove('show');
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again or email directly.');
                
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Question';
            });
        }

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

        document.addEventListener('click', function(event) {
            const navLinks = document.getElementById('navLinks');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });

        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSubmit();
                }
            });
        });