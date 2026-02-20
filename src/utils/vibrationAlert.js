// Trigger device vibration
export const vibrate = (pattern = [100, 100, 100]) => {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
      return true;
    } catch (error) {
      console.warn('Vibration failed:', error);
      return false;
    }
  }
  return false;
};

// Stop vibration
export const stopVibration = () => {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(0);
      return true;
    } catch (error) {
      console.warn('Failed to stop vibration:', error);
      return false;
    }
  }
  return false;
};

// Vibration pattern presets
export const VIBRATION_PATTERNS = {
  single: [200],
  double: [100, 100, 100],
  triple: [100, 100, 100, 100, 100],
  pulse: [50, 50, 50, 50, 50],
  longBurst: [500],
};

// Check if device supports vibration
export const isVibrationSupported = () => {
  return 'vibrate' in navigator;
};
