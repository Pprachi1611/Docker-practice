import { useState, useEffect } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import History from "./History";
import "./Calculator.css";
import { calculate } from "../utils/calculator";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  function handleButton(value) {
    // Numbers
    if (!isNaN(value)) {

    if (resetDisplay) {
        setDisplay(value);
        setResetDisplay(false);
        return;
    }

    if (display === "0") {
        setDisplay(value);
    } else {
        setDisplay(display + value);
    }

    return;
    }

    // Decimal
    if (value === ".") {

    if (resetDisplay) {
        setDisplay("0.");
        setResetDisplay(false);
        return;
    }

    if (!display.includes(".")) {
        setDisplay(display + ".");
    }

    return;
    }

    // Clear
    if (value === "AC") {
      setDisplay("0");
      setFirstValue(null);
      setOperator(null);
      setHistory([]);
      return;
    }

    // Delete
    if (value === "⌫") {
      if (display.length === 1 || display === "Error") {
        setDisplay("0");
      } else {
        setDisplay(display.slice(0, -1));
      }
      return;
    }

    // Positive / Negative
    if (value === "±") {
      if (display === "0") return;

      if (display.startsWith("-")) {
        setDisplay(display.substring(1));
      } else {
        setDisplay("-" + display);
      }
      return;
    }

    // Percentage
    if (value === "%") {
      setDisplay((parseFloat(display) / 100).toString());
      return;
    }

      
    // Operators
    if (["+", "-", "×", "÷"].includes(value)) {

    if (firstValue !== null && display === "0" && !resetDisplay) {
        setOperator(value);
        return;
    }

    if (firstValue !== null && operator && !resetDisplay) {

        const result = calculate(firstValue, display, operator);

        setFirstValue(result);
        setDisplay("0");
        setOperator(value);
        setResetDisplay(false);

    } else {

        setFirstValue(display);
        setDisplay("0");
        setOperator(value);
        setResetDisplay(false);

    }

    return;
    }
    // Equals
    if (value === "=") {
      if (firstValue && operator) {
        const result = calculate(firstValue, display, operator);

        setHistory((prevHistory) => [
          `${firstValue} ${operator} ${display} = ${result}`,
          ...prevHistory,
        ]);

        setDisplay(result);
        setFirstValue(null);
        setOperator(null);
        setResetDisplay(true);
      }
      return;
    }
  }

  // Keyboard Support
  useEffect(() => {
    const handleKey = (event) => {
      let key = event.key;

      if (key === "*") key = "×";
      if (key === "/") key = "÷";
      if (key === "Enter") key = "=";
      if (key === "Escape") key = "AC";
      if (key === "Backspace") key = "⌫";

      const validKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "×",
        "÷",
        "=",
        ".",
        "%",
        "⌫",
        "AC",
      ];

      if (validKeys.includes(key)) {
        handleButton(key);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <div className={darkMode ? "calculator dark" : "calculator light"}>
      <h2 className="title">React Calculator</h2>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Display
       value={display}
       operator={operator}
       firstValue={firstValue}
      />

      <ButtonGrid onButtonClick={handleButton} />

      <History history={history} />
    </div>
  );
}

export default Calculator;