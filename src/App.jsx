import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ThankYou from './pages/ThankYou'; // 
import Orders from './pages/Orders';


import { isLoggedIn } from './utils/auth';
import { Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';

import PrivateRoute from './components/PrivateRoute'; // (for a resusable component that can also be used for role based access control in the future//)//



 
function App() {

 const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20 text-lg text-gray-600">Checking login...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />

          {/* Private routes */}
          <Route path="/cart" element={ <PrivateRoute> <Cart /></PrivateRoute> } />
          <Route path="/orders" element={<PrivateRoute> <Orders /> </PrivateRoute>  } />

          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      

      <Footer />
    </div>
  );
}


export default App;
