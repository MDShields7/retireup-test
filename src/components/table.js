import React from "react";

function Table({ tableBody }) {
    
  return (
    <div className="container">
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Return</th>
              <th>Cumulative Return</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;