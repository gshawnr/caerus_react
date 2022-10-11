import React from "react";
import "./Table.css";
import Row from "./Row";

function Table({ data = [], handleRowClick = null, handleCellClick = null }) {
  const COL_HEADERS = process.env.REACT_APP_LOCAL_TABLE_COLS.split(",");

  const handleColClick = (e) => {
    console.log("Table header clicked", e.target);
  };

  return (
    <table className="tableClass">
      <tbody>
        <tr onClick={handleColClick}>
          {COL_HEADERS.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
        {data.map((thisRow, index) => {
          return (
            <Row
              handleRowClick={() => handleRowClick(thisRow)}
              handleCellClick={() => handleCellClick()}
              key={index}
              rowData={thisRow}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
