/* Pseudo Code -- user stories
- The user should land on a page to start the quiz (HTML)
- The user should be presented with a button to start the quiz (HTML)
- When the user clicks the start button... (JS)
    - The intro form hides (JS)
    - The quiz form shows (JS)
    - The timer starts counting down (JS)
    - The first question renders (JS)
    - The first answer set renders (JS)
- For each question, the user should be able to click only one possible answer (JS)
- The user should be presented with a button to check if selected answer is correct (HTML)
- When the user clicks the button, their selection is checked (JS)
    - If the answer is correct, they earn a point (JS)
    - If the answer is incorrect, time is removed from the timer (JS)
- The user should progress to the next question (JS)
    - If it's the last question, the user should go to the end of the quiz (JS)
*/

//Global Variables declared
const master = [
    {
        question: "What is the purpose of JavaScript when building a site?",
        answers: ["Functionality", "Styling", "Content", "Nothing. It's black magic."],
        correctAnswer: 0
    },
    {
        question: "What does JavaScript have the ability to manipulate?",
        answers: ["the DOM", "the url", "my glowing personality", "the stock market"],
        correctAnswer: 0
    },
    {
        question: "What do you need for your JavaScript to work?",
        answers: ["HTML", "CSS", "JQuery", "none of the above"],
        correctAnswer: 3
    }
];
let score = 0;
let questionNumber = 0;

// Set variables for the timer
const quizTime = 41000; // Total length of the quiz -- 120,000 milliseconds === 2 minutes. One extra second to compensate for the setInterval delay
let endTime = Date.now() + quizTime; // Date.now() returns milliseconds. Quiz end time is 2 minutes in the future.
let timerInterval; // A variable for the setInterval reference to be stored

// HTML Elements
const formIntro = document.getElementById("quiz-intro");
const quizForm = document.getElementById("quiz-main");
const quizEnd = document.getElementById("quiz-end");
const quizHighscore = document.getElementById("quiz-highscore");
const questionText = document.getElementById("question-text");
const answerSet = document.getElementById("answer-set");
const scoreContainer = document.getElementById("js-score-status");
const playerFinalScore = document.getElementById("player-score");
const questionContainer = document.getElementById("js-question-status");
const timerContainerMinutes = document.getElementById("timer-container-minutes");
const timerContainerSeconds = document.getElementById("timer-container-seconds");
let seconds;
timerContainerMinutes.innerText = `0`;
timerContainerSeconds.innerText = `40`;
const buttonEnd = document.getElementById("btnend");
const userEntry = document.getElementById("given-input");
const highScoreList = document.getElementById("highscorelist");

function endQuiz() {
    event.preventDefault();
    // You need a function that ends the quiz, otherwise your last question will stay on the screen
    // Maybe something similar to start quiz.
    formIntro.setAttribute("class", "hidden");
    quizForm.setAttribute("class", "hidden");
    quizEnd.setAttribute("class", " ");
    playerFinalScore.innerText=score;
    clearInterval(timerInterval);
    buttonEnd.onclick = highScore();
    // Have a hidden modal in your html, and un-hide it with the results at the end.
    console.log("Boom");
}

function generateAnswerSet(index) {
    let answerSetHtml = ``;
    for (let i = 0; i < master[index].answers.length; i++) {
        answerSetHtml += `
            <label for="${i}">
                ${master[index].answers[i]}
                <input name="${master[index].question}" id="${i}" type="radio" />
            </label>
            <br />
            `;
    }
    return answerSetHtml;
}

function startQuiz(event) {
    event.preventDefault();
    // Set the endTime to be 2 minutes in the future from the current time.
    questionContainer.innerText++;
    endTime = Date.now() + 41000;

    // Set up the timer using setInterval (for reference checkout ... https://www.w3schools.com/jsref/met_win_setinterval.asp)
    timerInterval = setInterval(() => {
        // Grab the current time and compare it to the quiz's end time
        //console.log("anything");
        const difference = endTime - Date.now();

        // Calculate minutes and seconds based on the difference

        seconds = Math.floor(difference / 1000);

        // If time is out, end the quiz
        if (seconds === 0) {
            endQuiz();
        }

        // Set the inner text of the minutes and seconds container
        timerContainerSeconds.innerText = seconds;
    }, 1000);
    // Hide the landing form and show the quiz form
    formIntro.setAttribute("class", "hidden");
    quizForm.setAttribute("class", " ");
    const firstQuestion = master[questionNumber].question;
    questionText.textContent = firstQuestion;
    const answerSetHtml = generateAnswerSet(questionNumber);
    answerSet.innerHTML = answerSetHtml;
    return timerInterval;
}

function progressQuiz() {
    // The purpose of this function is to move the quiz to the next question
    if (questionNumber === master.length - 1) {
        // If we're at the end of the quiz, end the quiz
        endQuiz();
    } else {
        // If we're not at the end of the quiz, progress
        questionNumber++;
        questionContainer.innerText++;
        const nextQuestion = master[questionNumber].question;
        questionText.textContent = nextQuestion;
        const answerSetHtml = generateAnswerSet(questionNumber);
        answerSet.innerHTML = answerSetHtml;
    }
}

function evalAnswer(event) {
    // check if answer was correct
    event.preventDefault();
    const userAnswer = document.querySelector(`input[name="${master[questionNumber].question}"]:checked`).id;
    if (parseInt(userAnswer) === master[questionNumber].correctAnswer) {
        // If they get the answer correct, add one to the score
        score++;
        scoreContainer.innerText=score;
    } else {
        // if they get the answer wrong, subtract 10 seconds from the endTime of the timer. i.e. the end is 10 seconds closer to now
        endTime -= 10000;
    }
    // Progress the quiz
    progressQuiz();
}

function highScore(){
    quizEnd.setAttribute("class", "hidden");
    quizHighscore.setAttribute("class", " ");
    const saveVal = document.getElementById("btnsaveval");
    saveVal.onclick = function(){
        event.preventDefault();
        if (userEntry.value !== "undefined"){
            localStorage.setItem("Winning", userEntry.value);
        }};console.log("what is happening");
        highScoreList.innerText = localStorage.getItem("Winning", userEntry.value);
}
 
// Event listeners
quizForm.addEventListener("submit", evalAnswer);
formIntro.addEventListener("submit", startQuiz);

