import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Get the root element
const root = document.getElementById("root");

// Use `createRoot` instead of `render`
ReactDOM.createRoot(root).render(<App />);
