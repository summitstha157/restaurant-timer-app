// Action Types
export const TIMER_ACTIONS = {
  ADD_TIMER: 'ADD_TIMER',
  DELETE_TIMER: 'DELETE_TIMER',
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  DECREMENT_ALL_RUNNING: 'DECREMENT_ALL_RUNNING',
  TIMER_COMPLETED: 'TIMER_COMPLETED',
  UPDATE_TIMER_SETTINGS: 'UPDATE_TIMER_SETTINGS',
  UPDATE_TIMER_IMAGE: 'UPDATE_TIMER_IMAGE',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
};

// Initial state
export const initialState = {
  timers: [],
  globalMuted: false,
  soundEnabled: true,
};

// Reducer
export const timerReducer = (state, action) => {
  switch (action.type) {
    case TIMER_ACTIONS.ADD_TIMER:
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };

    case TIMER_ACTIONS.DELETE_TIMER:
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };

    case TIMER_ACTIONS.START_TIMER: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload) {
          return {
            ...timer,
            isRunning: true,
            isPaused: false,
            startTime: Date.now(),
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.PAUSE_TIMER: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload) {
          return {
            ...timer,
            isRunning: false,
            isPaused: true,
            pausedTime: timer.timeRemaining,
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.RESUME_TIMER: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload) {
          return {
            ...timer,
            isRunning: true,
            isPaused: false,
            startTime: Date.now() - (timer.duration - timer.pausedTime) * 1000,
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.RESET_TIMER: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload) {
          return {
            ...timer,
            timeRemaining: timer.duration,
            isRunning: false,
            isPaused: false,
            pausedTime: null,
            startTime: null,
            completedAt: null,
            timesCompleted: 0,
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.DECREMENT_ALL_RUNNING: {
      const now = Date.now();
      const updatedTimers = state.timers.map((timer) => {
        if (timer.isRunning && timer.startTime) {
          const elapsed = (now - timer.startTime) / 1000;
          const timeRemaining = Math.max(0, timer.duration - elapsed);
          return {
            ...timer,
            timeRemaining: Math.round(timeRemaining * 10) / 10, // one decimal precision
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.TIMER_COMPLETED: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload) {
          return {
            ...timer,
            isRunning: false,
            timeRemaining: 0,
            completedAt: Date.now(),
            timesCompleted: (timer.timesCompleted || 0) + 1,
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.UPDATE_TIMER_SETTINGS: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload.id) {
          return {
            ...timer,
            alertSettings: {
              ...timer.alertSettings,
              ...action.payload.settings,
            },
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.UPDATE_TIMER_IMAGE: {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id === action.payload.id) {
          return {
            ...timer,
            imageData: action.payload.imageData,
            imageMetadata: action.payload.imageMetadata,
          };
        }
        return timer;
      });
      return { ...state, timers: updatedTimers };
    }

    case TIMER_ACTIONS.LOAD_FROM_STORAGE:
      return action.payload;

    default:
      return state;
  }
};
