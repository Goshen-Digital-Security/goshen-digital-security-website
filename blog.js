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
        // Simulate loading more articles
        const blogGrid = document.querySelector('.blog-grid');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        // Add loading state
        const originalText = loadMoreBtn.textContent;
        loadMoreBtn.innerHTML = '<span>Loading...</span>';
        loadMoreBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Add new articles (you would replace