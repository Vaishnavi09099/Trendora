import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Hero from "./components/Hero";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );


  return (
    <BrowserRouter>
      {/* Navbar sirf login ke baad */}
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        {/* LOGIN */}
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

        {/* HOME */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Hero /> : <Navigate to="/login" replace />
          }
        />

      

        {/* 404 / FALLBACK */}
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
