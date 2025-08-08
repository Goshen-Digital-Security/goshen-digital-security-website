// File: parallax.js

export function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.grid-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
        }
    });
}
