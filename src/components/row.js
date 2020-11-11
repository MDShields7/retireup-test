import React from "react";

function Row({ elem }) {
  const { year, totalReturn, cumulative } = elem;

  const trTextStyle = {
    color: totalReturn < 0 ? "red" : "black"
  };
  const crTextStyle = {
    color: cumulative < 0 ? "red" : "black"
  }

  return (
    <tr>
      <td>{year}</td>
      <td style={trTextStyle} >{totalReturn}</td>
      <td style={crTextStyle} >{cumulative}</td>
    </tr>
  );
}
export default Row;
