export const playP3RMenuSound = () => {
    const audioContext = new (window.AudioContext)();

    const duration = 0.08; // Un poco más largo para la textura
    const sampleRate = audioContext.sampleRate;
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    // Frecuencias inarmónicas (clave para el sonido de metal/maquinaria)
    const freqs = [120, 290, 480, 1100, 2200];

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        // Decay muy agresivo al principio (ataque) y luego más suave
        const envelope = Math.pow(1 - t / duration, 4);

        let signal = 0;
        freqs.forEach((f, index) => {
            // Añadimos un poco de distorsión por fase
            signal += Math.sin(2 * Math.PI * f * t + Math.sin(t * 50)) * (0.2 / (index + 1));
        });

        data[i] = (signal) * envelope;
    }

    // --- Cadena de Efectos ---
    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Filtro para darle ese tono "oscuro" y tecnológico
    const filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2500;
    filter.Q.value = 0.8;

    // Conexión
    source.connect(filter);
    filter.connect(audioContext.destination);

    source.start(0);
};

export const playP3RStartSound = () => {
    const ctx = new (window.AudioContext)();
    const t = ctx.currentTime;

    // --- CAPA 1: EL IMPACTO (Ruido Percusivo) ---
    // Crea el cuerpo del sonido "crunchy"
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

    // --- CAPA 2: EL BRILLO CRISTALINO (Oscilador Agudo) ---
    // Ese "bling" metálico que caracteriza a Persona
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'square'; // Más suave que square pero con armónicos
    osc.frequency.setValueAtTime(800, t);
    // Un ligero barrido ascendente para el efecto "shimmer"
    osc.frequency.exponentialRampToValueAtTime(1700, t + 0.05);

    oscGain.gain.setValueAtTime(0.15, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    // --- CONEXIONES ---
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // --- EJECUCIÓN ---
    noiseSource.start(t);
    osc.start(t);
    osc.stop(t + 0.2);
    noiseSource.stop(t + 0.1);
};

export const playP3RBackSound = () => {
    const ctx = new (window.AudioContext)();
    const t = ctx.currentTime;

    // --- CAPA 1: EL "DAMP" (Ruido Sordo) ---
    // Usamos un filtro LowPass para que el ruido no brille, sino que sea un golpe seco
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const lowFilter = ctx.createBiquadFilter();
    lowFilter.type = "lowpass";
    lowFilter.frequency.setValueAtTime(1200, t); // Cortamos los agudos

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    // --- CAPA 2: EL TONO DESCENDENTE ---
    // El secreto de "cancelar" es que la nota cae (Pitch Drop)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine'; // Senoidal para que sea más redondo y menos "agresivo"
    osc.frequency.setValueAtTime(600, t);
    // Caída rápida de frecuencia (de 600Hz a 200Hz)
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.1);

    oscGain.gain.setValueAtTime(0.2, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    // --- CONEXIONES ---
    noiseSource.connect(lowFilter);
    lowFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // --- EJECUCIÓN ---
    noiseSource.start(t);
    osc.start(t);
    noiseSource.stop(t + 0.12);
    osc.stop(t + 0.12);
};