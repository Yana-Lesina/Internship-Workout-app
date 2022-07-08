import "../styles/App.scss";
import React from "react";

import { IExercise } from "../interfaces";
import BackImg from "../assets/images/back-img.svg";
import ForwardImg from "../assets/images/forward-img.svg";
import goToHomepage from "../assets/images/goToHomepage.svg";
import ArrowButton from "../components/ArrowButton";
import Timer from "../components/Timer";
import PrepareImage from "../components/PrepareImage";
import ExerciseVideo from "../components/ExerciseVideo";
import VideoFooter from "../components/VideoFooter";
import { Link } from "react-router-dom";

// repeat type for MainPageType
// if nothing changes - create 1 Interface
type ExercisePageType = {
  exercises: IExercise[];
  startCounter: number;
  setExerciseState: any;
  setCompletedState: any;
};

const ExercisePage: React.FC<ExercisePageType> = ({
  exercises,
  startCounter,
  setExerciseState,
  setCompletedState,
}) => {
  const [prepared, setPrepared] = React.useState<boolean>(false);
  const [counter, setCounter] = React.useState<number>(startCounter);
  const [ifPaused, setIfPaused] = React.useState(false);

  const switchToExercise = () => {
    setPrepared(true);
  };

  const switchToGetReady = (direction: -1 | 1) => {
    if (
      (counter === 0 && direction === 1) ||
      (counter > 0 && counter + 1 < exercises.length) ||
      (counter + 1 === exercises.length && direction === -1)
    ) {
      setCounter(counter + 1 * direction);
    }
    setPrepared(false);
    setIfPaused(false);
  };

  const autoSwitch = () => {
    if (exercises.length > counter + 1) {
      // get ready -> exercise
      if (!prepared) {
        switchToExercise();
      }
      // exercise -> get ready
      if (prepared) {
        setExerciseState(counter);
        switchToGetReady(1);
      }
      // last exercise -> Workout Completed!
    } else if (exercises.length === counter + 1) {
      setExerciseState(counter);
      setCompletedState(true);
    }
  };

  return (
    <>
      <Link to="/">
        <div className="goToHomepage-button">
          <img src={goToHomepage} alt="goToHomepage" />
        </div>
      </Link>

      <h2
        className={`current-exercise-title ${
          exercises[counter]?.finished ? "finished-exercise" : ""
        } ${!prepared ? "" : "exercise-done--clue"}`}
      >
        {!prepared ? "Get ready" : exercises[counter].title}
      </h2>

      <div className="timer-wrapper">
        <ArrowButton
          imgLink={BackImg}
          onClick={
            !prepared ? () => switchToExercise() : () => switchToGetReady(-1)
          }
          className={counter === 0 && !prepared ? "extreme-element" : ""}
        />

        <Timer
          className={!prepared ? "get-ready-timer" : "exercise-timer"}
          duration={!prepared ? 5 : exercises[counter].duration}
          ifPaused={ifPaused}
          handleRunOut={autoSwitch}
        />

        <ArrowButton
          imgLink={ForwardImg}
          onClick={
            !prepared
              ? () => switchToExercise()
              : () => {
                  if (counter + 1 === exercises.length) {
                    setCompletedState(true);
                    return;
                  }
                  setExerciseState(counter);
                  switchToGetReady(1);
                }
          }
          className={""}
        />
      </div>
      <div className="exercise-inner">
        {!prepared ? (
          <PrepareImage photo={exercises[counter]?.photo} />
        ) : (
          <>
            <ExerciseVideo
              videoLink={exercises[counter].video}
              ifPaused={ifPaused}
            />
            <VideoFooter
              ifPaused={ifPaused}
              onClick={() => {
                setIfPaused(!ifPaused);
              }}
              onKeyPress={(event: any) => {
                if (event.key === " " || event.key === "Enter") {
                  setIfPaused(!ifPaused);
                }
              }}
            />
          </>
        )}
      </div>
    </>
  );
};
export default ExercisePage;
