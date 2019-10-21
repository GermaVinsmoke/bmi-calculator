import React, { useState } from 'react';
import './App.css';
const uuidv1 = require('uuid/v4');

const BmiForm = ({ change }) => {
  const [state, setState] = useState({
    weight: '',
    height: '',
    date: ''
  });

  const handleChange = e => {
    const date = new Date().toLocaleString().split(',')[0];
    setState({
      ...state,
      [e.target.name]: e.target.value,
      date
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.weight === '' || state.height === '') return;
    setState({
      ...state,
      id:uuidv1()
    });
    change(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col m6 s12">
          <label htmlFor="weight">Weight (in kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            maxLength="3"
            min="1" 
            max="999"
            placeholder="50"
            value={state.weight}
            onChange={handleChange}
          />
        </div>

        <div className="col m6 s12">
          <label htmlFor="height">Height (in cm)</label>
          <input
            id="height"
            name="height"
            type="number"
            maxLength="3"
            min="1" 
            max="999"
            placeholder="176"
            value={state.height}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="center">
        <button className="calculate-btn" type="submit">
          Calculate BMI
        </button>
      </div>
    </form>
  );
};

export default BmiForm;
