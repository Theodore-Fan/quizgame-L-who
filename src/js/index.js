const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
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
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question:
      "What was the name of the non-aggression pact that was signed between Germany and the Soviet Union?",
    answers: [
      { text: "Molotov-Ribbentrop Pact", correct: true },
      { text: "Agreement of Mutual Assistance", correct: false },
      { text: "Tripartite Pact", correct: false },
      { text: "Treaty of Versailles", correct: false },
    ],
    question:
      "What was the name of the non-aggression pact that was signed between Germany and the Soviet Union?",
    answers: [
      { text: "Molotov-Ribbentrop Pact", correct: true },
      { text: "Agreement of Mutual Assistance", correct: false },
      { text: "Tripartite Pact", correct: false },
      { text: "Treaty of Versailles", correct: false },
    ],

    question: "Which country did Germany invade that started WW2?",
    answers: [
      { text: "Denmark", correct: false },
      { text: "Czechoslovakia", correct: false },
      { text: "Poland", correct: true },
      { text: "France", correct: false },
    ],
    question:
      "What was the name of the fortified line the French created along the border of Germany prior to WW2?",
    choices: [
      { text: "The Maginot Line", correct: true },
      { text: "Siegfried Line", correct: false },
      { text: "Gustav Line", correct: false },
      { text: "Mareth Line", correct: false },
    ],
    question: "Which general during WW2 was known as the “Desert Fox”?",
    choices: [
      { text: "Bernard Montgomery", correct: false },
      { text: "Erwin Rommel", correct: true },
      { text: "Giovanni Messe", correct: false },
      { text: "Erich von Manstein", correct: false },
    ],
    question: "What was the Battle of Britain?",
    choices: [
      { text: "A naval campaign in the Atlantic Ocean.", correct: false },
      { text: "An Allied amphibious assault at Normandy.", correct: false },
      { text: "An amphibious evacuation at Dunkirk.", correct: false },
      { text: "An aerial campaign over the United Kingdom.", correct: true },
    ],
    question: "Which event caused the United States to join WW2?",
    choices: [
      { text: "The Japanese invasion of China", correct: false },
      { text: "Unrestricted submarine warfare by the Germans", correct: false },
      { text: "The Japanese attack on Pearl Harbor", correct: true },
      { text: "The fall of Paris to the Germans", correct: false },
    ],
    question:
      "What was the codename for the Allied invasion of Normandy in 1944?",
    choices: [
      { text: "Operation Overlord", correct: true },
      { text: "Operation Neptune", correct: false },
      { text: "Operation Bagration", correct: false },
      { text: "Operation Market Garden", correct: false },
    ],
    question:
      "Which battle in the Eastern Front is considered to be one of the most important turning points of the war?",
    choices: [
      { text: "The Siege of Sevastapol", correct: false },
      { text: "The Battle of Stalingrad", correct: true },
      { text: "The Battle of Smolensk", correct: false },
      { text: "The Siege of Leningrad", correct: false },
    ],
    question:
      "In which Pacific battle did the famous picture of American soldiers raising a flag come from?",
    choices: [
      { text: "Okinawa", correct: false },
      { text: "Iwo Jima", correct: true },
      { text: "Guadalcanal", correct: false },
      { text: "Philippines", correct: false },
    ],
    question: "Which Allied nation was the first to enter Berlin in 1945?",
    choices: [
      { text: "USSR", correct: true },
      { text: "United States", correct: false },
      { text: "France", correct: false },
      { text: "United Kingdom", correct: false },
    ],
  },
];
