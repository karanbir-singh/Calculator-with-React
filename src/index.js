// Copyright © 2020 Singh Karanbir. All rights riserved.

import React, { useState ,useReducer, useContext, createContext }from "react";
import ReactDOM from "react-dom";
import { AllButtons } from "./Components/Buttons";
import { Display } from "./Components/Display";
import "./styles.css";

const rootElement = document.getElementById("root");
const AppContext = createContext(null);

ReactDOM.render(
  <React.StrictMode>
    <div className="mainContainer">
      <Display />
      <AllButtons />
    </div>
  </React.StrictMode>,
  rootElement
);
