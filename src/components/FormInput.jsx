import "./FormInput.css";

const FormInput = ({
  inputId = null,
  inputClassName = null,
  inputName,
  inputPlaceholder = null,
  inputValue = null,
  inputRequired = false,
  inputType = "text",
  inputOnChangeHandler = null,
}) => {
  return (
    <input
      className={inputClassName ? `form-input ${inputClassName}` : "form-input"}
      id={inputId}
      name={inputName}
      placeholder={inputPlaceholder}
      value={inputValue}
      required={inputRequired}
      type={inputType}
      onChange={inputOnChangeHandler}
    />
  );
};
export default FormInput;
