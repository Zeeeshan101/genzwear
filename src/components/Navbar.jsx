import { useSearch } from '../context/SearchContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GlowingButton from '../components/GlowingButton';
import FancyButton from '../components/FancyButton';

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
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 flex-nowrap">

        {/* Left side: Logo + Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-white text-3xl font-extrabold tracking-wide hover:text-gray-300 transition duration-300"
          >
            <span className="text-white">Gen</span>
            <span className="text-gray-300">Z</span>
            <span className="text-gray-400">Wear</span>
          </Link>

          <GlowingButton label="Products" onClick={() => navigate('/products')} />

          {token && (
            <>
              <GlowingButton label="Cart" onClick={() => navigate('/cart')} />
              <GlowingButton label="Orders" onClick={() => navigate('/orders')} />
            </>
          )}
        </div>

        {/* Middle: Search bar (only on products page) */}
        {location.pathname === "/products" && (
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for the latest GenZ fashion..."
                className="pl-10 pr-4 py-2 rounded-full bg-white text-sm text-gray-800 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-md transition-all duration-300 w-72"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </span>
            </div>
          </div>
        )}

        {/* Right side: Auth buttons / User info */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 font-semibold shadow-sm px-3 py-1 rounded-full border border-gray-600">
                Hi, {name} 👋
              </span>
              <GlowingButton label="Logout" onClick={handleLogout} />
            </>
          ) : (
            <>
              <GlowingButton label="Login" onClick={() => navigate('/login')} />
              <FancyButton label="Signup" onClick={() => navigate('/signup')} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
