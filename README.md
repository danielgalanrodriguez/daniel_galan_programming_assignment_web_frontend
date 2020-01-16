# jayway_frontend_programming_assignment_react

Repository for Jayway's programming assignment, web frontend.<br/>

## Installation

### Requirements

In order to run the project you should have installed 'npm' or yarn' as a package manager.

### Usage

To run the app, execute the following commands in the project's root folder.

- First, install all dependencies.

```bash
npm install
```

- Finally, start the development server.

```bash
npm start
```

#### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Framework used

### React

I used React because it is a framework that suits really well with applications based in one page. Moreover, because I have some experience with it and I am comfortable working with it.

## Decisions made

### Questions

This is a Jayway quiz, which means, all the questions are related to the company and the information has been obtained from the [Jayway website](https://www.jayway.com).

The images are free to use from [creative commons](https://creativecommons.org/).

### Questions file

To store the questions, I decided to do it in a Json file (located in the public folder of the project) instead of hard code them. This way it is easier to add more questions and get the data from a real server (just changing the URL).

### Project structure

The project structure is the following:<br/>
The components are separated in two main folders, 'containers' and 'components'.
The 'containers' folder has all the container components whereas the 'components' folder has all the components that are rendered by the containers.<br/>
Each component has its own folder with all the files needed to render it.
Some can contain other components inside their folder as well.

### Components structure

There main components are: App, Questions,Question,Countdown,Start and GameOver.<br/>

#### Start, GameOver and Question components

This are presentational components.

- Start has a welcome message and a button. The button receives the function to call when its clicked and a prop that enables it when the game is ready to start.
- GameOver simple displays the end message with the results received from its parent.
- Question component displays the information of each question.
  I decided to have a presentational component to render the question itself. This way I keep the general purpose of the Questions component and a clearer project structure (in my opinion). They can be merged into one component (like I had originally) since it does not imply a considerable increment of the complexity.

#### App component

The App component fetches and loads the questions,controls the basic information of the app and renders conditionally the rest of components. That is why it is the only container component.<br>

To conditionally render the appropriate components, I decided to have a non state variable called 'content' which is the one that is actually rendered. Its value changes as the other state variables changes.
It is always initialized with the Start component.
To know when the user starts the game, I created the state variable 'isGameStarted' (initially false). It is set to true when the user clicks the start button. Then, the 'content' variable now has the Questions component that contains the functionality to start the quiz.
Finally, to know the end of the game, the component also has a state variable ('userAnswers') with all the user answers. So, when all 10 questions have been answered, 'content' now changes and has the GameOver component that ends the game.

To choose which questions must be shown to the user, I decided to simply create a loop that randomly generates an index of the array where I previously saved all the questions fetched. I also have a list of the used indexes so it can be checked if the index generated is already used,if so, another one must be generated until it is valid.

#### Questions component

The Questions component controls all general data of the quiz itself. That includes the lifelines, the current question to display, the countdown management and the management when the user clicks an answer.

It renders the lifeline buttons, the question tracker (to know your progress in the quiz), the Countdown component and the Question component.

For the time lifeline I decided that the Countdown component will be in charge of the time modification. The Questions component simply triggers the change, and keeps the state of the lifeline (used, unused) to avoid more than one use.

For the 50/50 lifeline, I decided to have an array with the visualization status of each answer (true=visible,false=hided). When the user activates the lifeline,this array is updated and the answers to hide are chosen the same way the final 10 questions are chosen in the App component. Only this time we also have to avoid the index of the correct answer in order not to hide the correct answer.

It uses the same function as the App component to generate a random number. I decided to receive this function as prop and keeping it in the App component rather than exporting it to a new module, and then, importing it in both components. Due to the small complexity of the function I prefer to have it in the App component because I think it is more useful to have it there.

#### Countdown component

For this component, I decided to make 100% reusable. It is independent, it manages its own state, and only needs the props to perform specific functionalities.

When the component mounts an interval is set and it is cleared when the component is unmounted. The interval updates the time each second. The seconds are initialized according to its property and when the countdown reaches 0 it resets itself and executes a function passed by its parent. When the parent want to trigger a reset or a modification on the seconds remaining, the props are changed, the component applies the appropriate changes and it resets the triggers to be able to change again if necessary.
