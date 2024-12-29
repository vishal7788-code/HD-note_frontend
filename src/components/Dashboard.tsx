import React from "react";
import logo from "../assets/top.svg";
import WelcomeCard from "./WelcomeCard";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import useGetUserNotes from "../hooks/useGetUserNotes";
import axios from "axios";
import { RootState } from "../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const notes = useSelector((state: RootState) => state.note.notes);
// hook to fetch user notes
  useGetUserNotes();
// signout api call
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/signout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message);
      }
    }
  };

  return (
    <div>
      <div className="lg:max-w-4xl lg:border-2 h-screen mx-auto my-3 rounded-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[5vw] my-3 ml-4" />
            <h1 className="lg:text-2xl font-semibold">Dashboard</h1>
          </div>
          {user && (
            <button
              className="text-blue-700 underline lg:text-lg font-semibold"
              onClick={logoutHandler}
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Main Content */}
        {user ? (
          <>
            <WelcomeCard />
            <CreateNote />
            <Notes notes={notes} />
          </>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-xl font-semibold mb-4">You are not logged in!</h2>
            <p className="text-gray-700 mb-6">Please sign in or sign up to access the Dashboard.</p>
            <div className="flex space-x-4">
              <Link
                to="/signin"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="border-blue-700 border-2 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
