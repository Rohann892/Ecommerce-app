import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary-600 text-sm font-bold mb-6">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Redefine Your <br />
              <span className="text-primary-500">Digital Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-lg">
              Discover the latest trends in electronics, fashion, and home essentials. Premium quality, curated just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-gradient text-center py-4 px-10 text-lg">
                Shop Now
              </Link>
              <Link to="/categories" className="px-10 py-4 rounded-full border border-white/30 hover:bg-white/10 transition-all text-lg font-medium text-center">
                View Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureItem icon={<Truck />} title="Free Shipping" desc="On all orders over $100" />
            <FeatureItem icon={<ShieldCheck />} title="Secure Payment" desc="100% protected payments" />
            <FeatureItem icon={<Headphones />} title="24/7 Support" desc="Dedicated support team" />
            <FeatureItem icon={<CreditCard />} title="Easy Returns" desc="30-day money back guarantee" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600 dark:text-gray-400">Explore our curated collections across various categories.</p>
            </div>
            <Link to="/categories" className="hidden md:flex items-center text-primary-600 font-bold hover:underline">
              View All <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -10 }}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay in the Loop</h2>
            <p className="text-primary-100 mb-10 text-lg">
              Subscribe to our newsletter and get 10% off your first purchase plus exclusive access to new arrivals and sales.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
              <button type="submit" className="bg-white text-primary-900 font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-center space-x-4 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  </div>
);

export default Home;
