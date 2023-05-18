import "./FormLabel.css";

const FormLabel = ({
  labelClassName = null,
  labelFor = null,
  labelValue = null,
}) => {
  return (
    <label
      className={labelClassName ? `form-label ${labelClassName}` : "form-label"}
      htmlFor={labelFor}
    >
      {labelValue}
    </label>
  );
};
export default FormLabel;
