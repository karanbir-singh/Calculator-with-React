// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useContext } from "react";
import "../styles.css";
import { AppContext } from '../index.js';

//------------------------------------------------------------------------------------------------------------------------------------------------

//Equation input
function Input() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <input id='input' className="input" defaultValue={state.input} disabled></input>
  );
}

//Solution of the equation
function Output() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <p id="output" className="output">{state.output}</p>
  );
}

//------------------------------------------------------------------------------------------------------------------------------------------------

//Display: Input + Output
export function Display(props) {
  return (
    <div className="display">
      <Input />
      <Output />
    </div>
  );
}
