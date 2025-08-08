// File: hover-effects.js

export function initHoverEffects() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px var(--shadow-color)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    document.querySelectorAll('.tool-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}
