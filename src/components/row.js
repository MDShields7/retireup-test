import React from "react";

// function Row({ year, totalReturn }) {
function Row({ elem }) {
  // console.log('elem', elem)
  const { year, totalReturn } = elem;
  console.log("year", year);
  return (
    <tr>
      <td>{year}</td>
      <td>{totalReturn}</td>
      <td>null</td>
    </tr>
  );
}
export default Row;
