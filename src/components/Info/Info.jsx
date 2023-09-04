import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ weight, height, id, date, bmi, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  let color="#50C878";
  if (bmi<18.5){
    color="#87CEEB"
  };
  if (bmi>25.0){
    color="#FF8C00"
  };
  if (bmi>30.0){
    color="#F62817"
  };

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span style={{color:color}} className="card-title" data-test="bmi">
            BMI: {bmi}
          </span>
          <div className="card-data">
            <span data-test="weight">Weight: {weight} kg</span>
            <span data-test="height">Height: {height} cm</span>
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
  deleteCard: PropTypes.func
};

export default Info;