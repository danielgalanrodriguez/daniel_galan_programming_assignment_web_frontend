import React from "react";

function GameOver(props) {
  return (
    <div className="player-panel">
      <h1 className="player-name">Well Done!</h1>
      <h1 className="question-text">
        Correct questions: {props.correctAnswers}
      </h1>
      <h1 className="question-text">Wrong questions: {props.wrongAnswers}</h1>
      <h1 className="question-text">
        Unanswered questions: {props.unansweredAnswers}
      </h1>
    </div>
  );
}

export default GameOver;
