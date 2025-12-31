import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

// dummy pages
const Home = () => <div className="p-10 text-2xl">Home Page</div>;
const Profile = () => <div className="p-10 text-2xl">Profile Page</div>;

function App() {
  // ✅ State to track login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage on mount
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar sirf tab dikhegi jab user logged-in ho */}
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        {/* LOGIN ROUTE */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* HOME (PROTECTED) */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        {/* PROFILE (PROTECTED) */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* fallback route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
