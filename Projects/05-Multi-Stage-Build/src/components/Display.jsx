import "./Display.css";

function Display({ value, operator, firstValue }) {
  return (
    <div className="display-container">
      <div className="operation">
        {firstValue && operator ? `${firstValue} ${operator}` : ""}
      </div>

      <div className="display">
        {value}
      </div>
    </div>
  );
}

export default Display;