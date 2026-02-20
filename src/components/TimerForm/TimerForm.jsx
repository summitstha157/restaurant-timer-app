import { useState } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { TIMER_ACTIONS } from '../../context/timerReducer';
import { generateUUID } from '../../utils/uuidGenerator';
import TimePickerSpinner from '../TimePickerSpinner/TimePickerSpinner';
import './TimerForm.css';

function TimerForm() {
  const { dispatch } = useTimerContext();
  const [formData, setFormData] = useState({
    name: '',
    hours: 0,
    minutes: 5,
    seconds: 0,
  });
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
    if (errors.name) {
      setErrors((prev) => ({
        ...prev,
        name: '',
      }));
    }
  };

  const handleHoursChange = (hours) => {
    setFormData((prev) => ({
      ...prev,
      hours,
    }));
  };

  const handleMinutesChange = (minutes) => {
    setFormData((prev) => ({
      ...prev,
      minutes,
    }));
  };

  const handleSecondsChange = (seconds) => {
    setFormData((prev) => ({
      ...prev,
      seconds,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Timer name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Timer name must be 50 characters or less';
    }

    const duration = formData.hours * 3600 + formData.minutes * 60 + formData.seconds;
    if (duration <= 0 || duration > 86400) {
      newErrors.duration = 'Duration must be between 1 second and 24 hours';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new timer
    const newTimer = {
      id: generateUUID(),
      name: formData.name.trim(),
      duration: duration,
      timeRemaining: duration,
      startTime: null,
      isRunning: false,
      isPaused: false,
      pausedTime: null,
      imageData: null,
      imageMetadata: null,
      alertSettings: {
        sound: true,
        vibration: true,
        pulseAnimation: true,
        soundVolume: 0.8,
        vibrationPattern: [100, 100, 100],
      },
      createdAt: Date.now(),
      completedAt: null,
      timesCompleted: 0,
    };

    dispatch({ type: TIMER_ACTIONS.ADD_TIMER, payload: newTimer });

    // Reset form
    setFormData({ name: '', hours: 0, minutes: 5, seconds: 0 });
    setErrors({});
  };

  return (
    <div className="TimerForm">
      <form onSubmit={handleSubmit} className="TimerForm-form">
        <div className="TimerForm-group">
          <label htmlFor="timer-name" className="TimerForm-label">
            Name *
          </label>
          <input
            id="timer-name"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="e.g., Pasta"
            maxLength={50}
            className={`TimerForm-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <span className="TimerForm-error">{errors.name}</span>}
        </div>

        <div className="TimerForm-group">
          <label className="TimerForm-label">Duration *</label>
          <TimePickerSpinner
            hours={formData.hours}
            minutes={formData.minutes}
            seconds={formData.seconds}
            onHoursChange={handleHoursChange}
            onMinutesChange={handleMinutesChange}
            onSecondsChange={handleSecondsChange}
          />
          {errors.duration && <span className="TimerForm-error">{errors.duration}</span>}
        </div>

        <button type="submit" className="TimerForm-submit">
          + Create
        </button>
      </form>
    </div>
  );
}

export default TimerForm;
