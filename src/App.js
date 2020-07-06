import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import HomePage from "./pages/homePage";
import AllTransactionPage from "./pages/allTransactionPage";
import Header from "./components/Header";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />

        <div className="App">
          <switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/allTransaction"
              component={AllTransactionPage}
            />
          </switch>
        </div>
      </Router>
    </Provider>
  );
}
