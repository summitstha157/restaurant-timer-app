import { useEffect, useState } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { TIMER_ACTIONS } from '../../context/timerReducer';
import { calculateTimeRemaining } from '../../utils/timerCalculations';
import TimerDisplay from '../TimerDisplay/TimerDisplay';
import TimerControls from '../TimerControls/TimerControls';
import CameraCapture from '../CameraCapture/CameraCapture';
import './TimerCard.css';

function TimerCard({ timer }) {
  const { dispatch } = useTimerContext();
  const [localTimeRemaining, setLocalTimeRemaining] = useState(timer.timeRemaining);
  const [hasTriggeredAlert, setHasTriggeredAlert] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Update display time when timer is running
  useEffect(() => {
    if (timer.isRunning) {
      const timeRemaining = calculateTimeRemaining(timer);
      setLocalTimeRemaining(timeRemaining);

      // Check if timer should be completed
      if (timeRemaining <= 0 && !hasTriggeredAlert) {
        setHasTriggeredAlert(true);
        dispatch({ type: TIMER_ACTIONS.TIMER_COMPLETED, payload: timer.id });
      }
    } else {
      setLocalTimeRemaining(timer.timeRemaining);
      setHasTriggeredAlert(false);
    }
  }, [timer, dispatch, hasTriggeredAlert]);

  const handleDelete = () => {
    if (window.confirm(`Delete timer "${timer.name}"?`)) {
      dispatch({ type: TIMER_ACTIONS.DELETE_TIMER, payload: timer.id });
    }
  };

  const cardClass = `TimerCard ${timer.isRunning ? 'running' : ''} ${
    timer.completedAt ? 'completed' : ''
  }`;

  return (
    <>
      <div className={cardClass}>
        {/* Timer Image */}
        <div className="TimerCard-image-container">
          {timer.imageData ? (
            <>
              <img
                src={timer.imageData}
                alt={timer.name}
                className="TimerCard-image"
              />
              <button
                className="TimerCard-image-edit-btn"
                onClick={() => setShowImageModal(true)}
                title="Change image"
              >
                ✎
              </button>
            </>
          ) : (
            <button
              className="TimerCard-image-placeholder-btn"
              onClick={() => setShowImageModal(true)}
              title="Add image"
            >
              <span className="TimerCard-image-icon">📸</span>
              <span className="TimerCard-image-text">Add Photo</span>
            </button>
          )}
        </div>

        {/* Timer Info */}
        <div className="TimerCard-content">
          <h2 className="TimerCard-name">{timer.name}</h2>

          {/* Timer Display */}
          <TimerDisplay timeRemaining={localTimeRemaining} isRunning={timer.isRunning} />

          {/* Waste Message Animation */}
          {timer.completedAt && (
            <div className="TimerCard-waste-message">WASTE</div>
          )}

          {/* Timer Status */}
          {timer.completedAt && (
            <div className="TimerCard-completed-badge">✓ Completed</div>
          )}
        </div>

        {/* Timer Controls */}
        <TimerControls timer={timer} onDelete={handleDelete} />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <CameraCapture timerId={timer.id} onClose={() => setShowImageModal(false)} />
      )}
    </>
  );
}

export default TimerCard;
