import React from 'react';
import { useNavigate } from "react-router-dom";

const DialogBox = (props) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    props.handleConfirm();
    navigate(props.nevi);
  };

  const handleClose = () => {
    props.handleClose();
    // navigate(props.nevi);
  };

  return (
    <div className="dialog-container" onClick={handleClose}>
      <div className="dialog">
        <h2>{props.tital}</h2>
        <p>This is the content of the dialog box.</p>
        <div className="dialog-buttons">
        {props.tital==="Try Again" && <button onClick={handleClose} >Cancel</button>}
        {props.tital===props.tital && <button onClick={handleConfirm}>Confirm</button>} 
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
