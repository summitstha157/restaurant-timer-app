import './AlertAnimation.css';

function AlertAnimation({ isActive = false }) {
  if (!isActive) {
    return null;
  }

  return <div className="alert-animation alert-animation-active"></div>;
}

export default AlertAnimation;
