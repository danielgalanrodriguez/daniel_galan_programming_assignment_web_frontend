import React, { useState, useEffect, Fragment } from "react";
import Countdown from "../countdown/Countdown";

const secondsToAnswer = 15;
const secondsToAdd = 10;
const numberOfAnswers = 4;
const numberOfAnswersToHide = 2;

function Questions(props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimeLifelineUsed, setIsTimeLifelineUsed] = useState(false);
  const [isFiftyLifelineUsed, setIsFiftyLifelineUsed] = useState(false);
  const [answersHideStatus, setAnswersHideStatus] = useState(
    Array(numberOfAnswers).fill(false)
  );

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
    // Save the new answer
    if (event.target.value == currentQuestion.correctAnswer) {
      props.setUserAnswers(prevAnswers => [
        ...prevAnswers,
        answerValues.correct
      ]);
    } else {
      props.setUserAnswers(prevAnswers => [...prevAnswers, answerValues.wrong]);
    }

    //Reset countdown and move to next question
    setCountdownNeedReset(true);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }

  function handleFiftyLifelineUse() {
    let indexOfAnswersUsed = [];
    let indexChosen = 0;
    let newAnswersHideStatus = Array(numberOfAnswers).fill(false);

    for (let i = 0; i < numberOfAnswersToHide; i++) {
      do {
        indexChosen = props.generateRandomNumber(numberOfAnswers);
        console.log("indexChosen: ", indexChosen);
        console.log(currentQuestion.correctAnswer);
      } while (
        indexChosen == currentQuestion.correctAnswer ||
        indexOfAnswersUsed.indexOf(indexChosen) !== -1
      );
      indexOfAnswersUsed.push(indexChosen);
      newAnswersHideStatus[indexChosen] = true;
    }
    setIsFiftyLifelineUsed(true);
    setAnswersHideStatus(newAnswersHideStatus);
  }

  function handleTimeLifelineUse() {
    setIsTimeLifelineUsed(true);
    setCountdownNeedModification(true);
  }

  if (currentQuestion.image) {
    image = (
      <img
        className="question-image"
        src={"/images/" + currentQuestion.image}
        alt={currentQuestion.image}
      />
    );
  }
  return (
    <div className="player-panel">
      <button
        className={
          "btn-more-time " + (isTimeLifelineUsed && "btn-red disable-button")
        }
        onClick={handleTimeLifelineUse}
      >
        +10 s
      </button>
      <button
        className={
          "btn-50-50 " + (isFiftyLifelineUsed && "btn-red disable-button")
        }
        onClick={handleFiftyLifelineUse}
        disabled={isFiftyLifelineUsed}
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
                hidden={answersHideStatus[index]}
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
