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
      e.target.style.backgroundColor = `var(--th-${theme}-key-bg-main)`;
      break;
  }
};
const resetSwitchColors = function () {
  switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-toggle-bg)`;
};

const changeTheme = function (themeNum) {
  // Main Background
  document.querySelector(
    "body"
  ).style.backgroundColor = `var(--th-${themeNum}-main-bg)`;

  // Header
  document.querySelector(
    ".header"
  ).style.color = `var(--th-${themeNum}-text-input)`;

  // Screen
  screen_inp.style.color = `var(--th-${themeNum}-text-input)`;
  screen_inp.style.backgroundColor = `var(--th-${themeNum}-screen-bg)`;

  // Switch Background
  document.querySelector(
    ".switch"
  ).style.backgroundColor = `var(--th-${themeNum}-toggle-bg)`;

  // Switch Toggle
  document.querySelector(
    ".toggle"
  ).style.backgroundColor = `var(--th-${themeNum}-eq-toggle-bg)`;

  // Keyboard Background
  inputs_container.style.backgroundColor = `var(--th-${themeNum}-toggle-bg)`;
  // Keys
  inputs_container.querySelectorAll("button").forEach((button) => {
    // ${themeNum}
    if (button.value === "del" || button.value === "reset") {
      button.style.backgroundColor = `var(--th-${themeNum}-key-bg-alt)`;
      button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-key-sh-alt)`;
    } else if (button.value === "=") {
      button.style.backgroundColor = `var(--th-${themeNum}-eq-toggle-bg)`;
      button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-eq-sh)`;
      button.style.color = `var(--th-${themeNum}-text-eq)`;
    } else {
      button.style.backgroundColor = `var(--th-${themeNum}-key-bg-main)`;
      button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-key-sh-main)`;
      button.style.color = `var(--th-${themeNum}-text)`;
    }
  });
};

const moveToggle = function (themeNum) {
  const toggle = document.querySelector(".toggle");

  if (themeNum === 1) {
    toggle.style.left = `calc(0% + 6px)`;
    toggle.style.transform = `translate(0%, -50%)`;
  }
  if (themeNum === 2) {
    toggle.style.left = `calc(50% + 0px)`;
    toggle.style.transform = `translate(-50%, -50%)`;
  }
  if (themeNum === 3) {
    toggle.style.left = `calc(100% - 6px)`;
    toggle.style.transform = `translate(-100%, -50%)`;
  }
};

const putInNumber = function (number) {
  if (screen_inp.value === "0" || operation)
    (screen_inp.value = number), (operation = false);
  else screen_inp.value += number;
};

const resetScreen = function () {
  screen_inp.value = "0";
};

const delete1NumberFrom = function () {
  let inp = screen_inp.value;

  if (inp.length > 1) screen_inp.value = inp.slice(0, inp.length - 1);
  else screen_inp.value = "0";
};

const addOperation = function (type) {
  if (firstNum && !operation) return;

  operation = true;
  operationType = type;

  firstNum = Number.parseFloat(screen_inp.value);
};

const getResult = function () {
  if (!firstNum) return;

  secondNum = Number.parseFloat(screen_inp.value);

  screen_inp.value = calculate(firstNum, operationType, secondNum);
};

switch_inp.addEventListener("mousedown", function (e) {
  switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-toggle-press-bg)`;
});
switch_inp.addEventListener("mouseup", function (e) {
  ++theme;
  if (theme === 4) theme = 1;
  changeTheme(theme);
  moveToggle(theme);

  resetSwitchColors();
});
switch_inp.addEventListener("mouseout", function (e) {
  resetSwitchColors();
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
      putInNumber(e.target.value);
      break;
    }

    case "reset": {
      resetScreen();
      resetNumbers();
      break;
    }

    case "del": {
      delete1NumberFrom();
      break;
    }

    case "+":
    case "-":
    case "x":
    case "/": {
      addOperation(e.target.value);
      break;
    }

    case "=": {
      getResult();

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
