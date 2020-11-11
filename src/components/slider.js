import React, { useState, useEffect } from "react";
import Slider, {Range} from "rc-slider";
import "../../node_modules/rc-slider/assets/index.css";
import "./slider.css"
// const { Handle, Range } = Slider;

const wrapperStyle = { width: 500, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 3000,
    };
  }
  componentDidMount() {
    const { min, max } = this.props.props;
    let marks = this.calcMarks(min, max)
    this.setState({
      min: min,
      max: max,
      marks: marks
    });
  }
  componentDidUpdate(prevProps) {
    const { min, max } = this.props.props;
    let marks = this.calcMarks(min, max)
    if (prevProps !== this.props) {
      this.setState({
        min: min,
        max: max,
        marks: marks
      });
    }
  }
  calcMarks = (min, max) => {
    let buildMarks = {}
    // const { min, max, mark } = this.state;
    for ( let i = min; i <= max; i++){
      if ( i === min || i % 20 === 0 || i === max ){
        buildMarks[i] = i;
      }
    }
    return buildMarks;
  }
  onSliderChange = (value) => {
    log(value);
  };

  // onMinChange = (e) => {
  //   this.setState({
  //     min: +e.target.value || this.state.min,
  //   });
  //   const { changeMin, changeMax } = this.props.props;
  //   changeMin(e.target.value || this.state.min);
  // };

  // onMaxChange = (e) => {
  //   this.setState({
  //     max: +e.target.value || this.state.max,
  //   });
  //   const { changeMin, changeMax } = this.props.props;
  //   changeMax(e.target.value || this.state.mac);
  // };


  render() {
    const { min, max, marks } = this.state;
    const defaultVals = [min, max];
    // const defaultVals = [max, min];
    console.log('defaultVals', defaultVals);
    console.log("DynamicBounds min", min);
    console.log("DynamicBounds max", max);
    console.log("DynamicBounds marks", marks);
    return (
      <div>
        <Range
          count={1}
          defaultValue={[min, max]}
          allowCross={false}
          // step={10} dots
          min={min}
          max={max}
          marks={marks}
          onChange={this.onSliderChange}
          // onLoad={log(`Range loaded, min: ${min} max, ${max}`)}
        />
      </div>
    );
  }
}

export default (props) => {
  const [min, setMin] = useState([]);
  const [max, setMax] = useState([]);
  console.log("wrapper props", props);
  return (
    <div>
      <div style={wrapperStyle}>
        <p>Dynamic Range</p>
        <DynamicBounds props={props} />
      </div>

      {/* <div style={wrapperStyle}>
        <p>Basic Range，`allowCross=false`</p>
        <Range
          // props={props}
          allowCross={false}
          min={min}
          max={max}
          // marks={{ min: `${min}`, max: `${max}` }}
          onChange={log}
        />
      </div> */}
    </div>
  );
};
