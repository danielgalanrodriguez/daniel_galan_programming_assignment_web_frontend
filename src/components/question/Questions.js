import React, { useState, useEffect, Fragment } from "react";
import Countdown from "../countdown/Countdown";

const secondsToAnswer = 5;
const secondsToAdd = 10;
const numberOfAnswers = 4;

function Questions(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [countdownNeedReset, setCountdownNeedReset] = useState(false);
  const [countdownNeedModification, setCountdownNeedModification] = useState(
    false
  );

  let answerValues = props.answerValues;
  let currentQuestion = props.questions[currentQuestionIndex];
  let image = null;

  function countdownEndHandler() {
    props.setUserAnswers(prevAnswers => [
      ...prevAnswers,
      answerValues.unanswered
    ]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }

  function handleAnswerClick(event) {
    console.log("event.target.value : ", event.target.value);
    console.log(
      "currentQuestion.correctAnswer: ",
      currentQuestion.correctAnswer
    );
    if (event.target.value == currentQuestion.correctAnswer) {
      props.setUserAnswers(prevAnswers => [
        ...prevAnswers,
        answerValues.correct
      ]);
    } else {
      props.setUserAnswers(prevAnswers => [...prevAnswers, answerValues.wrong]);
    }
    setCountdownNeedReset(true);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }

  if (currentQuestion.image) {
    image = (
      <img
        className="question-image"
        src={"/images/" + currentQuestion.image}
        alt=""
      />
    );
  }
  return (
    <div className="player-panel">
      <button
        className={"btn-more-time " /*+ (useTimeLifeline && "btn-red")*/}
        onClick={() => setCountdownNeedModification(true)}
        disabled={false}
      >
        +10 s
      </button>
      <button
        className={"btn-50-50 " /*+ (useFiftyLifeline && "btn-red")*/}
        onClick={() => alert("used!")}
        disabled={false}
      >
        50/50
      </button>
      <div className="player-time player-remaining-questions">
        {`${currentQuestionIndex + 1}/${props.questions.length}`}
      </div>
      <Countdown
        maxSeconds={secondsToAnswer}
        secondsToModify={secondsToAdd}
        endHandler={countdownEndHandler}
        needReset={countdownNeedReset}
        needModification={countdownNeedModification}
        setNeedReset={setCountdownNeedReset}
        setNeedModification={setCountdownNeedModification}
      />
      <div className="possible-answers-text">
        <div className="question-text" id="questionText">
          {currentQuestion.text}
        </div>
        {image}
        <br />
        {[...Array(numberOfAnswers)].map((element, index) => {
          return (
            <Fragment key={index}>
              <button
                className="btn-possible-answers-text"
                //hidden={questionsHideStatus[0]}
                onClick={handleAnswerClick}
                value={index}
              >
                {currentQuestion.answers[index]}
              </button>
              <br />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
