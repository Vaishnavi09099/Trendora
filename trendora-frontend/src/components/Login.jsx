import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaTimes, FaArrowRight, FaLock, FaEnvelope } from 'react-icons/fa';
import API from '../api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await API.post(endpoint, data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      setMessage(`${isLogin ? 'Login' : 'Registration'} successful!`);
      console.log('Logged in:', response.data);
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='min-h-screen relative w-full overflow-hidden'>
     
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/trendora_bg.mp4" type="video/mp4" />
      </video>

     
      <div className="absolute w-full h-full bg-black/60"></div>

    
      <div className="relative z-10 flex min-h-screen text-white">
        
      
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold font-dancing">Trendora</h1>
          
          <div className="mt-32">
            <h2 className="text-2xl font-bold mb-6">Shop</h2>
            <ul className="space-y-3 text-white/80">
              <li className="hover:text-white cursor-pointer transition ">— New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Winters</li>
              <li className="hover:text-white cursor-pointer transition">Women's</li>
              <li className="hover:text-white cursor-pointer transition">Men's</li>
              <li className="hover:text-white cursor-pointer transition">Kids</li>
            </ul>
          </div>
        </div>

        <div className="w-[450px] bg-black/40 backdrop-blur-md p-10 flex flex-col justify-center ">
          
      
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition">
            <FaTimes size={24} />
          </button>


          <h2 className="text-2xl font-bold">
            {isLogin ? 'EXISTING MEMBER' : 'NEW MEMBER'}
          </h2>
          <p className="text-white/80 mb-8">
            {isLogin ? 'Welcome Back!' : 'Join Trendora Today!'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
         
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-10 bg-transparent border border-white/40 rounded-md outline-none focus:border-white transition"
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
              </div>
            )}

        
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pl-10 bg-transparent border border-white/40 rounded-md outline-none focus:border-white transition"
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pl-10 bg-transparent border border-white/40 rounded-md outline-none focus:border-white transition"
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            </div>

     
            <button 
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition group"
            >
              Continue 
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </form>

    
          {message && (
            <p className={`mt-4 text-center p-3 rounded-md ${
              message.includes('successful') 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-red-500/20 text-red-300'
            }`}>
              {message}
            </p>
          )}

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/60 text-sm">OR</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

     
          <div className="flex justify-center gap-5">
            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
              <FaGoogle size={20} />
            </button>
            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
              <FaFacebook size={20} />
            </button>
            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
              <FaApple size={22} />
            </button>
          </div>

    
          <p className="text-center mt-8 text-white/80">
            {isLogin ? "Don't have account? " : "Already have an account? "}
            <span 
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
              }}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? 'Register Now' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;