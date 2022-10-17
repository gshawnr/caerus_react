import React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import Table from "./Table";

function Modal({
  closeModal,
  leftBtn = "Cancel",
  rightBtn = "Save",
  children = <h1>Default Content</h1>,
  title = "title",
  data = [],
}) {
  return (
    <div className="modal">
      <div className="modalContainer">
        {/* <div className="modalCloseBtn"> */}
        {
          <button className="modalCloseBtn" onClick={() => closeModal()}>
            <CloseIcon />
          </button>
        }
        {/* </div> */}
        <div className="modalTitle">
          <h2>{title}</h2>
        </div>
        <div className="modalContent">{children}</div>
        {/* <div className="btns"> */}
        {/* <button onClick={() => closeModal()}>{leftBtn}</button> */}
        {/* <button onClick={() => closeModal()}>{rightBtn}</button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Modal;
