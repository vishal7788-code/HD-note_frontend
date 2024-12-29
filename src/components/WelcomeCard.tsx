import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const WelcomeCard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="lg:max-w-3xl max-w-[92vw] md:max-w-[84vw] md:mx-14 mx-2 lg:mx-12 lg:p-4">
      <div className="bg-white shadow-lg px-4 py-4 rounded-xl">
        <h1 className="lg:text-2xl text-md font-semibold mt-3 lg:mx-3 mx-1">
          Welcome, {user?.name || "Guest"}
        </h1>
        <h2 className="text-gray-500 lg:text-md text-sm font-semibold lg:mx-3 mx-1">
          Email: {user?.email || "Not Available"}
        </h2>
      </div>
    </div>
  );
};

export default WelcomeCard;
