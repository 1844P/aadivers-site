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

    // === LAYER 1: Deep ocean drone foundation ===
    createDeepDrone(55, 0.12);       // A1 sub-bass
    createDeepDrone(82.41, 0.07);    // E2 perfect fifth
    createDeepDrone(110, 0.05);      // A2 octave
    createDeepDrone(164.81, 0.025);  // E3 shimmer

    // === LAYER 2: Evolving Caribbean pad (Am → F → C → G) ===
    createEvolvingPad();

    // === LAYER 3: Underwater reverb atmosphere ===
    createReverbAtmosphere();

    // === LAYER 4: Gentle wave wash ===
    createWaveWash();

    // === LAYER 5: Steel drum shimmer hits ===
    scheduleSteelDrumShimmer();

    // === LAYER 6: Whale calls with harmonics ===
    scheduleWhaleCalls();

    // === LAYER 7: Bubble textures ===
    scheduleBubblePings();
  }

  function createDeepDrone(freq, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    // Slight detune for warmth
    const detune = (Math.random() - 0.5) * 4;
    osc.detune.value = detune;

    // Slow breathing LFO
    lfo.type = 'sine';
    lfo.frequency.value = 0.03 + Math.random() * 0.07;
    lfoGain.gain.value = vol * 0.35;

    // Gentle stereo drift
    panner.pan.value = (Math.random() - 0.5) * 0.4;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 4);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(musicGain);

    osc.start();
    lfo.start();
    nodes.push(osc, lfo);
  }

  function createEvolvingPad() {
    // Caribbean progression: Am7 → Fmaj7 → Cmaj7 → G7
    const chords = [
      [220, 261.63, 329.63, 392],     // Am7: A3-C4-E4-G4
      [174.61, 220, 261.63, 329.63],   // Fmaj7: F3-A3-C4-E4
      [261.63, 329.63, 392, 493.88],   // Cmaj7: C4-E4-G4-B4
      [196, 246.94, 293.66, 349.23],   // G7: G3-B3-D4-F4
    ];

    function playChord() {
      if (!ctx || ctx.state === 'closed') return;
      const now = ctx.currentTime;
      const chord = chords[Math.floor(Math.random() * chords.length)];
      const duration = 6 + Math.random() * 4;
      const fadeIn = duration * 0.35;
      const fadeOut = duration * 0.3;

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const panner = ctx.createStereoPanner();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        osc.detune.value = (Math.random() - 0.5) * 8;

        filter.type = 'lowpass';
        filter.frequency.value = 300 + Math.random() * 200;
        filter.Q.value = 0.5;

        // Slow filter sweep for movement
        const filterLfo = ctx.createOscillator();
        const filterLfoGain = ctx.createGain();
        filterLfo.type = 'sine';
        filterLfo.frequency.value = 0.02 + Math.random() * 0.04;
        filterLfoGain.gain.value = 150;
        filterLfo.connect(filterLfoGain);
        filterLfoGain.connect(filter.frequency);
        filterLfo.start(now);
        filterLfo.stop(now + duration + 0.5);

        const vol = 0.015 + Math.random() * 0.01;
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(vol, now + fadeIn);
        gain.gain.linearRampToValueAtTime(vol * 0.8, now + duration - fadeOut);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        panner.pan.value = (Math.random() - 0.5) * 0.6;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(musicGain);

        osc.start(now);
        osc.stop(now + duration + 0.5);
      });

      setTimeout(playChord, (duration + 2 + Math.random() * 3) * 1000);
    }
    setTimeout(playChord, 1000);
  }

  function createReverbAtmosphere() {
    if (!ctx) return;

    // Create a convolver for underwater reverb
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * 3;
    const impulse = ctx.createBuffer(2, length, sampleRate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        // Exponential decay with early reflections
        data[i] = (Math.random() * 2 - 1) *
          Math.exp(-t * 1.8) *
          (1 + 0.3 * Math.sin(t * 2.5));
      }
    }

    const convolver = ctx.createConvolver();
    convolver.buffer = impulse;

    // Noise source for the reverb input
    const bufSize = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.3;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 0.3;

    // LFO modulating the filter for movement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0.04;

    noise.connect(filter);
    filter.connect(convolver);
    convolver.connect(gain);
    gain.connect(musicGain);

    noise.start();
    lfo.start();
    nodes.push(noise, lfo);
  }

  function createWaveWash() {
    if (!ctx) return;
    // Layer 1: Low rumble of distant waves
    const bufSize1 = ctx.sampleRate * 4;
    const buf1 = ctx.createBuffer(1, bufSize1, ctx.sampleRate);
    const d1 = buf1.getChannelData(0);
    for (let i = 0; i < bufSize1; i++) d1[i] = Math.random() * 2 - 1;

    const noise1 = ctx.createBufferSource();
    noise1.buffer = buf1;
    noise1.loop = true;

    const lpf1 = ctx.createBiquadFilter();
    lpf1.type = 'lowpass';
    lpf1.frequency.value = 300;
    lpf1.Q.value = 0.7;

    const gain1 = ctx.createGain();
    gain1.gain.value = 0.06;

    const lfo1 = ctx.createOscillator();
    const lfoGain1 = ctx.createGain();
    lfo1.type = 'sine';
    lfo1.frequency.value = 0.08;
    lfoGain1.gain.value = 0.03;

    lfo1.connect(lfoGain1);
    lfoGain1.connect(gain1.gain);
    noise1.connect(lpf1);
    lpf1.connect(gain1);
    gain1.connect(musicGain);

    noise1.start();
    lfo1.start();
    nodes.push(noise1, lfo1);

    // Layer 2: Mid-range surf hiss
    const bufSize2 = ctx.sampleRate * 3;
    const buf2 = ctx.createBuffer(1, bufSize2, ctx.sampleRate);
    const d2 = buf2.getChannelData(0);
    for (let i = 0; i < bufSize2; i++) d2[i] = Math.random() * 2 - 1;

    const noise2 = ctx.createBufferSource();
    noise2.buffer = buf2;
    noise2.loop = true;

    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 800;
    bpf.Q.value = 0.4;

    const gain2 = ctx.createGain();
    gain2.gain.value = 0.025;

    const lfo2 = ctx.createOscillator();
    const lfoGain2 = ctx.createGain();
    lfo2.type = 'sine';
    lfo2.frequency.value = 0.05;
    lfoGain2.gain.value = 400;
    lfo2.connect(lfoGain2);
    lfoGain2.connect(bpf.frequency);

    const lfo3 = ctx.createOscillator();
    const lfoGain3 = ctx.createGain();
    lfo3.type = 'sine';
    lfo3.frequency.value = 0.12;
    lfoGain3.gain.value = 0.015;
    lfo3.connect(lfoGain3);
    lfoGain3.connect(gain2.gain);

    noise2.connect(bpf);
    bpf.connect(gain2);
    gain2.connect(musicGain);

    noise2.start();
    lfo2.start();
    lfo3.start();
    nodes.push(noise2, lfo2, lfo3);

    // Layer 3: Gentle foam/spray high-freq shimmer
    const bufSize3 = ctx.sampleRate * 2;
    const buf3 = ctx.createBuffer(1, bufSize3, ctx.sampleRate);
    const d3 = buf3.getChannelData(0);
    for (let i = 0; i < bufSize3; i++) d3[i] = Math.random() * 2 - 1;

    const noise3 = ctx.createBufferSource();
    noise3.buffer = buf3;
    noise3.loop = true;

    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 2000;
    hpf.Q.value = 0.3;

    const gain3 = ctx.createGain();
    gain3.gain.value = 0.008;

    const lfo4 = ctx.createOscillator();
    const lfoGain4 = ctx.createGain();
    lfo4.type = 'sine';
    lfo4.frequency.value = 0.03;
    lfoGain4.gain.value = 0.006;
    lfo4.connect(lfoGain4);
    lfoGain4.connect(gain3.gain);

    noise3.connect(hpf);
    hpf.connect(gain3);
    gain3.connect(musicGain);

    noise3.start();
    lfo4.start();
    nodes.push(noise3, lfo4);
  }

  function scheduleSteelDrumShimmer() {
    function shimmer() {
      if (!ctx || ctx.state === 'closed') return;
      playSteelDrumNote();
      setTimeout(shimmer, 8000 + Math.random() * 15000);
    }
    setTimeout(shimmer, 3000 + Math.random() * 5000);
  }

  function playSteelDrumNote() {
    if (!ctx) return;
    const now = ctx.currentTime;

    // Caribbean pentatonic: A C D E G
    const notes = [220, 261.63, 293.66, 329.63, 392, 440, 523.25];
    const freq = notes[Math.floor(Math.random() * notes.length)];
    const duration = 1.5 + Math.random() * 2;

    // Steel drum: fundamental + inharmonic partials
    const partials = [1, 2.0, 3.0, 4.2, 5.4];
    const amps = [1, 0.5, 0.3, 0.15, 0.08];

    partials.forEach((partial, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const panner = ctx.createStereoPanner();

      osc.type = 'sine';
      osc.frequency.value = freq * partial;

      filter.type = 'lowpass';
      filter.frequency.value = 2000 - i * 300;
      filter.Q.value = 0.5;

      const vol = amps[i] * 0.04;
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(vol, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      panner.pan.value = (Math.random() - 0.5) * 0.5;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(musicGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  function scheduleWhaleCalls() {
    function call() {
      if (!ctx || ctx.state === 'closed') return;
      playWhaleSound();
      setTimeout(call, 15000 + Math.random() * 25000);
    }
    setTimeout(call, 6000 + Math.random() * 10000);
  }

  function playWhaleSound() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const baseFreq = 55 + Math.random() * 50;
    const duration = 2.5 + Math.random() * 3.5;
    const isLow = Math.random() > 0.4;

    // Fundamental
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const panner = ctx.createStereoPanner();

    osc.type = 'sine';
    osc.frequency.value = baseFreq;

    if (isLow) {
      // Deep moan: slide down
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.3, now + duration * 0.2);
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.7, now + duration);
    } else {
      // Rising call
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.8, now + duration * 0.1);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.6, now + duration * 0.6);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.1, now + duration);
    }

    filter.type = 'lowpass';
    filter.frequency.value = 500;
    filter.Q.value = 3;

    panner.pan.value = (Math.random() - 0.5) * 0.8;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
    gain.gain.setValueAtTime(0.06, now + duration * 0.6);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(panner);
    panner.connect(musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.2);

    // Harmonic overtone for richness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = baseFreq * 2;
    osc2.detune.value = 5;
    gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.015, now + 0.5);
    gain2.gain.linearRampToValueAtTime(0, now + duration * 0.8);

    const f2 = ctx.createBiquadFilter();
    f2.type = 'lowpass';
    f2.frequency.value = 800;

    osc2.connect(f2);
    f2.connect(gain2);
    gain2.connect(panner);

    osc2.start(now);
    osc2.stop(now + duration + 0.2);
  }

  function scheduleBubblePings() {
    function ping() {
      if (!ctx || ctx.state === 'closed') return;
      playBubblePing();
      setTimeout(ping, 4000 + Math.random() * 9000);
    }
    setTimeout(ping, 2000);
  }

  function playBubblePing() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const freq = 600 + Math.random() * 1400;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.frequency.exponentialRampToValueAtTime(freq * 2.5, now + 0.08);

    panner.pan.value = (Math.random() - 0.5) * 0.7;

    gain.gain.value = 0.03;
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(musicGain);

    osc.start(now);
    osc.stop(now + 0.4);
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
