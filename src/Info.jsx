import React from 'react';

const Info = ({ weight, height, id, date, bmi, deleteCard }) => {
  const handleDelete = e => {
    deleteCard(id);
  };

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title">BMI: {bmi}</span>
          <div className="card-data">
            <span>Weight: {weight} kg</span>
            <span>Height: {height} cm</span>
            <span>Date: {date}</span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
