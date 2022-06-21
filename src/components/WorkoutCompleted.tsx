import React from "react";
import SaveButton from "../components/Button";
import CompletedImage from "../images/completed-img.svg";

type WorkoutCompletedType = {
  totalDuration: number;
};

export const WorkoutCompleted: React.FC<WorkoutCompletedType> = ({
  totalDuration = 0,
}) => {
  return (
    <>
      <div className="completed-img-container">
        <img
          src={CompletedImage}
          alt="completed-img"
          className="completed-img"
        />
      </div>
      <h1 className="completed-title">Workout completed!</h1>
      <div className="result-message">
        <h4>Nice job. You’re done. Here’s the workout summary.</h4>
        <h6>Minutes</h6>
        <h3>{totalDuration}</h3>
      </div>
      <SaveButton styles="action-button" link="/" innerText="Save & Continue" />
    </>
  );
};
