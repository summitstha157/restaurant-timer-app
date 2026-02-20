import { useTimerContext } from '../../context/TimerContext';
import { TIMER_ACTIONS } from '../../context/timerReducer';
import './TimerControls.css';

function TimerControls({ timer, onDelete }) {
  const { dispatch } = useTimerContext();

  const handleStart = () => {
    dispatch({ type: TIMER_ACTIONS.START_TIMER, payload: timer.id });
  };

  const handlePause = () => {
    dispatch({ type: TIMER_ACTIONS.PAUSE_TIMER, payload: timer.id });
  };

  const handleResume = () => {
    dispatch({ type: TIMER_ACTIONS.RESUME_TIMER, payload: timer.id });
  };

  const handleReset = () => {
    dispatch({ type: TIMER_ACTIONS.RESET_TIMER, payload: timer.id });
  };

  return (
    <div className="TimerControls">
      {!timer.isRunning && !timer.isPaused && (
        <button className="TimerControls-btn primary" onClick={handleStart} title="Start timer">
          ▶ Start
        </button>
      )}

      {timer.isRunning && (
        <button className="TimerControls-btn secondary" onClick={handlePause} title="Pause timer">
          ⏸ Pause
        </button>
      )}

      {timer.isPaused && (
        <button className="TimerControls-btn primary" onClick={handleResume} title="Resume timer">
          ▶ Resume
        </button>
      )}

      {(timer.isRunning || timer.isPaused || timer.completedAt) && (
        <button className="TimerControls-btn secondary" onClick={handleReset} title="Reset timer">
          ↻ Reset
        </button>
      )}

      <button className="TimerControls-btn danger" onClick={onDelete} title="Delete timer">
        🗑 Delete
      </button>
    </div>
  );
}

export default TimerControls;
