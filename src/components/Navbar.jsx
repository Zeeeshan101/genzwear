import { useSearch } from '../context/SearchContext';


import { Link, useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom'; // will use it to get the path for products page and use it show search//



function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const token = localStorage.getItem('token');

  const name = localStorage.getItem('name');

  const { query, setQuery } = useSearch();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <nav className="bg-purple-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">


        <div className="flex items-center space-x-6">
         <Link
  to="/"
  className="text-white text-3xl sm:text-4xl font-extrabold tracking-wide hover:text-purple-300 transition duration-300"
>
  <span className="text-purple-100">Gen</span>
  <span className="text-purple-300">Z</span>
  <span className="text-purple-200">Wear</span>
</Link>

          <Link to="/products" className="text-white text-md hover:text-purple-200">
            Products
          </Link>
          {token && (
            <Link to="/cart" className="text-white text-md hover:text-purple-200">
              Cart
            </Link>
          )}

          {token && (
          <Link to="/orders" className="text-white text-md hover:text-purple-200 pr-2">
          Orders
         </Link>
          )}


        </div>

  {location.pathname === "/products" && (
  <div className="relative">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="What are you looking for GenZ ? "
      className="pl-10 pr-4 py-2 rounded-full bg-white text-sm text-gray-800 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all duration-300 w-full sm:w-80 md:w-96"

    />
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      🔍
    </span>
  </div>
)}



        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <span className="text-white text-sm sm:text-base">Hi, {name} 👋</span>

             <button
              onClick={handleLogout}
            className="bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 px-4 py-1 rounded transition duration-200"
            >
             Logout
            </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-purple-200">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-purple-200">
                Signup
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
