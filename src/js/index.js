import { questions } from "./questions"; // Importing questions

let quizgame = (function () {
  // IIFE makes all the code function-scoped
  let oInstance = {};

  const startButton = document.getElementById("start-btn"); // connecting start btn variable with html ID tag
  const nextButton = document.getElementById("next-btn"); // connecting next btn variable with html ID tag
  const questionContainerElement = document.getElementById(
    "question-container"
  ); // connecting question container variable with html ID tag
  const questionElement = document.getElementById("question"); // connecting question variable with html ID tag
  const answerButtonsElement = document.getElementById("answer-buttons"); // connecting answer buttons variable with html ID tag

  let shuffledQuestions = null; // defining variable
  let currentQuestionIndex = 0; // defining variable
  let correctAnswers = 0; // defining variable

  oInstance.init = function () {
    // listening for click before initializing quiz...
    startButton.addEventListener("click", () => {
      // when clicking start btn
      startGame();
    });
    nextButton.addEventListener("click", () => {
      // when clicking next btn
      currentQuestionIndex++; // increment variable by 1
      setNextQuestion(); // runs function
    });
  };

  let startGame = function () {
    startButton.classList.add("hide"); // hides start btn
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // shuffling questions into random order
    currentQuestionIndex = 0; // resetting variable for question number to 0
    correctAnswers = 0; // resetting variable for correct answers to 0
    questionContainerElement.classList.remove("hide"); // show questions
    setNextQuestion(); // runs function
  };

  let setNextQuestion = function () {
    // reset the screen and show next question
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]); // shows randomly shuffled question that hasn't been shown yet
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
    nextButton.classList.add("hide"); // hides next button
    scoreboard.classList.add("hide"); // hides scoreboard
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
      // if the answer is correct, add 1 to variable
      correctAnswers++;
      scoreboard.innerText = "You are correct!"; // if correct, show text for being correct
    } else {
      scoreboard.innerText = "You are wrong!"; // if wrong, show text for being wrong
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      // if the total amount of questions is greater than the amount of questions answered (plus 1 because arrays start at 0)
      nextButton.classList.remove("hide"); // show next btn
    } else {
      startButton.innerText = "Restart"; // change text on start btn to say Restart
      startButton.classList.remove("hide"); // shows start btn
      scoreboard.innerText = // final scoreboard text is made up of the following string...
        correctAnswers + // Total correct answers
        " out of " + // text
        shuffledQuestions.length + // Total questions in the quiz
        " are correct!"; // text
    }
  };

  let setStatusClass = function (element, correct) {
    // when function is run...
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  };

  let clearStatusClass = function (element) {
    // when function is run...
    element.classList.remove("correct"); // remove correct class
    element.classList.remove("wrong"); // remove wrong class
  };

  return oInstance; // makes public any objects with oInstance, everything else is private and stays within the function
})();

quizgame.init(); // The quiz starts only when it is initialized here. If it is removed the buttons don't respond.
