const FormInput = ({
  inputId,
  inputName,
  inputPlaceholder,
  inputValue,
  inputRequired,
  inputType,
  inputOnChangeHandler,
}) => {
  return (
    <input
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
