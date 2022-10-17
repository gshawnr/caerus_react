import React from "react";
import Modal from "./Modal";
import InvestmentForm from "./InvestmentForm";

function AddInv({ closeModal, addInv }) {
  // const children = [{ ticker: "", targetAllocation: 0, units: 0 }];
  return (
    <Modal title="Add New Investment" closeModal={closeModal}>
      <InvestmentForm
        firstBtnLabel="Add Investment"
        firstBtnAction={addInv}
        secondBtnAction={closeModal}
        cancelHandler={closeModal}
      />
    </Modal>
  );
}

export default AddInv;
