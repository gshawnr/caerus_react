import React, { useState } from "react";
import { pick } from "lodash";

function Row({ rowData, handleRowClick }) {
  const rowObj = pick(
    rowData,
    process.env.REACT_APP_LOCAL_TABLE_COLS.split(",")
  );

  let formattedRow = Object.values(rowObj);
  return (
    <tr onClick={handleRowClick}>
      {formattedRow.map((col, index) => {
        return <th key={index}>{col}</th>;
      })}
    </tr>
  );
}

export default Row;
