document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .card, .exp-card, .help-card, .tools-container, .contact-form');
    
    // Add 'reveal' class to elements we want to animate if they don't have it
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    const revealOptions = {
        threshold: 0.05, // Lowered to 5% so it triggers much earlier on mobile
        rootMargin: "0px 0px -10px 0px" // Triggers almost exactly as it enters the viewport
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Contact Form Submission Prevention (for static demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Show success state
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
            btn.style.backgroundColor = '#000';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }

    // 4. Typewriter Effect
    const texts = [
        "Data Science & Analytics", 
        "Python • SQL • Power BI", 
        "Annotation analyst",
    ];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        const typeElement = document.getElementById("typewriter-text");
        if(typeElement) typeElement.textContent = letter;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; // Pause at the end of a word
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing
    type();
});