import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { Loading } from "../components/LoadingAnimation";

const Home = () => {
  const { pins, loading } = PinData();

  // Sort pins to display the newest first
  const sortedPins = pins
    ? [...pins].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-wrap m-4">
              {sortedPins && sortedPins.length > 0 ? (
                sortedPins.map((e, i) => <PinCard key={i} pin={e} />)
              ) : (
                <p>No Pins Yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
