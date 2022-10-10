import React, { useState } from "react";
import "./Table.css";
import { pick } from "lodash";
import Row from "./Row";

function Table(props) {
  const COL_HEADERS = process.env.REACT_APP_LOCAL_TABLE_COLS.split(",");

  const handleColClick = (e) => {
    console.log("col clicked", e.target);
  };

  const handleRowClick = (inv) => {
    console.log("Handle row click by investment id", inv);
  };

  return (
    <div className="tableContainer">
      <table>
        <tbody>
          <tr onClick={handleColClick}>
            {COL_HEADERS.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
          {props.data.map((thisRow, index) => {
            return (
              <Row
                handleRowClick={() => handleRowClick(thisRow)}
                key={index}
                rowData={thisRow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
