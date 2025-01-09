import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  
  const {setIsAuth, setUser} = UserData()
  
  const { pins } = PinData();
  // filtering out user to display user's card/pin
  let userPins;
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  const logOutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="p-6 w-full">
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-white font-semibold text-2xl text-center">
                {user.name.slice(0, 1)}
              </span>
            </div>
          </div>
          <h1 className="text-center text-2xl text-gray-500 font-bold mt-5">
            {user.name}
          </h1>
          <p className="text-center  text-gray-500 text-sm ">
            {user.email}
          </p>
          <div className="flex justify-center items-center text-center text-2xl gap-4 text-gray-500 font-bold">
              <p>{user.followers?.length || 0} followers</p> <span className="font-light text-black">|</span>
              <p>{user.followings?.length || 0} followings</p>
            </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={logOutHandler}
              className="bg-gray-300 px-4 py-2 font-semibold rounded"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {userPins && userPins.length > 0 ? (
              userPins.map((e, i) => <PinCard key={e._id} pin={e} />)
            ) : (
              <p>No pins yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
