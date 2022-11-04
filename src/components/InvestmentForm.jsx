import React, { useState } from "react";
import "./InvestmentForm.css";
import FormControl from "./FormControl";
import FormButton from "./FormButton";
import Footer from "./Footer";

function InvestmentForm({
  formHeader = null,
  firstBtnLabel = "Save",
  firstBtnAction = null,
  secondBtnAction = null,
  secondBtnLabel = "Cancel",
  prefilled = {},
}) {
  const [investment, setInvestment] = useState({
    targetAllocation: prefilled.targetAllocation || "",
    ticker: prefilled.ticker || "",
    units: prefilled.units || "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    setInvestment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form>
      <h2>{formHeader}</h2>
      <FormControl
        controlClassName="investment-form-control"
        labelClassName="investment-form-label"
        labelFor="ticker"
        labelValue="Use link"
        inputClassName="investment-form-input"
        inputId="ticker"
        inputName="ticker"
        inputType="text"
        inputPlaceholder="Ticker"
        inputValue={investment.ticker}
        inputRequired={true}
        inputOnChangeHandler={onChangeHandler}
      />

      <FormControl
        controlClassName="investment-form-control"
        labelClassName="investment-form-label"
        labelFor="targetAllocation"
        labelValue="Please enter percent Value (%)"
        inputId="targeAllocation"
        inputClassName="investment-form-input"
        inputName="targetAllocation"
        inputType="text"
        inputPlaceholder="Target Allocation"
        inputValue={investment.targetAllocation}
        inputRequired={true}
        inputOnChangeHandler={onChangeHandler}
      />

      <FormControl
        controlClassName="investment-form-control"
        labelClassName="investment-form-label"
        labelFor="units"
        labelValue="Fractional units not permitted"
        inputId="units"
        inputClassName="investment-form-input"
        inputName="units"
        inputType="text"
        inputPlaceholder="Units"
        inputValue={investment.units}
        inputRequired={true}
        inputOnChangeHandler={onChangeHandler}
      />
      <FormButton
        btnClassName="investment-form-btn"
        btnType="button"
        btnText={firstBtnLabel}
        btnClickHandler={firstBtnAction}
        btnData={investment}
      />
      <FormButton
        btnClassName="investment-form-btn"
        btnType="button"
        btnText={secondBtnLabel}
        btnClickHandler={secondBtnAction}
        btnData={investment}
      />
    </form>
  );
}

export default InvestmentForm;
