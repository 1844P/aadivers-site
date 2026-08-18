/* ============================================
   AMBIENCE — Living Interface Effects
   Cursor glow, click ripples, card tilt,
   background parallax, screen entrance replays
   ============================================ */

const Ambience = (() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // ---------- CURSOR GLOW ----------

  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || prefersReduced || isTouch) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let active = false;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        active = true;
        document.body.classList.add('cursor-active');
      }
    }, { passive: true });

    (function loop() {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      glow.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  // ---------- CLICK RIPPLES ----------

  function initRipples() {
    if (prefersReduced) return;
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple ' + (Math.random() > 0.5 ? 'gold' : 'teal');
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 750);
    }, { passive: true });
  }

  // ---------- QUESTION CARD 3D TILT ----------

  function initTilt() {
    const wrap = document.querySelector('.question-card-wrap');
    const card = document.getElementById('question-card');
    if (!wrap || !card || prefersReduced || isTouch) return;

    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--tilt-y', ((px - 0.5) * 8).toFixed(2) + 'deg');
      card.style.setProperty('--tilt-x', ((0.5 - py) * 6).toFixed(2) + 'deg');
    }, { passive: true });

    wrap.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  }

  // ---------- BACKGROUND PARALLAX ----------

  function initParallax() {
    if (prefersReduced || isTouch) return;
    const targets = [
      { el: document.querySelector('.light-rays-container'), depth: 14 },
      { el: document.querySelector('.caustics'), depth: 10 },
      { el: document.querySelector('.coral-watermark'), depth: 7 },
      { el: document.querySelector('.kelp-left'), depth: 6 },
      { el: document.querySelector('.kelp-right'), depth: 6 },
    ].filter(t => t.el);

    document.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      targets.forEach(t => {
        t.el.style.translate = `${(-nx * t.depth).toFixed(1)}px ${(-ny * t.depth).toFixed(1)}px`;
      });
    }, { passive: true });
  }

  // ---------- SCREEN ENTRANCE REPLAYS ----------

  function replayEntrances(screen) {
    const content = screen.querySelector('.screen-content');
    if (!content) return;
    content.classList.remove('replay-entrances');
    void content.offsetWidth; // force reflow so animations restart
    content.classList.add('replay-entrances');
  }

  function initScreens() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type !== 'attributes' || m.attributeName !== 'class') return;
        const screen = m.target;
        if (!screen.classList.contains('active')) return;

        if (screen.id === 'screen-welcome' || screen.id === 'screen-results') {
          replayEntrances(screen);
        } else if (screen.id === 'screen-game') {
          const hud = screen.querySelector('.game-hud');
          if (hud) {
            hud.classList.remove('hud-anim');
            void hud.offsetWidth;
            hud.classList.add('hud-anim');
          }
        }
      });
    });

    document.querySelectorAll('.screen').forEach((s) => {
      observer.observe(s, { attributes: true });
    });

    const active = document.querySelector('.screen.active');
    if (active) replayEntrances(active);
  }

  // ---------- BOOT ----------

  function init() {
    initCursorGlow();
    initRipples();
    initTilt();
    initParallax();
    initScreens();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };
})();
