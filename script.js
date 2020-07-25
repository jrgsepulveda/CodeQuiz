//Setting the Variables
var navbar = document.getElementById("topBar")
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var timer = document.getElementById("timer");
var instrcutions = document.getElementById("instructions");
var highScore = document.getElementById("highScore");
var scoreOuput = document.getElementById("score")
var savedPlayers = document.getElementById("players");
var playersInput = document.getElementById("playersInput")
var clearBTN = document.getElementById("clearBtn")
var restartBTN = document.getElementById("restartBTN")
var submit = document.getElementById("enterBTN")
var list = document.getElementById("list")
var shuffledQuestions, currentQuestionIndex;
var timerValue = 45;
var score = 0;
var highScores = [];
var storedPlayers = localStorage.getItem("highScores")
if(storedPlayers){
  highScores = JSON.parse(storedPlayers);
  };


//Start button
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//Timer Function
function setTime() {
    var timerInterval = setInterval(function() {
      if(timerValue > 0) {
        timerValue--
        timer.textContent = "Time Left: " + timerValue;
      }
      else{
        endGame(); 
        clearInterval(timerInterval); 
      }
    }, 1000);
  };

//Fucntions for the game
function startGame() {
  instrcutions.classList.add("hide");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  setTime();
};

function endGame(){
  score = score - 100;
  navbar.classList.add("hide");
  highScore.classList.remove("hide");
  scoreOuput.textContent = "Score Total: " + score;
  questionContainerElement.classList.add("hide"); 
};

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
      if (answer.correct) {
      button.dataset.correct = answer.correct;  
    };
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
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
    nextButton.classList.remove("hide");
  } 
  else {
      endGame();
  };
};

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    score = score + 10;
  }else {
      element.classList.add("wrong");
  };
};

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

function renderPlayers(){
  playersInput.innerHTML = ""
 for(i=0; i < highScores.length; i++){
    var playerList = document.createElement("li");
    playerList.innerText = highScores[i];
    savedPlayers.appendChild(playerList);
 };
};

submit.addEventListener("click", function(event){
  event.preventDefault();
  highScoreList()
  highScore.classList.add("hide");
  list.classList.remove("hide");
});


function highScoreList(){
  if(playersInput.value){
    highScores.push(playersInput.value + " Score: " + score)
    renderPlayers();
    playersInput.value = "";
    localStorage.setItem("highScores", JSON.stringify(highScores))
  };
     
};

clearBTN.addEventListener("click", function(event){
  event.preventDefault();
  clearBTN = localStorage.clear();
  savedPlayers.remove();
});

restartBTN.addEventListener("click", function(event){
  event.preventDefault();
  location.reload();
});



//Object with all the queastions
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
