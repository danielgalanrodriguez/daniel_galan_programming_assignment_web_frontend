import React, { useState, useEffect } from "react";
import Countdown from "../General/Countdown/Countdown";
import Question from "./Question/Question";
import "./Questions.css";

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

  // When the countdown reaches the end,we add the unanswered value to the answers array
  // and we advance to the next question.
  function countdownEndHandler() {
    props.setUserAnswers(prevAnswers => [
      ...prevAnswers,
      answerValues.unanswered
    ]);
    setAnswersHideStatus(Array(numberOfAnswers).fill(false));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }

  // When the user clicks an answer we:
  // Check if it is correct or not and add the appropriate value to the answers array.
  // Reset countdown and move to next question.
  function handleAnswerClick(answer) {
    if (answer == currentQuestion.correctAnswer) {
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

  // If the fifty fifty lifeline is executed we:
  // Generate randomly the index of the answer to hide.
  // We do so until we get an unused index that is not the correct answer.
  // Then we add the index used to the proper array.
  // And we update the auxillary hide status array.
  // Finally, we set the lifeline to used and we update the answers hide status.
  function handleFiftyLifelineUse() {
    let indexOfAnswersUsed = [];
    let indexChosen = 0;
    let newAnswersHideStatus = Array(numberOfAnswers).fill(false);

    for (let i = 0; i < numberOfAnswersToHide; i++) {
      do {
        indexChosen = props.generateRandomNumber(numberOfAnswers);
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

  useEffect(() => {
    if (isFiftyLifelineUsed) {
      setAnswersHideStatus(Array(numberOfAnswers).fill(false));
    }
  }, [currentQuestionIndex]);

  // If the time lifeline is executed we:
  // We set the lifeline to used and trigger the modification.
  function handleTimeLifelineUse() {
    setIsTimeLifelineUsed(true);
    setCountdownNeedModification(true);
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

      <Question
        text={currentQuestion.text}
        image={currentQuestion.image}
        answers={currentQuestion.answers}
        numberOfAnswers={numberOfAnswers}
        answersHideStatus={answersHideStatus}
        clickHandler={handleAnswerClick}
      />
    </div>
  );
}

export default Questions;
