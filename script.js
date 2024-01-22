// JavaScript Logic (script.js)
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const highScoresContainer = document.getElementById("high-scores");
    const timerElement = document.getElementById("timer");
    const initialsInput = document.getElementById("initials-input");
    const saveButton = document.getElementById("save-button");

    let timer;
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
          {
            question: "What is the event loop in JavaScript?",
            answers: ["A mechanism that helps JavaScript handle asynchronous operations", "A loop that runs infinitely", "A loop that processes only synchronous operations", "A mechanism that handles CSS animations"],
            correctAnswer: "A mechanism that helps JavaScript handle asynchronous operations"
          }
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
        if (selectedAnswer === correctAnswer) {
            // Correct answer logic
        } else {
            // Incorrect answer logic
            timeLeft -= 10; // Subtract 10 seconds for incorrect answer
            if (timeLeft < 0) {
                timeLeft = 0;
            }
        }

        questionIndex++;

        if (questionIndex < quizData.length) {
            updateQuiz();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        quizContainer.style.display = "none";
        highScoresContainer.style.display = "block";
        // Show the form to save initials and score
    }

    saveButton.addEventListener("click", function() {
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            // Save initials and score logic
            const score = calculateScore();
            // Perform the necessary actions to save initials and score
            console.log(`Initials: ${initials}, Score: ${score}`);
        }
    });

    function calculateScore() {
        // You can implement your scoring logic here
        // For example, you might want to calculate the score based on correct answers and remaining time
        const correctAnswers = quizData.reduce((count, question) => {
            // Implement your correct answer counting logic here
            // For example, compare user's answers with correct answers
            return count;
        }, 0);

        const remainingTimeScore = timeLeft; // You can adjust this based on your scoring criteria
        const totalScore = correctAnswers + remainingTimeScore;
        return totalScore;
    }

    startButton.addEventListener("click", startQuiz);
});