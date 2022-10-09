import React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ closeModal, leftBtn = "Cancel", rightBtn = "Save" }) {
  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="modalCloseBtn">
          <button onClick={() => closeModal()}>
            <CloseIcon />
          </button>
        </div>
        <div className="modalTitle">
          <h2>Title Here</h2>
        </div>
        <div className="modalContent"></div>
        <div className="btns">
          <button onClick={() => closeModal()}>{leftBtn}</button>
          <button onClick={() => closeModal()}>{rightBtn}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
