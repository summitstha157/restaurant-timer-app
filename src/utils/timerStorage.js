const STORAGE_KEY = 'restaurants-timers';

export const saveTimersToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save timers to localStorage:', error);
  }
};

export const loadTimersFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load timers from localStorage:', error);
    return null;
  }
};

export const clearTimersFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear timers from localStorage:', error);
  }
};

export const getStorageSize = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return new Blob([stored]).size;
    }
    return 0;
  } catch (error) {
    console.error('Failed to get storage size:', error);
    return 0;
  }
};
