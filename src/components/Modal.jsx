import React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ closeModal, children }) {
  return (
    <div className="modal">
      <div className="modalContainer">
        <button className="modalCloseBtn" onClick={() => closeModal()}>
          {<CloseIcon />}
        </button>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
