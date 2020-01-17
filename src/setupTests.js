// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import { mount, shallow } from "enzyme";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.cleanup = cleanup;
global.mount = mount;

global.wrapper = null;

global.finalQuestions = [
  {
    text: "Is jabra a Jayway project?",
    image: "",
    correctAnswer: "3",
    answers: ["No", "We wish...", "Never lose hope", "Of course!"]
  },
  {
    text: "",
    image: "turning-torso.jpg",
    correctAnswer: "0",
    answers: ["Malmö", "Palo Alto", "Stockholm", "Copenhagen"]
  },
  {
    text: "",
    image: "halmstad.jpg",
    correctAnswer: "2",
    answers: ["Copenhagen", "Palo Alto", "Halmstad", "Malmö"]
  },
  {
    text: "",
    image: "stockholm.jpg",
    correctAnswer: "1",
    answers: ["Halmstad", "Stockholm", "Copenhagen", "Malmö"]
  },
  {
    text: "",
    image: "copenhagen.jpg",
    correctAnswer: "2",
    answers: ["Halmstad", "Stockholm", "Copenhagen", "Malmö"]
  },
  {
    text: "Is jabra a Jayway project?",
    image: "",
    correctAnswer: "3",
    answers: ["No", "We wish...", "Never lose hope", "Of course!"]
  },
  {
    text: "",
    image: "turning-torso.jpg",
    correctAnswer: "0",
    answers: ["Malmö", "Palo Alto", "Stockholm", "Copenhagen"]
  },
  {
    text: "",
    image: "halmstad.jpg",
    correctAnswer: "2",
    answers: ["Copenhagen", "Palo Alto", "Halmstad", "Malmö"]
  },
  {
    text: "",
    image: "stockholm.jpg",
    correctAnswer: "1",
    answers: ["Halmstad", "Stockholm", "Copenhagen", "Malmö"]
  },
  {
    text: "",
    image: "copenhagen.jpg",
    correctAnswer: "2",
    answers: ["Halmstad", "Stockholm", "Copenhagen", "Malmö"]
  }
];
