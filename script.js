let scrollLeftBtn = document.getElementById('scrollLeftBtn'); 
let scrollRightBtn = document.getElementById('scrollRightBtn'); 
let carousel = document.getElementById('carousel');

scrollLeftBtn.addEventListener('click', function() {
    carousel.scrollBy({
        left: -300, // Augmentez cette valeur pour un meilleur défilement
        behavior: 'smooth'
    });
});

scrollRightBtn.addEventListener('click', function() {
    carousel.scrollBy({
        left: 300, // Augmentez cette valeur pour un meilleur défilement
        behavior: 'smooth'
    });
});

// Bouton Retour en haut - Version élégante
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Fonction pour gérer la visibilité
    function toggleBackToTop() {
        const scrollY = window.scrollY;
        
        // Afficher le bouton après 500px de scroll (plus discret)
        if (scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible', 'scale-95');
            backToTopBtn.classList.add('opacity-100', 'visible', 'scale-100');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible', 'scale-100');
            backToTopBtn.classList.add('opacity-0', 'invisible', 'scale-95');
        }
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', toggleBackToTop);
    
    // Vérifier au chargement
    toggleBackToTop();
    
    // Fonction de retour en haut avec animation de clic
    backToTopBtn.addEventListener('click', function() {
        // Animation de clic
        this.classList.add('scale-95', 'bg-indigo-500', 'text-white');
        
        setTimeout(() => {
            this.classList.remove('scale-95');
        }, 150);
        
        // Défilement vers le haut
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Réinitialiser l'apparence après animation
        setTimeout(() => {
            if (window.scrollY === 0) {
                this.classList.remove('bg-indigo-500', 'text-white');
            }
        }, 500);
    });
    
    // Option : cacher pendant le défilement pour plus de discrétion
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        backToTopBtn.classList.add('opacity-70');
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-70');
            }
        }, 150);
    });
});