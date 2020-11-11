// Components
import React, { useState, useEffect } from "react";
import SliderWrapper from "./components/slider";
import Table from "./components/table";
import Row from "./components/row";
// Data
import returns from "./data/s&p-500-returns.json";
// Styles
import "./App.css";

function App() {
  const [yearsData, setYearsData] = useState([]);
  const [min, setMin] = useState(25);
  const [max, setMax] = useState(50);
  const [sliderMin, setSliderMin] = useState([]);
  const [sliderMax, setSliderMax] = useState([]);
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
  let myMax = years[0].year;
  let myMin = years[years.length-1].year;
  // console.log('max', myMax)
  // console.log('min', myMin)
  // console.log('typeof max',typeof  myMax)
  // console.log('typeof min',typeof  myMin)
  useEffect(() => {
    setYearsData(years);
    setMax(myMax);
    setMin(myMin);
  });
  // Make rows
  const tableBody = yearsData.map((elem, index) => (
    <Row elem={elem} key={index} />
  ));
  useEffect(() => {

  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>S&P 500</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
  { yearsData.length > 0 ? <SliderWrapper min={min} max={max} ></SliderWrapper> : <div/> }
        </div>
      </div>

      <Table tableBody={tableBody} />
    </>
  );
}

export default App;
