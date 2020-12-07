// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useState } from "react";
import "../styles.css";

const openedB = "(";
const closedB = ")";

//------------------------------------------------------------------------------------------------------------------------------------------------
// Formats the string (each element is divided from the others with a space)
// Example: 91+2*(32+1) -> ( 91 + 2 * ( 32 + 1 ) ) 
function formatExpr(inExpr) {
    let tmp = "";
    for (let i = 0; i < inExpr.length; i++) {
        if (inExpr.charAt(i) !== " ")
            tmp += inExpr.charAt(i);
    }
    let tmp1 = "";
    for (let i = 0; i < tmp.length; i++) {
        let k = tmp.charAt(i);
        k = k.toLocaleLowerCase();
        if (!isNaN(k) || k === "." || k === "π") {
            tmp1 += k;
        } else if (k === openedB) {
            tmp1 += k + " ";
        } else if (k === closedB) {
            tmp1 += " " + k;
        } else if (k === "s" || k === "c" || k === "t" || k === "l") {
            switch (k) {
                case "s": tmp1 += "sin ";
                    i += 2;
                    break;
                case "c": tmp1 += "cos ";
                    i += 2;
                    break;
                case "t": tmp1 += "tan ";
                    i += 2;
                    break;
                case "l": tmp1 += "log ";
                    i += 2;
                    break;
            }
        } else if (isOperator(k)) {
            tmp1 += " " + k + " ";
        }
    }

    return tmp1;
}

// Precedences
function priority(op) {
    switch (op) {
        case "+": return 0;
        case "-": return 0;

        case "/": return 1;
        case "*": return 1;
        case "%": return 1;

        case "^": return 2;
        case "log": return 2;

        case "√": return 3;

        // Trigonometric functions
        case "sin": return 4;
        case "cos": return 4;
        case "tan": return 4;
    }
}

// Checks if the value passed as parameter is an operator
function isOperator(val) {
    if (val === "/"
        || val === "*"
        || val === "+"
        || val === "-"
        || val === "%"
        || val === "^"
        || val === "sin"
        || val === "cos"
        || val === "tan"
        || val === "√"
        || val === "log")
        return true;
    return false;
}

// Executes single operation
function operation(operator, x, y) {
    switch (operator) {
        case "+": return x + y;
        case "-": return y - x;
        case "/": return y / x;
        case "*": return x * y;
        case "%": return y % x;
        case "^": return Math.pow(y, x);
        case "√": return Math.sqrt(x);
        case "log": return Math.log10(x);

        // Trigonometric functions
        case "sin": if (angle === "RAD") return Math.sin(x);
        else return Math.sin(x * Math.PI / 180);
        case "cos": if (angle === "RAD") return Math.cos(x);
        else return Math.cos(x * Math.PI / 180)
        case "tan": if (angle === "RAD") return Math.tan(x);
        else return Math.tan(x * Math.PI / 180);
    }
}

