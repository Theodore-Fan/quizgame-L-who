import { questions } from "./questions";

let quizgame = (function () {
  let oInstance = {};

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
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
  };

  let setNextQuestion = function () {
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
    nextButton.classList.add("hide");
    scoreboard.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  };

  let selectAnswer = function (e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    scoreboard.classList.remove("hide");
    if (correct) {
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

quizgame.init();
