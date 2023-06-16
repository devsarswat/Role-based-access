import React from 'react';
import { useNavigate } from "react-router-dom";

const DialogBox = (props) => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    props.handleConfirm();
    navigate(props.nevi); 
  };
  return (<>
    <div className="dialog-container" onClick={props.handleClose}>
      <div className="dialog">
        <h2>{props.tital}</h2>
        <p>This is the content of the dialog box.</p>
        <div className="dialog-buttons">
          {/* <button onClick={props.handleClose} >Cancel</button> */}
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DialogBox;
