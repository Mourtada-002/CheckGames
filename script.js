// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    // Animation de la barre de chargement
    const loadingBar = document.querySelector('.loading-bar');
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        loadingBar.style.width = `${progress}%`;
    });

    // Animation Scroll Reveal
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Vérifier au chargement

    // Animation du logo au survol
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'glow 2s ease-in-out infinite';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.animation = '';
        });
    }

    // Animation des cartes au survol
    const gameCards = document.querySelectorAll('.game-card, .testimonial, .card-hover');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Animation des boutons
    const buttons = document.querySelectorAll('button, a[href^="#"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1) translateY(-2px)';
        });
    });

    // Animation de l'image hero
    const heroImg = document.querySelector('.hero-wrapper img');
    if (heroImg) {
        setInterval(() => {
            heroImg.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px) rotate(${Math.sin(Date.now() / 2000) * 2}deg)`;
        }, 50);
    }

    // Animation des gradients fluides
    const gradients = document.querySelectorAll('[class*="gradient-to-"]');
    gradients.forEach(gradient => {
        gradient.style.backgroundSize = '200% 200%';
        gradient.style.animation = 'gradientShift 3s ease infinite';
    });

    // Gestion du menu burger sur mobile
    const navToggle = document.getElementById('nav-toggle');
    const toggleNavbar = document.getElementById('toggleNavbar');
    
    if (navToggle && toggleNavbar) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleNavbar.checked = !toggleNavbar.checked;
            
            // Fermer le menu si on clique à l'extérieur
            if (toggleNavbar.checked) {
                document.addEventListener('click', closeMenuOnClickOutside);
            } else {
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
        
        function closeMenuOnClickOutside(e) {
            if (!document.getElementById('nav-menu').contains(e.target) && 
                !navToggle.contains(e.target) && 
                e.target !== toggleNavbar) {
                toggleNavbar.checked = false;
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        }
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleNavbar.checked = false;
                document.removeEventListener('click', closeMenuOnClickOutside);
            });
        });
    }

    // Navigation active section detection
    function updateActiveNav() {
        const sections = document.querySelectorAll('div[id], section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + 100; // Offset pour la navbar fixe
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('nav-active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Gestion du bouton retour en haut
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
                backToTopBtn.style.transform = 'scale(1)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.transform = 'scale(0.95)';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Gestion du carousel
    const carousel = document.getElementById('carousel');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    
    if (carousel && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -350, behavior: 'smooth' });
        });
        
        scrollRightBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 350, behavior: 'smooth' });
        });
    }

    // Ajout de la keyframe pour l'animation des gradients
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-subtle {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        .animate-pulse-subtle {
            animation: pulse-subtle 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
});