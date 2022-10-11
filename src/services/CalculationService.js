export const calculateTableData = (dataArr) => {
  let portfolioValue = 0;

  for (let inv of dataArr) {
    const { units, unitPrice } = inv;
    inv.value = units * unitPrice || null;
    portfolioValue += inv.value;
  }

  for (let inv of dataArr) {
    const { value, targetAllocation } = inv;
    inv.currentAllocation = Number((value / portfolioValue).toFixed(2));
    inv["buy/sell"] = Number(
      (portfolioValue * targetAllocation - value).toFixed(2)
    );
  }

  return dataArr;
};
