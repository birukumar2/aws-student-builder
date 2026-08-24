import { useLayoutEffect } from 'react';

const REVEAL_SELECTORS = [
  '.section-intro',
  '.about-content',
  '.about-facts',
  '.focus-card',
  '.why-item',
  '.event-empty',
  '.team-card',
  '.team-principle',
  '.project-coming',
  '.project-tags',
  '.resource-column',
  '.stat',
  '.social-card',
  '.enquiry > div',
  '.enquiry-action',
  '.cta-mark',
  '.join-cta .section-label',
  '.join-cta h2',
  '.join-cta p',
  '.join-cta .hero-actions',
  '.cta-foot',
];

const STAGGER_STEPS: Record<string, number> = {
  '.focus-card': 80,
  '.why-item': 70,
  '.team-card': 90,
  '.resource-column': 100,
  '.social-card': 70,
  '.stat': 70,
};

export function useScrollReveal(enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS.join(', '))
    );
    if (elements.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    elements.forEach((el) => el.setAttribute('data-reveal', ''));

    for (const [selector, step] of Object.entries(STAGGER_STEPS)) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const index = Array.from(parent.children).indexOf(el);
        el.style.animationDelay = `${Math.min(index * step, 420)}ms`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('is-visible');
          el.addEventListener(
            'animationend',
            () => {
              el.removeAttribute('data-reveal');
              el.classList.remove('is-visible');
              el.style.animationDelay = '';
            },
            { once: true }
          );
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
}
