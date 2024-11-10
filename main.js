document.addEventListener('DOMContentLoaded', () => {
    // Select the display and buttons
    const display = document.querySelector('.calculator-display');
    const buttons = document.querySelectorAll('.button');
  
    // Variables to store values for calculations
    let currentInput = '0';      // Current input shown on the display
    let previousInput = '';      // Previous input before an operator is clicked
    let operator = null;         // Current operator
    let shouldResetDisplay = false;  // Flag to reset display on next input
  
    // Function to update the display
    function updateDisplay() {
      display.textContent = currentInput;
    }
  
    // Function to handle number input
    function handleNumber(number) {
      if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
      } else {
        currentInput += number;
      }
      updateDisplay();
    }
  
    // Function to handle operator input
    function handleOperator(nextOperator) {
      if (operator && !shouldResetDisplay) {
        calculate();
      }
      operator = nextOperator;
      previousInput = currentInput;
      shouldResetDisplay = true;
    }
  
    // Function to handle calculation
    function calculate() {
      let prev = parseFloat(previousInput);
      let curr = parseFloat(currentInput);
      if (isNaN(prev) || isNaN(curr)) return;
  
      switch (operator) {
        case '+':
          currentInput = (prev + curr).toString();
          break;
        case '-':
          currentInput = (prev - curr).toString();
          break;
        case '*':
          currentInput = (prev * curr).toString();
          break;
        case '/':
          currentInput = curr === 0 ? 'Error' : (prev / curr).toString();
          break;
        default:
          return;
      }
      operator = null;
      previousInput = '';
      shouldResetDisplay = true;
      updateDisplay();
    }
  
    // Function to handle decimal point
    function handleDecimal() {
      if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
      }
      if (!currentInput.includes('.')) {
        currentInput += '.';
      }
      updateDisplay();
    }
  
    // Function to handle reset (clear)
    function resetCalculator() {
      currentInput = '0';
      previousInput = '';
      operator = null;
      shouldResetDisplay = false;
      updateDisplay();
    }
  
    // Add event listeners to all buttons
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;
  
        // Check the button type and handle accordingly
        if (parseFloat(value) >= 0 || value === '0') {
          handleNumber(value);
        } else if (value === '.') {
          handleDecimal();
        } else if (value === '=') {
          calculate();
        } else if (value === 'C') {  // Clear button logic
          resetCalculator();
        } else {  // For operators (+, -, *, /)
          handleOperator(value);
        }
      });
    });
  
    // Initialize display
    updateDisplay();
  });
  