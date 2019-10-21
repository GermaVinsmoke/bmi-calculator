import React, { useState, useEffect } from 'react';
import BmiForm from './BmiForm';
import Info from './Info';
import Bar from './Bar';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

const App = () => {
  let initialState = () => JSON.parse(localStorage.getItem('data')) || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const handleChange = val => {
    let heightInM = val.height / 100;
    val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
    let newVal = [...state, val];
    let len = newVal.length;
    if (len > 7) newVal = newVal.slice(1, len);
    setState(newVal);
  };

  const handleDelete = id => {
    localStorage.setItem('lastState', JSON.stringify(state))
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };
  const handleUndo = function() {
      setState(JSON.parse(localStorage.getItem('lastState')));
  }
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
    const date = state.map(obj => obj.date);
    const bmi = state.map(obj => obj.bmi);
    let newData = { date, bmi };
    setData(newData);
  }, [state]);

  return (
    <div className="container">
      <div className="row center">
        <h1 className="white-text"> BMI Tracker </h1>
      </div>
      <div className="row">
        <div className="col m12 s12">
          <BmiForm change={handleChange} />
          <Bar labelData={data.date} bmiData={data.bmi} />
          {state.length > 0 ? (
            <div>
              <div className="row center">
                <h4 className="white-text">7 Day Data</h4>
              </div>
              <div className="data-container row">
                {state.map(info => (
                  <Info
                    key={info.id}
                    id={info.id}
                    weight={info.weight}
                    height={info.height}
                    date={info.date}
                    bmi={info.bmi}
                    deleteCard={handleDelete}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="row center">
                <h4 className="white-text">7 Day Data</h4>
              </div>
              <div className="data-container row">
              <div className="center white-text">No log found</div>
              </div>
            </div>
          )}
          {localStorage.getItem('lastState') !== null ? (
                    <div className="center">
                        <button className="calculate-btn" onClick={handleUndo}>Undo</button>
                    </div>
                ) : ('')}
        </div>
      </div>
    </div>
  );
};

export default App;
