import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-primary-600 font-bold underline">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    // Note: To handle specific quantity, we can dispatch multiple times or update action
    for(let i=0; i<quantity; i++) {
        dispatch(cartActions.addToCart(product));
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary-600">Shop</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-square rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border dark:border-gray-800">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary-600 transition-all">
                <img src={product.image} alt="Gallery" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col"
        >
          <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
              <span className="ml-2 font-bold text-gray-900 dark:text-gray-100">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">{product.reviews} Customer Reviews</span>
          </div>

          <div className="text-3xl font-bold text-primary-600 mb-8">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-primary-600 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="mx-6 font-bold text-lg w-4 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-primary-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="btn-gradient flex-grow py-4 flex items-center justify-center space-x-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            
            <button className="p-4 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t dark:border-gray-800">
            <Benefit icon={<Truck />} title="Free Delivery" />
            <Benefit icon={<RotateCcw />} title="30 Days Return" />
            <Benefit icon={<ShieldCheck />} title="Safe Payment" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex space-x-12 border-b dark:border-gray-800 mb-10">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-bold transition-all relative ${activeTab === 'description' ? 'text-primary-600' : 'text-gray-400'}`}
          >
            Description
            {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-bold transition-all relative ${activeTab === 'reviews' ? 'text-primary-600' : 'text-gray-400'}`}
          >
            Reviews ({product.reviews})
            {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full" />}
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === 'description' ? (
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>{product.description}</p>
              <ul className="mt-6 space-y-2">
                <li>Premium quality materials</li>
                <li>Innovative design and technology</li>
                <li>Sustainable production process</li>
                <li>One year international warranty</li>
              </ul>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Customer reviews will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const Benefit = ({ icon, title }) => (
  <div className="flex items-center space-x-3 text-sm font-medium text-gray-600 dark:text-gray-400">
    <div className="text-primary-600">{icon}</div>
    <span>{title}</span>
  </div>
);

export default ProductDetail;
