import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FloatingFAQButton = () => {
  return (
    <div style={floatingButtonStyle}>
      <NavLink to="/faq" className="btn btn-secondary">
        <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
      </NavLink>
    </div>
  );
};

const floatingButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
};

export default FloatingFAQButton;