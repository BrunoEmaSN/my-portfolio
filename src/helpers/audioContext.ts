/**
 * Short metallic "click" for menu navigation: inharmonic partials with aggressive decay and
 * phase distortion, then highpass filter and gain to match menu level.
 */
export const menuAudioEffect = () => {
    const audioContext = new (window.AudioContext)();

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
    const ctx = new (window.AudioContext)();
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
    const ctx = new (window.AudioContext)();
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
