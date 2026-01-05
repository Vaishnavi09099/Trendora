import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState('information'); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard'
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    if (formData.shippingMethod === 'express') return 20;
    return calculateSubtotal() > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address) {
      alert('Please fill all required fields');
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode
        },
        totalAmount: calculateTotal(),
        shippingMethod: formData.shippingMethod
      };

      await API.post('/orders', orderData);
      alert('Order placed successfully!');
      navigate('/orders'); 
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-black text-white px-8 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
       
        <button 
          onClick={() => navigate('/cart')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black"
        >
          ← Back
        </button>

   
        <h1 className="text-4xl font-bold mb-8">CHECKOUT</h1>

  
        <div className="flex gap-8 mb-8 border-b">
          <button 
            onClick={() => setCurrentStep('information')}
            className={`pb-3 border-b-2 ${
              currentStep === 'information' 
                ? 'border-black font-semibold' 
                : 'border-transparent text-gray-500'
            }`}
          >
            INFORMATION
          </button>
          <button 
            onClick={() => currentStep !== 'information' && setCurrentStep('shipping')}
            className={`pb-3 border-b-2 ${
              currentStep === 'shipping' 
                ? 'border-black font-semibold' 
                : 'border-transparent text-gray-500'
            }`}
          >
            SHIPPING
          </button>
          <button 
            className={`pb-3 border-b-2 ${
              currentStep === 'payment' 
                ? 'border-black font-semibold' 
                : 'border-transparent text-gray-500'
            }`}
          >
            PAYMENT
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
  
          <div className="lg:col-span-2">
            
    
            {currentStep === 'information' && (
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">CONTACT INFO</h2>
                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep('shipping'); }}>
                  <div className="space-y-4 mb-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 flex items-center justify-center gap-2"
                  >
                    Continue to Shipping
                    →
                  </button>
                </form>
              </div>
            )}

        
            {currentStep === 'shipping' && (
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">SHIPPING ADDRESS</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>

                    <input
                      type="text"
                      name="state"
                      placeholder="State / Region"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                        required
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleInputChange}
                        />
                        <div className="flex-1">
                          <p className="font-semibold">Standard Shipping</p>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                        <span className="font-semibold">
                          {calculateSubtotal() > 100 ? 'Free' : '$10'}
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleInputChange}
                        />
                        <div className="flex-1">
                          <p className="font-semibold">Express Shipping</p>
                          <p className="text-sm text-gray-600">2-3 business days</p>
                        </div>
                        <span className="font-semibold">$20</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    →
                  </button>
                </form>
              </div>
            )}

            {/* Payment */}
            {currentStep === 'payment' && (
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">PAYMENT METHOD</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 border rounded-lg outline-none focus:border-black"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            )}

          </div>

       
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-bold mb-6 flex justify-between items-center">
                YOUR ORDER
                <span className="text-sm font-normal text-gray-600">({cartItems.length})</span>
              </h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product?.image || "https://via.placeholder.com/100x120"} 
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{item.product?.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{item.product?.category}</p>
                      <p className="text-xs text-gray-600">
                        Size: {item.size} | Qty: ({item.quantity})
                      </p>
                      <button 
                        onClick={() => navigate('/cart')}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        Change
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$ {(item.product?.price || 0) * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

          
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {calculateShipping() === 0 ? (
                      <span className="text-green-600">Calculated at next step</span>
                    ) : (
                      `$${calculateShipping().toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;