
import React, {useEffect} from "react";
import "./App.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login"
import Register from "./components/user/Register"
import store from "./store"
import {loadUser} from "./actions/userActions"


import {Routes, Route} from "react-router-dom"


function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  })


  return (

      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </div>
        <Footer />
      </div>

  );
}

export default App;
