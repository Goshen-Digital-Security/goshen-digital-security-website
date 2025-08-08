// File: stats.js

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 100 ? '+' : target.toString().includes('.') ? '%' : '');
    }, 20);
}

export function initStatObserver() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                const text = number.textContent;
                const value = parseFloat(text.replace(/[^\d.]/g, ''));
                number.textContent = '0';
                animateNumber(number, value);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });
}
