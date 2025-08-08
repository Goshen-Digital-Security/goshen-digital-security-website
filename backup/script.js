// Theme Management
class ThemeManager {
    constructor() {
        this.loadSavedTheme();
        this.bindEvents();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    bindEvents() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.initSmoothScrolling();
        this.initScrollEffects();
        this.setActiveNavItem();
    }

    initSmoothScrolling() {
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
    }

    initScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrollY = window.scrollY;
            
            if (header) {
                // Always keep the glass effect
                header.style.background = 'var(--glass-bg)';
                header.style.backdropFilter = 'blur(20px)';
                
                // Hide/show header on scroll
                if (scrollY > lastScrollY && scrollY > 500) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = scrollY;
        });
    }

    setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            
            // Handle home page
            if ((currentPage === 'index.html' || currentPage === '') && 
                (linkPath === 'index.html' || linkPath === '/' || linkPath === '#home')) {
                link.classList.add('active');
            }
            // Handle other pages
            else if (linkPath === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.initFadeInAnimations();
        this.initParallaxEffects();
        this.initCardHoverEffects();
        this.initStatsAnimation();
    }

    initFadeInAnimations() {
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

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.grid-bg');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
            }
        });
    }

    initCardHoverEffects() {
        // Service cards hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 20px 40px var(--shadow-color)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = 'none';
            });
        });

        // Tool cards floating animation
        document.querySelectorAll('.tool-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    initStatsAnimation() {
        const animateNumber = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (target >= 100 && target !== 99.8) {
                    displayValue += '+';
                } else if (target === 99.8) {
                    displayValue = current.toFixed(1) + '%';
                } else if (target.toString().includes('.')) {
                    displayValue = current.toFixed(1) + '%';
                } else if (target === 24) {
                    displayValue = '24/7';
                }
                
                element.textContent = displayValue;
            }, 20);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target.querySelector('.stat-number');
                    if (number) {
                        const text = number.textContent;
                        let value;
                        
                        if (text.includes('24/7')) {
                            value = 24;
                        } else if (text.includes('%')) {
                            value = parseFloat(text.replace(/[^\d.]/g, ''));
                        } else {
                            value = parseFloat(text.replace(/[^\d.]/g, ''));
                        }
                        
                        number.textContent = '0';
                        animateNumber(number, value);
                        statsObserver.unobserve(entry.target);
                    }
                }
            });
        });

        document.querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });
    }
}

// Assessment Tools Manager
class AssessmentManager {
    constructor() {
        this.initAssessmentTools();
    }

    initAssessmentTools() {
        // Add event listeners for assessment tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toolName = btn.closest('.tool-card').querySelector('h3').textContent;
                this.handleAssessmentClick(toolName, e);
            });
        });
    }

    handleAssessmentClick(toolName, event) {
        // For now, just log the tool interaction
        // In a real implementation, this would launch the assessment
        console.log(`Assessment tool clicked: ${toolName}`);
        
        // You can add specific logic for each tool here
        switch(toolName.toLowerCase()) {
            case 'personal security audit':
                this.launchPersonalAudit();
                break;
            case 'enterprise security review':
                this.launchEnterpriseReview();
                break;
            case 'expert security consultation':
                this.scheduleConsultation();
                break;
        }
    }

    launchPersonalAudit() {
        // Implementation for personal security audit
        alert('Personal Security Audit will be launched soon!');
    }

    launchEnterpriseReview() {
        // Implementation for enterprise security review
        alert('Enterprise Security Review will be launched soon!');
    }

    scheduleConsultation() {
        // Implementation for consultation scheduling
        window.location.href = 'contact.html';
    }
}

// Utility Functions
const Utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format email links
    formatEmailLinks: () => {
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                // Track email clicks if analytics are implemented
                console.log('Email link clicked:', link.href);
            });
        });
    },

    // Add loading states to buttons
    addButtonLoading: (button, text = 'Loading...') => {
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = text;
        
        return () => {
            button.disabled = false;
            button.textContent = originalText;
        };
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new AssessmentManager();
    
    Utils.formatEmailLinks();
    
    // Add any page-specific initialization
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'services.html':
            initServicesPage();
            break;
        case 'assessment.html':
            initAssessmentPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        default:
            initHomePage();
    }
});

// Page-specific initialization functions
function initHomePage() {
    console.log('Home page initialized');
    // Add any home-specific functionality
}

function initServicesPage() {
    console.log('Services page initialized');
    // Add service filtering or sorting functionality
    initServiceFilters();
}

function initAssessmentPage() {
    console.log('Assessment page initialized');
    // Initialize interactive assessment tools
    initInteractiveAssessments();
}

function initContactPage() {
    console.log('Contact page initialized');
    // Initialize contact form functionality
    initContactForm();
}

function initAboutPage() {
    console.log('About page initialized');
    // Add any about page specific features
}

// Service page specific functions
function initServiceFilters() {
    // Add filtering functionality for services
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter service cards
            serviceCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Assessment page specific functions
function initInteractiveAssessments() {
    // Initialize quiz functionality
    const quizForms = document.querySelectorAll('.assessment-quiz');
    
    quizForms.forEach(form => {
        form.addEventListener('submit', handleAssessmentSubmit);
    });
}

function handleAssessmentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const answers = Object.fromEntries(formData);
    
    // Calculate score based on answers
    const score = calculateAssessmentScore(answers);
    displayAssessmentResults(score);
}

function calculateAssessmentScore(answers) {
    let score = 0;
    let total = 0;
    
    Object.values(answers).forEach(answer => {
        total += 1;
        if (answer === 'yes' || answer === 'always' || answer === 'strong') {
            score += 1;
        }
    });
    
    return Math.round((score / total) * 100);
}

function displayAssessmentResults(score) {
    const resultsDiv = document.getElementById('assessment-results');
    let message = '';
    let recommendations = [];
    
    if (score >= 80) {
        message = 'Excellent! Your security practices are strong.';
        recommendations = [
            'Continue regular security updates',
            'Consider advanced threat protection',
            'Share your knowledge with colleagues'
        ];
    } else if (score >= 60) {
        message = 'Good foundation, but there\'s room for improvement.';
        recommendations = [
            'Implement multi-factor authentication',
            'Regular security training sessions',
            'Review and update security policies'
        ];
    } else {
        message = 'Your security needs immediate attention.';
        recommendations = [
            'Urgent password security overhaul needed',
            'Comprehensive security training required',
            'Professional security assessment recommended'
        ];
    }
    
    resultsDiv.innerHTML = `
        <div class="assessment-result">
            <h3>Your Security Score: ${score}%</h3>
            <p>${message}</p>
            <h4>Recommendations:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            <a href="contact.html" class="btn-primary">Get Professional Help</a>
        </div>
    `;
    
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Contact page specific functions
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Initialize form validation
    initFormValidation();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const resetLoading = Utils.addButtonLoading(submitBtn, 'Sending...');
    
    // Simulate form submission
    setTimeout(() => {
        resetLoading();
        showSuccessMessage();
        form.reset();
    }, 2000);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message fade-in';
    message.innerHTML = `
        <h3>✅ Message Sent Successfully!</h3>
        <p>Thank you for your inquiry. We'll get back to you within 24 hours.</p>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(message, form.nextSibling);
    
    setTimeout(() => {
        message.classList.add('visible');
    }, 100);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function initFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError({ target: field });
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export for use in other scripts if needed
window.GoshenSecurity = {
    ThemeManager,
    NavigationManager,
    AnimationManager,
    AssessmentManager,
    Utils
};
    