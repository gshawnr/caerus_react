import React from "react";
import "./Table.css";
import Row from "./Row";

function Table({
  headerStr = null,
  data = [],
  totals = {},
  handleRowClick = null,
  handleCellClick = null,
  rowEditable = false,
}) {
  const columnMap = {
    market: "Market",
    ticker: "Ticker",
    targetAllocation: "Target %",
    currentAllocation: "Current %",
    unitPrice: "Unit Price",
    units: "Units",
    value: "Value",
    diffDollars: "Buy / Sell ($)",
    diffUnits: "Buy / Sell (units)",
  };

  const handleColClick = (e) => {
    // to be used for sorting
    console.log("Table header clicked", e.target);
  };

  return (
    <table className="tableClass">
      <tbody>
        <tr onClick={handleColClick}>
          {Object.keys(columnMap).map((col, index) => (
            <th key={index}>{columnMap[col]}</th>
          ))}
        </tr>
        {data.map((thisRow, index) => {
          return (
            <Row
              onRowClick={handleRowClick && (() => handleRowClick(thisRow))}
              handleCellClick={handleCellClick}
              key={index}
              columnMap={columnMap}
              rowData={thisRow}
              rowEditable={rowEditable}
            />
          );
        })}
        {<Row columnMap={columnMap} rowData={totals} />}
      </tbody>
    </table>
  );
}

export default Table;
