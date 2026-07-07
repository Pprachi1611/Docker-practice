import Button from "./Button";
import "./ButtonGrid.css";

function ButtonGrid({ onButtonClick }) {

  const buttons = [
    "AC", "⌫", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "±", "0", ".", "="
  ];

  return (

    <div className="button-grid">

      {buttons.map((btn) => (

        <Button
          key={btn}
          value={btn}
          onClick={onButtonClick}
        />

      ))}

    </div>

  );

}

export default ButtonGrid;