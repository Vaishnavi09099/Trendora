import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await API.get('/cart');
      setCartItems(response.data.items || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await API.put(`/cart/update/${itemId}`, { quantity: newQuantity });
      fetchCart(); 
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.delete(`/cart/remove/${itemId}`);
      fetchCart(); 
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    
    return calculateSubtotal() > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
     
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">SHOPPING BAG</h1>
          <div className="flex gap-6 border-b">
            <button className="pb-3 border-b-2 border-black font-semibold">
              SHOPPING BAG
            </button>
            <button 
              className="pb-3 text-gray-500 hover:text-black"
              onClick={() => navigate('/favorites')}
            >
              FAVOURITES
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
          
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-6 rounded-lg shadow-sm flex gap-6 relative">
                  
               
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>

                  <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product?.image || "https://via.placeholder.com/200x250"} 
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

             
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {item.product?.name || 'Product Name'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.product?.category || 'Category'}
                    </p>

              
                    <div className="flex gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Size</p>
                        <div className="w-12 h-8 border rounded flex items-center justify-center text-sm">
                          {item.size || 'M'}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Color</p>
                        <div className="w-8 h-8 bg-black rounded-full border"></div>
                      </div>
                    </div>

             
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <button className="text-gray-600 hover:text-black flex items-center gap-2">
                        <span>♡</span> Move to Favourites
                      </button>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-gray-600 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

          
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      $ {(item.product?.price || 0) * item.quantity}
                    </p>
                  </div>

                </div>
              ))}
            </div>

     
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {calculateShipping() === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${calculateShipping()}`
                      )}
                    </span>
                  </div>
                  {calculateShipping() > 0 && (
                    <p className="text-xs text-gray-500">
                      Add ${(100 - calculateSubtotal()).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL (TAX INCL.)</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <label className="flex items-start gap-2 mb-6 text-sm cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-600">
                    I agree to the Terms and Conditions
                  </span>
                </label>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  CONTINUE
                </button>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 mb-3">WE ACCEPT</p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="w-12 h-8 border rounded flex items-center justify-center text-xs">
                      VISA
                    </div>
                    <div className="w-12 h-8 border rounded flex items-center justify-center text-xs">
                      MC
                    </div>
                    <div className="w-12 h-8 border rounded flex items-center justify-center text-xs">
                      AMEX
                    </div>
                    <div className="w-12 h-8 border rounded flex items-center justify-center text-xs">
                      GPay
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;