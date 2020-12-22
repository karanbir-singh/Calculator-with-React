// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useState, useReducer, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { AllButtons } from "./Components/Buttons";
import { Display } from "./Components/Display";
import "./styles.css";

const rootElement = document.getElementById("root");

export const AppContext = createContext(null);

function appReducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    // Extra
    case "Angle": newState.angleType = action.payload;
      break;
    case "Opener": newState.extraOpenerActive = action.payload;
      break;

    // Input field
    case "Add val": newState.input += action.payload;
      break;
    case "Erase": newState.input = newState.input.substr(0, newState.input.length - 1);
      break;
    case "Erase all": newState.input = "";
      break;

    // Output field
    case "Calculate": newState.output = action.payload;
      break;
  }
  return newState;
}

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    input: "",
    output: "",

    angleType: "DEG",
    extraOpenerActive: false
  });

  return (
    <div className="mainContainer">
      <AppContext.Provider value={{ state, dispatch }}>
        <Display />
        <AllButtons />
      </AppContext.Provider>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
