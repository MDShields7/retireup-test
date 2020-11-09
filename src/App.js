// Components
import React, { useState, useEffect } from "react";
import Slider from "./components/slider";
import Table from "./components/table";
import Row from "./components/row";
// Data
import returns from "./data/s&p-500-returns.json";
// Styles
import "./App.css";

function App() {
  const [yearsData, setYearsData] = useState([]);
  // Prep Data / sort ascending
  var years;
  years = returns.sort(function ascending(a, b) {
    return a.year - b.year;
  });
  // Add Cumulative Column
  var total = 0;
  years.map((elem, index) => {
    total += parseFloat(elem.totalReturn);
    elem.cumulative = total.toFixed(2);
    return elem;
  });
  // Sort Descending
  years.sort(function descending(a, b) {
    return b.year - a.year;
  });
  useEffect(() => {
    setYearsData(years);
  });
  // Make rows
  const tableBody = yearsData.map((elem, index) => (
    <Row elem={elem} key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>S&P 500</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Slider></Slider>
        </div>
      </div>

      <Table tableBody={tableBody} />
    </>
  );
}

export default App;
