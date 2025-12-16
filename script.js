const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Markup",
            "None of these"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which is NOT a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        correct: 3
    },
    {
        question: "Which symbol is used for JavaScript comments?",
        options: ["<!-- -->", "//", "**", "##"],
        correct: 1
    },
    {
        question: "Which function is used to fetch data in JS?",
        options: ["get()", "fetch()", "pull()", "receive()"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const questionCountEl = document.getElementById("question-count");

loadQuestion();

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.textContent = `⏱ ${timeLeft}s`;
    startTimer();

    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    questionCountEl.textContent =
        `Question ${currentQuestion + 1}/${quizData.length}`;

    optionButtons.forEach((btn, index) => {
        btn.textContent = current.options[index];
        btn.className = "option";
        btn.disabled = false;
        btn.onclick = () => selectAnswer(index);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(index) {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].correct;

    optionButtons.forEach(btn => btn.disabled = true);

    if (index === correctIndex) {
        optionButtons[index].classList.add("correct");
        score++;
    } else {
        optionButtons[index].classList.add("wrong");
        optionButtons[correctIndex].classList.add("correct");
    }

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱ ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextBtn.style.display = "block";
        }
    }, 1000);
}

function showResult() {
    document.querySelector(".quiz-container").classList.add("hidden");
    document.querySelector(".result-container").classList.remove("hidden");
    document.getElementById("score-text").textContent =
        `You scored ${score} out of ${quizData.length}`;
}
