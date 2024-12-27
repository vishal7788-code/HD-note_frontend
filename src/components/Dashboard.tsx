import React, { useEffect } from "react";
import logo from "../assets/top.svg";
import WelcomeCard from "./WelcomeCard";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetUserNotes from "../hooks/useGetUserNotes"; // Import the custom hook
import axios from "axios";
import { RootState } from "../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const notes = useSelector((state: RootState) => state.note.notes); 

  //cutom hook to fetch notes.
  useGetUserNotes();
//if user is not available, navigate to sign in page
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  // Logout handler function
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/signout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null)); 
        navigate("/signin");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message );
      }
    }
  };

  return (
    <div>
      <div className="lg:max-w-4xl lg:border-2 h-screen mx-auto my-3 rounded-xl">
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center">
            <img src={logo} alt="" className="w-[5vw] my-3 ml-4" />
            <h1 className="lg:text-2xl font-semibold">Dashboard</h1>
          </div>
          <div>
            <button
              className="text-blue-700 underline lg:text-lg font-semibold"
              onClick={logoutHandler} 
            >
              Sign Out
            </button>
          </div>
        </div>
        <div>
          <WelcomeCard />
        </div>
        <div>
          <CreateNote />
        </div>
        <div>
          {/* render Notes component if user data is available */}
          {user? (
            <Notes notes={notes} />
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;