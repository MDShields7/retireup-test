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
    this.prepData(returns);
  }
  prepData = (data) => {
    console.log("CDM prepData");
    // Prep Data / sort ascending
    var buildYearsData = this.makeYearsData(data);
    // Add Cumulative Column
    var buildCumulative = this.makeCumulative(
      buildYearsData,
      buildYearsData[0].year
    );
    // Set table states
    var buildMin = buildCumulative[0].year;
    var buildMax = buildCumulative[buildYearsData.length - 1].year;
    var buildTableBody = this.makeTableBody(
      buildCumulative,
      buildMin,
      buildMax
    );
    this.setState({
      yearsData: buildYearsData,
      yearsWithCumulative: buildCumulative,
      min: buildMin,
      max: buildMax,
      handleMin: buildMin,
      handleMax: buildMax,
      tableBody: buildTableBody,
    });
  };
  changeHandles = (val) => {
    // Slider handles update table rows & cumulative column
    console.log("new handle values", val);
    const { yearsData, yearsWithCumulative, handleMin } = this.state;
    const handleStart = val[0];
    const handleEnd = val[1];
    if (handleStart !== handleMin) {
      var buildCumulative = this.makeCumulative(yearsData, handleStart);
    }
    var buildTableBody = this.makeTableBody(
      buildCumulative || yearsWithCumulative,
      handleStart,
      handleEnd
    );
    this.setState({
      handleMin: handleStart,
      handleMax: handleEnd,
      tableBody: buildTableBody,
    });
  };
  makeYearsData = (arr) => {
    // Sort ascending
    return arr.sort(function ascending(a, b) {
      return a.year - b.year;
    });
  };
  makeCumulative = (years, begin) => {
    // Add Cumulative Column
    var total = 0;
    var cumulativeYears = years.map((elem, index) => {
      if (elem.year >= begin) {
        total += parseFloat(elem.totalReturn);
        elem.cumulative = total.toFixed(2);
        return elem;
      }
      return undefined;
    });
    cumulativeYears = cumulativeYears.filter((elem) => elem !== undefined);
    return cumulativeYears;
  };
  makeTableBody = (cumulativeArr, begin, end) => {
    const tableBody = cumulativeArr.map((elem, index) => {
      if (elem.year >= begin && elem.year <= end) {
        return <Row elem={elem} key={index} />;
      }
    });
    return tableBody;
  };

  render() {
    const { yearsData, min, max, tableBody } = this.state;
    console.log("App.js, this.state", this.state);
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
              <div>Loading Data</div>
            )}
          </div>
        </div>

        <Table tableBody={tableBody} />
      </>
    );
  }
}

export default App;
