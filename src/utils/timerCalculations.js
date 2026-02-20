export const calculateTimeRemaining = (timer) => {
  if (!timer.isRunning || timer.isPaused) {
    return timer.timeRemaining;
  }

  if (!timer.startTime) {
    return timer.timeRemaining;
  }

  const now = Date.now();
  const elapsed = (now - timer.startTime) / 1000;
  const remaining = Math.max(0, timer.duration - elapsed);

  return Math.round(remaining * 10) / 10; // one decimal precision
};

export const isTimerExpired = (timer) => {
  return calculateTimeRemaining(timer) <= 0 && timer.isRunning;
};

export const getTimerStatus = (timer) => {
  if (timer.isRunning) return 'running';
  if (timer.isPaused) return 'paused';
  if (timer.completedAt) return 'completed';
  return 'idle';
};

// Validate timer duration
export const isValidDuration = (duration) => {
  const numDuration = Number(duration);
  return numDuration > 0 && numDuration <= 86400; // 1 second to 24 hours
};

// Convert seconds to minutes and seconds
export const secondsToMinutesSeconds = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { minutes, seconds };
};
