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
    let roundedPercent = roundHelper(percent, 2);
    inv.currentAllocation = roundedPercent;

    inv["buy/sell"] = roundHelper(
      portfolioValue * ((inv.targetAllocation - inv.currentAllocation) / 100),
      2
    );

    inv["buy/sell (units)"] = roundHelper(inv["buy/sell"] / inv.unitPrice, 2);
  }

  return { portfolioValue, dataArr };
};

export const investmentFormatter = (inv) => {
  let {
    targetAllocation = null,
    units = null,
    currentAllocation = null,
    unitPrice = null,
  } = inv;

  if (targetAllocation !== null) {
    // assumes percent string to number converstion
    inv.targetAllocation = roundHelper(targetAllocation, 2);
  }
  if (units !== null) {
    inv.units = roundHelper(units, 0);
  }

  if (currentAllocation !== null) {
    inv.currentAllocation = roundHelper(currentAllocation, 2);
  }

  if (unitPrice !== null) {
    inv.unitPrice = roundHelper(unitPrice, 2);
  }

  return inv;
};

const roundHelper = (number, decimals) => {
  number = +number;

  if (!typeof number === "number" || Number.isNaN(number))
    throw new Error("invalid input: ", number);

  return round(number, decimals);
};
