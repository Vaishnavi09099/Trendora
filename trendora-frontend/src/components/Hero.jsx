import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import API from '../api';
import Products from './Products';

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post('/cart/add', {
        productId,
        quantity: 1,
        size: 'M',
        color: 'Default'
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Please login to add items to cart');
    }
  };

  return (
    <div className="min-h-screen">
<section className="bg-gray-50 py-16 px-10">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
    
   
    <div className="flex-1">
      <div className="mb-8">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="font-semibold text-black">MEN</li>
          <li className="font-semibold text-black">WOMEN</li>
          <li className="font-semibold text-black">KIDS</li>
        </ul>
      </div>

      <div className="bg-gray-100 p-3 rounded-md mb-4 w-80">
        <input 
          type="text" 
          placeholder="Search" 
          className="bg-transparent outline-none"
        />
      </div>

      <div className="mt-16">
        <h1 className="text-5xl font-bold mb-2">NEW</h1>
        <h1 className="text-5xl font-bold mb-4">COLLECTION</h1>
        <p className="text-gray-600 text-sm mb-2">Summer</p>
        <p className="text-gray-600 text-sm mb-8">2024</p>
        
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-md"
        >
          Go To Shop
          <FaArrowRight />
        </button>
      </div>
    </div>

   
    <div className="flex-2 flex flex-col gap-4">
      
      <div className="flex gap-4">
        <div className="bg-gray-100 h-96 rounded-lg overflow-hidden flex-1">
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500" 
            alt="Fashion 1"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
        
        <div className="bg-gray-100 h-96 rounded-lg overflow-hidden flex-1">
          <img 
            src="https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=500" 
            alt="Fashion 2"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
          <FaArrowLeft />
        </button>
        <button className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
          <FaArrowRight />
        </button>
      </div>

    </div>
    
  </div>
</section>





      {/* New This Week Section */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold">NEW</h2>
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-bold">THIS WEEK</h2>
                <span className="text-blue-600 text-lg">(50)</span>
              </div>
            </div>
            <button className="text-sm text-gray-600 hover:text-black">See All</button>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-80 bg-gray-100">
                    <img 
                      src={product.image || "https://via.placeholder.com/400x500?text=Product"} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => addToCart(product._id)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-md"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                    <p className="text-lg font-bold">$ {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-8">
            <button className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
              <FaArrowLeft />
            </button>
            <button className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold">XIV</h2>
            <h2 className="text-4xl font-bold">COLLECTIONS</h2>
            <h2 className="text-4xl font-bold">23-24</h2>
          </div>

          <div className="flex gap-4 mb-8 border-b">
            <button className="px-4 py-2 border-b-2 border-black font-semibold">(ALL)</button>
            <button className="px-4 py-2 text-gray-600 hover:text-black">Men</button>
            <button className="px-4 py-2 text-gray-600 hover:text-black">Women</button>
            <button className="px-4 py-2 text-gray-600 hover:text-black">KID</button>
          </div>

          <div className="flex justify-end gap-4 mb-8 text-sm">
            <button className="text-gray-600 hover:text-black">Filter(s)</button>
            <div>
              <button className="text-gray-600 hover:text-black">Sort(s)</button>
              <div className="text-xs text-gray-500">
                <p>Less to more</p>
                <p>More to Less</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div key={product._id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="relative h-96 bg-gray-100">
                  <img 
                    src={product.image || "https://via.placeholder.com/400x500"} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => addToCart(product._id)}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg font-bold">$ {product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2">
              More
              <FaArrowRight className="rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-10 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">OUR APPROACH TO FASHION DESIGN</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            at elegant vogue, we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quality exquisite finish
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" 
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400" 
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=400" 
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" 
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="font-bold mb-4 text-sm text-gray-500">INFO</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">PRICING</li>
              <li className="hover:underline cursor-pointer">ABOUT</li>
              <li className="hover:underline cursor-pointer">CONTACTS</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm text-gray-500">LANGUAGES</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">ENG</li>
              <li className="hover:underline cursor-pointer">ESP</li>
              <li className="hover:underline cursor-pointer">SVE</li>
            </ul>
          </div>

          <div className="md:col-span-2 flex justify-center items-center">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">▶</div>
              <div className="text-4xl font-bold">XIV</div>
              <div className="text-4xl font-bold">QR</div>
              <p className="text-sm text-gray-500 mt-2">Near-field communication</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>© 2024 — copyright</p>
          <p className="mt-2">privacy</p>
        </div>
      </footer>

    </div>
  );
};

export default Hero;