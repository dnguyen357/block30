import React, { useState, useEffect } from 'react';
import './Notification.css'; // Import your Notification component styles

function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Hide the notification after a certain time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`notification ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  );
}

export default Notification;
