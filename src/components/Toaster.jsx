import React from 'react';

const Toaster = ({ message, show, onClose, color }) => {
  return (
    <div
      className={`toast text-bg-${color} ${show ? 'show' : 'hide'}`}
      role="alert"
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}
    >
      <div className="toast-body">
        <div className="d-flex gap-4">
          <span><i className="fa-solid fa-circle-check fa-lg"></i></span>
          <div className="d-flex flex-grow-1 align-items-center">
            <span className="fw-semibold">{message}</span>
            <button
              type="button"
              className="btn-close btn-close-white btn-close-sm ms-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toaster;
