    import { Sprout } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-slate-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md transform transition duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <Sprout className="w-10 h-10 text-green-600" />
          <h2 className="text-2xl font-bold text-slate-800 ml-2">Join Organic Farming</h2>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-slate-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-slate-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
