import React from "react";
import "./Table.css";
import Row from "./Row";

function Table({
  headerStr = null,
  data = [],
  handleRowClick = null,
  handleCellClick = null,
  rowEditable = false,
}) {
  const col_str = headerStr
    ? headerStr
    : process.env.REACT_APP_LOCAL_TABLE_COLS;
  const col_headers = col_str.split(",");

  const handleColClick = (e) => {
    // to be used for sorting
    console.log("Table header clicked", e.target);
  };

  return (
    <table className="tableClass">
      <tbody>
        <tr onClick={handleColClick}>
          {col_headers.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
        {data.map((thisRow, index) => {
          return (
            <Row
              onRowClick={handleRowClick && (() => handleRowClick(thisRow))}
              handleCellClick={handleCellClick}
              key={index}
              colArr={col_headers}
              rowData={thisRow}
              rowEditable={rowEditable}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
