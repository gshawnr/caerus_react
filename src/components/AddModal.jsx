import React from "react";
import Modal from "./Modal";
import InvestmentForm from "./InvestmentForm";

function AddInv({ closeModal, addInv }) {
  return (
    <Modal closeModal={closeModal}>
      <InvestmentForm
        formHeader="Please complete all fields"
        firstBtnLabel="Add Investment"
        firstBtnAction={addInv}
        secondBtnAction={closeModal}
        cancelHandler={closeModal}
      />
    </Modal>
  );
}

export default AddInv;
