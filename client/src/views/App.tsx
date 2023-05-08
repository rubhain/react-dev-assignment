import React from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Companies from "./Pages/Companies/Companies";
import Products from "./Pages/Products/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<Home />}></Route>
        <Route path="/main/companies" element={<Companies />}></Route>
        <Route path="/main/products" element={<Products />}></Route>
      </Routes>
    </div>
  );
}

export default App;
