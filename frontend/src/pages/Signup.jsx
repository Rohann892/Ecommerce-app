import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none border dark:border-gray-800"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-gray-500">
            Join E-Store and start your premium journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                className="input-premium pl-12"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <User className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="hello@example.com"
                className="input-premium pl-12"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Mail className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input-premium pl-12 pr-12"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Lock className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-primary-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 ml-1">
              Must be at least 8 characters long
            </p>
          </div>

          <div className="flex items-start space-x-3 ml-1">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600"
              required
            />
            <span className="text-sm text-gray-500">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-primary-600 font-bold hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-primary-600 font-bold hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </div>

          <button
            type="submit"
            className="btn-gradient w-full py-4 text-lg flex items-center justify-center space-x-3"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-10 text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 font-bold hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
