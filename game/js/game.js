/* ============================================
   GAME ENGINE — What Do You Think?
   Soufrière Underwater Discovery
   With Audio & Voice Integration
   ============================================ */

const Game = (() => {
  // State
  let state = {
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    answered: 0,
    correctCount: 0,
    skipped: 0,
    questionOrder: [],
    isAnswered: false,
    startTime: null,
    audioStarted: false,
  };

  // DOM cache
  const $ = (sel) => document.querySelector(sel);
  const ELEMENTS = {};

  // Categories
  const CATEGORIES = {
    'Reef Life': { icon: '🐠', color: '#2ec4b6' },
    'Marine Creatures': { icon: '🐢', color: '#88d498' },
    'Ecosystem': { icon: '🌊', color: '#1a6b8a' },
    'Conservation': { icon: '🛡️', color: '#e07a5f' },
    'Diving & Tourism': { icon: '🤿', color: '#d4af37' },
  };

  const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

  // ---------- INITIALIZATION ----------

  function init() {
    cacheElements();
    Particles.init();
    Bubbles.init();
    AudioEngine.init();

    // Preload voices
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // Show audio panel on welcome screen — player can turn off if desired
    if (ELEMENTS.audioPanel) ELEMENTS.audioPanel.style.display = 'flex';
    AudioPanel.updateButtons();

    // Attempt to start audio immediately (works in some browsers)
    // If autoplay is blocked, a single click anywhere will unlock it
    tryStartAudio();
  }

  function tryStartAudio() {
    // Try starting immediately
    AudioEngine.resume().then(() => {
      if (!state.audioStarted) {
        state.audioStarted = true;
        AudioEngine.startAmbientMusic();
        Fish.init();
        AudioPanel.updateButtons();
      }
    }).catch(() => {
      // Autoplay blocked — wait for first user interaction
    });

    // One-time click listener to unlock audio in locked browsers
    const unlockAudio = () => {
      if (!state.audioStarted) {
        AudioEngine.resume().then(() => {
          state.audioStarted = true;
          AudioEngine.startAmbientMusic();
          Fish.init();
          AudioPanel.updateButtons();
        });
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio, { once: false });
    document.addEventListener('touchstart', unlockAudio, { once: false });
  }

  function cacheElements() {
    ELEMENTS.screens = {
      welcome: $('#screen-welcome'),
      game: $('#screen-game'),
      results: $('#screen-results'),
    };
    ELEMENTS.hudQuestion = $('#hud-question');
    ELEMENTS.hudScore = $('#hud-score');
    ELEMENTS.depthFill = $('#depth-fill');
    ELEMENTS.depthMarker = $('#depth-marker');
    ELEMENTS.questionCard = $('#question-card');
    ELEMENTS.categoryIcon = $('#category-icon');
    ELEMENTS.categoryText = $('#category-text');
    ELEMENTS.questionText = $('#question-text');
    ELEMENTS.cardOptions = $('#card-options');
    ELEMENTS.cardReveal = $('#card-reveal');
    ELEMENTS.revealAnswer = $('#reveal-answer');
    ELEMENTS.revealFact = $('#reveal-fact');
    ELEMENTS.cardActions = $('#card-actions');
    ELEMENTS.streakContainer = $('#streak-container');
    ELEMENTS.streakCount = $('#streak-count');
    ELEMENTS.resultsTitle = $('#results-title');
    ELEMENTS.resultsSubtitle = $('#results-subtitle');
    ELEMENTS.statPct = $('#stat-pct');
    ELEMENTS.statRingFill = $('#stat-ring-fill');
    ELEMENTS.statDiscoveries = $('#stat-discoveries');
    ELEMENTS.statStreak = $('#stat-streak');
    ELEMENTS.statAccuracy = $('#stat-accuracy');
    ELEMENTS.resultsMessage = $('#results-message');
    ELEMENTS.depthHaze = $('#depth-haze');
    ELEMENTS.audioPanel = $('#audio-panel');
    ELEMENTS.voiceIndicator = $('#voice-indicator');
  }

  // ---------- SCREEN MANAGEMENT ----------

  function showScreen(name) {
    Object.values(ELEMENTS.screens).forEach(s => s.classList.remove('active'));
    ELEMENTS.screens[name].classList.add('active');
  }

  // ---------- AUDIO BOOTSTRAP ----------

  function startAudio() {
    if (state.audioStarted) return;
    state.audioStarted = true;
    AudioEngine.resume();
    AudioEngine.startAmbientMusic();
    Fish.init();

    // Update button states
    AudioPanel.updateButtons();
  }

  // ---------- GAME LIFECYCLE ----------

  function start() {
    // Bootstrap audio on first interaction
    startAudio();
    AudioEngine.playBubblePop();
    AudioEngine.stopSpeaking();

    state = {
      currentIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      answered: 0,
      correctCount: 0,
      skipped: 0,
      questionOrder: shuffleArray([...Array(QUESTIONS.length).keys()]),
      isAnswered: false,
      startTime: Date.now(),
      audioStarted: true,
    };
    showScreen('game');
    setTimeout(() => loadQuestion(0), 500);

    // Narrate welcome
    AudioEngine.speak('Welcome to What Do You Think? Discover the underwater wonders of Soufrière, Saint Lucia. Let us begin.', true);
  }

  function restart() {
    start();
  }

  function endGame() {
    AudioEngine.stopSpeaking();
    AudioEngine.playResults();
    Fish.spawnCelebration();
    showResults();
    showScreen('results');

    // Narrate results after a moment
    setTimeout(() => {
      const accuracy = state.answered > 0
        ? Math.round((state.correctCount / state.answered) * 100) : 0;
      let title = ELEMENTS.resultsTitle.textContent;
      AudioEngine.speak(
        `Congratulations! You have earned the title ${title}. ` +
        `You answered ${state.correctCount} out of ${state.answered} questions correctly, with an accuracy of ${accuracy} percent. ` +
        `The waters of Soufrière are waiting for your real dive adventure.`,
        true
      );
    }, 1500);
  }

  // ---------- QUESTION LOADING ----------

  function loadQuestion(index) {
    if (index >= QUESTIONS.length) {
      endGame();
      return;
    }

    state.currentIndex = index;
    state.isAnswered = false;
    const qData = QUESTIONS[state.questionOrder[index]];
    const cat = CATEGORIES[qData.category] || CATEGORIES['Reef Life'];

    // Update HUD
    ELEMENTS.hudQuestion.textContent = `${index + 1} / ${QUESTIONS.length}`;
    ELEMENTS.hudScore.textContent = state.score;
    updateDepthMeter(index);

    // Update category
    ELEMENTS.categoryIcon.textContent = qData.icon;
    ELEMENTS.categoryText.textContent = qData.category;

    // Update question
    ELEMENTS.questionText.textContent = qData.question;

    // Hide reveal
    ELEMENTS.cardReveal.style.display = 'none';

    // Generate options
    generateOptions(qData, index);

    // Reset actions
    ELEMENTS.cardActions.innerHTML = `
      <button class="btn-skip" onclick="Game.skipQuestion()">Surface Skip ↗</button>
    `;

    // Animate card in
    ELEMENTS.questionCard.classList.remove('card-exiting', 'card-correct', 'card-wrong');
    ELEMENTS.questionCard.classList.add('card-entering');
    setTimeout(() => {
      ELEMENTS.questionCard.classList.remove('card-entering');
    }, 600);

    // Play transition sound
    AudioEngine.playTransition();

    // Voice narration for question
    setTimeout(() => {
      if (!state.isAnswered) {
        showVoiceIndicator(true);
        AudioEngine.speak(
          `Question ${index + 1}. ${qData.question.replace('?', '')}?`,
          false
        );
        // Auto-hide indicator after estimated speech duration
        const speechDuration = Math.max(3000, qData.question.length * 60);
        setTimeout(() => showVoiceIndicator(false), speechDuration);
      }
    }, 800);
  }

  function generateOptions(qData, globalIndex) {
    const correctAnswer = qData.answer;
    const otherQuestions = QUESTIONS.filter((q, i) => {
      const qIndex = state.questionOrder.indexOf(i);
      return qIndex !== globalIndex && q.category === qData.category;
    });

    let wrongAnswers = [];
    if (otherQuestions.length >= 3) {
      const shuffled = shuffleArray([...otherQuestions]);
      wrongAnswers = shuffled.slice(0, 3).map(q => q.answer);
    } else {
      const allOthers = QUESTIONS.filter((q, i) => state.questionOrder.indexOf(i) !== globalIndex);
      const shuffled = shuffleArray([...allOthers]);
      wrongAnswers = shuffled.slice(0, 3).map(q => q.answer);
    }

    const allOptions = shuffleArray([correctAnswer, ...wrongAnswers]);

    ELEMENTS.cardOptions.innerHTML = '';
    allOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-key">${ANSWER_LABELS[i]}</span>
        <span class="option-text">${truncate(opt, 120)}</span>
      `;
      btn.dataset.answer = opt;
      btn.onclick = () => handleAnswer(btn, opt, correctAnswer, globalIndex);
      ELEMENTS.cardOptions.appendChild(btn);
    });
  }

  // ---------- ANSWER HANDLING ----------

  function handleAnswer(btn, selected, correct, globalIndex) {
    if (state.isAnswered) return;
    state.isAnswered = true;
    state.answered++;

    // Stop question narration
    AudioEngine.stopSpeaking();
    showVoiceIndicator(false);

    const qData = QUESTIONS[state.questionOrder[globalIndex]];
    const isCorrect = selected === correct;

    // Disable all options
    const allBtns = ELEMENTS.cardOptions.querySelectorAll('.option-btn');
    allBtns.forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.answer === correct) {
        b.classList.add('correct');
      }
    });

    if (isCorrect) {
      btn.classList.add('correct');
      state.correctCount++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;

      const streakBonus = Math.min(state.streak - 1, 10) * 25;
      const points = 100 + streakBonus;
      state.score += points;

      ELEMENTS.questionCard.classList.add('card-correct');
      showScorePopup(`+${points}`, false, btn);
      AudioEngine.playCorrect();

      // Streak sound
      if (state.streak >= 3) {
        setTimeout(() => AudioEngine.playStreak(state.streak), 300);
      }
    } else {
      btn.classList.add('wrong');
      state.streak = 0;
      ELEMENTS.questionCard.classList.add('card-wrong');
      showScorePopup('Missed!', true, btn);
      AudioEngine.playWrong();
    }

    // Update HUD
    ELEMENTS.hudScore.textContent = state.score;
    popElement(ELEMENTS.hudScore, 'hud-pop');
    updateStreak();

    // Show reveal with voice
    showReveal(qData, isCorrect);

    // Narrate answer
    setTimeout(() => {
      showVoiceIndicator(true);
      const factText = isCorrect
        ? `Correct! ${qData.funFact}`
        : `Not quite. ${qData.answer}. ${qData.funFact}`;
      AudioEngine.speak(factText, false);

      const speechDuration = Math.max(3000, factText.length * 55);
      setTimeout(() => showVoiceIndicator(false), speechDuration);
    }, 500);

    // Replace actions
    ELEMENTS.cardActions.innerHTML = `
      ${globalIndex < QUESTIONS.length - 1
        ? '<button class="btn-next" onclick="Game.nextQuestion()">Dive Deeper ↓</button>'
        : '<button class="btn-next" onclick="Game.endGame()">Surface & See Results ↑</button>'
      }
    `;
  }

  function showReveal(qData, isCorrect) {
    ELEMENTS.revealAnswer.textContent = qData.answer;
    ELEMENTS.revealFact.textContent = isCorrect
      ? `${qData.funFact}`
      : `The correct answer: ${qData.answer}\n\n${qData.funFact}`;
    ELEMENTS.cardReveal.style.display = 'block';
  }

  function skipQuestion() {
    if (state.isAnswered) return;
    AudioEngine.stopSpeaking();
    showVoiceIndicator(false);
    AudioEngine.playClick();
    state.skipped++;
    state.streak = 0;
    updateStreak();
    nextQuestion();
  }

  function nextQuestion() {
    AudioEngine.stopSpeaking();
    showVoiceIndicator(false);
    AudioEngine.playClick();
    ELEMENTS.questionCard.classList.add('card-exiting');
    setTimeout(() => {
      loadQuestion(state.currentIndex + 1);
    }, 500);
  }

  // ---------- UI HELPERS ----------

  function updateDepthMeter(index) {
    const pct = ((index + 1) / QUESTIONS.length) * 100;
    ELEMENTS.depthFill.style.width = pct + '%';
    ELEMENTS.depthMarker.style.left = pct + '%';

    // Update depth haze as player progresses
    if (ELEMENTS.depthHaze) {
      const hazeOpacity = 0.5 + (pct / 100) * 0.5;
      ELEMENTS.depthHaze.style.opacity = hazeOpacity;
    }
  }

  function updateStreak() {
    if (state.streak >= 3) {
      ELEMENTS.streakContainer.style.display = 'flex';
      ELEMENTS.streakCount.textContent = state.streak;
      popElement(ELEMENTS.streakCount, 'pop');
    } else {
      ELEMENTS.streakContainer.style.display = 'none';
    }
  }

  function showVoiceIndicator(show) {
    if (ELEMENTS.voiceIndicator) {
      ELEMENTS.voiceIndicator.style.display = show ? 'flex' : 'none';
    }
  }

  function showScorePopup(text, isWrong, anchorEl) {
    const popup = document.createElement('div');
    popup.className = 'score-popup' + (isWrong ? ' wrong' : '');
    popup.textContent = text;

    const rect = anchorEl.getBoundingClientRect();
    popup.style.left = (rect.left + rect.width / 2 - 30) + 'px';
    popup.style.top = (rect.top - 10) + 'px';

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);

    if (!isWrong) {
      Bubbles.burst(rect.left + rect.width / 2, rect.top);
    }
  }

  function truncate(str, maxLen) {
    if (str.length <= maxLen) return str;
    return str.substring(0, maxLen).trim() + '...';
  }

  // ---------- LIVELY NUMBER UPDATES ----------

  function animateNumber(el, to, duration = 600, suffix = '') {
    if (!el) return;
    const from = parseInt(el.textContent, 10) || 0;
    if (from === to) return;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function popElement(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  // ---------- RESULTS ----------

  function showResults() {
    const accuracy = state.answered > 0
      ? Math.round((state.correctCount / state.answered) * 100)
      : 0;

    let title, subtitle, trophy;
    if (accuracy >= 90) {
      title = 'Ocean Sovereign';
      subtitle = 'You have plumbed the depths of Soufrière\'s knowledge like a true monarch of the sea. The reef bows before your wisdom.';
      trophy = '👑';
    } else if (accuracy >= 75) {
      title = 'Deep Explorer';
      subtitle = 'Your curiosity dives as deep as the trenches of Soufrière. The underwater world reveals its secrets to you.';
      trophy = '🏆';
    } else if (accuracy >= 50) {
      title = 'Reef Wanderer';
      subtitle = 'You\'ve discovered many of Soufrière\'s underwater treasures. Each dive reveals more wonders waiting to be explored.';
      trophy = '🐚';
    } else if (accuracy >= 25) {
      title = 'Surface Dreamer';
      subtitle = 'The depths of Soufrière hold endless mysteries yet to unfold for you. Every question is a doorway to wonder.';
      trophy = '🌊';
    } else {
      title = 'Curious Tide';
      subtitle = 'Even the mightiest ocean explorers began with a single curious question. Your underwater journey has only just begun.';
      trophy = '✨';
    }

    ELEMENTS.resultsTitle.textContent = title;
    ELEMENTS.resultsSubtitle.textContent = subtitle;
    $('#results-trophy').textContent = trophy;

    // Count up the stats for a lively reveal
    ELEMENTS.statDiscoveries.textContent = '0';
    ELEMENTS.statStreak.textContent = '0';
    ELEMENTS.statAccuracy.textContent = '0%';
    ELEMENTS.statPct.textContent = '0%';
    setTimeout(() => {
      animateNumber(ELEMENTS.statDiscoveries, state.correctCount, 900);
      animateNumber(ELEMENTS.statStreak, state.bestStreak, 900);
      animateNumber(ELEMENTS.statAccuracy, accuracy, 900, '%');
      animateNumber(ELEMENTS.statPct, accuracy, 900, '%');
      popElement(ELEMENTS.statDiscoveries, 'stat-pop');
      popElement(ELEMENTS.statStreak, 'stat-pop');
      popElement(ELEMENTS.statAccuracy, 'stat-pop');
      popElement(ELEMENTS.statPct, 'stat-pop');
    }, 700);

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (accuracy / 100) * circumference;
    ELEMENTS.statRingFill.style.strokeDasharray = circumference;
    ELEMENTS.statRingFill.style.strokeDashoffset = circumference;
    setTimeout(() => {
      ELEMENTS.statRingFill.style.strokeDashoffset = offset;
    }, 500);

    const messages = [
      `You explored ${state.answered} of ${QUESTIONS.length} questions, uncovering the marine marvels of Soufrière, Saint Lucia.`,
      `The SMMA spans from Marigot Bay to Anse La Raye, protecting one of the Caribbean's most vibrant ecosystems.`,
      `From the volcanic Pitons to the intricate coral gardens, every fact you learned is an invitation to dive deeper.`,
    ];
    ELEMENTS.resultsMessage.querySelector('p').innerHTML =
      messages.join('<br><br>');

    ELEMENTS.streakContainer.style.display = 'none';
  }

  // ---------- UTILITIES ----------

  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // ---------- PUBLIC API ----------

  return {
    init,
    start,
    restart,
    endGame,
    nextQuestion,
    skipQuestion,
  };
})();

