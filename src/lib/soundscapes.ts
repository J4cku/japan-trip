export type SoundscapeType =
  | "city"
  | "volcano"
  | "onsen"
  | "cycling"
  | "market"
  | "temple";

export interface Soundscape {
  start(): void;
  stop(): void;
  fadeIn(ms: number): void;
  fadeOut(ms: number): void;
  gainNode: GainNode;
}

/**
 * Map slide index (0-based) to soundscape type.
 * slide 0 = hero, slides 1-14 = days 1-14, slide 15 = closing
 */
export function slideToSoundscape(slideIndex: number): SoundscapeType | null {
  const dayMap: Record<number, SoundscapeType> = {
    1: "city", // Day 1 - Tokyo
    2: "city", // Day 2 - Tokyo
    3: "city", // Day 3 - Tokyo/Kamakura
    4: "volcano", // Day 4 - Mt Fuji area
    5: "volcano", // Day 5 - Kumamoto
    6: "volcano", // Day 6 - Mt Aso
    7: "onsen", // Day 7 - Kurokawa
    8: "cycling", // Day 8 - Shimanami Kaido
    9: "cycling", // Day 9 - Shimanami Kaido
    10: "market", // Day 10 - Osaka
    11: "market", // Day 11 - Osaka
    12: "temple", // Day 12 - Kyoto
    13: "city", // Day 13 - Tokyo
    14: "city", // Day 14 - Tokyo
  };
  return dayMap[slideIndex] ?? null;
}

