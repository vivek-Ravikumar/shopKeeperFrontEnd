import React from "react";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import HomePage from "./pages/homePage";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <HomePage />
      </div>
    </Provider>
  );
}
