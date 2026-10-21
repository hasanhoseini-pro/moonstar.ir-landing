/**
 * MoonStar Studio - Landing Page Interactivity
 * Theme Switcher, Mobile Navigation, FAQ Accordion
 */

(function () {
  'use strict';

  // 1. Theme Toggle Logic
  const THEME_STORAGE_KEY = 'moonstar_theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'تغییر به تم روشن');
          btn.setAttribute('title', 'تغییر به حالت روشن');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'تغییر به تم تاریک');
          btn.setAttribute('title', 'تغییر به حالت تاریک');
        }
      }
    });
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  }

  // 2. Mobile Drawer Navigation
  function initMobileDrawer() {
    const openBtns = document.querySelectorAll('.mobile-menu-btn');
    const closeBtns = document.querySelectorAll('.mobile-drawer-close');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.mobile-drawer-backdrop');

    if (!drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    openBtns.forEach((b) => b.addEventListener('click', openDrawer));
    closeBtns.forEach((b) => b.addEventListener('click', closeDrawer));
    backdrop.addEventListener('click', closeDrawer);

    // Close on navigation link click
    const navLinks = drawer.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // 3. FAQ Accordion
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other items
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    });
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Sync current theme state with icons
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    updateThemeToggleIcons(currentTheme);

    // Bind theme toggle buttons
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });

    initMobileDrawer();
    initFaqAccordion();

    // Listen to OS theme changes if user hasn't explicitly set preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();
