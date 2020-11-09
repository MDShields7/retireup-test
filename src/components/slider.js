import Slider from "rc-slider";
import '../../node_modules/rc-slider/assets/index.css';
const { Handle, Range } = Slider;

const wrapperStyle = { width: 400, margin: 50 };

export default () => (
    <div>
        <div style={wrapperStyle}>
            <p>Basic Range，`allowCross=false`</p>
            <Range allowCross={false} defaultValue={[0, 20]} />
        </div>
    </div>
);
