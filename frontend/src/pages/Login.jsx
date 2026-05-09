import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth logic here
    console.log('Logging in:', formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none border dark:border-gray-800"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="hello@example.com"
                className="input-premium pl-12"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-sm font-bold">Password</label>
              <Link to="/forgot-password" title="Forgot Password" className="text-xs text-primary-600 font-bold hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-premium pl-12 pr-12"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-primary-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-gradient w-full py-4 text-lg flex items-center justify-center space-x-3">
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between space-x-4">
          <div className="h-[1px] bg-gray-200 dark:bg-gray-800 flex-grow"></div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Or continue with</span>
          <div className="h-[1px] bg-gray-200 dark:bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="flex items-center justify-center space-x-3 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold">Google</span>
          </button>
          <button className="flex items-center justify-center space-x-3 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <FaGithub className="w-5 h-5" />
            <span className="font-bold">GitHub</span>
          </button>
        </div>

        <p className="mt-10 text-center text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 font-bold hover:underline">Sign up for free</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
