import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Contract from "./components/Contract";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

function App() {
  useEffect(() => {
    const test = fetch("../abis").then(console.log);
    console.log("\x1b[36m%s\x1b[0m", "test", test);
  }, []);
  return (
    <Router>
      <div className="App">
        <DropdownButton
          id="dropdown-basic-button"
          title="Select Contract"
          className={"mb-5"}
        >
          <Dropdown.Item>
            <Link to="/">Home</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/test">Test Contract</Link>
          </Dropdown.Item>
        </DropdownButton>

        <Route path="/" exact>
          <Contract name="Test"></Contract>
        </Route>
        <Route path="/test" exact>
          <Contract name="Test"></Contract>
        </Route>
      </div>
    </Router>
  );
}

export default App;
