import React, {useState,useEffect } from "react";
import StartMessage from "../../components/messages/Start"
import "./App.css";

const questionsURL = "http://localhost:3000/questions2.json";


function App() {
  const [loadedQuestions, setLoadedQuestions] = useState(null);
   
  // On component 'didMount' questions are loaded
    useEffect(() => {
      fetch(questionsURL)
        .then(response => response.json())
        .then(loadedQuestions => {
          setLoadedQuestions(loadedQuestions.questions);
        })
        .catch(function() {
          console.log("error");
      });
    }, []);



  const startHandler = () => alert('started!')
  
  
  return (
    <StartMessage loading={false} startHandler={startHandler} />
    );
  }
  
  export default App;
  