// Clears a list given as a parameter: removes any ""
function cleanUp(list) {
    let temp = list;
    temp.forEach((elem, index) => {
        if (elem === "" && index !== 0) {
            list.splice(index, 1);
        }
    })
    return list;
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Transforms the expression from infix notation to postfix notation
function createRPN(input) {
    let temp = formatExpr(input);

    // Input
    let infix = cleanUp(temp.split(" "));

    // Stack of operators
    let op = [];

    // Output
    let postfix = [];

    // Insertion of an opening parenthesis on the stack of operators
    op.push("(");

    // Insertion of a closing parenthesis at the end of input
    infix.push(")");

    // Reading each element of the input
    infix.forEach((actualVal) => {
        if (!isNaN(actualVal) || actualVal === "π") { // If the current value is a number
            // it is placed in postfix
            postfix.push(actualVal);

        } else if (actualVal === openedB) { // If the current value is the opening parenthesis
            // it is placed on the stack of operators
            op.push(actualVal);

        } else if (actualVal === closedB) { // If the current value is a closing parenthesis
            // The operators are extracted from the top of the stack
            // and are placed in postfix, until there is
            // an opening parenthesis on top of the stack of operators
            let j = op.length - 1;
            let tmp = op[j];
            while (tmp !== openedB) {
                if (isOperator(tmp)) {
                    postfix.push(op.pop());
                }
                j--;
                tmp = op[j];
            }
            // The opening parenthesis is extracted from the stack of operators
            op.pop();

        } else if (isOperator(actualVal)) { // If the current value is an operator
            // the operators are extracted (if there are any) from the top of the stack
            // as long as they have a priority greater than or equal to that of the current operator
            // and put in postfix
            let temp = op[op.length - 1];
            while (isOperator(temp)) {
                if (priority(temp) >= priority(actualVal)) {
                    postfix.push(op.pop());
                } else {
                    break;
                }
                temp = op[op.length - 1];
            }

            // The current character is placed on the stack of operators
            op.push(actualVal);
        }
    });

    // Once each input element has been read,
    // all operators are extracted and placed in postfix
    while (op.length !== 0) {
        let tmp = op.pop();
        if (isOperator(tmp)) {
            postfix.push(tmp);
        }
    }
    // The calculation of the result
    return calculateResult(postfix);
}

// Calculates the result
function calculateResult(postfix) {
    if (postfix[0] === "") {
        postfix[0] = "0";
    }

    // expr: represents postfix
    let expr = cleanUp(postfix);

    // Numeric value stack
    let values = [];

    // ris: result of the expression
    let ris = 0;

    let i = 0;
    while (i < expr.length) {
        // Current reading value
        let actualVal = expr[i];

        if (actualVal === "π") {
            actualVal = "" + Math.PI;
        }
        if (!isNaN(actualVal)) { // If the current value is a number
            // it is placed on the stack of numeric values
            values.push(parseFloat(actualVal));

        } else if (isOperator(actualVal)) { // If the current value is an operator
            // the two numeric values ​​preceding the operator are extracted
            let x = values.pop();

            // In case there is a trig function or a square root, you don't bring out the second value
            let value;
            if (actualVal === "sin"
                || actualVal === "cos"
                || actualVal === "tan"
                || actualVal === "√"
                || actualVal === "log") {

                value = operation(actualVal, x, 0);

                // Javascript: some known values ​​result in inaccurate but very close values
                // tan (π / 2) results in: 16331239353195370 which will be interpreted as infinite
                // so also for tan (3 * π / 2) = 5443746451065123 which will be interpreted as infinity
                if (value === 16331239353195370 || value === 5443746451065123) {
                    return "INFINITY";
                } else {
                    // in all cases it is rounded to have an adequate value
                    value = Math.round(value * 1000000000) / 1000000000;
                }
            } else { // if the operator is not a trigonometric function

                //The second value is extracted
                let y = values.pop();

                // The operation between x and y is performed with operator the current value
                value = operation(actualVal, x, y);
            }
            // The result is placed inside the stack of numeric values
            values.push(value);
        }
        i++;
    }

    // The last value in the stack of number values
    // will be the result of the expression
    ris = values.pop();
    if (("" + ris).length > 19) {
        return "ERROR, TOO LONG TO VIEW";
    }
    // Display of the result
    return "= " + ris;
}
//------------------------------------------------------------------------------------------------------------------------------------------------

// Single button component
function SingleButton(props) {
    let width = "88px";
    let height = "82px";
    if (props.width !== undefined) {
        width = props.width;
    }
    if (props.height !== undefined) {
        height = props.height;
    }
    return (
        <input className="singleButton" type="image" src={"img/" + props.imageUrl} width={width} height={height}
            onClick={() => handleClickEvent()} onDoubleClick={() => { if (props.value === 'c') document.getElementById('input').value = "" }}></input>
    );

    function handleClickEvent() {
        if (props.value === '=') {
            document.getElementById("output").innerText = createRPN(document.getElementById('input').value);
            return;
        }
        if (props.value === 'c') {
            document.getElementById("input").value = document.getElementById("input").value.substr(0, document.getElementById("input").value.length - 1);
            return;
        }
        if (props.value === '?') {
            alert("- You can modify the expression directly by clicking on the display where there is the expression\n- If the 'C' button is double-clicked, it will clean up the display\n- If you want to use the trigonometric functions or square root, after the value insert a right parenthesis i.e. ')'\n- The '%' rappresents the MOD function ( 10 mod 3 = 1 )\n- The log() function returns the base-10 logarithm of the inserted value.");
            return;
        }
        if (props.value === 'i') {
            alert("Created by Singh Karanbir");
            return;
        }
        document.getElementById("input").value += props.value;
        event.target.blur();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------

//Angle type changer
function AngleButton(props) {
    const [state, setState] = useState({
        type: "DEG",
        imageUrl: "img/extra_/deg.png"
    });
    return (
        <input className="angleButton" type="image" src={state.imageUrl}
            onClick={() => {
                state.type === "DEG" ?
                    setState({ type: "RAD", imageUrl: "img/extra_/rad.png" }) :
                    setState({ type: "DEG", imageUrl: "img/extra_/deg.png" });
            }}></input>
    );
}

// Extra buttons opener
function ExtraOpener(props) {
    const [state, setState] = useState({
        active: false,
        imageUrl: "img/extra_/right_arrow.png"
    });
    return (
        <input className="extraOpener" type="image" src={state.imageUrl}
            onClick={() => exhibitExtraButtons()}></input>
    );

    function exhibitExtraButtons() {
        !state.active ?
            (setState({ active: true, imageUrl: "img/extra_/left_arrow.png" }), document.getElementById("extraButtons").style.visibility = "visible") :
            (setState({ active: false, imageUrl: "img/extra_/right_arrow.png" }), document.getElementById("extraButtons").style.visibility = "hidden");
        event.target.blur();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Rules button
function RulesButton() {
    return (
        <SingleButton value="?" imageUrl="extra_/rules.png" width="15px" height="15px"/>
    );
}

// Info button
function InfoButton() {
    return (
        <SingleButton value="i" imageUrl="extra_/info.png" width="15px" height="15px"/>
    );
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// Different(special) buttons
function SpecialButtons() {
    return (
        <div className="specialButtons">
            <AngleButton />
            <ExtraOpener imageUrl="extra_/right_arrow.png" />
        </div>
    );
}

// Extra buttons
function ExtraButtons() {
    return (
        <div id="extraButtons" className="extraButtons"
            style={{ backgroundImage: 'url(img/extra_/extraB.png)' }}>

            <SingleButton value="^" imageUrl="operators/pow.png" />
            <SingleButton value="√" imageUrl="operators/sqrt.png" />

            <SingleButton value="%" imageUrl="operators/mod.png" />
            <SingleButton value="π" imageUrl="numbers/pi.png" />

            <SingleButton value="sin" imageUrl="operators/sin.png" />
            <SingleButton value="cos" imageUrl="operators/cos.png" />

            <SingleButton value="tan" imageUrl="operators/tan.png" />
            <SingleButton value="log" imageUrl="operators/log.png" />
        </div>
    );
}

// Main buttons
function MainButtons() {
    return (
        <div className="mainButtons">
            <SingleButton value="(" imageUrl="extra_/openB.png" />
            <SingleButton value=")" imageUrl="extra_/closeB.png" />
            <SingleButton value="c" imageUrl="extra_/clean.png" />
            <SingleButton value="+" imageUrl="operators/sum.png" />

            <SingleButton value="7" imageUrl="numbers/7.png" />
            <SingleButton value="8" imageUrl="numbers/8.png" />
            <SingleButton value="9" imageUrl="numbers/9.png" />
            <SingleButton value="-" imageUrl="operators/substract.png" />

            <SingleButton value="4" imageUrl="numbers/4.png" />
            <SingleButton value="5" imageUrl="numbers/5.png" />
            <SingleButton value="6" imageUrl="numbers/6.png" />
            <SingleButton value="*" imageUrl="operators/multiply.png" />

            <SingleButton value="1" imageUrl="numbers/1.png" />
            <SingleButton value="2" imageUrl="numbers/2.png" />
            <SingleButton value="3" imageUrl="numbers/3.png" />
            <SingleButton value="/" imageUrl="operators/divide.png" />

            <SingleButton value="0" imageUrl="numbers/0.png" />
            <SingleButton value="." imageUrl="extra_/dot.png" />
            <SingleButton value="=" imageUrl="extra_/ris.png" width="186px" />
        </div>
    );
}

function LastButtons() {
    return (
        <div className="lastButtons">
            <InfoButton />
            <RulesButton />
        </div>
    );
}

//------------------------------------------------------------------------------------------------------------------------------------------------

// All buttons
export function AllButtons(props) {
    return (
        <div className="allButtons">
            <SpecialButtons />
            <MainButtons />
            <ExtraButtons />
            <LastButtons />
        </div>
    );
}