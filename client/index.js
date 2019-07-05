import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";

window.addEventListener("getProduct", event => {
  console.log("getProduct fired", event);
});

ReactDOM.render(<App />, document.getElementById("carousel"));
