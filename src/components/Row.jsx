import React from "react";
import "./Row.css";

function Row({
  columnMap = {},
  rowData,
  handleCellClick,
  onRowClick,
  rowEditable,
}) {
  // get all provided column data
  const formattedRow = Object.keys(columnMap).map((col) => {
    return rowData[col];
  });

  return (
    <tr onClick={onRowClick}>
      {formattedRow.map((col, index) => {
        return (
          <td
            contentEditable={rowEditable}
            key={index}
            onChange={(col) => handleCellClick && handleCellClick(col)}
          >
            {col}
          </td>
        );
      })}
    </tr>
  );
}

export default Row;
