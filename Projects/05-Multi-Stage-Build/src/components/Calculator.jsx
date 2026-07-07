import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import "./Calculator.css";
import { calculate } from "../utils/calculator";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);

  function handleButton(value) {

    // Numbers
    if (!isNaN(value)) {
      if (display === "0")
        setDisplay(value);
      else
        setDisplay(display + value);

      return;
    }

    // Decimal
    if (value === ".") {
      if (!display.includes("."))
        setDisplay(display + ".");
      return;
    }

    // Clear
    if (value === "AC") {
      setDisplay("0");
      setFirstValue(null);
      setOperator(null);
      return;
    }

    // Delete
    if (value === "⌫") {
      if (display.length === 1)
        setDisplay("0");
      else
        setDisplay(display.slice(0, -1));
      return;
    }

    // Positive / Negative
    if (value === "±") {
      if (display.startsWith("-"))
        setDisplay(display.substring(1));
      else
        setDisplay("-" + display);
      return;
    }

    // Percentage
    if (value === "%") {
      setDisplay((parseFloat(display) / 100).toString());
      return;
    }

    // Operators
    if (["+", "-", "×", "÷"].includes(value)) {
      setFirstValue(display);
      setOperator(value);
      setDisplay("0");
      return;
    }

    // Equals
    if (value === "=") {
      if (firstValue && operator) {
        const result = calculate(firstValue, display, operator);

        setDisplay(result);
        setFirstValue(null);
        setOperator(null);
      }
    }
  }

  return (
    <div className="calculator">

      <h2 className="title">React Calculator</h2>

      <Display value={display} />

      <ButtonGrid onButtonClick={handleButton} />

    </div>
  );
}

export default Calculator;