import Button from "./Button";
import "./ButtonGrid.css";

function ButtonGrid({ onButtonClick }) {

  return (
    <div className="button-grid">

      <Button value="AC" onClick={onButtonClick}/>
      <Button value="⌫" onClick={onButtonClick}/>
      <Button value="%" onClick={onButtonClick}/>
      <Button value="÷" onClick={onButtonClick}/>

      <Button value="7" onClick={onButtonClick}/>
      <Button value="8" onClick={onButtonClick}/>
      <Button value="9" onClick={onButtonClick}/>
      <Button value="×" onClick={onButtonClick}/>

      <Button value="4" onClick={onButtonClick}/>
      <Button value="5" onClick={onButtonClick}/>
      <Button value="6" onClick={onButtonClick}/>
      <Button value="-" onClick={onButtonClick}/>

      <Button value="1" onClick={onButtonClick}/>
      <Button value="2" onClick={onButtonClick}/>
      <Button value="3" onClick={onButtonClick}/>
      <Button value="+" onClick={onButtonClick}/>

      <Button value="0" onClick={onButtonClick}/>
      <Button value="." onClick={onButtonClick}/>
      <Button value="=" onClick={onButtonClick}/>

    </div>
  );
}

export default ButtonGrid;