import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on every route change.
 *
 * The critical fix: setting history.scrollRestoration = 'manual' disables
 * the browser's built-in scroll restoration, which was silently overriding
 * every JavaScript-based scroll reset after navigation.
 */

// Disable browser scroll restoration globally, once, at module load time.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, search } = location;

  useLayoutEffect(() => {
    // Temporarily kill smooth scroll so the reset is instant
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;

    // Restore smooth scroll after the frame
    const id = requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
