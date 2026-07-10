"use client";
import { useState } from "react";
import { Leaf, Sprout } from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/features/auth/authSlice";
import { Eye, EyeOff } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState("")
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  // const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!emailId || !password) {
        showError("Email and password are required");
        setError("Email and password cannot be empty");
        return;
      }
      const payload = {
        email: emailId,
        password: password,
      };
      const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`;
      try {
        const res = await fetch(URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) { 
          showSuccess(data.message || "Login Successful");
          dispatch(login())
          onClose()
        } else {
          showError(data.message || "Login Failed");
          setError(data.message || "Login Failed");
        }
      } catch (err) {
        console.error("Login Failed:", err);
        showError("Something went wrong");
      }
    }else{

    if (!emailId || !password || !fullName) {
      setError("Fields cannot be empty");
      return;
    }

    const payload = {
      name: fullName,
      email: emailId,
      password: password,
    };
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;
    try {
      const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        showSuccess(data.message || "Signup Succesfull");
        setIsLogin(true)
      } else {
        showError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Failed", err);
      showError("Something went wrong");
    }
  }}

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 p-4">
       <div className="bg-[#d4d4d4] rounded-2xl shadow-5xl w-full max-w-md p-8 relative transition-all duration-300">
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
              Login
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
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Email ID
            </label>
            <input
              type="email"
              value={emailId}
              placeholder="Example@organicfarm.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-slate-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-10.5 text-slate-500 hover:text-slate-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
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
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-400 p-3 flex items-center">
              <svg
                className="h-5 w-5 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
                />
              </svg>
              <span className="text-sm font-medium text-red-700">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Social Auth */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 mb-3">
            Or {isLogin ? "Login" : "Sign Up"} with
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
