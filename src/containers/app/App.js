import React, { useState, useEffect } from "react";
import StartMessage from "../../components/messages/Start";
import GameOverMessage from "../../components/messages/GameOver";
import "./App.css";

const questionsURL = "http://localhost:3000/questions.json";
const numberOfQuestionsToShow = 10;

function App() {
  const [allQuestions, setAllQuestions] = useState(null);
  const [finalQuestions, setFinalQuestions] = useState(null);
  //const [userAnswers, setUserAnswers] = useState([]);
  const [isGameLoading, setIsGameLoading] = useState(true);
  //const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Fetching all questions
  useEffect(() => {
    fetch(questionsURL)
      .then(response => response.json())
      .then(fetchedQuestions => {
        setAllQuestions(fetchedQuestions.questions);
      })
      //.then()
      .catch(function() {
        console.log("error");
      });
  }, []);

  //when question are fetched we choose the questions to show
  useEffect(() => {
    if (allQuestions != null) {
      let questionsToShow = [];
      let indexOfQuestionsUsed = [];
      let indexChosen = 0;

      for (let i = 0; i < numberOfQuestionsToShow; i++) {
        do {
          indexChosen = generateRandomNumber(allQuestions.length);
        } while (indexOfQuestionsUsed.indexOf(indexChosen) !== -1);

        questionsToShow.push(allQuestions[indexChosen]);

        indexOfQuestionsUsed.push(indexChosen);
      }
      setFinalQuestions(questionsToShow);
      setIsGameLoading(false);
    }
  }, [allQuestions]);

  function generateRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }

  const startHandler = () => setIsGameFinished(true);

  let content = (
    <StartMessage loading={isGameLoading} startHandler={startHandler} />
  );

  if (isGameFinished) content = <GameOverMessage />;

  return content;
}

export default App;
