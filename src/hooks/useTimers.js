import { useEffect, useCallback } from 'react';
import { useTimerContext } from '../context/TimerContext';
import { TIMER_ACTIONS } from '../context/timerReducer';

export const useTimers = () => {
  const { state, dispatch } = useTimerContext();
  const { timers } = state;

  // Check if any timers are running
  const hasRunningTimers = timers.some((timer) => timer.isRunning);

  // Main interval effect - updates ALL running timers every 100ms
  useEffect(() => {
    if (!hasRunningTimers) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch({ type: TIMER_ACTIONS.DECREMENT_ALL_RUNNING });
    }, 100); // 100ms update rate for smooth display

    return () => clearInterval(intervalId);
  }, [hasRunningTimers, dispatch]);

  // Monitor for timer completion
  useEffect(() => {
    timers.forEach((timer) => {
      if (timer.isRunning && timer.timeRemaining <= 0 && !timer.completedAt) {
        // Timer completed - dispatch completion action
        // This will be handled in the component
      }
    });
  }, [timers]);

  return {
    timers,
    hasRunningTimers,
  };
};
