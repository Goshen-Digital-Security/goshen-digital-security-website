// File: main.js

import { loadSavedTheme, initThemeToggle } from './theme.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initFadeInObserver } from './animations.js';
import { initHeaderScrollEffect } from './header.js';
import { initParallax } from './parallax.js';
import { initHoverEffects } from './hover-effects.js';
import { initStatObserver } from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', initThemeToggle);
    initSmoothScroll();
    initFadeInObserver();
    initHeaderScrollEffect();
    initParallax();
    initHoverEffects();
    initStatObserver();
});
