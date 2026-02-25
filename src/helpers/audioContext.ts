/** Shared context for sounds that can fire many times (e.g. keyboard). One context, many sources. */
let sharedContext: AudioContext | null = null;

function getSharedContext(): AudioContext {
    if (!sharedContext) {
        sharedContext = new (window.AudioContext)();
    }
    return sharedContext;
}

/**
 * Keyboard click: same metallic family as menu (inharmonic partials + phase distortion + highpass)
 * but shorter and brighter so it feels like a quick tap. Safe to call many times in parallel.
 */
export const keyboardAudioEffect = () => {
    const ctx = getSharedContext();
    const duration = 0.035;
    const sampleRate = ctx.sampleRate;
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = ctx.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    // Mismas freqs que el menú pero ligeramente desplazadas hacia arriba + más agudos para diferenciar
    const freqs = [180, 360, 620, 1400, 2800];

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.pow(1 - t / duration, 5);

        let signal = 0;
        freqs.forEach((f, index) => {
            signal += Math.sin(2 * Math.PI * f * t + Math.sin(t * 80)) * (0.18 / (index + 1));
        });

        data[i] = signal * envelope;
    }

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1000;
    filter.Q.value = 0.9;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 3.2;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(0);
};

/**
 * Confirm: same family as start (noise body + square sweep) but shorter and more grave.
 * Safe to call many times in parallel.
 */
export const confirmAudioEffect = () => {
    const ctx = getSharedContext();
    const t = ctx.currentTime;

    const noiseDuration = 0.1;
    const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * noiseDuration), ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1000, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(80, t + noiseDuration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.28, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(380, t);
    osc.frequency.exponentialRampToValueAtTime(820, t + 0.04);

    oscGain.gain.setValueAtTime(0.18, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noiseSource.start(t);
    osc.start(t);
    noiseSource.stop(t + noiseDuration);
    osc.stop(t + 0.1);
};

/**
 * Short metallic "click" for menu navigation: inharmonic partials with aggressive decay and
 * phase distortion, then highpass filter and gain to match menu level.
 */
export const menuAudioEffect = () => {
    const audioContext = getSharedContext();

    const duration = 0.08;
    const sampleRate = audioContext.sampleRate;
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    const freqs = [120, 290, 480, 1100, 2200];

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const envelope = Math.pow(1 - t / duration, 4);

        let signal = 0;
        freqs.forEach((f, index) => {
            signal += Math.sin(2 * Math.PI * f * t + Math.sin(t * 50)) * (0.2 / (index + 1));
        });

        data[i] = (signal) * envelope;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    const filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2500;
    filter.Q.value = 0.8;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 4;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(0);
};

/**
 * "Confirm" sound: percussive noise body (lowpass, fast decay) plus bright square oscillator
 * with upward frequency sweep for a metallic shimmer; both layers start together.
 */
export const startAudioEffect = () => {
    const ctx = getSharedContext();
    const t = ctx.currentTime;

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(3000, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(100, t + 0.2);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1700, t + 0.05);

    oscGain.gain.setValueAtTime(0.15, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noiseSource.start(t);
    osc.start(t);
    osc.stop(t + 0.2);
    noiseSource.stop(t + 0.1);
};

/**
 * "Back/cancel" sound: damp noise (lowpass) plus sine with pitch drop (600Hz to 200Hz) for
 * a soft "cancel" feel; both layers decay together.
 */
export const backAudioEffect = () => {
    const ctx = getSharedContext();
    const t = ctx.currentTime;

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const lowFilter = ctx.createBiquadFilter();
    lowFilter.type = "lowpass";
    lowFilter.frequency.setValueAtTime(1200, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.1);

    oscGain.gain.setValueAtTime(0.2, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    noiseSource.connect(lowFilter);
    lowFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noiseSource.start(t);
    osc.start(t);
    noiseSource.stop(t + 0.12);
    osc.stop(t + 0.12);
};

