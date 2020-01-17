import React, { Fragment } from "react";
import "./Question.css";

function Question(props) {
  let image = null;
  // The image is only rendered with questions with an image to display.
  if (props.image) {
    image = (
      <img
        className="question-image"
        src={"/images/" + props.image}
        alt={props.image}
      />
    );
  }
  return (
    <div className="possible-answers-text">
      <div className="question-text" id="questionText">
        {props.text}
      </div>
      {image}
      <br />
      {[...Array(props.numberOfAnswers)].map((element, index) => {
        return (
          <Fragment key={index}>
            <button
              className="btn-possible-answers-text"
              hidden={props.answersHideStatus[index]}
              onClick={() => props.clickHandler(index)}
            >
              {props.answers[index]}
            </button>
            <br />
          </Fragment>
        );
      })}
    </div>
  );
}

export default Question;
