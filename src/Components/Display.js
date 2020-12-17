// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useState ,useReducer, useContext, createContext } from "react";
import "../styles.css";
import images from "../assets/**/*.png";

//------------------------------------------------------------------------------------------------------------------------------------------------

//Equation input
function Input() {
  return (
    <input id='input' className="input"></input>
  );
}

//Solution of the equation
function Output() {
  return (
    <p id="output" className="output"></p>
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
