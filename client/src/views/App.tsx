import React from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";
import LogReg from "./Pages/LogReg/LogReg";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogReg />}></Route>
        <Route path="/main/*" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
