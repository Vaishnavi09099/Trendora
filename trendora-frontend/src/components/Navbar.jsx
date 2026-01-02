import React from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaUser
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Hero from "./Hero";
import Products from "./Products";




const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
     
      <nav className="w-full px-10 py-4 flex items-center shadow-md justify-between z-50 relative">

        <div className="flex items-center gap-10 text-sm ">
         
          <div className="text-lg font-semibold cursor-pointer"
               onClick={() => navigate("/")}>
            Trendora
          </div>

          <div className="flex gap-6">
            <Link to="/" className="hover:opacity-70">Home</Link>
            <Link to="/products" className="hover:opacity-70">Collections</Link>
            <Link to="/new" className="hover:opacity-70">New</Link>
            
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/wishlist")}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
          >
            <FaHeart />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="px-4 py-2 bg-black text-white rounded-full flex items-center gap-2 text-sm"
          >
            <FaShoppingCart /> Cart
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 border rounded-full flex items-center justify-center"
          >
            <FaUser />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
