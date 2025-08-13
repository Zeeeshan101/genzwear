import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-10 min-h-[80vh] bg-gray-50">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          📦 Your Orders
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Review your purchases and keep track of your deliveries.
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No orders yet. Your wardrobe’s waiting 👕🧥
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-6"
            >
              {/* Order Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order Placed:{" "}
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  💰 ₹{order.totalAmount}
                </p>
              </div>

              {/* Products in Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {order.products.map((item) => (
                  <div
                    key={item.productId._id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-contain rounded bg-white shadow-sm"
                    />
                    <div className="ml-4">
                      <p className="font-medium text-gray-800">
                        {item.productId.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
