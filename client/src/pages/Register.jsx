import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { TfiPinterestAlt } from "react-icons/tfi";
import Logo from "../components/Logo";
import { PinData } from "../context/PinContext";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [UserName, setUserName] = useState("");

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const {fetchPins} = PinData();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(UserName, Email, password, navigate, fetchPins);

    setEmail("");
    setpassword("");
    setUserName("");
  };

  return (
    <div className="w-full h-[70%] mt-3 text-black flex items-center justify-center">
      <div>
        <form
          onSubmit={handleSubmit}
          className="border-2 flex flex-col bg-white items-center w-[450px] h-[540px] shadow-xl rounded-xl py-5 "
        >
          <h1 className="text-3xl font-semibold tracking-tighter text-center mb-7 flex flex-col items-center gap-2">
            Welcome to  <Logo />
          </h1>
          <div className="w-3/4">
            <label htmlFor="name" className="block ">
              username :
            </label>
            <input
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="username"
              className="border-2 outline-none w-full px-3 py-1 rounded-lg"
            />
            <label htmlFor="email" className="block ">
              email address :
            </label>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="border-2 outline-none w-full px-3 py-1 rounded-lg"
            />
            <label htmlFor="password" className="block mt-2 ">
              password
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
            className="block   font-semibold text-sm mt-2 hover:underline"
          >
            Forgot your password?
          </a>
          <button
            type="submit"
            className="bg-blue-500 text-white block w-2/3 px-3 py-1 rounded-full mt-4 mb-6 hover:bg-blue-700"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "register"}
          </button>

          <p className=" text-center text-sm ">
            By continuing, you agree to NitSphere's Terms of Service and
            acknowledge that you've read our Privacy Policy. <br /> Notice at
            collection.
          </p>
          <hr className="w-1/2 m-auto mt-5 items-center mb-2" />
          <p className="text-sm  font-sans cursor-pointer ">
            Already have an account?
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
