/* ============================================
   FISH — Swimming Marine Life Animations
   Caribbean Reef Fish SVG System
   ============================================ */

const Fish = (() => {
  let container;
  let fishes = [];
  let interval;

  // Fish species profiles (Caribbean reef fish)
  const SPECIES = [
    {
      name: 'parrotfish',
      colors: ['#2ec4b6', '#88d498', '#20a39e'],
      size: [35, 55],
      speed: [12, 22],
      path: 'M0,15 Q8,5 15,8 Q22,5 30,8 Q38,5 45,12 L50,10 L48,15 L50,20 L45,18 Q38,25 30,22 Q22,25 15,22 Q8,25 0,15 Z',
      tail: 'M45,12 Q55,5 58,15 Q55,25 45,18',
      finColor: '#f5e6a3',
    },
    {
      name: 'angelfish',
      colors: ['#1a6b8a', '#2ec4b6', '#0f4c75'],
      size: [40, 60],
      speed: [15, 25],
      path: 'M5,15 Q10,2 25,5 Q35,2 40,10 L45,8 L43,15 L45,22 L40,20 Q35,28 25,25 Q10,28 5,15 Z',
      tail: 'M40,10 Q50,5 52,15 Q50,25 40,20',
      finColor: '#f5e6a3',
    },
    {
      name: 'butterfly',
      colors: ['#d4af37', '#f5e6a3', '#c9a82c'],
      size: [28, 42],
      speed: [10, 18],
      path: 'M5,12 Q10,3 20,5 Q28,3 35,8 L38,6 L37,12 L38,18 L35,16 Q28,21 20,19 Q10,21 5,12 Z',
      tail: 'M35,8 Q42,4 44,12 Q42,20 35,16',
      finColor: '#e07a5f',
    },
    {
      name: 'damselfish',
      colors: ['#2196f3', '#42a5f5', '#1976d2'],
      size: [22, 34],
      speed: [8, 14],
      path: 'M3,8 Q8,2 15,3 Q22,2 27,6 L30,5 L29,8 L30,11 L27,10 Q22,14 15,13 Q8,14 3,8 Z',
      tail: 'M27,6 Q33,3 35,8 Q33,13 27,10',
      finColor: '#81d4fa',
    },
    {
      name: 'tang',
      colors: ['#1a237e', '#283593', '#0d47a1'],
      size: [32, 48],
      speed: [14, 20],
      path: 'M4,12 Q10,4 20,5 Q30,4 38,9 L42,7 L40,12 L42,17 L38,15 Q30,20 20,19 Q10,20 4,12 Z',
      tail: 'M38,9 Q46,4 48,12 Q46,20 38,15',
      finColor: '#ffd54f',
    },
    {
      name: 'snapper',
      colors: ['#e07a5f', '#f26419', '#c45a3c'],
      size: [38, 55],
      speed: [11, 19],
      path: 'M3,14 Q10,5 20,7 Q30,5 40,10 L46,8 L44,14 L46,20 L40,18 Q30,23 20,21 Q10,23 3,14 Z',
      tail: 'M40,10 Q50,5 52,14 Q50,23 40,18',
      finColor: '#ffab91',
    },
    {
      name: 'turtletail',
      colors: ['#4caf50', '#66bb6a', '#388e3c'],
      size: [45, 65],
      speed: [18, 30],
      path: 'M5,20 Q12,8 25,10 Q38,8 48,14 L55,12 L53,20 L55,28 L48,26 Q38,32 25,30 Q12,32 5,20 Z',
      tail: 'M48,14 Q58,8 62,20 Q58,32 48,26',
      finColor: '#a5d6a7',
    },
  ];

  function init() {
    container = document.getElementById('bubbles-container');
    if (!container) return;
    spawnInitial();
    interval = setInterval(spawnFish, 4000);
  }

  function spawnInitial() {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnFish(true), i * 800);
    }
  }

  function spawnFish(randomY = false) {
    if (fishes.length > 8) return;

    const species = SPECIES[Math.floor(Math.random() * SPECIES.length)];
    const size = species.size[0] + Math.random() * (species.size[1] - species.size[0]);
    const speed = species.speed[0] + Math.random() * (species.speed[1] - species.speed[0]);
    const fromRight = Math.random() > 0.5;
    const y = randomY
      ? 10 + Math.random() * 70
      : 15 + Math.random() * 60;

    const fish = document.createElement('div');
    fish.className = 'swimming-fish';
    fish.style.cssText = `
      position: fixed;
      top: ${y}%;
      ${fromRight ? 'right: -80px' : 'left: -80px'};
      z-index: 3;
      pointer-events: none;
      animation: fishSwim ${speed}s linear forwards;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    `;

    if (!fromRight) {
      fish.style.transform = 'scaleX(-1)';
    }

    const color1 = species.colors[0];
    const color2 = species.colors[1];
    const color3 = species.colors[2];

    fish.innerHTML = `
      <svg width="${size}" height="${size * 0.6}" viewBox="0 0 55 30" fill="none">
        <defs>
          <linearGradient id="fishGrad${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color1}"/>
            <stop offset="50%" stop-color="${color2}"/>
            <stop offset="100%" stop-color="${color3}"/>
          </linearGradient>
        </defs>
        <path d="${species.path}" fill="url(#fishGrad${Date.now()})" opacity="0.85"/>
        <path d="${species.tail}" fill="${species.finColor}" opacity="0.5"/>
        <circle cx="12" cy="13" r="2" fill="white" opacity="0.9"/>
        <circle cx="12.5" cy="13" r="1" fill="#1a1a2e"/>
        <!-- Stripe pattern -->
        <line x1="18" y1="8" x2="22" y2="22" stroke="${species.finColor}" stroke-width="0.5" opacity="0.4"/>
        <line x1="26" y1="7" x2="30" y2="23" stroke="${species.finColor}" stroke-width="0.5" opacity="0.3"/>
      </svg>
    `;

    // Gentle vertical bobbing
    const bobAmp = 5 + Math.random() * 10;
    const bobSpeed = 2 + Math.random() * 3;
    let startTime = Date.now();

    function animateBob() {
      const elapsed = (Date.now() - startTime) / 1000;
      const bobY = Math.sin(elapsed * bobSpeed) * bobAmp;
      fish.style.marginTop = bobY + 'px';
      if (fish.parentNode) {
        requestAnimationFrame(animateBob);
      }
    }

    container.appendChild(fish);
    fishes.push(fish);
    requestAnimationFrame(animateBob);

    // Cleanup
    setTimeout(() => {
      if (fish.parentNode) fish.parentNode.removeChild(fish);
      fishes = fishes.filter(f => f !== fish);
    }, speed * 1000);
  }

  function spawnCelebration() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnFish(true), i * 200);
    }
  }

  function destroy() {
    if (interval) clearInterval(interval);
  }

  return { init, spawnFish, spawnCelebration, destroy };
})();
