import React, { useEffect, useState } from "react";
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
import ProtectedRoute from "./components/route/ProtectedRoute";
import Cart from "./components/cart/Cart";
import OrderSuccess from "./components/cart/OrderSuccess";

import { Routes, Route } from "react-router-dom";
import ForgotPasswordd from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/confirmOrder";
import axios from "axios";
import Payment from "./components/cart/Payment";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/orderDetails";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Admin Routes
import Dashboard from "./components/admin/Dashboard";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      console.log(stripeApiKey, "data");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  console.log(stripeApiKey, "see");

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
          <Route path='/password/reset/:token' element={<NewPassword />} />
          <Route path='/cart' element={<Cart />} />

          {stripeApiKey && (
            <Route
              path='/payment'
              element={
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
          )}

          <Route
            path='/me'
            element={
              <ProtectedRoute>
                {" "}
                <Profile />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path='/orders/me'
            element={
              <ProtectedRoute>
                {" "}
                <ListOrders />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path='/order/:id'
            element={
              <ProtectedRoute>
                <OrderDetails />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path='/success'
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path='/me/update'
            element={
              <ProtectedRoute>
                {" "}
                <UpdateProfile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path='/password/update'
            element={
              <ProtectedRoute>
                {" "}
                <UpdatePassword />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path='/shipping'
            element={
              <ProtectedRoute>
                {" "}
                <Shipping />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path='/order/confirm'
            element={
              <ProtectedRoute>
                {" "}
                <ConfirmOrder />{" "}
              </ProtectedRoute>
            }
          />

<Route
            path='/dashboard'
            element={
              <ProtectedRoute>
      
                <Dashboard/>
              </ProtectedRoute>
            }
          />
       </Routes>
      </div>

   
      <Footer />
    </div>
  );
}

export default App;
