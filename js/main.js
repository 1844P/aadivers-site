/* ============================================================
   Action Adventure Divers — Enhanced JavaScript
   ============================================================ */
'use strict';
document.addEventListener('DOMContentLoaded', () => {

  // ============ NAVIGATION ============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks.querySelectorAll('a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navAnchors.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  });

  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // Smooth scroll fallback
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============ DIVE SITE ACCORDION ============
  const accordionTriggers = document.querySelectorAll('.site-accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.site-accordion-item');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.site-accordion-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.site-accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked
      item.classList.toggle('active');
      trigger.setAttribute('aria-expanded', !isActive);
    });
  });

  // ============ FAQ ACCORDION ============
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');
      // Close all others, open clicked
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });

  // ============ MARINE LIFE FILTER ============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const marineCards = document.querySelectorAll('.marine-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      marineCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Set initial display for marine cards
  marineCards.forEach(card => { card.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; });

  // ============ 3D TILT EFFECT ON CARDS ============
  const tiltCards = document.querySelectorAll('.site-accordion-item, .pricing-card, .review-card, .team-card, .marine-card, .conservation-card');
  tiltCards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.classList.add('tilt-active');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.classList.remove('tilt-active');
    });
  });

  // ============ DARK MODE TOGGLE ============
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    const savedTheme = localStorage.getItem('aad-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('aad-theme', 'light');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('aad-theme', 'dark');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // ============ BOOKING FORM ============
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById('formName').value.trim(),
        email: document.getElementById('formEmail').value.trim(),
        phone: document.getElementById('formPhone').value.trim(),
        guests: document.getElementById('formGuests').value,
        dates: document.getElementById('formDates').value.trim(),
        interest: document.getElementById('formInterest').value,
        certification: document.getElementById('formCert').value,
        message: document.getElementById('formMessage').value.trim()
      };

      if (!formData.name || !formData.email || !formData.dates || !formData.interest) {
        showToast('Please fill in all required fields.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showToast('Please enter a valid email address.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
      }

      try {
        const response = await fetch('https://formspree.io/f/your-form-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          showToast('Thanks! Your inquiry has been sent. We\'ll respond within 2 hours on business days.', 'success');
          bookingForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        const mailtoLink = `mailto:info@aadivers.net?subject=Dive%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGuests: ${formData.guests}\nDates: ${formData.dates}\nInterest: ${formData.interest}\nCertification: ${formData.certification}\nMessage: ${formData.message}`
        )}`;
        window.location.href = mailtoLink;
        showToast('Form submitted via email. We\'ll get back to you soon!', 'success');
        bookingForm.reset();
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ============ TOAST ============
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast visible ' + type;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 5000);
  }
  window.showToast = showToast;

  // ============ PARALLAX HERO ============
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
  }

  // ============ INTERSECTION OBSERVER ============
  const animatedElements = document.querySelectorAll(
    '.site-card, .pricing-card, .review-card, .trip-card, .story-fact, ' +
    '.team-card, .marine-card, .conservation-card, .timeline-item, .faq-item'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ============ CURRENT YEAR ============
  const yearSpans = document.querySelectorAll('.footer-bottom .current-year');
  if (yearSpans.length) {
    yearSpans.forEach(span => { span.textContent = new Date().getFullYear(); });
  }

  console.log('Action Adventure Divers — enhanced site loaded.');
});
