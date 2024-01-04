const questions= [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {   text: "Shark", correct: false},
            {   text: "Blue animal",correct: true},
            {   text: "Elephant",correct: false},
            {   text: "Giraffe",correct: false}, 
        ]
    },
    {
        question: "Which is largest bird in the world?",
        answers:[
            {   text: "Ostrich", correct: true},
            {   text: "Eagle",correct: false},
            {   text: "Vulture",correct: false},
            {   text: "Penguine",correct: false}, 
        ]
    },
    {
        question: "Which is biggest fish in the world?",
        answers:[
            {   text: "	Whale shark", correct: true},
            {   text: "Basking shark",correct: false},
            {   text: "Great white shark",correct: false},
            {   text: "Tiger shark",correct: false}, 
        ]
    },
    {
        question: "Which is largest amphibians in the world?",
        answers:[
            {   text: "South China Giant Salamander", correct: true},
            {   text: "Japanese Giant Salamander",correct: false},
            {   text: "	Greater Siren",correct: false},
            {   text: "Hellbender",correct: false}, 
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButtton= document.getElementById("next-btn");

let currentQuestionsIndex= 0;
let score= 0;

function startQuiz(){
    currentQuestionsIndex =0;
    score =0;
    nextButtton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo =  currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButtton.style.display= "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
    }
}
 function selectAnswer(e){
   const selectedBtn= e.target;
   const isCorrect = selectedBtn.dataset.correct=== "true";
   if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
   }
   else{
    selectedBtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true") 
    button.classList.add("correct");
    button.disabled= true;
   });
   nextButtton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtton.innerHTML = "Play Again";
    nextButtton.style.display = "block";
}
function handleNextButton(){
    currentQuestionsIndex++;
    if(currentQuestionsIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButtton.addEventListener("click",()=>{
    if(currentQuestionsIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();