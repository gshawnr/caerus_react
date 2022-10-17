import React from "react";
import Modal from "./Modal";
import InvestmentForm from "./InvestmentForm";

function EditInv({ closeModal, children, deleteInv, onEdit }) {
  return (
    <Modal title="Update Investment" closeModal={closeModal}>
      <InvestmentForm
        cancelHandler={closeModal}
        prefilled={children}
        firstBtnLabel="Update Investment"
        firstBtnAction={onEdit}
        secondBtnLabel="Delete Investment"
        secondBtnAction={deleteInv}
      />
    </Modal>
  );
}

export default EditInv;
