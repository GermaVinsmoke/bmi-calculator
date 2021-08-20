import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ weight, height, id, date, bmi, status, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };
  let mystyle = {
    color: "aqua"
  }
  if (status==="Under Weight")
  {
   mystyle = {
      color: "yellow"
    }
  }
  else if(status === "Over Weight" )
  {
    mystyle = {
      color: "orange"
    }
  }
  else if(status === "Obese" )
  {
    mystyle = {
      color: "red"
    }
  }
  return (
    <div className="col m8 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title" data-test="bmi" style={mystyle}>
            BMI: {bmi}
          </span>
          <div className="card-data">
            <span data-test="weight">Weight: {weight} kg</span>
            <span data-test="height">Height: {height} cm</span>
            <span data-test="status">Status: {status} </span>
            <span data-test="date">Date: {date}</span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  weight: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  bmi: PropTypes.string,
  status: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;
