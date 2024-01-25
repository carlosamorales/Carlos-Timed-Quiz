// JavaScript Logic (script.js)
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const highScoresContainer = document.getElementById("high-scores");
    const timerElement = document.getElementById("timer");
    const initialsInput = document.getElementById("initials-input");
    const saveButton = document.getElementById("save-button");
    const scoreMessage = document.getElementById("score-message");
    const scoreContainer = document.getElementById("score-container");

    let timer;
    let selectedAnswers = [];
    let timeLeft;
    let questionIndex = 0;
    const quizData = [
        // Define your quiz questions and answers here
        // Example question:
        {
            question: "What is JavaScript?",
            answers: ["A programming language", "A fruit", "A car brand", "A country"],
            correctAnswer: "A programming language"
        },
        {
            question: "What does 'DOM' stand for?",
            answers: ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Document Oriented Model"],
            correctAnswer: "Document Object Model"
        },
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            answers: ["var", "let", "const", "variable"],
            correctAnswer: "var"
        },
        {
            question: "What is the purpose of the 'this' keyword in JavaScript?",
            answers: ["Refers to the current object", "Refers to the previous object", "Refers to the next object", "Refers to a specific element"],
            correctAnswer: "Refers to the current object"
        },
        {
            question: "What is the difference between '==' and '===' in JavaScript?",
            answers: ["'==' performs type coercion, '===' does not", "'===' performs type coercion, '==' does not", "'==' checks value only, '===' checks both value and type", "'===' checks value only, '==' checks both value and type"],
            correctAnswer: "'==' checks value only, '===' checks both value and type"
        },
        {
            question: "What is an IIFE in JavaScript?",
            answers: ["Immediately Invoked Function Expression", "Inline If Else", "Internal Interface for External Functions", "Instance of Function Execution"],
            correctAnswer: "Immediately Invoked Function Expression"
        },
        {
            question: "What is the purpose of the 'NaN' value in JavaScript?",
            answers: ["Represents a non-existent or undefined value", "Represents 'Not a Number'", "Represents 'No Assignment Needed'", "Represents 'Null or Negative'"],
            correctAnswer: "Represents 'Not a Number'"
        },
        {
            question: "How can you add a comment in JavaScript?",
            answers: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"],
            correctAnswer: "// This is a comment"
        },
        {
            question: "Which method is used to remove the last element from an array in JavaScript?",
            answers: ["pop()", "shift()", "splice()", "removeLast()"],
            correctAnswer: "pop()"
        },
        {
            question: "What is the purpose of the 'JSON.parse()' method in JavaScript?",
            answers: ["Converts a JSON string to an object", "Converts an object to a JSON string", "Parses a JavaScript object", "Encodes a JSON object"],
            correctAnswer: "Converts a JSON string to an object"
        },

    ];

    function startQuiz() {
        startButton.style.display = "none";
        quizContainer.style.display = "block";
        highScoresContainer.style.display = "none";
        timeLeft = 60; // Set the initial time for the quiz
        startTimer();

        updateQuiz();
    }

    function updateQuiz() {
        scoreMessage.textContent = ""; // Clear previous score message
        const currentQuestion = quizData[questionIndex];
        document.getElementById("question").textContent = `Question ${questionIndex + 1}: ${currentQuestion.question}`;

        const answersList = document.getElementById("answers");
        answersList.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
            const answerItem = document.createElement("li");
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.onclick = () => checkAnswer(answerButton.textContent, currentQuestion.correctAnswer);

            answerItem.appendChild(answerButton);
            answersList.appendChild(answerItem);
        });
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        selectedAnswers.push(selectedAnswer);
        if (selectedAnswer === correctAnswer) {
            // Correct answer logic
            console.log('Hello');
            displayAnswerMessage("Correct");
        } else {
            // Incorrect answer logic
            displayAnswerMessage("Wrong");
            timeLeft -= 10; // Subtract 10 seconds for incorrect answer
            if (timeLeft < 0) {
                timeLeft = 0;
            }
        }

        setTimeout(() => {
            const answerMessage = document.getElementById("score-message");
            answerMessage.textContent = ""; // Clear the answer message after a delay
            questionIndex++;

            if (questionIndex < quizData.length) {
                updateQuiz();
            } else {
                endQuiz();
            }
        }, 1000); // Adjust the delay time as needed




    }

    function displayAnswerMessage(message) {
        const answerMessage = document.getElementById("score-message");
        answerMessage.textContent = message;
    }

    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = 0;
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        //clearInterval(timer);
        timerElement.textContent = ""; // Clear the timer display
        quizContainer.style.display = "block";
        highScoresContainer.style.display = "block";
        scoreContainer.style.display = "block"; // Show score container
        console.log(endQuiz);
        // Show the form to save initials and score
        document.getElementById("score-container").style.display = "block";
        document.getElementById("final-score").textContent = `Your Final Score: ${calculateScore().totalScore}`;
    }

    saveButton.addEventListener("click", function () {
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            // Save initials and score logic
            const score = calculateScore().totalScore;
            // Perform the necessary actions to save initials and score
            localStorage.setItem(initials,score);
            console.log(`Initials: ${initials}, Score: ${score}`);
        }
    });

    function calculateScore() {
        let correctAnswers = 0;
        quizData.forEach((question, index) => {
            const selectedAnswer = selectedAnswers[index];/* Get the user's selected answer for the question */
            if (selectedAnswer === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const maxPossibleScore = quizData.length * 10; // Assuming each question has a maximum score of 10
        const userScore = correctAnswers * 10; // Assuming each correct answer adds 10 points

        const remainingTimeScore = timeLeft; // You can adjust this based on your scoring criteria

        const totalScore = userScore + remainingTimeScore;

        let message;
        if (totalScore >= 80 && totalScore <= maxPossibleScore) {
            message = "Passed!";
        } else if (totalScore === 100) {
            message = "Perfect Score!";
        } else {
            message = "Failed";
        }

        return { totalScore, message };
    }

    startButton.addEventListener("click", startQuiz);
});