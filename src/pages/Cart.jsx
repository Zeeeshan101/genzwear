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

// Function to handle quantity change// new* // 

const handleQuantityChange = async (productId, newQuantity) => {
  if (newQuantity < 1) return; // optional: prevent zero quantity

  const token = localStorage.getItem('token');
  try {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
      productId,
      quantity: newQuantity,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setCartItems(res.data.cart.products); // updated cart from backend
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
    <div className="w-full px-4 sm:px-10 lg:px-24 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-10 text-center">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center bg-purple-50 border border-purple-100 p-10 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">Looks like your cart is empty 🥲</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border border-purple-100 bg-white p-5 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded bg-gray-50"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.productId.title}</h4>

               {/*showing unit price for each item*/} 
               
               <p className="text-sm text-gray-600">Price: ₹{item.productId.price}</p>


              <div className="flex items-center gap-2 mt-1">
              <button
              className="bg-purple-200 text-purple-700 px-2 py-1 rounded"
              onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
              >−</button>

              <span className="font-medium">{item.quantity}</span>

              <button
             className="bg-purple-500 text-white px-2 py-1 rounded"
             onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
             >+</button>
            </div>


                  
                  <p className="text-sm text-purple-700 font-bold mt-1">
                    ₹{item.productId.price * item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.productId._id)}
                className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md"
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mt-8 shadow-inner text-right">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Grand Total: ₹{getTotal()}
            </h3>
            <button
              onClick={handleCheckout}
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-md font-semibold text-base transition"
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
