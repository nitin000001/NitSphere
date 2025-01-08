import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [isFollow, setIsFollow] = useState(false);
  const { followUser } = UserData();

  // Fetch user data
  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const followHandler = () => {
    setIsFollow((prevState) => !prevState); // Toggle follow
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) {
      setIsFollow(true);
    }
  }, [user]);

  const { pins } = PinData();

  // Filter pins owned by the current user
  let userPins = [];
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  return (
    <div>
      {user && (
        <div className="flex flex-col justify-center items-center">
          <div className="p-6 w-full">
            {/* Profile Picture */}
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gray-500 flex items-center justify-center">
                {user.name && (
                  <span className="text-white font-semibold text-xl">
                    {user.name.slice(0, 1)}
                  </span>
                )}
              </div>
            </div>

            {/* User Information */}
            <h1 className="text-center text-2xl text-gray-500 font-bold mt-5">
              {user.name || "User"}
            </h1>
            <p className="text-center text-2xl text-gray-500 font-bold">
              {user.email || "No email available"}
            </p>

            {/* Followers and Followings */}
            <div className="flex justify-center items-center text-center text-2xl gap-4 text-gray-500 font-bold">
              <p>{user.followers?.length || 0} followers</p>
              <p>{user.followings?.length || 0} followings</p>
            </div>

            {/* Follow/Unfollow Button */}
            <div className="flex justify-center mt-4 space-x-2">
              {user && user.id === loggedInUser._id ? (
                "hellos"
              ) : (
                <button
                  onClick={followHandler}
                  className="bg-gray-300 px-4 py-2 font-semibold rounded"
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>

            {/* User Pins */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {userPins && userPins.length > 0 ? (
                userPins.map((pin) => <PinCard key={pin._id} pin={pin} />)
              ) : (
                <p>No pins yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
