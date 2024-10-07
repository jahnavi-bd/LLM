let currentJokeIndex = 0;
let jokes = [];

async function fetchJokes() {
    const response = await fetch('/api/jokes');
    jokes = await response.json();
    displayJoke(currentJokeIndex);
}

function displayJoke(index) {
    const joke = jokes[index];
    const setupElement = document.getElementById('setup');
    const userAnswerInput = document.getElementById('userAnswer');
    const resultMessage = document.getElementById('resultMessage');
    const emoji = document.getElementById('emoji');
    const flashcard = document.getElementById('flashcard');
    const actualPunchline = document.getElementById('actualPunchline');
    const nextButton = document.getElementById('nextButton');
    const checkAnswerButton = document.getElementById('checkAnswerButton');

    // Reset the flashcard for a new joke
    setupElement.textContent = joke.setup;
    userAnswerInput.value = "";
    resultMessage.textContent = "";
    emoji.textContent = "";
    actualPunchline.textContent = "";
    nextButton.style.display = 'none';
    checkAnswerButton.style.display = 'block';

    // Reset the event listener for checking the answer
    checkAnswerButton.onclick = function () {
        const userAnswer = userAnswerInput.value.trim().toLowerCase();
        const correctAnswer = joke.punchline.toLowerCase();

        // Display the actual punchline
        actualPunchline.textContent = `Punchline: ${joke.punchline}`;
        actualPunchline.style.display = 'block';

        if (userAnswer === correctAnswer) {
            resultMessage.textContent = "Correct!";
            emoji.textContent = "😊";
        } else {
            resultMessage.textContent = "Oops! Try again!";
            emoji.textContent = "😞";
        }

        // Show the Next Joke button after checking
        nextButton.style.display = 'block';
        checkAnswerButton.style.display = 'none';
    };
}

document.getElementById('nextButton').addEventListener('click', function () {
    // Increment the joke index and loop back if necessary
    currentJokeIndex = (currentJokeIndex + 1) % jokes.length;
    displayJoke(currentJokeIndex);
});

window.onload = fetchJokes;
