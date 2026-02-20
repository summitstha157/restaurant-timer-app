import { useState, useCallback } from 'react';
import { playRepeatingBeep } from '../utils/soundAlert';
import { vibrate } from '../utils/vibrationAlert';

export const useTimerAlert = () => {
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Trigger all alerts simultaneously
  const triggerAlerts = useCallback(
    (alertSettings = {
      sound: true,
      vibration: true,
      pulseAnimation: true,
      soundVolume: 0.8,
      vibrationPattern: [100, 100, 100],
    }) => {
      // Visual pulse animation
      if (alertSettings.pulseAnimation) {
        setIsAlertActive(true);
        // Auto disable after 1 second
        setTimeout(() => setIsAlertActive(false), 1000);
      }

      // Sound alert
      if (alertSettings.sound) {
        playRepeatingBeep(3, 300, alertSettings.soundVolume || 0.8);
      }

      // Vibration alert
      if (alertSettings.vibration) {
        vibrate(alertSettings.vibrationPattern || [100, 100, 100]);
      }
    },
    []
  );

  return {
    triggerAlerts,
    isAlertActive,
  };
};
