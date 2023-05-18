import Modal from "./Modal";
import "./ErrorModal.css";

const ErrorModal = ({ message, closeErrorModal }) => {
  return (
    <Modal closeModal={closeErrorModal}>
      <h1 className="error-modal">{message}</h1>
    </Modal>
  );
};

export default ErrorModal;
