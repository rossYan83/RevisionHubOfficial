
        (function(){
            emailjs.init("djmXDEeAtAI9Glq3C");
        })();

        function handleSubmit() {
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const questionEl = document.getElementById('question');
            const submitBtn = document.querySelector('.submit-btn');

            // Safety checks for form elements
            if (!nameEl || !emailEl || !questionEl) {
                console.error('Form elements not found');
                alert('Error: Form elements missing. Please refresh the page.');
                return;
            }

            const name = nameEl.value.trim();
            const email = emailEl.value.trim();
            const question = questionEl.value.trim();

            if (!name || !email || !question) {
                alert('Please fill in all fields');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!submitBtn) {
                console.error('Submit button not found');
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
                
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.classList.add('show');
                }

                if (nameEl) nameEl.value = '';
                if (emailEl) emailEl.value = '';
                if (questionEl) questionEl.value = '';

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Question';
                }

                setTimeout(() => {
                    if (successMsg) {
                        successMsg.classList.remove('show');
                    }
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