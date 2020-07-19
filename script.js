var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timer = document.getElementById("timer");

var timerValue = 120;

var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function setTime() {
    var timerInterval = setInterval(function() {
      timerValue--;
      timer.textContent = "Time Left: " + timerValue;
  
      if(timerValue === 0) {
        clearInterval(timerInterval);
        alert("You ran out of time!")
      }
  
    }, 1000);
  };

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  setTime();
};



function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
};

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  };
};

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
    timerValue = -20;
  };
};

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};

var questions = [
    {
        question:"Which company developed JavaScript?",
        answers: [
            {text: "Microsoft", correct: false},
            {text: "Sun", correct: false},
            {text: "Netscape", correct: true}
        ]
    },
    {
        question:"Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "<js>", correct: false},
            {text: "<script>", correct: true},
            {text: "<javascript>", correct: false}
        ]
    
    },
    {
        question:'How do you write "Hello World" in an alert box?',
        answers: [
            {text: 'alert("Hello World")', correct: true},
            {text: 'alertBox("Hello World")', correct: false},
            {text: 'alertMsg("Hello World")', correct: false}
        ]

    },
    {
        question:"How do you create a function in JavaScript?",
        answers: [
            {text: "function:(myFunction)", correct: false},
            {text: "function myFunction()", correct: true},
            {text: "function = myFunction()", correct: false}
        ]
    },
    {
        question:"How do you call a function named 'myFunction'?",
        answers: [
            {text: "call function myFunction()", correct: false},
            {text: "call(myFunction)", correct: false},
            {text: "myFucntion()", correct: true}
        ]
    },
    {
        question:"How to write an IF statement in JavaScript?",
        answers: [
            {text: "if (i === 5)", correct: true},
            {text: "if = i === 5", correct: false},
            {text: "if [i] === 5", correct: false},
        ]   
       
    },
    {
        question:"How can you add a comment in a JavaScript?",
        answers: [
            {text: "<!--This is a comment-->", correct: false},
            {text: "'This is a comment", correct: false},
            {text: "//This is a comment", correct: true}
        ]
    
    },
    {
        question:"What is the correct way to write a JavaScript array?",
        answers: [
            {text: 'var colors = ["red", "green", "blue"]', correct: true},
            {text: 'var colors = "red", "green", "blue"', correct: false},
            {text: 'var colors = ("red", "green", "blue")', correct: false}
        ]
            
    },
    {
        question:"Which event occurs when the user clicks on an HTML element?",
        answers: [
            {text: "onchange", correct: false},
            {text: "onclick", correct: true},
            {text: "onmouseclick",correct: false}
        ]
            
    },
    {
        question:"How do you declare a JavaScript variable?",
        answers: [
            {text: "variable CarName;",correct: false},
            {text: "var carName;",correct: true},
            {text: "v carName;",correct: false}
        ]
    },
];