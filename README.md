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

- Then, start the development server.

```bash
npm start
```

- Finally,to run the tests.

```bash
npm test
```

- To successfully load the question json, run the server in the default address [http://localhost:3000/](http://localhost:3000/).

#### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Frameworks used

### React

I used React because it is a framework that suits really well with applications based in one page. Moreover, because I have experience with it and I am comfortable working with it.

### Jest with Enzyme

I decided to use the test runner Jest because its use is wide spread and it is also recommended in the [React's documentation](https://reactjs.org/docs/testing.html). As a testing utility I use Enzyme because of its simplicity and popularity.

## Decisions made during the implementation

### Questions creation

This is a Jayway quiz, which means, all the questions are related to the company and the information has been obtained from the [Jayway website](https://www.jayway.com).

The images are free to use from [creative commons](https://creativecommons.org/).

### Saving the questions

To store the questions, I decided to do it in a Json file (located in the public folder of the project) instead of hard code them. This way it is easier to add more questions and get the data from a server or API just changing the URL.

### Project structure

The project structure is the following:<br/>
The components are separated in two main folders, 'containers' and 'components'.
The 'containers' folder has all the container components whereas the 'components' folder has all the components that are rendered by the containers.<br/>
Each component has its own folder with all the files needed to render and test it.<br/>
Some, can contain other components inside their folder as well.

### Components structure

There main components are: App, Questions,Question,Countdown,Start and GameOver.<br/>

#### Start, GameOver and Question components

This are presentational components.

- Start has a welcome message and a button to start the quiz. The button receives a function to call when its clicked and a prop that enables it when the game is ready to start (all questions fetched and reduced to 10).
- GameOver simply displays the end message with the results received from its parent through the props.
- The Question component displays the information of each question.<br/>
  I decided to have a presentational component to render the question itself, because, this way, I keep the general purpose of the Questions component and a clearer project structure (in my opinion). They can be merged into one component though (like I had originally), since it does not imply a considerable increment of the complexity.

#### App component

The App component fetches and loads the questions,controls the basic information of the app and renders conditionally the rest of components. That is why it is the only container component.<br>

To choose which questions must be shown to the user, I decided to simply create a loop that randomly generates an index of the array where I previously saved all the questions fetched. I also have a list of the used indexes so it can be checked if the index generated is already used. If so, another one must be generated until it is valid.

To conditionally render the appropriate components, I decided to have a non state variable called 'content' which is the one that is actually rendered. Its value changes as the other state variables changes.
It is always initialized with the Start component.
To know when the user starts the game, I created the state variable 'isGameStarted' (initially false). It is set to true when the user clicks the start button. Then, the 'content' variable now has the Questions component that contains the functionality to start the quiz.
Finally, to know the end of the game, the component also has a state variable ('userAnswers') with all the user answers. So,using this array the component knows when all 10 questions have been answered. Then, 'content' now changes and has the GameOver component that ends the game.

#### Questions component

The Questions component controls the general state of the quiz itself. That includes the lifelines, the current question to display, the countdown component and the management when the user clicks an answer.

It renders the lifeline buttons, the question tracker (to know your progress in the quiz), the Countdown component and the Question component.

For the time lifeline, I decided to simply trigger the change, and update the state of the lifeline (used, unused) to avoid more than one use.The Countdown component will be in charge of the actual time modification.

For the 50/50 lifeline, I decided to have an array with the visualization status of each answer (true=visible,false=hided). When the user activates the lifeline,the answers to hide are chosen and this array is updated. The answers to hide are chosen the same way as the final 10 questions in the App component. Only this time we also have to avoid the index of the correct answer in order not to hide it.

It uses the same function as the App component to generate a random number. I decided to receive it as prop and to keep it in the App component rather than exporting it to a new module, and then, importing it in both components. Due to the small complexity of the function I prefer to have it in the App component because I think it is more useful to have it there.

#### Countdown component

This component, I decided to make it 100% reusable. It is independent, it manages its own state, and only needs the props to perform the specific functionalities.

When the component mounts, an interval is set and it is cleared when the component is unmounted. The interval updates the time each second.<br/> The seconds are initialized according to its property and when the countdown reaches 0 the component resets itself and executes the a from its parent. When the parent wants to trigger a reset or a modification on the seconds remaining, the props are changed, the component applies the appropriate changes and it resets the triggers to be able to change again if necessary.

## Decisions made in testing implementation

First of all, I decided to use functional components instead of class based components. I think that functional components with react hooks are more powerful and simple than class components. However, it is more difficult to keep track of the component's state when testing, in fact, it is not possible to access it nor modify it. At least with Jest and Enzyme. Therefore, my approach with the tests focuses in the functionality rather than the implementation.

More precisely I started to test the presentation components.

### Testing GameOver, Start and Question components

#### GameOver component

The GameOver component has only some headers to display the message, along with the props. In this case I only make sure that with a valid set of props it renders the headers correctly.

#### Start component

The Start component has a bit more than just a message. It also has a button that starts the game. In this case, apart from testing the correct rendering, the important thing is that when the user clicks the button it executes the callback to start the game. This is the important thing. After that, I assume that the callback will correctly update the state and consequently render the next component.

#### Question component

I did the same with the Question component. I assume that the parent will pass the correct props. I test the correct rendering of the component and then, I finally test that when the user clicks on an answer, this action executes the callback that takes care of performing the appropriate changes. Always assuming that the implementation is correct.

I am not sure if it is the appropriate approach,however, with my research, I do think that, at least, it is a valid one.

#### Questions component

For the Questions component, now that I know that clicking on an answer will trigger the 'answerHandler', I make sure that clicking in both lifelines will trigger the corresponding callback to handle each functionality.
The only function left to test is the 'countdownEndHandler'. The user can't change the countdown value other than using the time lifeline. We already tested that, so in this case, I assume that at some point, since the Countdown is always decrementing the time each second, it will reach 0 therefore it will execute the correspondents updates and that includes a call to 'countdownEndHandler'.

#### Countdown component

So far all functionalities of this component had already been tested. The Questions component checks that a change is triggered (using the time lifeline). The Question component checks that the function to manage the click on an answer is executed, which triggers a countdown reset. And I assume that the countdown reaches 0 because it is always decrementing the time (each second). So it is only left to test the basic correct render of the component with valid props.

#### App component

Finally, in the App component, the last functionality remaining to test, is that the first component (Start) is successfully rendered in the first place.<br/> We already know that the Start component will execute the function to start the game. Also, that the Question component executes the the appropriate handler each time the user clicks an answer otherwise the countdown reaches 0 and does the same thing. Therefore, we know that eventually we will fill the array of answers and finish the game.
