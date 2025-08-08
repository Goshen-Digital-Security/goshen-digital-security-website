// Blog Page Specific JavaScript
class BlogManager {
    constructor() {
        this.initCategoryFilters();
        this.initLoadMore();
        this.initNewsletterForm();
        this.initBlogCardAnimations();
    }

    initCategoryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;

                // Update active filter button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter blog cards with animation
                this.filterBlogCards(blogCards, category);
            });
        });
    }

    filterBlogCards(cards, category) {
        cards.forEach((card, index) => {
            const cardCategory = card.dataset.category;

            if (category === 'all' || cardCategory === category) {
                // Show card with staggered animation
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                // Hide card
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreArticles();
            });
        }
    }

    loadMoreArticles() {
        const blogGrid = document.querySelector('.blog-grid');
        const loadMoreBtn = document.querySelector('.load-more-btn');

        // Add loading state
        const originalText = loadMoreBtn.textContent;
        loadMoreBtn.innerHTML = '<span>Loading...</span>';
        loadMoreBtn.disabled = true;

        setTimeout(() => {
            // Dummy article (you'd replace this with fetched content)
            const article = document.createElement('article');
            article.className = 'blog-card fade-in';
            article.setAttribute('data-category', 'emerging-tech');
            article.innerHTML = `
                <div class="blog-image">
                    <div class="blog-icon">🧠</div>
                    <div class="blog-overlay">
                        <span class="category-tag emerging-tech">Emerging Tech</span>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="read-time">6 min read</span>
                        <span class="publish-date">January 5, 2025</span>
                    </div>
                    <h3>AI Ethics in Cybersecurity: Balancing Innovation and Responsibility</h3>
                    <p>Explore the importance of ethical frameworks as AI becomes a core part of security systems and defense strategies.</p>
                    <div class="blog-footer">
                        <div class="author-simple">
                            <span class="author-avatar-small">🤖</span>
                            <span class="author-name-small">Priya Mehta</span>
                        </div>
                        <a href="#" class="read-more">Read More →</a>
                    </div>
                </div>
            `;

            blogGrid.appendChild(article);

            // Optional: remove load more button after one use
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            loadMoreBtn.style.display = 'none'; // Hide after loading
        }, 1200);
    }

    initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        const input = document.querySelector('.newsletter-input');
        const button = document.querySelector('.newsletter-btn');

        if (form && input && button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const email = input.value.trim();

                if (this.validateEmail(email)) {
                    button.textContent = 'Subscribed!';
                    button.disabled = true;
                    input.disabled = true;
                    input.value = '';
                    setTimeout(() => {
                        button.textContent = 'Subscribe';
                        button.disabled = false;
                        input.disabled = false;
                    }, 4000);
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    }

    validateEmail(email) {
        // Basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    initBlogCardAnimations() {
        const cards = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize blog manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
