import React from "react";
import Slider from "rc-slider";
import "../../node_modules/rc-slider/assets/index.css";
import "./slider.css";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { width: 500, margin: 50 };

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 3000,
      handleMin: null,
      handleMax: null,
    };
  }
  componentDidMount() {
    const { min, max } = this.props;
    let marks = this.calcMarks(min, max);
    this.setState({
      min: min,
      max: max,
      marks: marks,
    });
  }
  componentDidUpdate(prevProps) {
    const { min, max } = this.props;
    let marks = this.calcMarks(min, max);
    if (prevProps !== this.props) {
      this.setState({
        min: min,
        max: max,
        marks: marks,
      });
    }
  }
  calcMarks = (min, max) => {
    let buildMarks = {};
    for (let i = min; i <= max; i++) {
      if (i === min || i % 20 === 0 || i === max) {
        buildMarks[i] = i;
      }
    }
    return buildMarks;
  };
  onSliderChange = (value) => {
    this.props.changeHandles(value);
  };

  render() {
    const { min, max, marks } = this.state;
    return (
      <div>
        <Range
          count={1}
          defaultValue={[min, max]}
          allowCross={false}
          min={min}
          max={max}
          marks={marks}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

const wrapper = (props) => {
  return (
    <div>

      <div style={wrapperStyle}>
        <p>Data Available (by year)</p>
        <DynamicBounds {...props} />
      </div>

    </div>
  );
};

export default wrapper;