import React from 'react';
import './gradevisual.css';

const GradeVisual = ({ numCorrect, total }) => {
  const percentage = (numCorrect / total) * 100;

  return (
    <div className="grade-visual flex__col ac jc">
      <h2 className="grade-message">
        {percentage > 80 ? 'Way to go! Keep up the good work.' : "You'll get 'em next time. Keep trying!"}
      </h2>
      <h1 className="grade-header">{percentage}%</h1>
      <div className="grade-bar">
        <div className="grade-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default GradeVisual;
