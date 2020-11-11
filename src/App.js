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
      min: 0,
      max: 100,
      tableMin: 0,
      tableMax: 100,
      tableBody: null,
    };
  }
  componentDidMount() {
    this.prepData();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   var buildTableBody;
  //   const {tableMin, tableMax} = this.state;
  //   if (
  //     prevState.tableMin !== tableMin &&
  //     prevState.tableMax !== tableMax
  //   ) {
  //     buildTableBody = this.makeTableBody(tableMin, tableMax);
  //       this.setState({
  //         tableBody: buildTableBody,
  //       });
  //   }
  // }
  changeMin(val) {
    console.log("new tableMin value", val);
    const {tableMax} = this.state;
    var buildTableBody;
    buildTableBody = this.makeTableBody(val, tableMax);
    this.setState({
      tableMin: val,
      tableBody: buildTableBody,
    });
  }
  changeMax(val) {
    console.log("new tableMax value", val);
    const {tableMin} = this.state;
    var buildTableBody;
    buildTableBody = this.makeTableBody(tableMin, val);
    this.setState({
      tableMax: val,
      tableBody: buildTableBody,
    });
  }
  prepData = () => {
    // Prep Data / sort ascending
    var years, buildTableBody;
    years = returns.sort(function ascending(a, b) {
      return a.year - b.year;
    });
    // Add Cumulative Column
    var total = 0;
    years = years.map((elem, index) => {
      total += parseFloat(elem.totalReturn);
      elem.cumulative = total.toFixed(2);
      return elem;
    });
    // Sort Descending
    years = years.sort(function descending(a, b) {
      return b.year - a.year;
    });
    let buildMax = years[0].year;
    let buildMin = years[years.length - 1].year;
    buildTableBody = this.makeTableBody(years, buildMin, buildMax);
    this.setState({
      yearsData: years,
      // yearsSelected: years,
      min: buildMin,
      max: buildMax,
      tableMin: buildMin,
      tableMax: buildMax,
      tableBody: buildTableBody,
    });
  };

  makeTableBody = (arr, begin, end) => {
    // console.log('making body')
    // console.log('begin', begin, 'end', end);
    // Make rows
    const tableBody = arr.map((elem, index) => {
      // console.log('elem.year', elem.year)
      if (elem.year >= begin && index <= end) {
        return <Row elem={elem} key={index} />;
      }
    });
    return tableBody;
  };

  render() {
    const { yearsData, min, max, changeMin, changeMax, tableBody } = this.state;
    // console.log('tableBody', tableBody)
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
                changeMin={changeMin}
                changeMax={changeMax}
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
