/*
Player guess between min max
player get certain number of guesses
notify player of guesses remaining
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI elems
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct! You win!`, true);
    } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(
          false,
          `Game over, the correct number was ${winningNum}`,
          true
        );
      } else {
        gameOver(false, `${guess} is not correct, ${guessesLeft} guesses left`);
      }
    }
  }

  // check if won
});

function setMessage(msg, color) {
  (message.style.color = color), (message.textContent = msg);
}

function gameOver(won, msg, last = false) {
  let color;
  let disable;
  won === true ? (color = "green") : (color = "red");
  won === true ? (disable = true) : (disable = false);
  if (last === true) {
    disable = true;
  }
  // disable input
  guessInput.disabled = disable;
  // change border colo
  guessInput.style.borderColor = color;
  // set message
  setMessage(msg, color);

  // play again

  if (last) {
    guessBtn.value = "Play again";
    guessBtn.className += "play-again";
  }
}

// get winning num

function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
