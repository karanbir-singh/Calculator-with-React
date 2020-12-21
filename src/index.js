// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useState, useReducer, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { AllButtons } from "./Components/Buttons";
import { Display } from "./Components/Display";
import "./styles.css";

const rootElement = document.getElementById("root");

export const AppContext = createContext(null);

function myReducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "Angle": newState.angleType = action.payload;
  }
  return newState;
}

function App() {
  const [state, dispatch] = useReducer(myReducer, {
    input: "",

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
