import React from "react";
import "./App.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";

import {Routes, Route} from "react-router-dom"

function App() {
  return (

      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>

  );
}

export default App;
