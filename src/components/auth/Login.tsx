import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import container from "../../assets/container.png";
import googlelogo from "../../assets/7123025_logo_google_g_icon.svg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { FaSpinner } from "react-icons/fa"; // Import the FaSpinner icon

const Login: React.FC = () => {
  const [input, setInput] = useState({ email: "", OTP: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
// code to check valid email format
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
// code to send otp
  const sendOtpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingOtp(true); 
    dispatch(setLoading(true)); 
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/signin/send-otp`,
        { email: input.email },
      );
      if (response.data.success) {
        setOtpSent(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to send OTP", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message || "Error sending OTP.");
      }
    } finally {
      setLoadingOtp(false);  
      dispatch(setLoading(false));
    }
  };
//code to verify otp and signin
  const verifyOtpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSignIn(true);  
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/signin`,
        { email: input.email, otp: input.OTP },
        {
          headers: {
            "Content-Type": "application/json", 
          },
          withCredentials: true, 
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); 
        toast.success(res.data.message);
        navigate("/dashboard"); 
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message);
      }
    } finally {
      setLoadingSignIn(false); 
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:mt-10 mx-auto relative">
      <div className="lg:max-w-4xl lg:my-auto flex flex-col border-2 lg:flex-row w-full  rounded-xl">
        {/* Logo */}
        <span className="lg:w-[5vw] w-[30vw] relative lg:top-2 lg:left-2 mt-4 lg:mt-0 mx-auto">
          <img src={logo} alt="Logo" className="lg:w-[8vw] w-[20vw]" />
        </span>

        {/* login Form */}
        <div className="flex justify-center items-center mx-auto lg:w-[40vw] w-full relative lg:right-6 h-auto mt-6 lg:mt-12 mb-4 lg:p-6">
          <div className="w-full px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-center lg:text-left">Sign in</h1>
            <p className="lg:text-sm text-xs text-gray-400 text-center lg:text-left mt-1">
              Please login to continue to your account.
            </p>

            <form className="mt-6">
              <div className="flex gap-2 my-3">
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  placeholder="Enter your email"
                  onChange={changeEventHandler}
                  aria-label="email"
                  className="border-2 rounded-lg border-gray-300 lg:w-[20vw] w-full h-12 p-2 outline-blue-700 group-focus-within:border-blue-700"
                />
                <button
                  onClick={sendOtpHandler}
                  className="text-white lg:w-[5vw] w-[25vw] h-12 bg-blue-700 rounded-lg font-semibold hover:bg-blue-800 text-sm"
                  disabled={loadingOtp || !validateEmail(input.email)}
                >
                  {loadingOtp ? (
                    <FaSpinner className="animate-spin text-white w-5 h-5 mx-auto" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
              {!validateEmail(input.email) && input.email.length > 0 && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}

              {/* OTP */}
              {otpSent && (
                <input
                  type="text"
                  maxLength={6}
                  name="OTP"
                  value={input.OTP}
                  placeholder="Enter your OTP"
                  onChange={changeEventHandler}
                  aria-label="OTP"
                  className="border-2 rounded-lg border-gray-300 lg:w-[25vw] w-full h-12 p-2 outline-blue-700 group-focus-within:border-blue-700"
                  disabled={!otpSent}
                />
              )}

              {/* Forgot Password */}
              <button
                type="button"
                className="bg-transparent text-sm text-blue-800 underline my-2"
              >
                Forgot Password?
              </button>

              {/* Keep Me Logged In */}
              <div className="flex items-center gap-2 text-sm my-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  aria-label="Keep me logged in"
                />
                <p>Keep me logged in</p>
              </div>

              {/* Sign In Button */}
              <button
                onClick={verifyOtpHandler}
                type="submit"
                className="text-white mt-2 bg-blue-700 w-full h-12 rounded-xl font-semibold text-md hover:bg-blue-800"
                disabled={loadingSignIn || !otpSent}
              >
                {loadingSignIn ? (
                  <FaSpinner className="animate-spin text-white w-5 h-5 mx-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mt-6">
              <hr className="w-full border-gray-300" />
              <p className="text-gray-500 text-sm">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Google Login Button */}
            <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 w-full h-12 rounded-lg text-sm font-semibold hover:bg-gray-100 mt-4">
              Sign in with Google
              <img src={googlelogo} alt="Google logo" className="w-5 h-5" />
            </button>

            {/* Footer Section */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Need an account?{" "}
                <Link to="/Signup" className="text-blue-700 underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block p-3">
          <img
            src={container}
            alt="Login image"
            className="w-[60vw] h-[85vh] object-cover  rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
