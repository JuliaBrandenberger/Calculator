/**
 * add, subtract, multiply, divide
 * @typedef {"+"|"-"|"*"|"/"} Operator
 */

function add(a,b) {
  return Math.round((a + b) * 10000)/10000;
}

function subtract(a,b) {
  return Math.round((a - b) * 10000)/10000;
}

function multiply(a,b) {
  return Math.round((a * b) * 10000)/10000;
}

function divide(a,b) {
  if (b === 0) {
    return "Can't divide by zero, you silly thing";
  } else {
    return Math.round((a / b) * 10000)/10000;
  }
}



/**
 * applies operation to two numbers
 * @param {Operator} operator 
 * @param {number} num1 
 * @param {number} num2 
 * @returns {number} 
 */
function operate(operator, num1, num2) {
  if (num2 === undefined) {
    return num1;
  } else if (operator === "+") {
    return add(num1,num2);
  } else if (operator === "-") {
    return subtract(num1,num2);
  } else if (operator === "*") {
    return multiply(num1,num2);
  } else if (operator === "/") {
    return divide(num1,num2);
  } else {
    throw new Error(`Unknown Operator: ${operator}`);
  }
}

let displayBox = document.getElementById("display-text");

/**
 * displays number that was clicked in display box
 * @param {string} string
 */
let displayValue = function(string) {
  displayBox.textContent = string;
}

let firstNum = "";
let secondNum = "";

/**
 * display that number in display box, updates value of first num
 * @param {Event} event 
 */
function handleNumberClick(event) {
  if (op === null) {
    // if (firstNum.length > 11) {
    //   return;
    // }
    firstNum = firstNum + event.target.textContent;
    displayValue(firstNum);
  } else {
    // if (secondNum.length > 11) {
    //   return;
    // }
    secondNum = secondNum + event.target.textContent;
    displayValue(secondNum);
  }
  playSound(event);
}


/**
 * checks to see if character appears
 * @param {string} char 
 * @param {string} string 
 * @returns 
 */
function appears(char, string) {
  let alreadySeen = false;
  for (let i = 0; i <= string.length; i++) {
    if (string.charAt(i) === char) {
      if (alreadySeen) {
        return true;
      } else {
        alreadySeen = true;
      }
    }
  }
  return false; 
};

/**
 * 
 * @param {string} char 
 * @param {string} string 
 * @param {boolean} haveAlreadySeen 
 */
function repeats(char, string, haveAlreadySeen) {
  if (string === "") {
    return false;
  }
  let first = string.charAt(0);
  let rest = string.slice(1); // starts at index 1 goes to end of string
  if (first === char) {
    if (haveAlreadySeen) {
      return true;
    } else {
      haveAlreadySeen = true;
    }
  }
  return repeats(char, rest, haveAlreadySeen);
}


let op = null;

/**
 * updates value of op to whatever operation was clicked
 * @param {Event} event 
 */
function handleOperatorClick(event) {
  if (secondNum) {// then you do its like hitting the equals button, if no second number then jjst do normal case
    let answer = operate(op, Number(firstNum), Number(secondNum));
    displayValue(answer);
    firstNum = answer;
    secondNum = "";
  }
  op = event.target.textContent;
  playSound(event);
}

// put an event listener on every element of the .number-button class
for (let elem of document.querySelectorAll(".number-button")) {
  elem.addEventListener("click",handleNumberClick);
}

// put an event listener on every element of the .operator-button class
for (let elem of document.querySelectorAll(".operator-button")) {
  elem.addEventListener("click",handleOperatorClick);
}


/**
 * calls operate and displays result of operation
 * @param {Event} event 
 */
function handleEqualsClick(event) {
  //displayValue(operate(op, firstNum, secondNum));
  if (op === null) {
    return;
  }
  let answer = operate(op, Number(firstNum), Number(secondNum));
  displayValue(answer);
  playSound(event);
}

// put an event listener on the equals button
let equals = document.getElementById("equals");
equals.addEventListener("click", handleEqualsClick);

// put an event listener on the dot button 
let dot = document.getElementById("dot-button");
dot.addEventListener("click", handleDotClick);

/**
 * determines whether or not to add the dot to the string
 * @param {event} event 
 */
function handleDotClick(event) {
  if (op === null) {
    if (firstNum.includes(".")) {
      return;
    }
    firstNum = firstNum + event.target.textContent;
    displayValue(firstNum);
  } else {
    if (secondNum.includes(".")) {
      return;
    }
    secondNum = secondNum + event.target.textContent;
    displayValue(secondNum);
  }
  playSound(event);
};

let clear = document.getElementById("clear-button");
clear.addEventListener("click", handleClearClick);

function handleClearClick(event) {
  displayBox.textContent = "";
  firstNum = "";
  secondNum = "";
  op = null;
  playSound(event);
}

/**
 * @param {Event} e
 */
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.target.textContent}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}