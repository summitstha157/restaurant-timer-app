import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { timerReducer, initialState, TIMER_ACTIONS } from './timerReducer';
import { loadTimersFromStorage, saveTimersToStorage } from '../utils/timerStorage';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const storedState = loadTimersFromStorage();
    if (storedState) {
      dispatch({ type: TIMER_ACTIONS.LOAD_FROM_STORAGE, payload: storedState });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveTimersToStorage(state);
  }, [state]);

  const value = {
    state,
    dispatch,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};
