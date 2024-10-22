const header = document.querySelector(".header");
const switch_inp = document.querySelector(".switch");

const screen_inp = document.querySelector(".screen");

const inputs_container = document.querySelector(".inputs");

let theme = 1;
let dot = false;
let operation = false;
let operationType;

let firstNum = 0;
let secondNum = 0;

const calculate = function (firstNum, type, secondNum) {
  console.log("Calculating...");
  console.log(`${firstNum} ${type} ${secondNum}`);

  if (type === "+") return firstNum + secondNum;
  if (type === "-") return firstNum - secondNum;
  if (type === "x") return firstNum * secondNum;
  if (type === "/") return firstNum / secondNum;
};

const resetNumbers = function () {
  firstNum = 0;
  secondNum = 0;
};

switch_inp.addEventListener("mousedown", function () {
  switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-press-toggle-bg)`;
});
switch_inp.addEventListener("mouseup", function () {
  switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-toggle-bg)`;
});

inputs_container.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("inputs")) return;

  switch (e.target.value) {
    case "del":
    case "reset":
      e.target.style.backgroundColor = `var(--th-${theme}-key-press-bg-alt)`;
      break;

    case "=":
      e.target.style.backgroundColor = `var(--th-${theme}-eq-toggle-press-bg)`;
      break;

    default:
      e.target.style.backgroundColor = `var(--th-${theme}-key-press-bg-main)`;
      break;
  }
});
const resetColors = function (e) {
  switch (e.target.value) {
    case "del":
    case "reset":
      e.target.style.backgroundColor = `var(--th-${theme}-key-bg-alt)`;
      break;

    case "=":
      e.target.style.backgroundColor = `var(--th-${theme}-eq-toggle-bg)`;
      break;

    default:
      e.target.style.backgroundColor = `var(--th-1-key-bg-main)`;
      break;
  }
};
inputs_container.addEventListener("mouseup", function (e) {
  if (e.target.classList.contains("inputs")) return;

  switch (e.target.value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".": {
      if (screen_inp.value === "0" || operation)
        (screen_inp.value = e.target.value), (operation = false);
      else screen_inp.value += e.target.value;
      break;
    }

    case "reset": {
      screen_inp.value = "0";

      resetNumbers();
      break;
    }

    case "del": {
      let inp = screen_inp.value;

      if (inp.length > 1) screen_inp.value = inp.slice(0, inp.length - 1);
      else screen_inp.value = "0";
      break;
    }

    case "+":
    case "-":
    case "x":
    case "/": {
      if (firstNum) break;

      operation = true;
      operationType = e.target.value;

      firstNum = Number.parseFloat(screen_inp.value);
      break;
    }

    case "=": {
      if (!firstNum) break;

      secondNum = Number.parseFloat(screen_inp.value);

      screen_inp.value = calculate(firstNum, operationType, secondNum);

      resetNumbers();
      break;
    }
  }

  resetColors(e);
});
inputs_container.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("inputs")) return;

  resetColors(e);
});
