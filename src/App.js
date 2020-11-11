// Components
import React from "react";
import SliderWrapper from "./components/slider";
import Table from "./components/table";
import Row from "./components/row";
// Data
import returns from "./data/s&p-500-returns.json";
// Styles
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearsData: [],
      yearsWithCumulative: [],
      min: 0,
      max: 100,
      handleMin: 0,
      handleMax: 100,
      tableBody: null,
    };
  }
  componentDidMount() {
    this.prepData();
  }
  changeHandles = (val) => {
    const { yearsData, handleMin } = this.state;
    const handleStart = val[0];
    const handleEnd = val[1];
    console.log("new handle values", val);
    if (handleStart !== handleMin) {
      var buildCumulative = this.makeCumulative(yearsData, handleStart);
      var buildTableBody = this.makeTableBody(handleStart, handleEnd);
      this.setState({
        handleMin: handleStart,
        handleMax: handleEnd,
        tableBody: buildTableBody,
      });
    } else {
      var buildTableBody = this.makeTableBody(handleStart, handleEnd);
      this.setState({
        handleMin: handleStart,
        handleMax: val[1],
        tableBody: buildTableBody,
      });
    }
  };
  prepData = () => {
    // Prep Data / sort ascending
    var buildYears = this.makeYearsData();
    // Add Cumulative Column
    var buildCumulative = this.makeCumulative(buildYears, buildYears[0].year);
    // Set table states
    var buildMax = buildCumulative[0].year;
    var buildMin = buildCumulative[buildYears.length - 1].year;
    var buildTableBody = this.makeTableBody(buildMin, buildMax);
    this.setState({
      yearsData: buildYears,
      yearsWithCumulative: buildCumulative,
      min: buildMin,
      max: buildMax,
      handleMin: buildMin,
      handleMax: buildMax,
      tableBody: buildTableBody,
    });
  };
  makeYearsData = () => {
    // Sort ascending
    return returns.sort(function ascending(a, b) {
      return a.year - b.year;
    });
  }
  makeCumulative = (years, begin) => {
    var total = 0;
    // Add Cumulative Column
    var newYears = years.map((elem, index) => {
      if (elem.year >= begin) {
        total += parseFloat(elem.totalReturn);
        elem.cumulative = total.toFixed(2);
        return elem;
      }
    });
    // Sort Descending
    return newYears.sort(function descending(a, b) {
      return b.year - a.year;
    });
  };
  makeTableBody = (begin, end) => {
    const { yearsWithCumulative } = this.state;
    const tableBody = yearsWithCumulative.map((elem, index) => {
      if (elem.year >= begin && elem.year <= end) {
        return <Row elem={elem} key={index} />;
      }
    });
    return tableBody;
  };

  render() {
    const { yearsData, min, max, tableBody } = this.state;
    // console.log("App.js, this.state", this.state);
    return (
      <>
        <div className="container">
          <div className="row">
            <h1>S&P 500</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {yearsData.length > 0 ? (
              <SliderWrapper
                min={min}
                max={max}
                changeHandles={this.changeHandles}
              ></SliderWrapper>
            ) : (
              <div />
            )}
          </div>
        </div>

        <Table tableBody={tableBody} />
      </>
    );
  }
}

export default App;
