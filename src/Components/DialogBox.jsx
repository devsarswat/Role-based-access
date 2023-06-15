import React ,{useState} from 'react'

const DialogBox = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };
  
    const handleConfirm = () => {
      handleClose();
    };

  return (
    <>
        <div>
      <button onClick={handleOpen}>Open Dialog</button>
      {isOpen && (
        <div className="dialog-container">
          <div className="dialog">
            <h2>Dialog Title</h2>
            <p>This is the content of the dialog box.</p>
            <div className="dialog-buttons">
              <button onClick={handleClose}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default DialogBox
