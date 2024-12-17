import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/LoadingAnimation";
import Logo from "../components/Logo";
import { PinData } from "../context/PinContext";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const {fetchPins} = PinData();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(Email, password, navigate, fetchPins);

    setEmail("");
    setpassword("");
  };

  return (
    <div className="w-full h-[88vh] flex items-center justify-center">
      <div>
        <form
          onSubmit={handleSubmit}
          className="border-2 flex flex-col items-center w-[33vw] h-[500px] bg-white shadow-xl rounded-xl overflow-hidden p-10"
        >
          <Logo />
          <h1 className="text-3xl font-semibold tracking-tighter text-center mb-7 flex flex-col items-center gap-2">
            Welcome's you 
          </h1>
          <div className="w-3/4">
            <label htmlFor="email" className="block ">
              Email address
            </label>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="border-2 outline-none w-full px-3 py-1 rounded-lg"
            />
            <label htmlFor="password" className="block mt-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border-2 outline-none w-full px-3 py-1 rounded-lg"
            />
          </div>
          <a
            href="#"
            className="block font-semibold text-sm mt-2 hover:underline"
          >
            Forgot your password?
          </a>
          <button
            type="submit"
            className="bg-blue-500 block w-2/3 px-3 py-1 rounded-full mt-4 mb-6 hover:bg-blue-700 text-white"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Login"}
          </button>
          <p className=" w-full text-center text-sm">
            By continuing, you agree to NitSphere's Terms of Service and
            acknowledge that you've read our Privacy Policy.
            <span className="text-center text-sm">Notice at collection.</span>
          </p>
          <hr className="w-1/2 m-auto mt-5 items-center" />
          <p className="text-sm font-semibold ">
            Not on Pinterest yet?
            <Link to="/register" className="hover:text-blue-700 ">
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
