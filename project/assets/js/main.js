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

// Animation Manager with Enhanced Number Counting
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
        document.querySelectorAll('.service-card, .advantage-card, .expertise-item, .offering-item').forEach(card => {
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
            const duration = 2000; // 2 seconds
            const steps = 60; // 60 steps for smooth animation
            const stepValue = target / steps;
            const stepDuration = duration / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current = Math.min(stepValue * step, target);
                
                let displayValue;
                
                // Handle different number formats
                if (target >= 10000) {
                    // Large numbers like 47979, 100000
                    displayValue = Math.floor(current).toLocaleString();
                } else if (target >= 1000) {
                    // Numbers like 3945, 1000
                    displayValue = Math.floor(current).toLocaleString();
                } else if (target === Math.floor(target)) {
                    // Whole numbers like 43, 60, 3
                    displayValue = Math.floor(current);
                } else {
                    // Decimal numbers like 4.45
                    displayValue = current.toFixed(2);
                }
                
                // Add special formatting for specific cases
                const originalText = element.getAttribute('data-original') || element.textContent;
                if (originalText.includes('%')) {
                    displayValue += '%';
                } else if (originalText.includes('M')) {
                    displayValue = (current / 1000000).toFixed(1) + 'M';
                } else if (originalText.includes('/7')) {
                    displayValue = '24/7';
                }
                
                element.textContent = displayValue;
                
                if (step >= steps) {
                    clearInterval(timer);
                    // Ensure final value is exact
                    if (originalText.includes('/7')) {
                        element.textContent = '24/7';
                    } else if (originalText.includes('M')) {
                        element.textContent = (target / 1000000).toFixed(1) + 'M';
                    } else if (originalText.includes('%')) {
                        element.textContent = target + '%';
                    } else {
                        element.textContent = target >= 1000 ? target.toLocaleString() : target;
                    }
                }
            }, stepDuration);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target.querySelector('.stat-number');
                    if (number && !number.hasAttribute('data-animated')) {
                        const target = parseFloat(number.getAttribute('data-count'));
                        
                        // Store original text for formatting reference
                        if (!number.hasAttribute('data-original')) {
                            number.setAttribute('data-original', number.textContent);
                        }
                        
                        number.textContent = '0';
                        number.setAttribute('data-animated', 'true');
                        animateNumber(number, target);
                        
                        // Don't re-observe this element
                        statsObserver.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% visible
        });

        // Observe all stat items
        document.querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });
    }
}

// Assessment Manager with Enhanced Functionality
class AssessmentManager {
    constructor() {
        this.initAssessmentTabs();
        this.initAssessmentForms();
        this.initAssessmentTools();
    }

    initAssessmentTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.assessment-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    initAssessmentForms() {
        const forms = document.querySelectorAll('.assessment-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAssessmentSubmit(e);
            });
        });
    }

    initAssessmentTools() {
        // Add event listeners for assessment tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toolCard = btn.closest('.tool-card');
                const toolName = toolCard ? toolCard.querySelector('h3').textContent : 'Unknown Tool';
                this.handleAssessmentClick(toolName, e);
            });
        });
    }

    handleAssessmentSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);
        const answers = {};
        
        // Process form data
        for (let [key, value] of formData.entries()) {
            if (answers[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(answers[key])) {
                    answers[key].push(value);
                } else {
                    answers[key] = [answers[key], value];
                }
            } else {
                answers[key] = value;
            }
        }
        
        // Calculate and display results
        const score = this.calculateAssessmentScore(answers, form.id);
        this.displayAssessmentResults(score, form.id);
    }

    calculateAssessmentScore(answers, formId) {
        let score = 0;
        let totalQuestions = 0;
        
        // Different scoring based on form type
        Object.entries(answers).forEach(([key, value]) => {
            if (typeof value === 'string') {
                totalQuestions++;
                
                // Score based on security-positive answers
                switch (value) {
                    case 'always':
                    case 'all':
                    case 'very_careful':
                    case 'strong':
                    case 'never': // for password reuse
                    case 'careful':
                    case 'daily':
                    case 'comprehensive':
                    case 'detailed':
                    case 'monthly':
                    case 'automatic':
                    case 'active':
                        score += 2;
                        break;
                    case 'sometimes':
                    case 'most':
                    case 'some':
                    case 'regular':
                    case 'basic':
                    case 'weekly':
                    case 'quarterly':
                    case 'occasional':
                        score += 1;
                        break;
                    case 'rarely':
                    case 'few':
                    case 'casual':
                    case 'weak':
                    case 'irregular':
                    case 'delayed':
                    case 'none':
                    case 'open':
                    case 'often': // for password reuse
                    case 'click': // for suspicious emails
                        score += 0;
                        break;
                    default:
                        // Don't count non-security questions
                        totalQuestions--;
                }
            }
        });
        
        return totalQuestions > 0 ? Math.round((score / (totalQuestions * 2)) * 100) : 0;
    }

    displayAssessmentResults(score, formId) {
        const resultsDiv = document.getElementById('assessment-results');
        let message = '';
        let recommendations = [];
        let severity = '';
        
        if (score >= 80) {
            severity = 'excellent';
            message = '🎉 Excellent! Your security practices are strong.';
            recommendations = [
                'Continue regular security updates and training',
                'Consider advanced threat protection solutions',
                'Share your knowledge with colleagues and peers',
                'Schedule periodic security reviews to stay current'
            ];
        } else if (score >= 60) {
            severity = 'good';
            message = '✅ Good foundation, but there\'s room for improvement.';
            recommendations = [
                'Implement multi-factor authentication on all critical accounts',
                'Establish regular security training sessions',
                'Review and update security policies quarterly',
                'Consider professional security consultation'
            ];
        } else if (score >= 40) {
            severity = 'needs-improvement';
            message = '⚠️ Your security practices need attention.';
            recommendations = [
                'Urgent password security overhaul needed',
                'Implement basic security tools immediately',
                'Comprehensive security training is essential',
                'Professional security assessment highly recommended'
            ];
        } else {
            severity = 'critical';
            message = '🚨 Critical: Your security needs immediate attention.';
            recommendations = [
                'Immediate professional security intervention required',
                'Complete security infrastructure overhaul needed',
                'Emergency security training for all team members',
                'Consider this a high-priority business risk'
            ];
        }
        
        const assessmentType = formId.includes('personal') ? 'Personal' : 
                             formId.includes('business') ? 'Business' : 'Social Media';
        
        resultsDiv.innerHTML = `
            <div class="assessment-result ${severity}">
                <div class="result-header">
                    <h3>Your ${assessmentType} Security Score: ${score}%</h3>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${score}%"></div>
                    </div>
                </div>
                <p class="result-message">${message}</p>
                
                <div class="recommendations">
                    <h4>📋 Priority Recommendations:</h4>
                    <ul>
                        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="next-steps">
                    <h4>🎯 Next Steps:</h4>
                    <div class="cta-buttons">
                        <a href="contact.html" class="btn-primary">Get Professional Help</a>
                        <a href="services.html" class="btn-secondary">Explore Services</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles for the results
        const style = document.createElement('style');
        style.textContent = `
            .assessment-result {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                padding: 32px;
                margin: 32px 0;
            }
            
            .result-header {
                margin-bottom: 24px;
            }
            
            .score-bar {
                width: 100%;
                height: 8px;
                background: var(--border-color);
                border-radius: 4px;
                margin-top: 16px;
                overflow: hidden;
            }
            
            .score-fill {
                height: 100%;
                background: linear-gradient(90deg, 
                    ${score < 40 ? '#EF4444' : score < 60 ? '#F59E0B' : score < 80 ? '#10B981' : '#00D084'} 0%, 
                    ${score < 40 ? '#DC2626' : score < 60 ? '#D97706' : score < 80 ? '#059669' : '#059669'} 100%);
                border-radius: 4px;
                transition: width 2s ease-out;
            }
            
            .result-message {
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 24px;
            }
            
            .recommendations, .next-steps {
                margin: 24px 0;
            }
            
            .recommendations h4, .next-steps h4 {
                color: var(--text-primary);
                font-size: 18px;
                margin-bottom: 16px;
            }
            
            .recommendations ul {
                list-style: none;
                padding: 0;
            }
            
            .recommendations li {
                padding: 12px 0;
                padding-left: 24px;
                position: relative;
                color: var(--text-secondary);
                border-bottom: 1px solid var(--border-color);
            }
            
            .recommendations li:last-child {
                border-bottom: none;
            }
            
            .recommendations li::before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--accent-primary);
                font-weight: bold;
            }
            
            .cta-buttons {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            
            .excellent { border-color: rgba(0, 208, 132, 0.3); }
            .good { border-color: rgba(16, 185, 129, 0.3); }
            .needs-improvement { border-color: rgba(245, 158, 11, 0.3); }
            .critical { border-color: rgba(239, 68, 68, 0.3); }
        `;
        
        if (!document.getElementById('assessment-results-styles')) {
            style.id = 'assessment-results-styles';
            document.head.appendChild(style);
        }
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    handleAssessmentClick(toolName, event) {
        console.log(`Assessment tool clicked: ${toolName}`);
        
        // Add click tracking or analytics here if needed
        switch(toolName.toLowerCase()) {
            case 'personal security audit':
                // Redirect to personal tab
                const personalTab = document.querySelector('[data-tab="personal"]');
                if (personalTab) {
                    personalTab.click();
                }
                break;
            case 'enterprise security review':
                // Redirect to business tab
                const businessTab = document.querySelector('[data-tab="business"]');
                if (businessTab) {
                    businessTab.click();
                }
                break;
            case 'expert security consultation':
                // Redirect to contact page
                window.location.href = 'contact.html';
                break;
        }
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
        if (!button) return () => {};
        
        button.disabled = true;
        const originalText = button.innerHTML;
        button.innerHTML = `<span class="spinner"></span> ${text}`;
        
        return () => {
            button.disabled = false;
            button.innerHTML = originalText;
        };
    },

    // Form validation helper
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Generate unique ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
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
        case 'blog.html':
            initBlogPage();
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
    // Add smooth scrolling to service sections
    const serviceLinks = document.querySelectorAll('.service-nav a');
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initAssessmentPage() {
    console.log('Assessment page initialized');
    // Assessment functionality is handled by AssessmentManager
}

function initContactPage() {
    console.log('Contact page initialized');
    initContactForm();
    initConsultationScheduler();
}

function initAboutPage() {
    console.log('About page initialized');
    // Add any about page specific features
}

function initBlogPage() {
    console.log('Blog page initialized');
    // Blog functionality is handled by blog.js
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        initFormValidation(contactForm);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    const resetLoading = Utils.addButtonLoading(submitBtn, 'Sending Message...');
    
    // Simulate form submission
    setTimeout(() => {
        resetLoading();
        showSuccessMessage();
        form.reset();
    }, 2000);
}

function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message fade-in';
    message.innerHTML = `
        <h3>✅ Message Sent Successfully!</h3>
        <p>Thank you for your inquiry. We'll get back to you within 24 hours with a personalized security consultation.</p>
    `;
    
    const form = document.getElementById('contact-form');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(message, form.nextSibling);
        
        setTimeout(() => {
            message.classList.add('visible');
        }, 100);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

function initFormValidation(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
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
    
    if (field.type === 'email' && !Utils.validateEmail(value)) {
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

function initConsultationScheduler() {
    const consultationBtn = document.querySelector('.consultation-btn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real implementation, this would open a calendar widget
            alert('Consultation scheduling will be implemented with a calendar integration service.');
        });
    }
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Export for use in other scripts if needed
window.GoshenSecurity = {
    ThemeManager,
    NavigationManager,
    AnimationManager,
    AssessmentManager,
    Utils
};