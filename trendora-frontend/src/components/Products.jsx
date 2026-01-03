import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import API from '../api';
import ProductDetail from './ProductDetail';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [availability, setAvailability] = useState({ available: true, outOfStock: false });
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    let filtered = [...products];

  
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes && p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    if (!availability.available) {
      filtered = filtered.filter(p => p.stock === 0);
    }
    if (!availability.outOfStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSizes, availability, searchQuery, products]);

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

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
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
      
        <div className="text-sm text-gray-600 mb-6">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/')}>
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">Products</span>
        </div>

        <h1 className="text-4xl font-bold mb-8">PRODUCTS</h1>

        <div className="flex gap-8">
          
        
          <div className="w-64 flex-shrink-0">
            
         
            <div className="mb-8">
              <div className="bg-gray-100 p-3 rounded-lg">
                <input 
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

        
            <div className="mb-8">
              <h3 className="font-bold mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', '2X'].map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSizes.includes(size) 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4 flex items-center justify-between cursor-pointer">
                Availability
                <span className="text-sm">▼</span>
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={availability.available}
                    onChange={(e) => setAvailability({...availability, available: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Available ({products.filter(p => p.stock > 0).length})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) => setAvailability({...availability, outOfStock: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Out Of Stock ({products.filter(p => p.stock === 0).length})</span>
                </label>
              </div>
            </div>

           
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Category
                  <span className="text-sm">▶</span>
                </h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Colors
                  <span className="text-sm">▶</span>
                </h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Price Range
                  <span className="text-sm">▶</span>
                </h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Collections
                  <span className="text-sm">▶</span>
                </h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Tags
                  <span className="text-sm">▶</span>
                </h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-bold cursor-pointer flex items-center justify-between">
                  Ratings
                  <span className="text-sm">▶</span>
                </h3>
              </div>
            </div>

          </div>

      
          <div className="flex-1">
            
        
            <div className="flex gap-8 mb-6 border-b pb-4">
              <button 
                onClick={() => setSelectedCategory('ALL')}
                className={`text-sm font-semibold pb-2 border-b-2 ${
                  selectedCategory === 'ALL' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                NEW
              </button>
              <button 
                onClick={() => setSelectedCategory('Shirts')}
                className={`text-sm font-semibold pb-2 border-b-2 ${
                  selectedCategory === 'Shirts' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                SHIRTS
              </button>
              <button 
                onClick={() => setSelectedCategory('T-Shirts')}
                className={`text-sm font-semibold pb-2 border-b-2 ${
                  selectedCategory === 'T-Shirts' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                POLO SHIRTS
              </button>
              <button 
                onClick={() => setSelectedCategory('Jeans')}
                className={`text-sm font-semibold pb-2 border-b-2 ${
                  selectedCategory === 'Jeans' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                JEANS
              </button>
            </div>

          
            <div className="flex gap-6 mb-6 text-sm">
              <button className="text-gray-600 hover:text-black">BEST SELLERS</button>
              <button className="text-gray-600 hover:text-black">T-SHIRTS</button>
              <button className="text-gray-600 hover:text-black">JACKETS</button>
            </div>

         
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <select className="text-sm border rounded px-3 py-2 outline-none">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

        
            {loading ? (
              <div className="text-center py-20">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition group"
                  >
                    <div 
                      className="relative h-96 bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <img 
                        src={product.image || "https://via.placeholder.com/400x500?text=Product"} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product._id);
                        }}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-lg opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold mb-2 truncate">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">$ {product.price}</p>
                        {product.stock === 0 && (
                          <span className="text-xs text-red-500">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-20 text-gray-500">
                No products found matching your filters
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;