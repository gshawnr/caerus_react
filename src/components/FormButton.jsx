import "./FormButton.css";

const FormButton = ({
  btnId = null,
  btnClassName = null,
  btnType = null,
  btnText = null,
  btnClickHandler = null,
  btnData = null,
}) => {
  return (
    <button
      id={btnId}
      className={btnClassName ? `form-button ${btnClassName}` : "form-button"}
      type={btnType}
      onClick={() => btnClickHandler && btnClickHandler(btnData)}
    >
      {btnText}
    </button>
  );
};

export default FormButton;
