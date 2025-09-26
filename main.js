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

// function animateCounter(element) {
//     // 1. Read all the data attributes, including the new prefix and suffix
//     const target = parseFloat(element.getAttribute('data-count'));
//     const prefix = element.getAttribute('data-prefix') || ''; // Default to empty string
//     const suffix = element.getAttribute('data-suffix') || ''; // Default to empty string
    
//     const duration = 2000; // Animation duration in milliseconds
//     const startTime = performance.now();
    
//     // Mark as counted to prevent re-animating on scroll
//     element.classList.add('counted');
    
//     function updateCounter(currentTime) {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const currentVal = target * progress;

//         let displayedVal;

//         // 2. Intelligently format the number based on whether the target is a decimal
//         if (target % 1 !== 0) {
//             // If the target is a decimal (like 4.45), use toFixed(2)
//             displayedVal = currentVal.toFixed(2);
//         } else {
//             // If the target is an integer (like 43), use Math.floor()
//             displayedVal = Math.floor(currentVal);
//         }

//         // 3. Combine the prefix, number, and suffix
//         element.textContent = `${prefix}${displayedVal}${suffix}`;

//         if (progress < 1) {
//             requestAnimationFrame(updateCounter);
//         } else {
//             // 4. Ensure the final displayed value is exact and correctly formatted
//             const finalVal = (target % 1 !== 0) ? target.toFixed(2) : target;
//             element.textContent = `${prefix}${finalVal}${suffix}`;
//         }
//     }
    
//     requestAnimationFrame(updateCounter);
// }

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

        // 2. Intelligently format the number
        if (target % 1 !== 0) {
            // This handles decimals, which don't need commas.
            displayedVal = currentVal.toFixed(2);
        } else {
            // MODIFICATION: Format the whole number with commas.
            displayedVal = Math.floor(currentVal).toLocaleString();
        }

        // 3. Combine the prefix, number, and suffix
        element.textContent = `${prefix}${displayedVal}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // 4. Ensure the final displayed value is exact and correctly formatted.
            // MODIFICATION: Ensure the final value is also formatted with commas.
            const finalVal = (target % 1 !== 0) ? target.toFixed(2) : target.toLocaleString();
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

function initializeBookingWidget() {
    const bookingContainer = document.querySelector('.booking-container');
    if (bookingContainer) {
        let widgetLoaded = false;
        
        // Monitor for booking widget load
        const checkWidget = setInterval(() => {
            const widget = document.querySelector('.zcal-inline-widget iframe');
            if (widget) {
                console.log('Booking widget loaded');
                widgetLoaded = true;
                clearInterval(checkWidget);
                
                const widgetContainer = document.querySelector('.widget-container');
                widgetContainer.classList.add('widget-loaded');
            }
        }, 1000);
        
        // Show fallback after 10 seconds if widget hasn't loaded
        setTimeout(() => {
            if (!widgetLoaded) {
                showBookingFallback();
            }
        }, 10000);
        
        // Add info card interactions
        document.querySelectorAll('.info-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px)';
                this.style.color = 'var(--accent-primary)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.color = '';
            });
        });
    }
}

function showBookingFallback() {
    const widgetContainer = document.querySelector('.widget-container');
    if (widgetContainer) {
        widgetContainer.innerHTML = `
            <div class="booking-fallback">
                <div class="fallback-icon">📅</div>
                <h3>Having trouble with the booking widget?</h3>
                <p>Click the button below to book your consultation directly</p>
                <a href="https://zcal.co/goshen/30min" target="_blank" rel="noopener noreferrer" class="btn-primary pulse-button">
                    Book 30-Minute Consultation
                    <span>→</span>
                </a>
                <p class="fallback-note">Opens in a new window</p>
            </div>
        `;
    }
}

// Export functions
window.GoshenSecurity = {
    toggleTheme,
    toggleMobileMenu
};