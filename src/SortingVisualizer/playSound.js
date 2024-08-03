let audioCtx = null;

export const playSound = (freq) => {
  if (audioCtx === null) {
    audioCtx = new (AudioContext || window.webkitAudioContext)();
  }
  const duration = 0.1;
  const osc = audioCtx.createOscillator();

  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + duration);

  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
  osc.connect(node);
  node.connect(audioCtx.destination);
};
