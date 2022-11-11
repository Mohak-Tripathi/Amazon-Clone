import React, { useEffect } from "react";
import "./App.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ProtectedRoute from "./components/route/ProtectedRoute"

import { Routes, Route } from "react-router-dom";
import ForgotPasswordd from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className='App'>
      <Header />
      <div className='container container-fluid'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/password/forgot' element={<ForgotPasswordd />} />
          <Route path='/password/forgot/:token' element={<NewPassword />} />

          <Route  path='/me' element={<ProtectedRoute> <Profile /> </ProtectedRoute> } />
          <Route  path='/me/update' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute> } />
          <Route  path='/password/update' element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute> } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
