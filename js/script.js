const scrambleTitle = document.getElementById('scramble');
const wordWrapper = document.getElementById('word_wrapper');
const randomBtn = document.getElementById('random');
const resetBtn = document.getElementById('reset');
const triesNumber = document.getElementById('tries_number');
const circle = document.querySelectorAll('.circle');
const mistakesText = document.querySelector('.mistakes_text');

const words = ["example", "javascript", "coding", "challenge"];
const exceptKey = ["Backspace", "Tab", "Shift", "Enter"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

window.addEventListener('DOMContentLoaded', () => {
  wordWrapper.childNodes[0].focus();
});

function start() {
  clear();
  scrambleTitle.innerText = generateRandomWord();

  for (let i = 0; i < currentWord.length; i++) {
    const wordInput = document.createElement('input');
    wordInput.classList.add('word_input');
    wordInput.maxLength = 1;
    wordWrapper.appendChild(wordInput);
  }
  wordWrapper.childNodes[0].focus();

}
start();

function clear() {
while (wordWrapper.childNodes.length > 0) {
  wordWrapper.childNodes[0].remove();
}
  // wordWrapper.childNodes.forEach((ff) => {
  //   console.log("🚀 ~ clear ~ wordWrapper.childNodes.length:", wordWrapper.childNodes.length)
  //   wordWrapper.removeChild(ff);//removeChild();
  // })
  // wordWrapper.childNodes.length;
  tryClear();
  mistakesClear();
  
}

function reset() {
  wordWrapper.childNodes.forEach((wordWrong) => {
    wordWrong.value = "";
  });
  wordWrapper.childNodes[0].focus();
  tryClear();
  mistakesClear();
}
randomBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);

wordWrapper.addEventListener("keyup", (e) => {
  if (exceptKey.includes(e.key)) {
    return;
  } else {
  const arrayInputs= Array.from(wordWrapper.children)
  const index = arrayInputs.findIndex((el) => {
    return el === e.target;
  });
  if ((e.target.value === currentWord[index])) {
    e.target.classList.remove('wrong');
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    } else { 
      if (confirm("Чувак ты просто гений, го еще разок?")) {
      start();
      }
    }
  } 
  else {
    e.target.classList.add('wrong');
    if (tries >= 5) {
      start();

    } else {
      tryAdd();
      triesNumber.textContent = tries;
      if (mistakesText.textContent === "") {
        mistakesText.textContent += `${e.key}`;
      } else {
        mistakesText.textContent += `, ${e.key}`;
      }
    }
  }
}
})

function tryAdd() {
  circle[tries].classList.add('active');
  tries += 1;
};
function tryClear() {
  tries = 0;
  circle.forEach((el) => {
    el.classList.remove('active');
  });
  triesNumber.textContent = tries;
}
function mistakesClear() {
  mistakesText.textContent = "";
}


function randomExceptRange(maxValue, exceptRange) {
    const randomNumber = Math.floor(Math.random()*maxValue);
    // console.log('randomNumber',randomNumber);
    const foundNumber= exceptRange.find((exceptNumber) => {
      return exceptNumber === randomNumber
    });
    if (foundNumber !== undefined) {
      return randomExceptRange(maxValue, exceptRange);
    } else {
    return randomNumber
  };
}
// console.log('randomExceptRange(6, [1,2,3,4,5])',randomExceptRange(6, [1,2,3,4,5]));
// console.log(randomExceptRange(3, []));
// console.log(randomExceptRange(4, [0,3]));

function scrambleWord(word) {
  // Scramble and return the scrambled word
  const exceptResult = [];
  let resultWord = '';
   for (let _ in word) {
    const randomIndex = randomExceptRange(word.length, exceptResult);
    exceptResult.push(randomIndex);

    resultWord = resultWord + word[randomIndex];
  }
  return resultWord;
}
// console.log("🚀 ~ scrambleWord ~ scrambleWord:", scrambleWord("example"));
// console.log("🚀 ~ scrambleWord ~ scrambleWord:", scrambleWord(""));
// console.log("🚀 ~ scrambleWord ~ scrambleWord:", scrambleWord("example310"));

function generateRandomWord() {
  const randomIndexWord = Math.floor(Math.random()*words.length);
  currentWord = words[randomIndexWord];
  return scrambleWord(currentWord);
}

function createInputFields(length) {
  // Create number of input fields according to the number of letters
}

function handleInput(event) {
  // Handle input change event
}

function resetGame() {
  // Handle game reset button
}

// document
//   .getElementById("randomButton")
//   .addEventListener("click", generateRandomWord);
// document.getElementById("resetButton").addEventListener("click", resetGame);

// // Initial load
// generateRandomWord();
