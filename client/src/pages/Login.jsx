import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/LoadingAnimation";
import Logo from "../assets/logo.avif";
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
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4 ">
          <img src={Logo} alt="Logo" className="h-12 rounded-full" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log in to NitScape
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              required
              type="email"
              id="email"
              className="common-input"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              id="password"
              className="common-input"
            />
          </div>
          <button type="submit" className="common-btn">
            Log in
          </button>
        </form>
        <div className="mt-6 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 "></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <span>
              Not on NitScape yet?{" "}
              <Link
                to="/register"
                className="font-medium text-pinterest hover:underline"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;


{/* 
  <div className="flex items-center justify-center mt-10 h-screen px-4 bg-gray-50">
     
      <div className="w-full max-w-[400px] md:max-w-[450px] bg-white shadow-lg rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Welcome Back
          </h1>

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

          <div className="text-right">
            <a
              href="#"
              className="text-blue-500 text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Login"}
          </button>

          <p className="text-xs text-center text-gray-600">
            By continuing, you agree to NitSphere's{" "}
            <span className="font-semibold">Terms of Service</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>.
          </p>

          <hr className="my-2 border-gray-300" />

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
     */}