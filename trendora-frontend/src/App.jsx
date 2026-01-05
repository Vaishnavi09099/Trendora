import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Hero from "./components/Hero";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";





function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );


  return (
    <BrowserRouter>
    
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
    
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

      
        <Route
          path="/"
          element={
            isLoggedIn ? <Hero /> : <Navigate to="/login" replace />
          }
        />
        
        <Route
          path="/products"
          element={
            isLoggedIn ? <Products /> : <Navigate to="/login" replace />
          }
        />
       <Route
          path="/product/:id"
          element={
            isLoggedIn ? <ProductDetail /> : <Navigate to="/login" replace />
          }
        />

         <Route
          path="/cart"
          element={
            isLoggedIn ? <Cart /> : <Navigate to="/login" replace />
          }
        />


           <Route
          path="/checkout"
          element={
            isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
