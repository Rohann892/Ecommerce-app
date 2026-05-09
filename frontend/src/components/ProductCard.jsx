import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(cartActions.addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="card-premium overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <Link 
              to={`/product/${product.id}`}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-primary-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            >
              <Eye className="w-5 h-5" />
            </Link>
            <button 
              onClick={handleAddToCart}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-primary-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Badges */}
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold ml-1 text-gray-600 dark:text-gray-400">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary-600 transition-colors mb-2">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            <button 
              onClick={handleAddToCart}
              className="text-sm font-bold text-primary-600 hover:text-primary-700 underline underline-offset-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
