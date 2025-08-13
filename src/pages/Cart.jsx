import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.products);
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <Loader />;

  const getTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemove(productId);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.products);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order placed successfully!');
      navigate('/Thankyou');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Something went wrong during checkout');
    }
  };

  return (
    <div className="w-full px-4 sm:px-10 lg:px-24 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white border border-gray-200 p-10 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">Looks like your cart is empty 🥲</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded bg-gray-50"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{item.productId.title}</h4>
                    <p className="text-sm text-gray-500">₹{item.productId.price} each</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center mt-3 space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-[24px] text-center text-base font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-amber-600 font-semibold mt-2">
                      ₹{item.productId.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md"
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{getTotal()}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-gray-900 text-lg">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-semibold text-base transition"
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
