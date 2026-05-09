import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(cartActions.deleteItem(id));
    toast.info('Item removed from cart');
  };

  const handleUpdateQuantity = (id, action) => {
    if (action === 'increase') {
      const item = items.find(i => i.id === id);
      dispatch(cartActions.addToCart(item));
    } else {
      dispatch(cartActions.removeFromCart(id));
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-primary-100 dark:bg-primary-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-10">Looks like you haven't added anything to your cart yet. Explore our products and find something you love!</p>
          <Link to="/shop" className="btn-gradient inline-flex items-center space-x-3 px-10 py-4">
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
        <span className="text-lg text-gray-500">{totalQuantity} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border dark:border-gray-800 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.category}</p>
                  <div className="text-lg font-bold text-primary-600">${item.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, 'decrease')}
                      className="p-1 hover:text-primary-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="mx-6 font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, 'increase')}
                      className="p-1 hover:text-primary-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/shop" className="inline-flex items-center text-primary-600 font-bold mt-4">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border dark:border-gray-800 sticky top-28">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900 dark:text-white font-bold">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-gray-900 dark:text-white font-bold">$0.00</span>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-800 pt-6 mb-10">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold text-primary-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-gradient w-full py-5 text-lg shadow-xl shadow-primary-500/20">
              Proceed to Checkout
            </button>
            
            <div className="mt-8 flex items-center justify-center space-x-4">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 opacity-50" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-50" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
