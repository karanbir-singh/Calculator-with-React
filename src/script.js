import React from "react";
import ReactDOM from "react-dom";
import { AllButtons } from "./Components/Buttons";
import { Display } from "./Components/Display";
import "./styles.css";

const rootElement = document.getElementById("app");

ReactDOM.render(
  <React.StrictMode>
    <div className="mainContainer" style={{ backgroundImage: 'url(img/Calculator.png)'}} >
      <Display />
      <AllButtons />
    </div>
  </React.StrictMode>,
  rootElement
);