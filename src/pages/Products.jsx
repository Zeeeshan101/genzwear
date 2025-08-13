import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

function Products() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { query } = useSearch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  const handleQuantityChange = (productId, qty) => {
    setQuantities((prev) => ({ ...prev, [productId]: parseInt(qty) }));
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.error('Please sign in to add items');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    const quantity = quantities[productId] || 1;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="px-4 sm:px-6 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Discover Your Style
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Curated fashion picks for every mood — minimal, trendy, and timeless.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
          .map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 sm:h-56 object-contain bg-white rounded-md"
                />
              </div>

              {/* Product Details */}
              <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-amber-600 font-semibold text-base mt-1">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.desc}
              </p>

              {/* Quantity Selector */}
              <div className="mt-3 flex items-center space-x-2">
                <label htmlFor={`qty-${product._id}`} className="text-sm text-gray-600">
                  Qty:
                </label>
                <select
                  id={`qty-${product._id}`}
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md transition font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>

      {/* Floating Cart Button */}
      {token && (
        <button
          onClick={() => navigate('/cart')}
          className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-full shadow-lg z-50 transition duration-200"
        >
          🛒 Go to Cart
        </button>
      )}
    </div>
  );
}

export default Products;
