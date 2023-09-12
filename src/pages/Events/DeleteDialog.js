import React from "react";
import PropTypes from "prop-types";
import "./Delete.css";

const DeleteDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <div className={`custom-dialog ${open ? "open" : ""}`}>
      <div className="custom-dialog-content">
        <p className="message">{message}</p>
        <div className="custom-dialog-actions">
          <button onClick={onClose}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default DeleteDialog;
