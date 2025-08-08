// File: header.js

export function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.style.background = 'var(--glass-bg)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'var(--glass-bg)';
            header.style.backdropFilter = 'blur(20px)';
        }

        if (scrollY > lastScrollY && scrollY > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
    });
}
