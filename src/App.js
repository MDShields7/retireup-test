import React, { useState } from 'react';
import Slider, { Range } from 'rc-slider';
import Row from './components/row';
import './App.css';

function App() {
  const testCase = [{"year":2019,"totalReturn":"31.49"}];
  const [years, setYears] = useState(testCase);
  const tableBody = years.map( (elem, index) => 
    <Row elem={elem} key={index}/>
  )
  return (
    <>
    <div className="container">
      <div className="row">
        <h1>S&P 500</h1>
      </div>
    </div>

        <Slider></Slider>

    <div className="container">
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Year's Return</th>
              <th>Cumalative Return</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default App;
