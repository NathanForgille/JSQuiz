/*
-I need to develop a welcome page that has instructions, a button to start the quiz, and has style that contains my content

-When the quiz starts a header needs to appear that has the timer in it, and the high scores can be accessed as well

-each time they answer a question the submit button takes them to the next question

-if they also answered hte qyuestion incorrectly then time is removed from the timer

-the quiz is over if the user answers all the questions or if the timer hits zero.

-when the quiz is over, the user will be prompted to ener their initials to save their highscore

-if the user does not qualify for a high score then the user will not be prompted to enter anything. Instead the will be taken to a page that encourages them to study and retake the quiz

*/
//Global Variables declared
var master= [
    {
        question: "What is the purpose of JavaScript when building a site?",
        answers: ["Functionality", "Styling", "Content", "Nothing. It's black magic."],
        correctAnswer: "0"
    },
    {
        question: "What does JavaScript have the ability to manipulate?",
        answers: ["the DOM", "the url", "my glowing personality", "the stock market"],
        correctAnswer: "0"
    },
    {
        question: "What do you need for your JAvaScript to work?",
        answers: ["HTML", "CSS", "JQuery", "none of the above"],
        correctAnswer: "3"
    }
];
var score = 0;
var questionNumber = 0;
var formIntro = document.getElementById("form-intro");
var quizForm = document.getElementById("quiz-form");
var questionText = document.getElementById("question-text");
var answerSet = document.getElementById("answer-set");


function generateAnswerSet(index){
    var answerSetHtml = ``; 
            for(let i = 0; i < master[index].answers.length; i++){
            answerSetHtml += `
            <label for="${i}">${master[index].answers[i]}</label>
            <input name="${master[index].answers[i]}" id="${i}" type="radio" />
            `;
        } 
        return answerSetHtml;
}  

function startQuiz(event){
    event.preventDefault();
    formIntro.setAttribute("class", "hidden");
    quizForm.setAttribute("class", " ");
    var firstQuestion = master[questionNumber].question;
    questionText.textContent = firstQuestion;
    var answerSetHtml = generateAnswerSet(questionNumber);
        answerSet.innerHTML = answerSetHtml;
}


function evalAnswer(event) {
    // check if answer was correct
    event.preventDefault();
    var userAnswer = document.querySelector(`input[name="${master[questionNumber].answers[0]}"]:checked`.id);
    if (parseInt(userAnswer) == master.correctAnswer) {
        console.log("Yay!");
        score += 1;
        // do what happens if they get it right (ex. add to global score variable)
    } else {
        console.log("You got it wrong!")
        // take time away, whatever
    }
    console.log(userAnswer);
    questionNumber += 1;
    questionText.innerText = master[questionNumber].question;
    answerSet.innerHTML = generateAnswerSet(questionNumber);
}
quizForm.addEventListener("submit", evalAnswer)
formIntro.addEventListener("submit", startQuiz)
