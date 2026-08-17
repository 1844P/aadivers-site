/* ============================================
   AUDIO ENGINE — Caribbean Underwater Soundscape
   Web Audio API + Speech Synthesis
   ============================================ */

const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let voiceGain = null;
  let isMuted = false;
  let musicPlaying = false;
  let nodes = [];
  let currentVoice = null;
  let voiceEnabled = true;
  let musicEnabled = true;

  // ---------- INITIALIZATION ----------

  function init() {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.7;
      masterGain.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = 0.35;
      musicGain.connect(masterGain);

      sfxGain = ctx.createGain();
      sfxGain.gain.value = 0.6;
      sfxGain.connect(masterGain);

      voiceGain = ctx.createGain();
      voiceGain.gain.value = 0.9;
      voiceGain.connect(masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  function resume() {
    if (ctx && ctx.state === 'suspended') {
      return ctx.resume();
    }
    return Promise.resolve();
  }

  // ---------- AMBIENT MUSIC ENGINE ----------

  function startAmbientMusic() {
    if (!ctx || musicPlaying) return;
    musicPlaying = true;

    // Deep ocean drone
    createDrone(55, 'sine', 0.15);      // Deep bass
    createDrone(82.5, 'sine', 0.08);    // Perfect fifth above
    createDrone(110, 'sine', 0.06);     // Octave
    createDrone(165, 'triangle', 0.03); // High shimmer

    // Slow pad swells
    createPadSwell(130.81, 196, 0.04);  // C3 + G3
    createPadSwell(164.81, 246.94, 0.03); // E3 + B3

    // Watery texture - modulated noise
    createWaterNoise();

    // Distant whale-like calls
    scheduleWhaleCalls();

    // Gentle bubble pings
    scheduleBubblePings();
  }

  function createDrone(freq, type, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    // Slow amplitude modulation for breathing effect
    lfo.type = 'sine';
    lfo.frequency.value = 0.05 + Math.random() * 0.1;
    lfoGain.gain.value = vol * 0.3;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 3);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(musicGain);

    osc.start();
    lfo.start();

    nodes.push(osc, lfo);
  }

  function createPadSwell(freq1, freq2, vol) {
    function swell() {
      if (!ctx || ctx.state === 'closed') return;
      const now = ctx.currentTime;
      const duration = 8 + Math.random() * 6;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.value = freq1;
      osc2.type = 'sine';
      osc2.frequency.value = freq2;

      filter.type = 'lowpass';
      filter.frequency.value = 400;
      filter.Q.value = 1;

      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(vol, now + duration * 0.3);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(musicGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);

      setTimeout(swell, (duration + Math.random() * 4) * 1000);
    }
    swell();
  }

  function createWaterNoise() {
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 200;
    filter.Q.value = 0.5;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 100;

    const gain = ctx.createGain();
    gain.gain.value = 0.025;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);

    noise.start();
    lfo.start();

    nodes.push(noise, lfo);
  }

  function scheduleWhaleCalls() {
    function call() {
      if (!ctx || ctx.state === 'closed') return;
      playWhaleSound();
      setTimeout(call, 12000 + Math.random() * 20000);
    }
    setTimeout(call, 5000 + Math.random() * 8000);
  }

  function playWhaleSound() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const baseFreq = 60 + Math.random() * 40;
    const duration = 2 + Math.random() * 3;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.value = baseFreq;
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + duration * 0.3);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.8, now + duration);

    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 2;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gain.gain.linearRampToValueAtTime(0.06, now + duration * 0.7);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  function scheduleBubblePings() {
    function ping() {
      if (!ctx || ctx.state === 'closed') return;
      playBubblePing();
      setTimeout(ping, 3000 + Math.random() * 7000);
    }
    setTimeout(ping, 2000);
  }

  function playBubblePing() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const freq = 800 + Math.random() * 1200;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.1);

    gain.gain.value = 0.04;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(musicGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // ---------- SOUND EFFECTS ----------

  function playCorrect() {
    if (!ctx) return;
    const now = ctx.currentTime;

    // Ascending chime sequence
    [0, 0.08, 0.16].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5

      osc.type = 'sine';
      osc.frequency.value = freqs[i];

      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.5);

      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });

    // Shimmer
    const shimmer = ctx.createOscillator();
    const sGain = ctx.createGain();
    shimmer.type = 'triangle';
    shimmer.frequency.value = 1046.5; // C6
    sGain.gain.value = 0;
    sGain.gain.linearRampToValueAtTime(0.05, now + 0.2);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    shimmer.connect(sGain);
    sGain.connect(sfxGain);
    shimmer.start(now + 0.15);
    shimmer.stop(now + 1);
  }

  function playWrong() {
    if (!ctx) return;
    const now = ctx.currentTime;

    // Descending tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 300;
    osc.frequency.linearRampToValueAtTime(150, now + 0.4);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    gain.gain.value = 0.12;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  function playBubblePop() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 600 + Math.random() * 400;
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.05);
    gain.gain.value = 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  function playTransition() {
    if (!ctx) return;
    const now = ctx.currentTime;

    // Whoosh down
    const noise = ctx.createBufferSource();
    const bufSize = ctx.sampleRate;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.frequency.linearRampToValueAtTime(200, now + 0.4);
    filter.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);
    noise.start(now);
    noise.stop(now + 0.6);
  }

  function playClick() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  function playStreak(level) {
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99];
    const count = Math.min(level, 5);

    for (let i = 0; i < count; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = notes[i];
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    }
  }

  function playResults() {
    if (!ctx) return;
    const now = ctx.currentTime;
    // Triumphant chord
    const chord = [261.63, 329.63, 392, 523.25]; // C4, E4, G4, C5
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1 + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.08, now + 1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
      osc.connect(gain);
      gain.connect(sfxGain);
      osc.start(now + i * 0.05);
      osc.stop(now + 3.5);
    });
  }

  // ---------- VOICE / NARRATION ----------

  function speak(text, priority = false) {
    if (!voiceEnabled || !window.speechSynthesis) return;

    if (priority) {
      window.speechSynthesis.cancel();
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85;
    utter.pitch = 1.0;
    utter.volume = 0.9;

    // Try to find a nice voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utter.voice = preferred;

    utter.onstart = () => { currentVoice = utter; };
    utter.onend = () => { currentVoice = null; };

    window.speechSynthesis.speak(utter);
  }

  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentVoice = null;
  }

  // ---------- CONTROLS ----------

  function toggleMute() {
    isMuted = !isMuted;
    if (masterGain) {
      masterGain.gain.value = isMuted ? 0 : 0.7;
    }
    return isMuted;
  }

  function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    if (!voiceEnabled) stopSpeaking();
    return voiceEnabled;
  }

  function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicGain) {
      musicGain.gain.value = musicEnabled ? 0.35 : 0;
    }
    return musicEnabled;
  }

  function setVolume(val) {
    if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, val));
  }

  function getMuted() { return isMuted; }
  function getVoiceEnabled() { return voiceEnabled; }
  function getMusicEnabled() { return musicEnabled; }

  // ---------- PUBLIC API ----------

  return {
    init,
    resume,
    startAmbientMusic,
    playCorrect,
    playWrong,
    playBubblePop,
    playTransition,
    playClick,
    playStreak,
    playResults,
    speak,
    stopSpeaking,
    toggleMute,
    toggleVoice,
    toggleMusic,
    setVolume,
    getMuted,
    getVoiceEnabled,
    getMusicEnabled,
  };
})();
