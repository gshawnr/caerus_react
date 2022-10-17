import React, { useState } from "react";
import "./InvestmentForm.css";

function InvestmentForm({
  firstBtnLabel = "Save",
  firstBtnAction = null,
  secondBtnAction = null,
  secondBtnLabel = "Cancel",
  prefilled = {},
  data = {},
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
      <h2>Please complete all fields</h2>

      <div className="controlGroup">
        <label htmlFor="ticker">
          Use link to find required ticker symbol (ie bmo.xtse)
        </label>
        <input
          onChange={onChangeHandler}
          id="ticker"
          name="ticker"
          type="ticker"
          placeholder="Ticker"
          value={investment.ticker}
          required
        />
      </div>

      <div className="controlGroup">
        <label htmlFor="targetAllocation">Please enter percent value (%)</label>
        <input
          id="targetAllocation"
          name="targetAllocation"
          type="text"
          placeholder="Target Allocation"
          value={investment.targetAllocation}
          onChange={onChangeHandler}
          required
        />
      </div>

      <div className="controlGroup">
        <label htmlFor="units">Fractional units not permitted</label>
        <input
          id="units"
          name="units"
          type="text"
          placeholder="Units"
          value={investment.units}
          onChange={onChangeHandler}
          required
        />
      </div>
      <button
        id="form-btn"
        type="button"
        onClick={() => firstBtnAction && firstBtnAction(investment)}
      >
        {firstBtnLabel}
      </button>
      <button
        id="form-btn"
        type="button"
        onClick={() => secondBtnAction && secondBtnAction(investment)}
      >
        {secondBtnLabel}
      </button>
    </form>
  );
}

export default InvestmentForm;
