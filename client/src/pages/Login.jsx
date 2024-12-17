import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/LoadingAnimation";
import Logo from "../components/Logo";
import { PinData } from "../context/PinContext";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();
  const { fetchPins } = PinData();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(Email, password, navigate, fetchPins);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center mt-10 h-screen px-4 bg-gray-50">
      {/* Form Container */}
      <div className="w-full max-w-[400px] md:max-w-[450px] bg-white shadow-lg rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Welcome Back
          </h1>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border-2 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-2 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-blue-500 text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Login"}
          </button>

          {/* Terms and Conditions */}
          <p className="text-xs text-center text-gray-600">
            By continuing, you agree to NitSphere's{" "}
            <span className="font-semibold">Terms of Service</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>.
          </p>

          {/* Divider */}
          <hr className="my-2 border-gray-300" />

          {/* Register Redirect */}
          <p className="text-sm text-center font-semibold">
            New here?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
