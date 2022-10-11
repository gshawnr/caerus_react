import React from "react";

function Row({ rowData, handleRowClick }) {
  const colArr = process.env.REACT_APP_LOCAL_TABLE_COLS.split(",");

  const formattedRow = colArr.map((col) => {
    if (col === "value") {
      return rowData.units * rowData.unitPrice || null;
    }
    return rowData[col] || null;
  });

  return (
    <tr onClick={handleRowClick}>
      {formattedRow.map((col, index) => {
        return <td key={index}>{col}</td>;
      })}
    </tr>
  );
}

export default Row;
