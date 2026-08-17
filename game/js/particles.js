/* ============================================
   PARTICLES — Underwater Ambient Effects
   ============================================ */

const Particles = (() => {
  let canvas, ctx;
  let particles = [];
  let animFrame;
  let width, height;

  const CONFIG = {
    count: 60,
    minSize: 0.5,
    maxSize: 2.5,
    minSpeed: 0.1,
    maxSpeed: 0.4,
    color: { r: 212, g: 175, b: 55 },
    opacity: { min: 0.05, max: 0.25 },
    drift: 0.15,
    connectDistance: 120,
    connectOpacity: 0.03,
  };

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
      this.speedY = -(CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed));
      this.speedX = (Math.random() - 0.5) * CONFIG.drift;
      this.opacity = CONFIG.opacity.min + Math.random() * (CONFIG.opacity.max - CONFIG.opacity.min);
      this.wobbleSpeed = 0.002 + Math.random() * 0.004;
      this.wobbleAmp = 0.3 + Math.random() * 0.8;
      this.phase = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
    }

    update(time) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(time * this.wobbleSpeed + this.phase) * this.wobbleAmp * 0.1;

      const pulse = Math.sin(time * this.pulseSpeed + this.phase);
      this.currentOpacity = this.opacity * (0.7 + pulse * 0.3);

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${this.currentOpacity})`;
      ctx.fill();
    }
  }

  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    createParticles();
    window.addEventListener('resize', resize);
    animate(0);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectDistance) {
          const alpha = (1 - dist / CONFIG.connectDistance) * CONFIG.connectOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update(time);
      p.draw();
    });
    drawConnections();
    animFrame = requestAnimationFrame(animate);
  }

  function destroy() {
    if (animFrame) cancelAnimationFrame(animFrame);
    window.removeEventListener('resize', resize);
  }

  return { init, destroy };
})();

/* ============================================
   BUBBLES — Rising Bubble Generator
   ============================================ */
const Bubbles = (() => {
  let container;
  let interval;

  function init() {
    container = document.getElementById('bubbles-container');
    if (!container) return;
    createBubbles();
    interval = setInterval(createBubble, 2000);
  }

  function createBubbles() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createBubble(), i * 400);
    }
  }

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 4 + Math.random() * 16;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 2;

    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + '%';
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = delay + 's';

    container.appendChild(bubble);
    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, (duration + delay) * 1000);
  }

  function burst(x, y) {
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = 3 + Math.random() * 8;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = x + 'px';
      bubble.style.bottom = (window.innerHeight - y) + 'px';
      bubble.style.animationDuration = (3 + Math.random() * 4) + 's';
      bubble.style.animationDelay = '0s';
      container.appendChild(bubble);
      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 7000);
    }
  }

  function destroy() {
    if (interval) clearInterval(interval);
  }

  return { init, burst, destroy };
})();
