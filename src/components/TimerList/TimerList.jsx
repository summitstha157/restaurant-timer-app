import { useEffect } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { TIMER_ACTIONS } from '../../context/timerReducer';
import TimerCard from '../TimerCard/TimerCard';
import TimerForm from '../TimerForm/TimerForm';
import './TimerList.css';

function TimerList() {
  const { state, dispatch } = useTimerContext();
  const { timers } = state;

  // Set up the main timer update interval
  useEffect(() => {
    const hasRunningTimers = timers.some((timer) => timer.isRunning);

    if (!hasRunningTimers) {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch({ type: TIMER_ACTIONS.DECREMENT_ALL_RUNNING });
    }, 100); // Update every 100ms

    return () => clearInterval(intervalId);
  }, [timers, dispatch]);

  return (
    <main className="TimerList">
      <div className="TimerList-container">
        <TimerForm />

        {timers.length === 0 ? (
          <div className="TimerList-empty">
            <p>No timers yet. Create your first timer above!</p>
          </div>
        ) : (
          <div className="TimerList-grid">
            {timers.map((timer) => (
              <TimerCard key={timer.id} timer={timer} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default TimerList;
