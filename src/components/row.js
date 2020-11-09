import React from "react";

function Row({ elem }) {
  const { year, totalReturn, cumulative } = elem;

  const textStyle = {
    color: totalReturn < 0 ? "red" : "black",
  };

  return (
    <tr>
      <td>{year}</td>
      <td style={textStyle}>{totalReturn}</td>
      <td>{cumulative}</td>
    </tr>
  );
}
export default Row;
