// Blog Management System
class BlogManager {
    constructor() {
        this.posts = this.loadPosts();
        this.categories = ['security-tips', 'threat-intelligence', 'case-studies', 'industry-news'];
        this.postsPerPage = 6;
        this.currentPage = 1;
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadInitialPosts();
        this.displayPosts();
    }

    initEventListeners() {
        // Category filters
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleCategoryFilter(e);
            });
        });

        // New post modal
        const newPostBtn = document.getElementById('new-post-btn');
        const newPostModal = document.getElementById('new-post-modal');
        const closeBtns = document.querySelectorAll('.modal-close');
        
        if (newPostBtn) {
            newPostBtn.addEventListener('click', () => this.openNewPostModal());
        }

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // New post form
        const newPostForm = document.getElementById('new-post-form');
        if (newPostForm) {
            newPostForm.addEventListener('submit', (e) => this.handleNewPost(e));
        }

        // Save draft button
        const saveDraftBtn = document.getElementById('save-draft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => this.saveDraft());
        }

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMorePosts());
        }

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });
    }

    loadInitialPosts() {
        if (this.posts.length === 0) {
            // Create some sample blog posts
            const samplePosts = [
                {
                    id: 1,
                    title: 'The Hidden Cost of Weak Passwords: Why Your Business Can\'t Afford to Wait',
                    excerpt: 'Password breaches cost small businesses an average of $3.86 million. Learn why password security is your first line of defense and how to implement enterprise-grade protection without breaking the bank.',
                    content: `Password security isn't just about creating complex combinations of letters and numbers anymore. In today's threat landscape, weak passwords are the equivalent of leaving your front door wide open with a neon sign that says "Rob Me."

## The Real Numbers Behind Password Breaches

According to the latest Verizon Data Breach Investigations Report, 81% of hacking-related breaches involve weak or stolen passwords. For small businesses and nonprofits, this statistic represents an existential threat.

When your organization gets breached through compromised credentials:
- Average recovery time: 6-12 months
- Average cost for small businesses: $200,000-$500,000
- Reputation damage: Often permanent
- Customer trust: Takes years to rebuild

## Why Traditional Password Advice Falls Short

We've all heard the standard advice: "Use a complex password with numbers, symbols, and capitals." But this guidance was created for a different era — one where hackers used different tools and had different motivations.

Today's attackers use:
- **Credential stuffing**: Automated attacks using billions of leaked passwords
- **Social engineering**: Tricking users into revealing their credentials
- **Brute force at scale**: Computing power that can crack "complex" passwords in minutes

## The Enterprise-Grade Solution for Everyone

The solution isn't just better passwords — it's better password systems:

### 1. Password Managers
Every person in your organization should use a password manager. Period. Not just for work accounts, but for everything. When personal accounts get compromised, work accounts often follow.

**Recommended for teams:**
- 1Password Business
- Bitwarden Business
- Dashlane Business

### 2. Multi-Factor Authentication (MFA)
If you implement only one security measure this year, make it MFA on all critical accounts:
- Email systems
- Cloud storage
- Financial accounts
- Social media (yes, even these)

### 3. Password Policies That Actually Work
Instead of complex character requirements, focus on:
- Minimum length (14+ characters)
- Unique passwords for each service
- Regular audits for compromised credentials

## Taking Action: Your 30-Day Password Security Roadmap

**Week 1:** Audit current password practices
- Use tools like Have I Been Pwned to check for compromised accounts
- Identify shared passwords across your team
- List all critical accounts that need protection

**Week 2:** Deploy password manager
- Choose and purchase business password manager
- Train team on proper usage
- Begin migrating existing passwords

**Week 3:** Enable MFA everywhere
- Start with email and financial accounts
- Move to cloud services and business tools
- Document recovery codes securely

**Week 4:** Establish ongoing practices
- Create password policies for your organization
- Set up regular security training
- Plan quarterly password health reviews

## The Bottom Line

Password security isn't a one-time fix — it's an ongoing practice that requires the right tools, training, and commitment. But for small businesses and nonprofits operating with limited resources, it's one of the most cost-effective investments you can make.

The question isn't whether you can afford to implement proper password security. It's whether you can afford not to.

*Ready to secure your organization's passwords? Our Password Infrastructure Overhaul service can have your team protected in 30 days. [Contact us for a free consultation](/contact.html).*`,
                    category: 'security-tips',
                    tags: ['passwords', 'authentication', 'small-business', 'security-tips'],
                    author: 'Jonathan Bateman',
                    date: new Date('2025-01-15'),
                    readTime: '8 min read',
                    featured: true
                },
                {
                    id: 2,
                    title: 'Social Media Security: Protecting Your Brand When Your Identity Becomes Your Business',
                    excerpt: 'For solopreneurs and small businesses, a compromised social media account isn\'t just embarrassing — it can destroy years of brand building overnight. Here\'s how to protect your digital identity.',
                    content: `Your social media presence isn't just marketing — it's your business infrastructure. When attackers target your Instagram, LinkedIn, or YouTube account, they're not just stealing followers; they're hijacking your livelihood.

## The New Reality of Social Media Attacks

Social media account takeovers have increased 1,000% in the past two years. Attackers aren't just interested in your bank account anymore. They want your audience, your credibility, and your brand.

### What Happens During a Social Media Breach:
1. **Immediate lockout**: You lose access to your own accounts
2. **Content manipulation**: Attackers post malicious or embarrassing content
3. **Follower exploitation**: Your audience receives scam messages or malware
4. **Data harvesting**: Personal information about you and your followers gets stolen
5. **Reputation destruction**: Years of brand building disappear overnight

## Platform-Specific Vulnerabilities

Each platform has unique security challenges:

### Instagram & Facebook
- **Primary threat**: SIM swapping attacks targeting phone-based recovery
- **Secondary threat**: Phishing through fake brand collaboration emails
- **Protection strategy**: Backup authentication methods, verified email addresses

### LinkedIn
- **Primary threat**: Professional impersonation and data scraping
- **Secondary threat**: Malicious connections and message-based attacks
- **Protection strategy**: Connection vetting, privacy settings optimization

### Twitter/X
- **Primary threat**: API abuse and bot attacks
- **Secondary threat**: Coordinated harassment campaigns
- **Protection strategy**: Advanced privacy controls, engagement filtering

### YouTube
- **Primary threat**: Copyright strikes used as attack vectors
- **Secondary threat**: Channel hijacking for crypto scams
- **Protection strategy**: Channel backup, verified recovery options

## Building an Impenetrable Social Media Security System

### Layer 1: Account Fortification
- **Unique passwords**: Different for every platform, stored in password manager
- **Two-factor authentication**: Hardware keys preferred, authenticator apps minimum
- **Recovery methods**: Multiple verified email addresses and phone numbers
- **Login notifications**: Enabled for all platforms

### Layer 2: Content Protection
- **Backup strategies**: Regular downloads of your content and follower data
- **Brand monitoring**: Alerts for impersonation accounts and unauthorized use
- **Content policies**: Clear guidelines for what gets posted and by whom

### Layer 3: Crisis Response
- **Emergency contacts**: Direct lines to platform support teams
- **Response templates**: Pre-written messages for different breach scenarios
- **Legal preparation**: Documentation proving ownership of accounts and content

## The Solopreneur's Social Media Security Checklist

**Daily:**
- [ ] Review login notifications
- [ ] Check for suspicious followers or connections
- [ ] Monitor brand mentions and tags

**Weekly:**
- [ ] Update backup of important content
- [ ] Review privacy settings changes
- [ ] Audit third-party app permissions

**Monthly:**
- [ ] Test recovery methods
- [ ] Update emergency contact information
- [ ] Review and rotate authentication credentials

**Quarterly:**
- [ ] Comprehensive security audit of all platforms
- [ ] Update crisis response plan
- [ ] Train team members on security protocols

## When Prevention Fails: Breach Response

If your account gets compromised:

### Immediate Actions (First 30 minutes):
1. **Document everything**: Screenshots of fake posts, follower counts, settings changes
2. **Contact platforms**: Use direct support channels, not general help forms
3. **Notify your network**: Post on other platforms warning followers about the breach
4. **Secure other accounts**: Change passwords on related services

### Short-term Recovery (First 24 hours):
1. **Work with platform support**: Provide proof of identity and account ownership
2. **Legal consultation**: Consider trademark/copyright claims for serious breaches
3. **PR strategy**: Prepare official statements for media or client inquiries
4. **Damage assessment**: Calculate follower loss, content damage, business impact

### Long-term Rebuilding (Weeks to months):
1. **Account recovery**: Work through official restoration processes
2. **Reputation management**: Systematic content strategy to rebuild trust
3. **Security overhaul**: Implement stronger protections to prevent reoccurrence
4. **Business continuity**: Develop alternative marketing channels

## The Investment vs. The Risk

Professional social media security might cost $200-500/month for comprehensive monitoring and protection. A single account breach can cost:
- Lost revenue during downtime: $1,000-10,000+
- Professional reputation recovery: $5,000-25,000+
- Legal fees for serious cases: $10,000-50,000+
- Customer trust rebuilding: Priceless and often impossible

## Taking Action Today

Don't wait until you're locked out of your business-critical accounts. Social media security isn't paranoia — it's business continuity planning for the digital age.

*Need help securing your social media presence? Our Social Media Security service provides comprehensive protection for solopreneurs and small businesses. [Schedule a free consultation](/contact.html) to assess your current vulnerabilities.*`,
                    category: 'security-tips',
                    tags: ['social-media', 'brand-protection', 'solopreneur', 'identity-theft'],
                    author: 'Jonathan Bateman',
                    date: new Date('2025-01-10'),
                    readTime: '12 min read',
                    featured: false
                },
                {
                    id: 3,
                    title: '2025 Threat Landscape: Why Small Businesses Are Now the Primary Target',
                    excerpt: 'Cybercriminals have shifted their focus. Large enterprises have hardened their defenses, making small businesses and nonprofits the path of least resistance. Here\'s what you need to know.',
                    content: `The cybersecurity landscape has fundamentally shifted. While large enterprises have invested billions in security infrastructure, small businesses and nonprofits have become the new "soft targets" for cybercriminals. This isn't speculation — it's documented reality backed by hard data.

## The Numbers Don't Lie

Recent cybersecurity reports paint a stark picture:
- 43% of cyberattacks now target small businesses (up from 18% in 2020)
- 60% of small companies that experience a major breach close within 6 months
- Average breach cost for small businesses: $2.98 million
- Recovery time: 6-12 months for full operational restoration

But these statistics only tell part of the story. The real threat landscape is more nuanced and more dangerous than simple numbers can convey.

## Why Attackers Have Shifted Focus

### 1. The "Goldilocks Zone" of Targets
Small businesses occupy the perfect sweet spot for cybercriminals:
- **Valuable enough**: Most handle significant financial transactions, customer data, and intellectual property
- **Poorly defended**: Limited security budgets and expertise
- **Numerous**: Millions of potential targets with similar vulnerabilities
- **Low enforcement risk**: Less likely to have resources for prosecution

### 2. The Human Factor
Unlike enterprise environments with dedicated IT teams, small businesses rely heavily on:
- **Owner-operators**: Founders wearing multiple hats with limited security expertise
- **Small teams**: Where one compromised account can access everything
- **Informal processes**: Fewer policies and more improvised security decisions

### 3. Supply Chain Vulnerabilities
Attackers increasingly use small businesses as stepping stones to larger targets:
- Access client data through compromised service providers
- Use trusted relationships to launch attacks on larger partners
- Exploit integration vulnerabilities between small and large business systems

## The Most Dangerous Attacks Targeting Small Businesses

### 1. Ransomware-as-a-Service (RaaS)
- **What it is**: Criminal organizations providing ransomware tools to less skilled attackers
- **Why it's dangerous**: Lowers the barrier to entry for cybercriminals
- **Target preference**: Small businesses with poor backup practices
- **Average payment**: $84,000 (but recovery costs often exceed $300,000)

### 2. Business Email Compromise (BEC)
- **What it is**: Attackers impersonate executives or vendors to request fraudulent payments
- **Why it's effective**: Exploits trust relationships and informal communication
- **Target preference**: Businesses with informal approval processes
- **Success rate**: 43% of attempts result in financial loss

### 3. Supply Chain Attacks
- **What it is**: Compromising trusted software or services to attack multiple targets
- **Why it's growing**: One successful attack can compromise thousands of businesses
- **Target preference**: Businesses using popular small-business software platforms
- **Detection difficulty**: Often goes unnoticed for months

### 4. Social Engineering 2.0
- **What it is**: Sophisticated psychological manipulation using AI and deep research
- **Why it's evolving**: AI enables personalized attacks at scale
- **Target preference**: Small businesses with active social media presence
- **Success factor**: Exploits the personal relationships common in small business

## Industry-Specific Threat Patterns

### Healthcare Practices
- **Primary threats**: Patient data theft, HIPAA compliance attacks
- **Attack vector**: Outdated medical equipment, poor network segmentation
- **Consequences**: Regulatory fines, license threats, patient safety risks

### Professional Services
- **Primary threats**: Client data theft, intellectual property theft
- **Attack vector**: Email compromise, cloud storage vulnerabilities
- **Consequences**: Client lawsuits, professional liability, competitive damage

### Retail & E-commerce
- **Primary threats**: Payment card theft, customer data breaches
- **Attack vector**: Point-of-sale compromises, website vulnerabilities
- **Consequences**: PCI compliance violations, customer lawsuits, business closure

### Nonprofits
- **Primary threats**: Donor data theft, financial fraud
- **Attack vector**: Volunteer account compromises, grant application fraud
- **Consequences**: IRS scrutiny, donor trust loss, mission-critical funding loss

## The Nonprofit Sector: A Special Case

Nonprofits face unique cybersecurity challenges:
- **Limited budgets**: Security often seen as overhead rather than investment
- **Volunteer workforce**: Inconsistent security training and practices
- **Emotional targeting**: Attackers exploit charitable missions for social engineering
- **Regulatory complexity**: Must protect donor privacy while maintaining transparency

Yet nonprofits handle extremely sensitive data:
- Major donor financial information
- Beneficiary personal details
- Grant application materials
- Strategic planning documents

## Emerging Threats: What's Coming Next

### AI-Powered Attacks
- **Deepfake technology**: Voice and video impersonation for social engineering
- **Automated reconnaissance**: AI systems gathering intelligence on targets
- **Dynamic malware**: Code that adapts to avoid detection

### Internet of Things (IoT) Exploitation
- **Smart office devices**: Printers, cameras, thermostats as network entry points
- **Mobile device integration**: Personal phones accessing business systems
- **Cloud service vulnerabilities**: Misconfigured cloud storage and applications

### Cryptocurrency-Enabled Crime
- **Untraceable payments**: Making it harder to track criminals
- **Cryptojacking**: Using business resources to mine cryptocurrency
- **Smart contract exploitation**: Attacking businesses using blockchain technology

## Building Resilience in 2025

The threat landscape for small businesses and nonprofits isn't just dangerous — it's getting worse. But understanding these threats is the first step toward building effective defenses.

### Immediate Priorities:
1. **Email security**: Deploy advanced threat protection for all business email
2. **Backup systems**: Implement automated, tested backup procedures
3. **Access controls**: Limit who can access what data and systems
4. **Security training**: Regular, realistic training for all team members

### Long-term Strategy:
1. **Security culture**: Make cybersecurity part of your organizational DNA
2. **Incident planning**: Prepare for when (not if) an attack occurs
3. **Professional support**: Establish relationships with cybersecurity experts
4. **Continuous improvement**: Regular security assessments and updates

## The Bottom Line

In 2025, every small business and nonprofit is a potential target. The question isn't whether you'll be attacked — it's whether you'll be prepared when it happens.

The good news? You don't need an enterprise budget to build effective defenses. You need the right knowledge, tools, and support systems. And you need to start now.

*Concerned about your organization's security posture? Our comprehensive security assessments help small businesses and nonprofits understand their vulnerabilities and build cost-effective defenses. [Contact us](/contact.html) for a free consultation.*`,
                    category: 'threat-intelligence',
                    tags: ['threat-landscape', '2025-trends', 'small-business', 'cybercrime'],
                    author: 'Jonathan Bateman',
                    date: new Date('2025-01-05'),
                    readTime: '15 min read',
                    featured: true
                }
            ];

            this.posts = samplePosts;
            this.savePosts();
        }
    }

    loadPosts() {
        const saved = localStorage.getItem('blogPosts');
        return saved ? JSON.parse(saved) : [];
    }

    savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }

    handleCategoryFilter(e) {
        const category = e.target.getAttribute('data-category');
        
        // Update active filter
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.classList.remove('active');
        });
        e.target.classList.add('active');
        
        this.currentCategory = category;
        this.currentPage = 1;
        this.displayPosts();
    }

    displayPosts() {
        const postsContainer = document.getElementById('blog-posts');
        if (!postsContainer) return;

        let filteredPosts = this.posts;
        
        if (this.currentCategory !== 'all') {
            filteredPosts = this.posts.filter(post => post.category === this.currentCategory);
        }

        // Sort by date (newest first)
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        const postsToShow = filteredPosts.slice(0, this.currentPage * this.postsPerPage);
        
        postsContainer.innerHTML = '';
        
        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            postsContainer.appendChild(postElement);
        });

        // Update load more button visibility
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            if (postsToShow.length >= filteredPosts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Apply fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.blog-post-card').forEach(card => {
                card.classList.add('fade-in');
                card.classList.add('visible');
            });
        }, 100);
    }

    createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-post-card';
        article.setAttribute('data-category', post.category);

        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        article.innerHTML = `
            <div class="blog-post-meta">
                <span class="blog-post-category">${this.formatCategory(post.category)}</span>
                <span class="blog-post-date">${formattedDate}</span>
                <span class="blog-post-read-time">${post.readTime || '5 min read'}</span>
            </div>
            <h3>${post.title}</h3>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <div class="blog-post-tags">
                ${post.tags ? post.tags.map(tag => `<span class="blog-post-tag">${tag}</span>`).join('') : ''}
            </div>
        `;

        article.addEventListener('click', () => {
            this.openPostModal(post);
        });

        return article;
    }

    formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    openPostModal(post) {
        const modal = document.getElementById('view-post-modal');
        const content = document.getElementById('full-post-content');
        
        if (!modal || !content) return;

        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        content.innerHTML = `
            <div class="blog-post-header">
                <div class="blog-post-meta">
                    <span class="blog-post-category">${this.formatCategory(post.category)}</span>
                    <span class="blog-post-date">${formattedDate}</span>
                    <span class="blog-post-read-time">${post.readTime || '5 min read'}</span>
                </div>
                <h1>${post.title}</h1>
                <div class="blog-post-author">By ${post.author || 'Jonathan Bateman'}</div>
            </div>
            <div class="blog-post-content">
                ${this.formatContent(post.content)}
            </div>
            <div class="blog-post-tags">
                ${post.tags ? post.tags.map(tag => `<span class="blog-post-tag">${tag}</span>`).join('') : ''}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    formatContent(content) {
        // Simple markdown-like formatting
        return content
            .replace(/^## (.+$)/gm, '<h2>$1</h2>')
            .replace(/^### (.+$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')
            .replace(/<p><h/g, '<h')
            .replace(/h[0-9]><\/p>/g, function(match) {
                return match.replace('></p>', '>');
            });
    }

    openNewPostModal() {
        const modal = document.getElementById('new-post-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    handleNewPost(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newPost = {
            id: Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            author: 'Jonathan Bateman',
            date: new Date(),
            readTime: this.estimateReadTime(formData.get('content')),
            featured: false
        };

        this.posts.unshift(newPost);
        this.savePosts();
        this.displayPosts();
        this.closeModals();
        
        // Reset form
        e.target.reset();
        
        // Show success message
        this.showSuccessMessage('Blog post published successfully!');
    }

    saveDraft() {
        const form = document.getElementById('new-post-form');
        const formData = new FormData(form);
        
        const draft = {
            title: formData.get('title'),
            category: formData.get('category'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            tags: formData.get('tags'),
            timestamp: new Date()
        };

        localStorage.setItem('blogDraft', JSON.stringify(draft));
        this.showSuccessMessage('Draft saved successfully!');
    }

    estimateReadTime(content) {
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }

    loadMorePosts() {
        this.currentPage++;
        this.displayPosts();
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-success);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blog-posts')) {
        new BlogManager();
    }
});

// Add CSS for success notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);