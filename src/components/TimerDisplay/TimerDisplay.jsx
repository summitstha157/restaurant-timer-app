import { formatTimeDisplay } from '../../utils/formatters';
import './TimerDisplay.css';

function TimerDisplay({ timeRemaining, isRunning }) {
  const displayTime = formatTimeDisplay(timeRemaining);
  const isExpired = timeRemaining === 0;

  return (
    <div className={`TimerDisplay ${isRunning ? 'running' : ''} ${isExpired ? 'expired' : ''}`}>
      <div className="TimerDisplay-time">{displayTime}</div>
      {isRunning && <div className="TimerDisplay-pulse"></div>}
      {isExpired && <div className="TimerDisplay-expired-text">Time's up!</div>}
    </div>
  );
}

export default TimerDisplay;
