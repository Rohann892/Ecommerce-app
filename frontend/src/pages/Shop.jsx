import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    result = result.filter(p => p.price <= priceRange);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm border dark:border-gray-800"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{filteredProducts.length} Products</span>
          </div>
        </div>

        {/* Sidebar Filters - Desktop */}
        <aside className={`fixed inset-0 z-[60] lg:relative lg:z-0 bg-white dark:bg-gray-950 lg:bg-transparent transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:w-72 flex-shrink-0`}>
          <div className="h-full lg:h-auto overflow-y-auto p-6 lg:p-0">
            <div className="flex justify-between items-center lg:hidden mb-8">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            {/* Categories */}
            <div className="mb-10">
              <h3 className="font-bold text-lg mb-6 flex items-center">
                Categories
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`block w-full text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === 'All' ? 'bg-primary-600 text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`block w-full text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === cat.name ? 'bg-primary-600 text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-10">
              <h3 className="font-bold text-lg mb-6">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between mt-4 text-sm font-medium">
                <span>$0</span>
                <span>Max: ${priceRange}</span>
              </div>
            </div>

            {/* Ratings Placeholder */}
            <div>
              <h3 className="font-bold text-lg mb-6">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 transition-colors">{star}+ Stars</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Toolbar */}
          <div className="hidden lg:flex items-center justify-between mb-10 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 font-medium">{filteredProducts.length} products found</span>
              {searchQuery && (
                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-3 py-1 rounded-full text-sm flex items-center">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-2"><X className="w-4 h-4" /></button>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold outline-none cursor-pointer text-primary-600"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border dark:border-gray-800">
              <div className="mb-6 flex justify-center">
                <Search className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange(1000);
                  setSearchQuery('');
                }}
                className="mt-6 text-primary-600 font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
