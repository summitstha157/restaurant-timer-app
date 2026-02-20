import { useState, useEffect } from 'react';
import './App.css';
import { TimerProvider, useTimerContext } from './context/TimerContext';
import TimerList from './components/TimerList/TimerList';
import Header from './components/Header/Header';
import AlertAnimation from './components/AlertAnimation/AlertAnimation';
import { useTimerAlert } from './hooks/useTimerAlert';

// Alert handler component - monitors timers for completion
function AlertHandler() {
  const { state } = useTimerContext();
  const { triggerAlerts, isAlertActive } = useTimerAlert();
  const [lastCompletedId, setLastCompletedId] = useState(null);

  // Monitor for newly completed timers
  useEffect(() => {
    state.timers.forEach((timer) => {
      // Check if timer just completed
      if (
        timer.completedAt &&
        timer.id !== lastCompletedId &&
        timer.timesCompleted === 1 // First completion
      ) {
        setLastCompletedId(timer.id);
        triggerAlerts(timer.alertSettings);
      }
    });
  }, [state.timers, lastCompletedId, triggerAlerts]);

  return <AlertAnimation isActive={isAlertActive} />;
}

function AppContent() {
  return (
    <>
      <div className="App">
        <Header />
        <TimerList />
      </div>
      <AlertHandler />
    </>
  );
}

function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

export default App;
