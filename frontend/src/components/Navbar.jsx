import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { themeActions } from '../redux/slices/themeSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    dispatch(themeActions.toggleDarkMode());
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            E-Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-600 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-primary-600 font-medium transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-primary-600 font-medium transition-colors">Categories</Link>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-full max-w-xs mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <div className="hidden md:block">
               <Link to="/login" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </form>
              <div className="flex flex-col space-y-4 text-lg font-medium">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                  Cart ({totalQuantity})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
