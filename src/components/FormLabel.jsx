const FormLabel = ({ labelFor = null, labelValue = null }) => {
  return <label htmlFor={labelFor}>{labelValue}</label>;
};
export default FormLabel;
