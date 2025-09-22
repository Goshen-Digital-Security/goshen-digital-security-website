// Enhanced JavaScript for Goshen Digital Security

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
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
            document.querySelector('.mobile-menu-btn').classList.remove('active');
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
                
                // Trigger counter animation if it's a stat element
                const statNumber = entry.target.querySelector('.stat-number[data-count]');
                if (statNumber && !statNumber.classList.contains('counted')) {
                    animateCounter(statNumber);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
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
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Counter Animations
function initializeCounters() {
    // This will be triggered by the intersection observer
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    element.classList.add('counted');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number appropriately
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = current.toFixed(2);
        }
    }, 16);
}

// Interactive Elements Enhancement
function initializeInteractiveElements() {
    // Add particle effect to buttons
    initializeButtonEffects();
    
    // Add typing effect to hero title
    initializeTypingEffect();
    
    // Add hover sound effects (optional)
    initializeHoverEffects();
    
    // Add dynamic background elements
    initializeDynamicBackground();
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

function initializeTypingEffect() {
    const heroTitle = document.querySelector('.interactive-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    
    // Only apply effect on larger screens
    if (window.innerWidth > 768) {
        heroTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.1}s`;
            heroTitle.appendChild(span);
            
            if (index < words.length - 1) {
                heroTitle.appendChild(document.createTextNode(' '));
            }
        });
        
        // Trigger animation after a short delay
        setTimeout(() => {
            heroTitle.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 500);
    }
}

function initializeHoverEffects() {
    // Add subtle sound feedback (using Web Audio API)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createHoverSound(frequency = 800, duration = 100) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add hover sounds to interactive elements (disabled by default)
    const enableHoverSounds = false;
    
    if (enableHoverSounds) {
        document.querySelectorAll('.accent-hover, .highlight-text, .interactive-heading').forEach(el => {
            el.addEventListener('mouseenter', () => {
                createHoverSound(600, 50);
            });
        });
    }
}

function initializeDynamicBackground() {
    // Create floating particles
    createFloatingParticles();
    
    // Add mouse tracking effect
    initializeMouseTracking();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 208, 132, 0.3);
            border-radius: 50%;
            animation: float-${i} ${15 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particleContainer.appendChild(particle);
        
        // Create unique animation for each particle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-${i} {
                0% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeMouseTracking() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update CSS custom properties for mouse position
        document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
        document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
    });
    
    // Add glow effect that follows mouse
    const mouseGlow = document.createElement('div');
    mouseGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 208, 132, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: -1;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(mouseGlow);
    
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });
}

// Animation Controls
function initializeAnimations() {
    // Add initial animation delays
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger effect to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add bounce effect to stats
    document.querySelectorAll('.stat-item').forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.3}s`;
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
    // Handle scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

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
    // Preload any heavy animation resources
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
                
                .reduced-motion .floating-particles {
                    display: none !important;
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
        
        // Trigger all counters immediately
        document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
            animateCounter(counter);
        });
    }
}

checkIntersectionObserverSupport();

// Export functions for potential external use
window.GoshenSecurity = {
    toggleTheme,
    toggleMobileMenu,
    animateCounter,
    createRippleEffect
};