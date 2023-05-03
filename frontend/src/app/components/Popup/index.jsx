import React, { useState } from "react";
import "./Popup.scss";
import { FaCheck } from "react-icons/fa";

const Popup = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    visible && (
      <div className="popup-container">
        <button className="popup-close-button" onClick={handleClose}>
          &times;
        </button>
        <div className="popup-content">
          <div className="popup-icon">
            <div className="popup-icon-circle">
              <FaCheck size={40} color="#3A86FF" />
            </div>
          </div>
          <div className="success">Success!</div>
          <div className="popup-text">{message}</div>
        </div>
      </div>
    )
  );
};

export default Popup;
