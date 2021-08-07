import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Contract from "./components/Contract";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar";

function App() {
  const [listContract, setListContract] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/list-contract.txt")
      .then((file) => file.text())
      .then((value) => {
        const listContractName = value.split("\n");
        listContractName.pop();
        console.log("\x1b[36m%s\x1b[0m", "listContractName", listContractName);
        setListContract(listContractName);
      });
  }, []);

  const renderListContractRoute = useCallback(() => {
    return listContract.map((item) => {
      return (
        <Route path={`/${item.toLowerCase()}`} exact>
          <Contract name={`${item}`}></Contract>
        </Route>
      );
    });
  }, [listContract]);
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <Route path="/" exact>
          <Contract name="Test"></Contract>
        </Route>
        {renderListContractRoute()}
      </div>
    </Router>
  );
}

export default App;
