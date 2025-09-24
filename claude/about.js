// Enhanced JavaScript for About Page - Goshen Digital Security

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeTheme();
    initializeInteractiveElements();
});

// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Mobile Menu Management
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    mobileBtn.classList.toggle('active');
}

function initializeMobileMenu() {
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.classList.remove('active');
            }
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

// Scroll Effects and Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    
    window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    }, { passive: true });
}

// Interactive Elements Enhancement
function initializeInteractiveElements() {
    // Add button effects
    initializeButtonEffects();
    
    // Add card hover animations
    initializeCardAnimations();
    
    // Add section-specific animations
    initializeSectionAnimations();
    
    // Initialize value card effects
    initializeValueCardEffects();
}

function initializeButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            createRippleEffect(this);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.classList.add('ripple-effect');
    
    // Add CSS for ripple effect if not already present
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform-origin: center;
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeCardAnimations() {
    // Add shimmer effect to enhanced cards
    document.querySelectorAll('.enhanced-card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            addShimmerEffect(this);
        });
    });
    
    // Add special effects to story sections
    document.querySelectorAll('.biblical-reference, .modern-application').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(0, 208, 132, 0.03), rgba(124, 58, 237, 0.03))';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

function addShimmerEffect(element) {
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transform: rotate(45deg);
        animation: shimmer-move 0.8s ease-in-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Add shimmer animation if not exists
    if (!document.querySelector('#shimmer-styles')) {
        const style = document.createElement('style');
        style.id = 'shimmer-styles';
        style.textContent = `
            @keyframes shimmer-move {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shimmer);
    
    setTimeout(() => {
        shimmer.remove();
    }, 800);
}

function initializeSectionAnimations() {
    // Add special hover effects to icons
    document.querySelectorAll('.story-icon, .philosophy-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add floating effect to value icons
    document.querySelectorAll('.value-icon, .benefit-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(15deg) translateY(-2px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function initializeValueCardEffects() {
    document.querySelectorAll('.value-card, .benefit-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 25px 50px rgba(0, 208, 132, 0.15)';
            
            // Enhance text visibility
            const title = this.querySelector('h3, h4');
            if (title) {
                title.style.color = 'var(--accent-primary)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            const title = this.querySelector('h3, h4');
            if (title) {
                title.style.color = '';
            }
        });
    });
}

// Animation Controls
function initializeAnimations() {
    // Add initial animation delays
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger effect to value cards
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add stagger effect to benefit items
    document.querySelectorAll('.benefit-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here if needed
}, 16);

// Error handling and fallbacks
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.warn('Animation error caught:', e.error);
        // Gracefully degrade animations if there are issues
    });
}

// Initialize error handling
handleErrors();

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Enable keyboard navigation for interactive elements
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.classList.contains('accent-hover') || 
            target.classList.contains('highlight-text') ||
            target.classList.contains('interactive-heading')) {
            target.click();
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
    }
});

// Preload critical animations
function preloadAnimations() {
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .preload * {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Remove preload class after initial load
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('preload');
        }, 100);
    });
}

// Initialize preload optimization
document.body.classList.add('preload');
preloadAnimations();

// Reduced motion support
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            // Add CSS for reduced motion
            const reducedMotionStyles = document.createElement('style');
            reducedMotionStyles.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    transform: none !important;
                }
                
                .reduced-motion .grid-bg {
                    animation: none !important;
                }
            `;
            document.head.appendChild(reducedMotionStyles);
        }
    }
    
    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
}

respectReducedMotion();

// Intersection Observer polyfill check
function checkIntersectionObserverSupport() {
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
}

checkIntersectionObserverSupport();

// Smooth scrolling for anchor links
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

// Export functions for potential external use
window.GoshenAbout = {
    toggleTheme,
    toggleMobileMenu,
    createRippleEffect,
    addShimmerEffect
};