"use strict";

const switch_inp = document.querySelector(".switch");
const screen_inp = document.querySelector(".screen");
const inputs_container = document.querySelector(".inputs");

class Calculator {
  #theme = 1;
  #operation = false;
  #operationType;

  #firstNum = 0;
  #secondNum = 0;

  constructor() {
    switch_inp.addEventListener("mousedown", (e) => {
      this._changeToggleColor();
    });
    switch_inp.addEventListener("mouseup", () => {
      ++this.#theme;
      if (this.#theme === 4) this.#theme = 1;

      this._switchTheme();
    });
    switch_inp.addEventListener("mouseout", (e) => {
      this._resetSwitchColors();
    });

    inputs_container.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("inputs")) return;

      this._changeColor(e.target.value, true);
    });
    inputs_container.addEventListener("mouseup", (e) => {
      if (e.target.classList.contains("inputs")) return;

      this._handleButtonPress(e.target.value);

      this._changeColor(e.target.value);
    });
    inputs_container.addEventListener("mouseout", (e) => {
      if (e.target.classList.contains("inputs")) return;

      this._changeColor(e.target.value);
    });

    document.addEventListener("keydown", (e) => {
      this._changeColor(e.key, true);

      // console.log(e);
      if (
        e.key === "!" ||
        e.key === "@" ||
        e.key === "#" ||
        e.key === "Control"
      )
        this._changeToggleColor();
    });
    document.addEventListener("keyup", (e) => {
      this._handleButtonPress(e.key);
      this._changeColor(e.key);

      if (e.key === "!") {
        this.#theme = 1;
        this._switchTheme();
      }
      if (e.key === "@") {
        this.#theme = 2;
        this._switchTheme();
      }
      if (e.key === "#") {
        this.#theme = 3;
        this._switchTheme();
      }
      if (e.key === "Control") {
        ++this.#theme;
        if (this.#theme === 4) this.#theme = 1;

        this._switchTheme();
      }
    });
  }

  _changeColor(key, pressed = false) {
    switch (key) {
      case "Delete":
      case "del":
      case "Backspace":
        document.querySelector(`.btn-del`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-alt)`;
        break;

      case "r":
      case "res":
      case "R":
        document.querySelector(`.btn-res`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-alt)`;
        break;

      case "=":
      case "e":
      case "eq":
      case "E":
      case "Enter":
        document.querySelector(`.btn-eq`).style.backgroundColor = `var(--th-${
          this.#theme
        }-eq-toggle-${pressed ? "press-" : ""}bg)`;
        break;

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
        document.querySelector(
          `.btn-${key}`
        ).style.backgroundColor = `var(--th-${this.#theme}-key-${
          pressed ? "press-" : ""
        }bg-main)`;
        break;

      case ".":
      case "frac":
        document.querySelector(`.btn-frac`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-main)`;
        break;

      case "+":
      case "p":
      case "P":
      case "s":
      case "sum":
        document.querySelector(`.btn-sum`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-main)`;
        break;

      case "-":
      case "m":
      case "M":
      case "S":
      case "sub":
        document.querySelector(`.btn-sub`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-main)`;
        break;

      case "/":
      case "d":
      case "D":
      case "div":
        document.querySelector(`.btn-div`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-main)`;
        break;

      case "*":
      case "x":
      case "X":
      case "t":
      case "T":
      case "mul":
        document.querySelector(`.btn-mul`).style.backgroundColor = `var(--th-${
          this.#theme
        }-key-${pressed ? "press-" : ""}bg-main)`;
        break;
    }
  }

  _switchTheme() {
    this._changeTheme(this.#theme);
    this._moveToggle(this.#theme);

    this._resetSwitchColors();
  }

  _resetSwitchColors() {
    switch_inp.firstElementChild.style.backgroundColor = `var(--th-${
      this.#theme
    }-eq-toggle-bg)`;
  }

  _handleButtonPress(btnValue) {
    switch (btnValue) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        this._putInNumber(btnValue);
        break;
      }

      case ".":
      case "frac": {
        this._putInNumber(".");
        break;
      }

      case "r":
      case "res":
      case "R": {
        this._resetScreen();
        this._resetNumbers();
        break;
      }

      case "Delete":
      case "del":
      case "Backspace": {
        this._delete1NumberFromScreen();
        break;
      }

      case "+":
      case "p":
      case "P":
      case "s":
      case "sum": {
        this._addOperation("sum");
        break;
      }
      case "-":
      case "m":
      case "M":
      case "S":
      case "sub": {
        this._addOperation("sub");
        break;
      }
      case "*":
      case "x":
      case "X":
      case "t":
      case "T":
      case "mul": {
        this._addOperation("mul");
        break;
      }
      case "/":
      case "D":
      case "d":
      case "div": {
        this._addOperation("div");
        break;
      }

      case "=":
      case "e":
      case "E":
      case "eq":
      case "Enter": {
        this._getResult();

        this._resetNumbers();
        break;
      }
    }
  }

  _changeToggleColor() {
    switch_inp.firstElementChild.style.backgroundColor = `var(--th-${
      this.#theme
    }-eq-toggle-press-bg)`;
  }

  _calculate(firstNum, type, secondNum) {
    if (type === "sum") return firstNum + secondNum;
    if (type === "sub") return firstNum - secondNum;
    if (type === "mul") return firstNum * secondNum;
    if (type === "div") return firstNum / secondNum;
  }

  _resetNumbers() {
    this.#firstNum = 0;
    this.#secondNum = 0;
  }

  _moveToggle(themeNum) {
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
  }

  _putInNumber(number) {
    if (screen_inp.value === "0" || this.#operation)
      (screen_inp.value = number), (this.#operation = false);
    else screen_inp.value += number;
  }

  _resetScreen() {
    screen_inp.value = "0";
  }

  _delete1NumberFromScreen() {
    let inp = screen_inp.value;

    if (inp.length > 1) screen_inp.value = inp.slice(0, inp.length - 1);
    else screen_inp.value = "0";
  }

  _addOperation(type) {
    if (this.#firstNum && !this.#operation) return;

    this.#operation = true;
    this.#operationType = type;

    this.#firstNum = Number.parseFloat(screen_inp.value);
  }

  _getResult() {
    if (!this.#firstNum) return;

    this.#secondNum = Number.parseFloat(screen_inp.value);

    screen_inp.value = this._calculate(
      this.#firstNum,
      this.#operationType,
      this.#secondNum
    );
  }

  _changeTheme = function (themeNum) {
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
      if (button.value === "del" || button.value === "res") {
        button.style.backgroundColor = `var(--th-${themeNum}-key-bg-alt)`;
        button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-key-sh-alt)`;
      } else if (button.value === "eq") {
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
}
const app = new Calculator();

// const switch_inp = document.querySelector(".switch");
// const screen_inp = document.querySelector(".screen");
// const inputs_container = document.querySelector(".inputs");

// let theme = 1;
// let operation = false;
// let operationType;

// let firstNum = 0;
// let secondNum = 0;

// const calculate = function (firstNum, type, secondNum) {
//   if (type === "sum") return firstNum + secondNum;
//   if (type === "sub") return firstNum - secondNum;
//   if (type === "mul") return firstNum * secondNum;
//   if (type === "div") return firstNum / secondNum;
// };

// const changeColor = function (key, pressed = false) {
//   switch (key) {
//     case "Delete":
//     case "del":
//     case "Backspace":
//       document.querySelector(
//         `.btn-del`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-alt)`;
//       break;

//     case "r":
//     case "res":
//     case "R":
//       document.querySelector(
//         `.btn-res`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-alt)`;
//       break;

//     case "=":
//     case "e":
//     case "eq":
//     case "E":
//     case "Enter":
//       document.querySelector(
//         `.btn-eq`
//       ).style.backgroundColor = `var(--th-${theme}-eq-toggle-${
//         pressed ? "press-" : ""
//       }bg)`;
//       break;

//     case "0":
//     case "1":
//     case "2":
//     case "3":
//     case "4":
//     case "5":
//     case "6":
//     case "7":
//     case "8":
//     case "9":
//       document.querySelector(
//         `.btn-${key}`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;

//     case ".":
//     case "frac":
//       document.querySelector(
//         `.btn-frac`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;

//     case "+":
//     case "p":
//     case "P":
//     case "s":
//     case "sum":
//       document.querySelector(
//         `.btn-sum`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;

//     case "-":
//     case "m":
//     case "M":
//     case "S":
//     case "sub":
//       document.querySelector(
//         `.btn-sub`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;

//     case "/":
//     case "d":
//     case "D":
//     case "div":
//       document.querySelector(
//         `.btn-div`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;

//     case "*":
//     case "x":
//     case "X":
//     case "t":
//     case "T":
//     case "mul":
//       document.querySelector(
//         `.btn-mul`
//       ).style.backgroundColor = `var(--th-${theme}-key-${
//         pressed ? "press-" : ""
//       }bg-main)`;
//       break;
//   }
// };

// const handleButtonPress = function (btnValue) {
//   switch (btnValue) {
//     case "0":
//     case "1":
//     case "2":
//     case "3":
//     case "4":
//     case "5":
//     case "6":
//     case "7":
//     case "8":
//     case "9": {
//       putInNumber(btnValue);
//       break;
//     }

//     case ".":
//     case "frac": {
//       putInNumber(".");
//       break;
//     }

//     case "r":
//     case "res":
//     case "R": {
//       resetScreen();
//       resetNumbers();
//       break;
//     }

//     case "Delete":
//     case "del":
//     case "Backspace": {
//       delete1NumberFromScreen();
//       break;
//     }

//     case "+":
//     case "p":
//     case "P":
//     case "s":
//     case "sum": {
//       addOperation("sum");
//       break;
//     }
//     case "-":
//     case "m":
//     case "M":
//     case "S":
//     case "sub": {
//       addOperation("sub");
//       break;
//     }
//     case "*":
//     case "x":
//     case "X":
//     case "t":
//     case "T":
//     case "mul": {
//       addOperation("mul");
//       break;
//     }
//     case "/":
//     case "D":
//     case "d":
//     case "div": {
//       addOperation("div");
//       break;
//     }

//     case "=":
//     case "e":
//     case "E":
//     case "eq":
//     case "Enter": {
//       getResult();

//       resetNumbers();
//       break;
//     }
//   }
// };

// const resetNumbers = function () {
//   firstNum = 0;
//   secondNum = 0;
// };

// const changeToggleColor = function () {
//   switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-toggle-press-bg)`;
// };
// const resetSwitchColors = function () {
//   switch_inp.firstElementChild.style.backgroundColor = `var(--th-${theme}-eq-toggle-bg)`;
// };

// const switchTheme = function () {
//   changeTheme(theme);
//   moveToggle(theme);

//   resetSwitchColors();
// };
// const changeTheme = function (themeNum) {
//   // Main Background
//   document.querySelector(
//     "body"
//   ).style.backgroundColor = `var(--th-${themeNum}-main-bg)`;

//   // Header
//   document.querySelector(
//     ".header"
//   ).style.color = `var(--th-${themeNum}-text-input)`;

//   // Screen
//   screen_inp.style.color = `var(--th-${themeNum}-text-input)`;
//   screen_inp.style.backgroundColor = `var(--th-${themeNum}-screen-bg)`;

//   // Switch Background
//   document.querySelector(
//     ".switch"
//   ).style.backgroundColor = `var(--th-${themeNum}-toggle-bg)`;

//   // Switch Toggle
//   document.querySelector(
//     ".toggle"
//   ).style.backgroundColor = `var(--th-${themeNum}-eq-toggle-bg)`;

//   // Keyboard Background
//   inputs_container.style.backgroundColor = `var(--th-${themeNum}-toggle-bg)`;
//   // Keys
//   inputs_container.querySelectorAll("button").forEach((button) => {
//     // ${themeNum}
//     if (button.value === "del" || button.value === "res") {
//       button.style.backgroundColor = `var(--th-${themeNum}-key-bg-alt)`;
//       button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-key-sh-alt)`;
//     } else if (button.value === "eq") {
//       button.style.backgroundColor = `var(--th-${themeNum}-eq-toggle-bg)`;
//       button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-eq-sh)`;
//       button.style.color = `var(--th-${themeNum}-text-eq)`;
//     } else {
//       button.style.backgroundColor = `var(--th-${themeNum}-key-bg-main)`;
//       button.style.boxShadow = `0 5px 0 0 var(--th-${themeNum}-key-sh-main)`;
//       button.style.color = `var(--th-${themeNum}-text)`;
//     }
//   });
// };

// const moveToggle = function (themeNum) {
//   const toggle = document.querySelector(".toggle");

//   if (themeNum === 1) {
//     toggle.style.left = `calc(0% + 6px)`;
//     toggle.style.transform = `translate(0%, -50%)`;
//   }
//   if (themeNum === 2) {
//     toggle.style.left = `calc(50% + 0px)`;
//     toggle.style.transform = `translate(-50%, -50%)`;
//   }
//   if (themeNum === 3) {
//     toggle.style.left = `calc(100% - 6px)`;
//     toggle.style.transform = `translate(-100%, -50%)`;
//   }
// };

// const putInNumber = function (number) {
//   if (screen_inp.value === "0" || operation)
//     (screen_inp.value = number), (operation = false);
//   else screen_inp.value += number;
// };

// const resetScreen = function () {
//   screen_inp.value = "0";
// };

// const delete1NumberFromScreen = function () {
//   let inp = screen_inp.value;

//   if (inp.length > 1) screen_inp.value = inp.slice(0, inp.length - 1);
//   else screen_inp.value = "0";
// };

// const addOperation = function (type) {
//   if (firstNum && !operation) return;

//   operation = true;
//   operationType = type;

//   firstNum = Number.parseFloat(screen_inp.value);
// };

// const getResult = function () {
//   if (!firstNum) return;

//   secondNum = Number.parseFloat(screen_inp.value);

//   screen_inp.value = calculate(firstNum, operationType, secondNum);
// };

// switch_inp.addEventListener("mousedown", function (e) {
//   changeToggleColor();
// });
// switch_inp.addEventListener("mouseup", function () {
//   ++theme;
//   if (theme === 4) theme = 1;

//   switchTheme();
// });
// switch_inp.addEventListener("mouseout", function (e) {
//   resetSwitchColors();
// });

// inputs_container.addEventListener("mousedown", function (e) {
//   if (e.target.classList.contains("inputs")) return;

//   changeColor(e.target.value, true);
// });
// inputs_container.addEventListener("mouseup", function (e) {
//   if (e.target.classList.contains("inputs")) return;

//   handleButtonPress(e.target.value);

//   changeColor(e.target.value);
// });
// inputs_container.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("inputs")) return;

//   changeColor(e.target.value);
// });

// document.addEventListener("keydown", function (e) {
//   changeColor(e.key, true);

//   // console.log(e);
//   if (e.key === "!" || e.key === "@" || e.key === "#" || e.key === "Control")
//     changeToggleColor();
// });
// document.addEventListener("keyup", function (e) {
//   handleButtonPress(e.key);
//   changeColor(e.key);

//   if (e.key === "!") {
//     theme = 1;
//     switchTheme();
//   }
//   if (e.key === "@") {
//     theme = 2;
//     switchTheme();
//   }
//   if (e.key === "#") {
//     theme = 3;
//     switchTheme();
//   }
//   if (e.key === "Control") {
//     ++theme;
//     if (theme === 4) theme = 1;

//     switchTheme();
//   }
// });
