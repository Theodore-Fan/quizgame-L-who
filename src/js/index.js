import { questions } from "./questions"; // Importing questions

let quizgame = (function () {
  // IIFE wraps around
  let oInstance = {}; // defining variables

  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-btn");
  const questionContainerElement = document.getElementById(
    "question-container"
  );
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  let shuffledQuestions = null;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;

  oInstance.init = function () {
    // listening for click before initializing quiz
    startButton.addEventListener("click", () => {
      startGame();
    });

    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      setNextQuestion();
    });
  };

  let startGame = function () {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // shuffling questions into random order
    currentQuestionIndex = 0; // resetting question number
    correctAnswers = 0; // resetting correct answers
    questionContainerElement.classList.remove("hide"); // show questions
    setNextQuestion();
  };

  let setNextQuestion = function () {
    // reset the screen and show next question
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  };

  let showQuestion = function (question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  };

  let resetState = function () {
    clearStatusClass(document.body);
    nextButton.classList.add("hide"); //hides next button
    scoreboard.classList.add("hide"); //hides scoreboard
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  };

  let selectAnswer = function (parameter) {
    const selectedButton = parameter.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    scoreboard.classList.remove("hide");
    if (correct) {
      // if the answer is correct, add 1 to correctAnswers variable
      correctAnswers++;
      scoreboard.innerText = "You are correct!";
    } else {
      scoreboard.innerText = "You are wrong!";
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
      scoreboard.innerText =
        correctAnswers +
        " out of " +
        shuffledQuestions.length +
        " are correct!";
    }
  };

  let setStatusClass = function (element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  };

  let clearStatusClass = function (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  };

  return oInstance;
})();

quizgame.init(); // Initializing quiz only if this is present
