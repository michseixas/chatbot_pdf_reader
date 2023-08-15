import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import "./app.scss";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,document.getElementById("root")
);


// //Note to self: <React.StrictMode> is a component that is provided by React and is used to highlight potential problems 
// in your application during development. It's not meant for production use, but rather as a tool to help you identify and address 
// issues in your codebase.
// // When you wrap your application's component tree with <React.StrictMode>, it activates additional checks and warnings 
// for common problems. These checks are performed both during the initial render and update of components. 
// The goal is to help you catch and fix potential bugs, as well as to ensure that your application follows best practices.