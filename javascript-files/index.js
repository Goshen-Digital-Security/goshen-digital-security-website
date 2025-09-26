// Simplified JavaScript for Goshen Digital Security - Better Compatibility
// Add class to indicate JavaScript has loaded
document.documentElement.classList.add('js-loaded');

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollEffects();
    initializeMobileMenu();
    initializeTheme();
    initializeCounters();
    initializeSimpleInteractions();
});

// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Mobile Menu Management
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn) {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    }
}

function initializeMobileMenu() {
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks) navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && mobileBtn && 
            !navLinks.contains(e.target) && 
            !mobileBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
    });
}

// Simplified Scroll Effects
function initializeScrollEffects() {
    // Simple scroll observer for fade-in effects
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation if it's a stat element
                    const statNumber = entry.target.querySelector('.stat-number[data-count]');
                    if (statNumber && !statNumber.classList.contains('counted')) {
                        animateCounter(statNumber);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers - just show everything
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
        // Trigger counters immediately
        document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
            animateCounter(counter);
        });
    }

    // Simple header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, { passive: true });
}

// // Simplified Counter Animation
// function initializeCounters() {
//     // This will be triggered by the intersection observer
// }

// function animateCounter(element) {
//     const target = parseFloat(element.getAttribute('data-count'));
//     const duration = 2000;
//     const startTime = performance.now();
    
//     element.classList.add('counted');
    
//     function updateCounter(currentTime) {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const current = target * progress;
        
//         // Format the number appropriately
//         if (target >= 1000) {
//             element.textContent = Math.floor(current).toLocaleString();
//         } else {
//             element.textContent = current.toFixed(2);
//         }
        
//         if (progress < 1) {
//             requestAnimationFrame(updateCounter);
//         }
//     }
    
//     requestAnimationFrame(updateCounter);
// }

// Simplified Counter Animation
function initializeCounters() {
    // This is triggered by the intersection observer in initializeScrollEffects()
}

function animateCounter(element) {
    // 1. Read all the data attributes, including the new prefix and suffix
    const target = parseFloat(element.getAttribute('data-count'));
    const prefix = element.getAttribute('data-prefix') || ''; // Default to empty string
    const suffix = element.getAttribute('data-suffix') || ''; // Default to empty string
    
    const duration = 2000; // Animation duration in milliseconds
    const startTime = performance.now();
    
    // Mark as counted to prevent re-animating on scroll
    element.classList.add('counted');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = target * progress;

        let displayedVal;

        // 2. Intelligently format the number based on whether the target is a decimal
        if (target % 1 !== 0) {
            // If the target is a decimal (like 4.45), use toFixed(2)
            displayedVal = currentVal.toFixed(2);
        } else {
            // If the target is an integer (like 43), use Math.floor()
            displayedVal = Math.floor(currentVal);
        }

        // 3. Combine the prefix, number, and suffix
        element.textContent = `${prefix}${displayedVal}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // 4. Ensure the final displayed value is exact and correctly formatted
            const finalVal = (target % 1 !== 0) ? target.toFixed(2) : target;
            element.textContent = `${prefix}${finalVal}${suffix}`;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Simplified Interactive Elements
function initializeSimpleInteractions() {
    // Basic keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileBtn) mobileBtn.classList.remove('active');
            }
        }
    });
}

// Export functions
window.GoshenSecurity = {
    toggleTheme,
    toggleMobileMenu
};