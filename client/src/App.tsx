import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LogReg from "./views/Pages/LogReg/LogReg";
import View from "./views/Pages/View";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogReg />}></Route>
        <Route path="/main/*" element={<View />}></Route>
      </Routes>
    </div>
  );
}

export default App;
