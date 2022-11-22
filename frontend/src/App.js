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
import {useSelector} from 'react-redux'

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Admin Routes
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");


  const {loading, user} = useSelector((state)=> state.auth)

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      console.log(stripeApiKey, "data");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [stripeApiKey]);

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
              <ProtectedRoute   isAdmin={true} >
                <Dashboard/>
              </ProtectedRoute>
            }
          />

                <Route
            path="/admin/products"
            element={
              <ProtectedRoute   isAdmin={true} >
                <ProductList/>
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/product"
            element={
              <ProtectedRoute   isAdmin={true} >
                <NewProduct/>
              </ProtectedRoute>
            }
          />


      <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute   isAdmin={true} >
                <UpdateProduct/>
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/orders"
            element={
              <ProtectedRoute   isAdmin={true} >
                <OrderList />
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/order/:id" 
            element={
              <ProtectedRoute   isAdmin={true} >
                <ProcessOrder />
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/users" 
            element={
              <ProtectedRoute   isAdmin={true} >
                <UsersList />
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/user/:id" 
            element={
              <ProtectedRoute   isAdmin={true} >
                <UpdateUser />
              </ProtectedRoute>
            }
          />
      </Routes>

      
      </div>

      {(!loading && (user && user.role !== "admin")) && (
      <Footer />
       )}
   

    </div>
  );
}

export default App;
