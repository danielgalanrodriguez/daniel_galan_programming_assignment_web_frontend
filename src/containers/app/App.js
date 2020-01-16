import React, { useState, useEffect } from "react";
import StartMessage from "../../components/messages/Start";
import GameOverMessage from "../../components/messages/GameOver";
import Questions from "../../components/questions/Questions";
import "./App.css";

const questionsURL = "http://localhost:3000/questions.json";
const numberOfQuestionsToShow = 10;
const answerValues = { correct: 1, wrong: 0, unanswered: -1 };

function App() {
  const [allQuestions, setAllQuestions] = useState(null);
  const [finalQuestions, setFinalQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Fetching all questions (from any DB or server).
  useEffect(() => {
    fetch(questionsURL)
      .then(response => response.json())
      .then(fetchedQuestions => {
        // Once the questions are fetched we store them in the state of the app.
        setAllQuestions(fetchedQuestions.questions);
      })
      //.then()
      .catch(function() {
        console.log("error");
      });
  }, []);

  // When all questions are fetched, we choose the questions to show.
  useEffect(() => {
    if (allQuestions != null) {
      let questionsToShow = [];
      let indexOfQuestionsUsed = [];
      let indexChosen = 0;

      // For every question we have to choose, we:
      // Generate a random index from 0 to allQuestions.length-1 (0-15).
      // If we already have this index, we generate another one.
      for (let i = 0; i < numberOfQuestionsToShow; i++) {
        do {
          indexChosen = generateRandomNumber(allQuestions.length);
        } while (indexOfQuestionsUsed.indexOf(indexChosen) !== -1);

        // When we already have a valid index, we add the corresponding question.
        // We also add the used index.
        questionsToShow.push(allQuestions[indexChosen]);
        indexOfQuestionsUsed.push(indexChosen);
      }
      // Finally we store the questions chosen in the state of the app.
      setFinalQuestions(questionsToShow);
    }
  }, [allQuestions]);

  // When we already have the questions to show, we are able to start.
  useEffect(() => {
    if (finalQuestions != null) {
      setIsGameLoading(false);
    }
  }, [finalQuestions]);

  function generateRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }

  const startHandler = () => setIsGameStarted(true);

  // The content variable has the JSX code that will be rendered.
  // Initially, it is the starting welcome message.
  let content = (
    // The loading variable allows the user to start the game only when everything is loaded correctly.
    <StartMessage loading={isGameLoading} startHandler={startHandler} />
  );

  // If the game has been started, the question component is rendered.
  if (isGameStarted) {
    content = (
      <Questions
        questions={finalQuestions}
        answerValues={answerValues}
        setUserAnswers={setUserAnswers}
        generateRandomNumber={generateRandomNumber}
      />
    );
  }
  // When the user has answered all the questions, the game over message is rendered.
  // The results are obtained by filtering the userAnswers array with the appropriate condition,and then,
  // displaying the length of the resulting filtered array.
  if (userAnswers.length === numberOfQuestionsToShow) {
    content = (
      <GameOverMessage
        correctAnswers={
          userAnswers.filter(answer => answer === answerValues.correct).length
        }
        wrongAnswers={
          userAnswers.filter(answer => answer === answerValues.wrong).length
        }
        unansweredAnswers={
          userAnswers.filter(answer => answer === answerValues.unanswered)
            .length
        }
      />
    );
  }

  return content;
}

export default App;
