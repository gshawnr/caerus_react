import React from "react";
import Modal from "./Modal";
import Table from "./Table";

function AddInv({ closeModal, children = [] }) {
  return (
    <Modal title="Add New Investment" closeModal={closeModal}>
      <Table data={children} />
    </Modal>
  );
}

export default AddInv;
