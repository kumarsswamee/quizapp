//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Who is the captain of the Indian cricket team as of 2023?",
        options: [" Virat Kohli", "Hardik Pandya", "Rohit Sharma ", " K L Rahul "],
        correct: "Rohit Sharma",
    },
    {
        id: "1",
        question: "Which Indian bowler is known as the Yorker King ? ",
        options: ["Bhuvneshwar Kumar", "Zaheer Khan", "Mohammad Shami","Jasprit Bumrah"],
        correct: "Jasprit Bumrah",
    },
    {
        id: "2",
        question: "In which year did India win its first Cricket World Cup?",
        options: ["2019", "1983", "2007", "2003"],
        correct: "1983",
    },
    {
        id: "3",
        question: "Who holds the record for the highest individual score by an Indian batsman in Test cricket? ",
        options: ["Virat Kohli ", "Sachin Tendulkar", "Rohit Sharma", "Virender Sehwag"],
        correct: "Virender Sehwag",
    },
    {
        id: "4",
        question: "Which Indian cricketer is known as the Captain Cool ?",
        options: [" MS Dhoni", "Sourav Ganguly", "Anil Kumble", "Sachin Tendulkar"],
        correct: " MS Dhoni",
    },
    {
        id: "5",
        question: "Who was the first Indian cricketer to score a double century in One Day Internationals (ODIs)?",
        options: ["Virat Kohli ", "Sachin Tendulkar", "Rohit Sharma", "Virender Sehwag"],
        correct: "Virender Sehwag",
    }, {
        id: "6",
        question: "Which Indian spinner is known for his Doosra delivery?",
        options: ["Anil Kumble", "Harbhajan Singh", "Ravichandran Ashwin", "Muttiah Muralitharan"],
        correct: "Harbhajan Singh",
    },
    {
        id: "7",
        question: "Who holds the record for the most runs in a single edition of the Indian Premier League (IPL)?",
        options: ["Virat Kohli", "Chris Gayle", "AB Devilers", "David Warner"],
        correct: "Virat Kohli",
    },
    {
        id: "8",
        question: "In which format did Yuvraj Singh hit six consecutive sixes in an over during the T20 World Cup in 2007?",
        options: ["Indian Preimere leaugue", "Test ", "ODI", "T20 International"],
        correct: "T20 International",
    },
    {
        id: "9",
        question: "Who is the highest wicket-taker for India in Test cricket?",
        options: ["ricky Ponting", "Chris Gayle", "Anil Kumble", "MS Dhoni"],
        correct: "Anil Kumble",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};