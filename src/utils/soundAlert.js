// Create a singleton AudioContext
let audioContext = null;

const getAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Failed to create AudioContext:', error);
      return null;
    }
  }

  // Resume audio context if suspended (common on user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch((err) => console.warn('Failed to resume audio context:', err));
  }

  return audioContext;
};

// Create and play a beep sound using Web Audio API
export const playTimerBeep = (volume = 0.8, duration = 0.5, frequency = 800) => {
  try {
    const context = getAudioContext();
    if (!context) return false;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Set frequency and type
    oscillator.frequency.value = frequency; // Hz
    oscillator.type = 'sine';

    // Set volume
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

    // Play sound
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);

    return true;
  } catch (error) {
    console.warn('Failed to play beep:', error);
    return false;
  }
};

// Play repeating beeps
export const playRepeatingBeep = (count = 3, interval = 500, volume = 0.8) => {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      playTimerBeep(volume);
    }, i * interval);
  }
};

// Play a custom audio file
export const playAudioFile = async (audioUrl, volume = 0.8) => {
  try {
    const audio = new Audio(audioUrl);
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    await audio.play();
    return true;
  } catch (error) {
    console.warn('Failed to play audio file:', error);
    return false;
  }
};

// Stop all audio playback
export const stopAllAudio = () => {
  // This is more of a cleanup function
  // Note: Individual Audio elements cannot be stopped globally in browsers
  try {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  } catch (error) {
    console.warn('Failed to stop audio:', error);
  }
};
