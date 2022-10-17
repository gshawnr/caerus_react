import { round } from "lodash";

export const calculateTableData = (dataArr) => {
  let portfolioValue = 0;

  for (let inv of dataArr) {
    const { units, unitPrice } = inv;
    inv.value = roundHelper(units * unitPrice, 2);
    portfolioValue += inv.value;
  }

  for (let inv of dataArr) {
    const { value } = inv;
    let percent = (value / portfolioValue) * 100 || 0;
    let roundedPercent = roundHelper(percent);
    inv.currentAllocation = roundedPercent;

    inv["buy/sell"] = roundHelper(
      portfolioValue * ((inv.targetAllocation - inv.currentAllocation) / 100),
      2
    );
  }

  return dataArr;
};

export const investmentFormatter = (inv) => {
  let {
    targetAllocation = null,
    units = null,
    currentAllocation = null,
    unitPrice = null,
  } = inv;

  if (targetAllocation) {
    // assumes percent string to number converstion
    inv.targetAllocation = roundHelper(targetAllocation, 0);
  }
  if (units) {
    inv.units = roundHelper(units, 0);
  }

  if (currentAllocation) {
    inv.currentAllocation = roundHelper(currentAllocation, 0);
  }

  if (unitPrice) {
    inv.unitPrice = roundHelper(unitPrice, 0);
  }

  return inv;
};

const roundHelper = (number, decimals) => {
  number = +number;

  if (!typeof number === "number" || Number.isNaN(number))
    throw new Error("invalid input: ", number);

  return round(number, decimals);
};