/* ============================================
   AUDIO PANEL CONTROLLER
   ============================================ */
const AudioPanel = (() => {
  function toggleMusic() {
    const enabled = AudioEngine.toggleMusic();
    updateButtons();
    if (!enabled) AudioEngine.playClick();
  }

  function toggleVoice() {
    const enabled = AudioEngine.toggleVoice();
    updateButtons();
    if (!enabled) {
      AudioEngine.stopSpeaking();
      const indicator = document.getElementById('voice-indicator');
      if (indicator) indicator.style.display = 'none';
    }
    AudioEngine.playClick();
  }

  function toggleSound() {
    const muted = AudioEngine.toggleMute();
    updateButtons();
  }

  function toggleMute() {
    const muted = AudioEngine.toggleMute();
    updateButtons();
  }

  function showPanel() {
    const panel = document.getElementById('audio-panel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    }
  }

  function updateButtons() {
    const musicBtn = document.getElementById('btn-music');
    const voiceBtn = document.getElementById('btn-voice');
    const soundBtn = document.getElementById('btn-sound');
    const muteBtn = document.getElementById('btn-mute-all');

    if (musicBtn) musicBtn.classList.toggle('muted', !AudioEngine.getMusicEnabled());
    if (voiceBtn) voiceBtn.classList.toggle('muted', !AudioEngine.getVoiceEnabled());
    if (soundBtn) soundBtn.classList.toggle('muted', AudioEngine.getMuted());
    if (muteBtn) muteBtn.classList.toggle('muted', !AudioEngine.getMuted());
  }

  return { toggleMusic, toggleVoice, toggleSound, toggleMute, showPanel, updateButtons };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', Game.init);
