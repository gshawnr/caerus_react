import React from "react";
import Modal from "./Modal";
import Table from "./Table";

function EditInv({ closeModal, children }) {
  return (
    <Modal title="Update Investment" closeModal={closeModal}>
      <Table data={[children]} />
    </Modal>
  );
}

export default EditInv;
