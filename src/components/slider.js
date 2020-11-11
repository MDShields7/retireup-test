import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "../../node_modules/rc-slider/assets/index.css";
const { Handle, Range } = Slider;

const wrapperStyle = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
    };
  }
  componentDidMount() {
    const { min, max } = this.props.props;
    this.setState({
      min: min,
      max: max,
    });
  }
  componentDidUpdate(prevProps) {
    const { min, max } = this.props.props;
    if (prevProps !== this.props) {
      this.setState({
        min: min,
        max: max,
      });
    }
  }
  onSliderChange = (value) => {
    log(value);
  };

  onMinChange = (e) => {
    this.setState({
      min: +e.target.value || this.state.min,
    });
  };

  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || this.state.max,
    });
  };

  render() {
    const { min, max } = this.state;
    // console.log("DynamicBounds state", this.state);
    console.log("DynamicBounds min", min);
    console.log("DynamicBounds max", max);
    var marks = {}
    marks[min] = min;
    marks[max] = max;
    const defaultVals = [min, max]
    return (
      <div>
        <Range
          defaultValue={defaultVals}
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
