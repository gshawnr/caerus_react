import ReactDOM from "react-dom";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

function FormControl({
  labelValue = null,
  labelFor = null,
  inputId = null,
  inputName = null,
  inputType = null,
  inputPlaceholder = null,
  inputValue = null,
  inputRequired = null,
  inputOnChangeHandler = null,
}) {
  return (
    <div className="controlGroup">
      <FormLabel labelFor={labelFor} labelValue={labelValue} />
      <FormInput
        inputId={inputId}
        inputName={inputName}
        inputPlaceholder={inputPlaceholder}
        inputValue={inputValue}
        inputRequired={inputRequired}
        inputType={inputType}
        inputOnChangeHandler={inputOnChangeHandler}
      />
    </div>
  );
}

export default FormControl;
