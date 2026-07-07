export function calculate(first, second, operator) {
  const a = parseFloat(first);
  const b = parseFloat(second);

  switch (operator) {
    case "+":
      return (a + b).toString();

    case "-":
      return (a - b).toString();

    case "×":
      return (a * b).toString();

    case "÷":
      if (b === 0) return "Error";
      return (a / b).toString();

    default:
      return second;
  }
}