// import ReactDOM from "react-dom";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";

import "./FormControl.css";

function FormControl({
  controlClassName = null,
  labelClassName = null,
  labelValue = null,
  labelFor = null,
  inputId = null,
  inputClassName = null,
  inputName = null,
  inputType = null,
  inputPlaceholder = null,
  inputValue = null,
  inputRequired = null,
  inputOnChangeHandler = null,
}) {
  return (
    <div
      className={
        controlClassName ? `form-control ${controlClassName}` : "form-control"
      }
    >
      <FormLabel
        labelClassName={labelClassName}
        labelFor={labelFor}
        labelValue={labelValue}
      />
      <FormInput
        inputClassName={inputClassName}
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
