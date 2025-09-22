// Enhanced JavaScript for Services Page - Goshen Digital Security

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeTheme();
    initializeInteractiveElements();
    initializeCategoryToggles();
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

// Category Toggle Functionality
function toggleCategory(categoryId) {
    const categorySection = document.querySelector(`#${categoryId}`).parentElement;
    const content = document.querySelector(`#${categoryId}`);
    const toggleIcon = categorySection.querySelector('.toggle-icon');
    
    // Close other categories first
    closeOtherCategories(categoryId);
    
    // Toggle current category
    categorySection.classList.toggle('active');
    
    // Update toggle icon
    if (categorySection.classList.contains('active')) {
        toggleIcon.textContent = '×';
        
        // Add stagger effect to service items
        const serviceItems = content.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, (index + 1) * 100);
        });
    } else {
        toggleIcon.textContent = '+';
    }
    
    // Add click sound effect (optional)
    playClickSound();
}

function closeOtherCategories(currentCategoryId) {
    const allCategories = document.querySelectorAll('.category-section');
    
    allCategories.forEach(category => {
        const categoryContent = category.querySelector('.category-content');
        const toggleIcon = category.querySelector('.toggle-icon');
        
        if (categoryContent.id !== currentCategoryId && category.classList.contains('active')) {
            category.classList.remove('active');
            toggleIcon.textContent = '+';
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
            header.style.background = 'rgba(10, 10, 11, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 11, 0.85)';
            header.style.backdropFilter = 'blur(12px)';
        }
    }, { passive: true });
}

// Interactive Elements Enhancement
function initializeInteractiveElements() {
    // Add button effects
    initializeButtonEffects();
    
    // Add card hover animations
    initializeCardAnimations();
    
    // Add category hover effects
    initializeCategoryEffects();
    
    // Initialize package card effects
    initializePackageEffects();
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
    // Add enhanced hover effects to offering items
    document.querySelectorAll('.offering-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(0, 208, 132, 0.05), rgba(124, 58, 237, 0.05))';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Add shimmer effect to service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            addShimmerEffect(this);
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

function initializeCategoryEffects() {
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        header.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            icon.style.transform = '';
        });
    });
}

function initializePackageEffects() {
    document.querySelectorAll('.package-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add floating effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Enhance icon rotation
            const icon = this.querySelector('.package-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(15deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured-package')) {
                this.style.transform = 'scale(1.02)';
            } else {
                this.style.transform = '';
            }
            
            const icon = this.querySelector('.package-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

function initializeCategoryToggles() {
    // Ensure all categories start closed
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.remove('active');
        const toggleIcon = section.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.textContent = '+';
        }
    });
    
    // Add keyboard support for category toggles
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const categoryId = this.parentElement.querySelector('.category-content').id;
                toggleCategory(categoryId);
            }
        });
        
        // Make focusable for keyboard navigation
        header.setAttribute('tabindex', '0');
    });
}

// Sound effects (optional)
function playClickSound() {
    // Only play sound if Web Audio API is supported and user has interacted
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.005, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Silently fail if audio context creation fails
            console.debug('Audio context not available');
        }
    }
}

// Animation Controls
function initializeAnimations() {
    // Add initial animation delays
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger effect to package cards
    document.querySelectorAll('.package-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add stagger effect to service categories
    document.querySelectorAll('.category-section').forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
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
    
    // Escape key to close mobile menu and all categories
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
        
        // Close all open categories
        document.querySelectorAll('.category-section.active').forEach(section => {
            section.classList.remove('active');
            const toggleIcon = section.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = '+';
            }
        });
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
                
                .reduced-motion .category-content {
                    transition: max-height 0.01ms !important;
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

// Auto-close categories when clicking outside
document.addEventListener('click', (e) => {
    const categoryHeaders = document.querySelectorAll('.category-header');
    const categoryContents = document.querySelectorAll('.category-content');
    
    let clickedInsideCategory = false;
    
    // Check if click was inside any category
    categoryHeaders.forEach(header => {
        if (header.contains(e.target)) {
            clickedInsideCategory = true;
        }
    });
    
    categoryContents.forEach(content => {
        if (content.contains(e.target)) {
            clickedInsideCategory = true;
        }
    });
    
    // If click was outside all categories, close them
    if (!clickedInsideCategory) {
        document.querySelectorAll('.category-section.active').forEach(section => {
            section.classList.remove('active');
            const toggleIcon = section.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = '+';
            }
        });
    }
});

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
window.GoshenServices = {
    toggleTheme,
    toggleMobileMenu,
    toggleCategory,
    createRippleEffect,
    addShimmerEffect
};