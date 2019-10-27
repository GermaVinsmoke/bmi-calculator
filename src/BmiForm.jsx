import React, { useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';

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

  const handleSubmit = () => {
    change(state);
  };

  return (
    <>
      <div className="row">
        <div className="col m6 s12">
          <label htmlFor="weight">Weight (in kg)</label>
          <input
            id="weight"
            name="weight"
            type="tel"
            maxLength="3"
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
            type="tel"
            maxLength="3"
            placeholder="176"
            value={state.height}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="center">
        <button
          className="calculate-btn"
          type="button"
          disabled={state.weight === '' || state.height === ''}
          onClick={handleSubmit}
        >
          Calculate BMI
        </button>
      </div>
    </>
  );
};

BmiForm.propTypes = {
  change: PropTypes.func.isRequired
};

export default BmiForm;
