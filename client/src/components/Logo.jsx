import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center space-x-0">
      <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-700 to-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white text-3xl font-bold">N</span>
        {/* Sparkles or pin elements */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full shadow-md animate-pulse"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-white rounded-full shadow-md animate-ping"></div>
      </div>

      <h1 className="text-xl font-bold text-gray-800 tracking-wide">
        it<span className="text-blue-500">Sphere</span>
      </h1>
    </div>
  );
};

export default Logo;
