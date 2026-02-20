import { useState } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { TIMER_ACTIONS } from '../../context/timerReducer';
import { fileToBase64, isValidImageFile, getImageMetadata } from '../../utils/imageProcessing';
import './CameraCapture.css';

function CameraCapture({ timerId, onClose }) {
  const { dispatch } = useTimerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      setError('Please select a valid image file (JPG, PNG, GIF, WebP) under 5MB');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const base64 = await fileToBase64(file);
      setImagePreview(base64);

      // Update timer with new image
      dispatch({
        type: TIMER_ACTIONS.UPDATE_TIMER_IMAGE,
        payload: {
          id: timerId,
          imageData: base64,
          imageMetadata: getImageMetadata(file, 'upload'),
        },
      });

      setIsLoading(false);
      onClose();
    } catch (err) {
      setError('Failed to process image. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="CameraCapture-modal">
      <div className="CameraCapture-content">
        <h2 className="CameraCapture-title">Add Image</h2>

        {error && <div className="CameraCapture-error">{error}</div>}

        <div className="CameraCapture-options">
          <label className="CameraCapture-option">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="CameraCapture-input"
            />
            <span className="CameraCapture-option-content">
              <span className="CameraCapture-icon">📤</span>
              <span className="CameraCapture-option-text">Upload from Gallery</span>
            </span>
          </label>

          {/* Camera capture can be added here with additional implementation */}
        </div>

        {imagePreview && (
          <div className="CameraCapture-preview">
            <p className="CameraCapture-preview-label">Image Preview:</p>
            <img src={imagePreview} alt="Preview" className="CameraCapture-preview-img" />
          </div>
        )}

        <button
          className="CameraCapture-close"
          onClick={onClose}
          disabled={isLoading}
        >
          ✕ Close
        </button>
      </div>
    </div>
  );
}

export default CameraCapture;
