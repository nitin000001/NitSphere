import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

const Navbar = ({ user }) => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation(); // React Router hook to get current path

  const handleSetActive = (path) => {
    setActiveLink(path); // Updates the active link state
  };

  return (
    <div className="py-2 px-4 shadow-xl h-[60px] w-full bg-white">
      <nav className="flex justify-between items-center  ">
        <Link
          to="/"
          className={location.pathname === "/" ? "text-red-500" : ""}
          onClick={() => handleSetActive("/")}
        >
          <Logo />
        </Link>
        <ul>
          <li className="flex items-center gap-3 font-semibold">
            <Link
              to="/"
              className={location.pathname === "/" ? "text-red-500" : ""}
              onClick={() => handleSetActive("/")}
            >
              Home
            </Link>
            <Link
              to="/create"
              className={location.pathname === "/create" ? "text-red-500" : ""}
              onClick={() => handleSetActive("/create")}
            >
              Create
            </Link>

            <Link to="/account" onClick={() => handleSetActive("/account")}>
              <span className="flex items-center justify-center bg-gray-700 hover:text-gray-900 h-8 w-8 rounded-full shadow-xl p-2 text-red-500">
                {user.name.slice(0, 1)}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
