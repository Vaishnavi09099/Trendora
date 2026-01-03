import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
      if (response.data.colors && response.data.colors.length > 0) {
        setSelectedColor(response.data.colors[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      await API.post('/cart/add', {
        productId: product._id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      });
      alert('Added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

 
  const productImages = [
    product.image || "https://via.placeholder.com/600x800?text=Product",
    "https://via.placeholder.com/600x800?text=View+2",
    "https://via.placeholder.com/600x800?text=View+3",
    "https://via.placeholder.com/600x800?text=View+4"
  ];

  const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL', '2X'];
  const colors = product.colors || [
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Green', hex: '#059669' },
    { name: 'Blue', hex: '#3B82F6' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
       
        <div className="text-sm text-gray-600 mb-8">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/')}>
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/products')}>
            Products
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
        
          <div className="flex gap-4">
            
          
            <div className="flex flex-col gap-4">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-24 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

       
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
              <button 
                onClick={() => navigate('/products')}
                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

          </div>

         
          <div>
            
       
            <h1 className="text-3xl font-bold mb-2">{product.name.toUpperCase()}</h1>
            <p className="text-2xl font-bold mb-4">$ {product.price}</p>
            <p className="text-sm text-gray-500 mb-6">MRP incl. of all taxes</p>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description || "Relaxed-fit shirt, Camp collar and short sleeves, Button-up front."}
            </p>

         
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

      
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Size</h3>
                <button className="text-sm text-gray-600 hover:text-black underline">
                  FIND YOUR SIZE | MEASUREMENT GUIDE
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
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
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={addToCart}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition mb-4"
            >
              ADD
            </button>

      
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mb-8">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-600 mb-8">
                ✕ Out of Stock
              </p>
            )}

            <div className="border-t pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-semibold">100% Cotton</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-semibold">{product._id.slice(-8)}</span>
              </div>
            </div>

          
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Care Instructions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Machine wash cold</li>
                <li>• Do not bleach</li>
                <li>• Tumble dry low</li>
                <li>• Iron on low heat if needed</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;