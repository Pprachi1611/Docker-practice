import "./Button.css";

function Button({ value, onClick }) {
  const operatorButtons = ["+", "-", "×", "÷", "="];
  const specialButtons = ["AC", "⌫", "%", "±"];

  let className = "btn";

  if (operatorButtons.includes(value)) {
    className += " operator";
  }

  if (specialButtons.includes(value)) {
    className += " special";
  }

  if (value === "0") {
    className += " zero";
  }

  return (
    <button
      className={className}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;