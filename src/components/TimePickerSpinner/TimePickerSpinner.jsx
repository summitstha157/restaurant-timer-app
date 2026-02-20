import './TimePickerSpinner.css';

function TimePickerSpinner({ hours, minutes, seconds, onHoursChange, onMinutesChange, onSecondsChange }) {
  const handleHoursIncrease = () => {
    onHoursChange(Math.min(hours + 1, 24));
  };

  const handleHoursDecrease = () => {
    onHoursChange(Math.max(hours - 1, 0));
  };

  const handleMinutesIncrease = () => {
    onMinutesChange(Math.min(minutes + 1, 60));
  };

  const handleMinutesDecrease = () => {
    onMinutesChange(Math.max(minutes - 1, 0));
  };

  const handleSecondsIncrease = () => {
    if (seconds + 10 >= 60) {
      onSecondsChange(0);
      onMinutesChange(Math.min(minutes + 1, 60));
    } else {
      onSecondsChange(seconds + 10);
    }
  };

  const handleSecondsDecrease = () => {
    if (seconds - 10 < 0) {
      onSecondsChange(50);
      onMinutesChange(Math.max(minutes - 1, 0));
    } else {
      onSecondsChange(seconds - 10);
    }
  };

  return (
    <div className="TimePickerSpinner">
      <div className="TimePickerSpinner-group">
        <label className="TimePickerSpinner-label">HRS</label>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleHoursIncrease}
          title="Increase hours"
        >
          ▲
        </button>
        <div className="TimePickerSpinner-display">
          {String(hours).padStart(2, '0')}
        </div>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleHoursDecrease}
          title="Decrease hours"
        >
          ▼
        </button>
      </div>

      <div className="TimePickerSpinner-separator">:</div>

      <div className="TimePickerSpinner-group">
        <label className="TimePickerSpinner-label">MIN</label>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleMinutesIncrease}
          title="Increase minutes"
        >
          ▲
        </button>
        <div className="TimePickerSpinner-display">
          {String(minutes).padStart(2, '0')}
        </div>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleMinutesDecrease}
          title="Decrease minutes"
        >
          ▼
        </button>
      </div>

      <div className="TimePickerSpinner-separator">:</div>

      <div className="TimePickerSpinner-group">
        <label className="TimePickerSpinner-label">SEC</label>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleSecondsIncrease}
          title="Increase seconds by 10"
        >
          ▲
        </button>
        <div className="TimePickerSpinner-display">
          {String(seconds).padStart(2, '0')}
        </div>
        <button
          className="TimePickerSpinner-btn"
          onClick={handleSecondsDecrease}
          title="Decrease seconds by 10"
        >
          ▼
        </button>
      </div>
    </div>
  );
}

export default TimePickerSpinner;
