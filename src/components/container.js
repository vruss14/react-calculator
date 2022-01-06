import React, { useState } from "react";

function Container() {

    // State is initially zero (what is displayed on screen)

    const [state, setState] = useState({
        userInput: '0',
    });

    function checkInput(e) {

        // Check if user pressed all clear; if so, reset the state back to zero
        if(e.target.textContent === "AC") {
            setState({userInput: '0'});
            return;

        //  Check if the user pressed the equals button; if so, run a calculation
        } else if(e.target.textContent === "=") {
            calculate();
            return;
        
        // Check the special case in which the user pressed zero, the current state is only one value long, 
        // and the current state is zero. That means the zero SHOULD be kept on screen and not replaced by next value
        } else if(e.target.textContent === '0' 
            && state.userInput.length === 1 
            && state.userInput === '0') {
            setState({userInput: e.target.textContent})
            return;
        
        // If the above condition isn't met, then check to see if the state is currently zero. If so, replace it with the new input
        // The default zero should NOT be kept in this case
        } else if (state.userInput === '0') {
            setState({userInput: e.target.textContent})

        // Check if the user input a decimal point if the state already includes one decimal point and does not include any spaces
        // Prevents the user from inputing a number like 5.5.5
        } else if (e.target.textContent === '.' && state.userInput.includes('.') && !state.userInput.includes(' ')) {
            return;

        // Check if a user input an operator; if that's the case, update state with spaces on either side of it
        // This will help keep numbers and operators separate

        } else if (e.target.textContent === '+'
            || e.target.textContent === '-'
            || e.target.textContent === 'x'
            || e.target.textContent === '/') {
            setState({userInput: state.userInput +  ' ' +  e.target.textContent + ' '})
        
        // If no special cases are met, then just update the state by adding the next value to the end of the string
        } else {
            setState({userInput: state.userInput + e.target.textContent})
            return;
        }
    }

    // Correct calculation pattern is typically number, operator, number
    // The calculator can use this pattern and return another number, which then feeds into the next calculation
    // unshift() adds the returned number back to the beginning of the calculation array to continue calculating left to right
    // A while loop is used for uncertain inputs; we aren't sure how many numbers and operators the user will input

    function calculate() {

        // Split up the string into an array; filter it so there are no empty elements in it
        let calculation = state.userInput.split(' ').filter(element => element !== '');

        // If there are three operators in a row, splice out the first two so that only the last one is used in calculating

        if(!parseInt(calculation[1]) && !parseInt(calculation[2]) && !parseInt(calculation[3])) {
            calculation.splice(1, 2);
        }

        // In the case that + + is used, remove the first + so that the numbers are added correctly

        if(calculation[1] === '+' && calculation[2] === '+') {
            calculation.splice(1, 1);
        }

        // If there is a pattern in which there is an operator then a minus sign (i.e. operating with a negative number)
        // Then get rid of the minus sign and make the next number negative so that the operation works as expected

        if((calculation[1] === '+'
        || calculation[1] === '-'
        || calculation[1] === 'x'
        || calculation[1] === '/') && calculation[2] === '-') {
            calculation.splice(2, 1)
            calculation[2] = `-${calculation[2]}`;
        }

        // Continue splicing and calculating in patterns of 3s until the result is complete

        while(calculation.length > 1) {
            let splice = calculation.splice(0, 3);

            if(splice.includes('+')) {
                calculation.unshift(addition(splice[0], splice[2]));
            } else if (splice.includes('-')) {
                calculation.unshift(subtraction(splice[0], splice[2]));
            } else if (splice.includes('x')) {
                calculation.unshift(multiply(splice[0], splice[2]));
            } else if (splice.includes('/')) {
                calculation.unshift(divide(splice[0], splice[2]));
            } else {
                console.log("Error: Please try again.")
            }
        }
        displayResult(calculation[0]);
        return calculation[0];
    }

    // Needs to use parseFloat to work with integers AND decimals properly

    function addition(a, b) {
        return parseFloat(a) + parseFloat(b);
    }

    function subtraction(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    // Prevent errors when dividing by zero

    function divide(a, b) {
        if(parseInt(b) === 0) {
            return 'ERROR'
        }
        return a / b;
    }

    function displayResult(result) {
        setState({userInput: result});
    }

  return (
    <main id="main">
        <div id="calculator-wrapper">

            <div id="screen-display-container">
                <div id="screen">
                    <p id="display">{state.userInput}</p>
                </div>
            </div>

            <div id="inputs-wrapper">
                <div className="column">
                    <button onClick={(event) => checkInput(event)} className="input" id="seven">7</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="four">4</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="one">1</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="zero">0</button>
                </div>

                <div className="column">
                    <button onClick={(event) => checkInput(event)} className="input" id="eight">8</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="five">5</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="two">2</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="decimal">.</button>
                </div>

                <div className="column">
                    <button onClick={(event) => checkInput(event)} className="input" id="nine">9</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="six">6</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="three">3</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="clear">AC</button>
                </div>

                <div className="column">
                    <button onClick={(event) => checkInput(event)} className="input" id="divide">/</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="multiply">x</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="subtract">-</button>
                    <button onClick={(event) => checkInput(event)} className="input" id="add">+</button>
                </div>
            </div>

            <div id="equals-wrapper">
                <button onClick={(event) => checkInput(event)} className="input" id="equals">=</button>
            </div>
        </div>
    </main>
  );
}

export default Container;