/** Generate a noise buffer (white, pink, or brown). */
export function createNoiseBuffer(
  ctx: AudioContext,
  duration: number,
  type: "white" | "pink" | "brown"
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  if (type === "white") {
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === "pink") {
    // Paul Kellet's refined method
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    // Brown noise — integrated white noise
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buffer;
}

/** Helper: create a looping noise source with a filter. */
function filteredNoise(
  ctx: AudioContext,
  noiseType: "white" | "pink" | "brown",
  filterType: BiquadFilterType,
  filterFreq: number,
  gain: number,
  masterGain: GainNode
): { source: AudioBufferSourceNode; gainNode: GainNode } {
  const buffer = createNoiseBuffer(ctx, 4, noiseType);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  if (filterType === "bandpass") filter.Q.value = 1;

  const gn = ctx.createGain();
  gn.gain.value = gain;

  source.connect(filter);
  filter.connect(gn);
  gn.connect(masterGain);

  return { source, gainNode: gn };
}

function createCitySoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Brown noise low-pass for traffic hum
  const traffic = filteredNoise(ctx, "brown", "lowpass", 200, 0.15, master);
  // Pink noise band-pass for distant urban texture
  const urban = filteredNoise(ctx, "pink", "bandpass", 800, 0.05, master);

  const sources = [traffic.source, urban.source];

  return {
    gainNode: master,
    start() { sources.forEach((s) => s.start()); },
    stop() { sources.forEach((s) => { try { s.stop(); } catch {} }); },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

function createVolcanoSoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Brown noise low-pass for deep rumble
  const rumble = filteredNoise(ctx, "brown", "lowpass", 100, 0.2, master);

  // Sub-bass oscillator for tectonic rumble
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = 45;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.08;
  osc.connect(oscGain);
  oscGain.connect(master);

  // Wind layer
  const wind = filteredNoise(ctx, "pink", "bandpass", 600, 0.04, master);

  const sources = [rumble.source, wind.source];

  return {
    gainNode: master,
    start() {
      sources.forEach((s) => s.start());
      osc.start();
    },
    stop() {
      sources.forEach((s) => { try { s.stop(); } catch {} });
      try { osc.stop(); } catch {}
    },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

function createOnsenSoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Water texture — pink noise band-pass
  const water = filteredNoise(ctx, "pink", "bandpass", 2000, 0.08, master);

  // Dripping effect — LFO modulating a secondary gain
  const drip = filteredNoise(ctx, "white", "bandpass", 3500, 0.06, master);
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.4; // slow pulse
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.04;
  lfo.connect(lfoGain);
  lfoGain.connect(drip.gainNode.gain);

  // Gentle wind
  const wind = filteredNoise(ctx, "brown", "bandpass", 300, 0.03, master);

  const sources = [water.source, drip.source, wind.source];

  return {
    gainNode: master,
    start() {
      sources.forEach((s) => s.start());
      lfo.start();
    },
    stop() {
      sources.forEach((s) => { try { s.stop(); } catch {} });
      try { lfo.stop(); } catch {}
    },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

function createCyclingSoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Wind rush — pink noise high-pass
  const wind = filteredNoise(ctx, "pink", "highpass", 400, 0.12, master);
  // Waves — brown noise band-pass
  const waves = filteredNoise(ctx, "brown", "bandpass", 200, 0.06, master);

  // Subtle high shimmer for open-air feel
  const shimmer = filteredNoise(ctx, "white", "highpass", 6000, 0.015, master);

  const sources = [wind.source, waves.source, shimmer.source];

  return {
    gainNode: master,
    start() { sources.forEach((s) => s.start()); },
    stop() { sources.forEach((s) => { try { s.stop(); } catch {} }); },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

function createMarketSoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Busy chatter / sizzle — pink noise band-pass
  const chatter = filteredNoise(ctx, "pink", "bandpass", 1200, 0.15, master);
  // Low bustle — brown noise low-pass
  const bustle = filteredNoise(ctx, "brown", "lowpass", 300, 0.08, master);
  // High sizzle texture
  const sizzle = filteredNoise(ctx, "white", "highpass", 5000, 0.02, master);

  const sources = [chatter.source, bustle.source, sizzle.source];

  return {
    gainNode: master,
    start() { sources.forEach((s) => s.start()); },
    stop() { sources.forEach((s) => { try { s.stop(); } catch {} }); },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

function createTempleSoundscape(ctx: AudioContext): Soundscape {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Ambient air — pink noise high-pass, very quiet
  const air = filteredNoise(ctx, "pink", "highpass", 3000, 0.03, master);

  // Gentle wind layer
  const wind = filteredNoise(ctx, "brown", "bandpass", 400, 0.025, master);

  const sources = [air.source, wind.source];

  // Temple bell — periodic sine wave with decay
  let bellInterval: ReturnType<typeof setInterval> | null = null;
  let bellOscillators: OscillatorNode[] = [];

  function ringBell() {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 180;
    const bellGain = ctx.createGain();
    bellGain.gain.setValueAtTime(0.12, ctx.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
    osc.connect(bellGain);
    bellGain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 4);
    bellOscillators.push(osc);
    // Second harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 360;
    const bellGain2 = ctx.createGain();
    bellGain2.gain.setValueAtTime(0.04, ctx.currentTime);
    bellGain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
    osc2.connect(bellGain2);
    bellGain2.connect(master);
    osc2.start();
    osc2.stop(ctx.currentTime + 3);
    bellOscillators.push(osc2);
  }

  return {
    gainNode: master,
    start() {
      sources.forEach((s) => s.start());
      // Ring bell immediately, then every 8 seconds
      ringBell();
      bellInterval = setInterval(ringBell, 8000);
    },
    stop() {
      sources.forEach((s) => { try { s.stop(); } catch {} });
      bellOscillators.forEach((o) => { try { o.stop(); } catch {} });
      bellOscillators = [];
      if (bellInterval) {
        clearInterval(bellInterval);
        bellInterval = null;
      }
    },
    fadeIn(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(1, ctx.currentTime + ms / 1000);
    },
    fadeOut(ms) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + ms / 1000);
    },
  };
}

/** Create a soundscape audio graph of the given type. */
export function createSoundscape(
  ctx: AudioContext,
  type: SoundscapeType
): Soundscape {
  switch (type) {
    case "city":
      return createCitySoundscape(ctx);
    case "volcano":
      return createVolcanoSoundscape(ctx);
    case "onsen":
      return createOnsenSoundscape(ctx);
    case "cycling":
      return createCyclingSoundscape(ctx);
    case "market":
      return createMarketSoundscape(ctx);
    case "temple":
      return createTempleSoundscape(ctx);
  }
}
