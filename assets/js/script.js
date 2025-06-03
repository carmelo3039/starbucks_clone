document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.mobile-close');
  const navOverlay = document.createElement('div');

  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    navOverlay.classList.toggle('active', !isExpanded);
    document.body.classList.toggle('no-scroll', !isExpanded);
  }

  menuToggle.addEventListener('click', toggleMobileMenu);
  mobileClose.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', toggleMobileMenu);

  // Footer Accordion
  const footerToggles = document.querySelectorAll('.footer-toggle');

  footerToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const section = this.parentElement.parentElement;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const content = section.querySelector('.footer-links');

      this.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);

      // Close other sections
      if (!isExpanded) {
        footerToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            otherToggle.setAttribute('aria-expanded', 'false');
            otherToggle.parentElement.parentElement
              .querySelector('.footer-links')
              .setAttribute('aria-hidden', 'true');
          }
        });
      }
    });
  });

  // Responsive behavior for footer
  function handleFooterResponsive() {
    const isMobile = window.innerWidth < 992;
    const footerSections = document.querySelectorAll('.footer-section');

    footerSections.forEach((section) => {
      const toggle = section.querySelector('.footer-toggle');
      const content = section.querySelector('.footer-links');

      if (isMobile) {
        toggle.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // Initial check
  handleFooterResponsive();

  // Check on resize
  window.addEventListener('resize', handleFooterResponsive);

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoad = function () {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function (img) {
        observer.observe(img);
      });
    };

    document.addEventListener('DOMContentLoaded', lazyLoad);
    window.addEventListener('load', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('scroll', lazyLoad);
  }
});
