// Format seconds to MM:SS display format
export const formatTimeDisplay = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
};

// Format time for input fields (e.g., "5:30" for 5 minutes 30 seconds)
export const formatTimeInput = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

// Parse time input like "5:30" or "300" to seconds
export const parseTimeInput = (input) => {
  const trimmed = input.trim();

  // Handle colon-separated format (MM:SS)
  if (trimmed.includes(':')) {
    const [minutesStr, secondsStr] = trimmed.split(':');
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
      return null;
    }

    return minutes * 60 + seconds;
  }

  // Handle plain number format (seconds or minutes)
  const num = parseInt(trimmed, 10);
  if (isNaN(num) || num <= 0) {
    return null;
  }

  // Treat as seconds if less than 3600 (1 hour), otherwise as minutes
  return trimmed.length > 4 ? num : num;
};

// Format date for display
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleString();
};

// Get readable status text
export const getStatusText = (status) => {
  const statusMap = {
    running: 'Running',
    paused: 'Paused',
    completed: 'Completed',
    idle: 'Ready',
  };
  return statusMap[status] || 'Unknown';
};
