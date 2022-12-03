import _ from "lodash";

export default class Portfolio {
  constructor(investments) {
    this.rawData = investments;
    this.initialize();
  }

  initialize() {
    let totalCurrentAllocation = 0;
    let totalTargetAllocation = 0;

    // total portfolio value is required before other calcs can be completed
    this.portfolioValue = this.getPortfolioValue();

    this.updatedData = this.rawData.map((thisInv) => {
      let inv = { ...thisInv };
      const { unitPrice, units } = inv;

      // asset value
      inv.value = this.round(units * unitPrice, 2);

      // asset allocation
      inv.currentAllocation = this.round(
        (inv.value / this.portfolioValue) * 100,
        1
      );
      totalCurrentAllocation += inv.currentAllocation;
      totalTargetAllocation += inv.targetAllocation;

      // buy / sell
      inv.diffDollars = this.round(
        (inv.targetAllocation * this.portfolioValue) / 100 - inv.value,
        2
      );

      inv.diffUnits = this.round(inv.diffDollars / inv.unitPrice, 0);

      return inv;
    });

    // set instance member values
    this.totalCurrentAllocation = this.round(totalCurrentAllocation, 0);
    this.totalTargetAllocation = this.round(totalTargetAllocation, 1);
  }

  getPortfolioValue() {
    let totalPortfolio = 0;
    for (let inv of this.rawData) {
      totalPortfolio += inv.unitPrice * inv.units;
    }
    return this.round(totalPortfolio, 2);
  }

  round(value, decimals) {
    value = +value;

    if (!typeof value === "number" || Number.isNaN(value))
      throw new Error("invalid input: ", value);

    return _.round(value, decimals);
  }
}
