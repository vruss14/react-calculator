import React from "react";

function Container(props) {


  return (
    <main id="main">
        <div id="calculator-wrapper">

            <div id="screen-display-container">
                <div id="screen">
                    <p id="display">0</p>
                </div>
            </div>

            <div id="inputs-wrapper">
                <div className="column">
                    <button className="input" id="seven">7</button>
                    <button className="input" id="four">4</button>
                    <button className="input" id="one">1</button>
                    <button className="input" id="zero">0</button>
                </div>

                <div className="column">
                    <button className="input" id="eight">8</button>
                    <button className="input" id="five">5</button>
                    <button className="input" id="two">2</button>
                    <button className="input" id="decimal">.</button>
                </div>

                <div className="column">
                    <button className="input" id="nine">9</button>
                    <button className="input" id="six">6</button>
                    <button className="input" id="three">3</button>
                    <button className="input" id="clear">AC</button>
                </div>

                <div className="column">
                    <button className="input" id="divide">/</button>
                    <button className="input" id="multiply">x</button>
                    <button className="input" id="subtract">–</button>
                    <button className="input" id="add">+</button>
                </div>
            </div>

            <div id="equals-wrapper">
                <button className="input" id="equals">=</button>
            </div>
        </div>
    </main>
  );
}

export default Container;