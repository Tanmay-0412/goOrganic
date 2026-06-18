'use client'
import { useState } from "react";
import { Leaf, Sprout } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative transition-all duration-300">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-slate-600 hover:text-slate-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Capsule Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-slate-100 rounded-full p-1">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                isLogin
                  ? "bg-green-600 text-white"
                  : "text-slate-700 hover:bg-green-100"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !isLogin
                  ? "bg-green-600 text-white"
                  : "text-slate-700 hover:bg-green-100"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          {isLogin ? (
            <Leaf className="w-8 h-8 text-green-600" />
          ) : (
            <Sprout className="w-8 h-8 text-green-600" />
          )}
          <h2 className="text-2xl font-bold text-slate-800 ml-2">
            {isLogin ? "Welcome Back" : "Join Organic Farming"}
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Example@organicfarm.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {isLogin && (
            <div className="flex justify-between items-center text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" />
                Remember me
              </label>
              <span className="cursor-pointer hover:text-green-600">
                Forgot Password?
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Social Auth */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 mb-3">
            Or {isLogin ? "Sign In" : "Sign Up"} with
          </p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
