import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              LuxeStore
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Your destination for premium products and exceptional shopping experiences. We bring you the best in fashion, electronics, and lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 hover:text-white transition-all">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li><Link to="/shop" className="hover:text-primary-600 transition-colors">All Products</Link></li>
              <li><Link to="/featured" className="hover:text-primary-600 transition-colors">Featured</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-primary-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/blog" className="hover:text-primary-600 transition-colors">Our Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6">Customer Service</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-primary-600 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                <span>123 Luxe Street, Fashion Avenue, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <span>support@luxestore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>© 2026 LuxeStore. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
