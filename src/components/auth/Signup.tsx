import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.svg";
import container from "../../assets/container.png";
import googlelogo from "../../assets/7123025_logo_google_g_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";


const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", dateOfBirth: "", email: "",otp:"" });
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingOtp(true);
    try {
      if (!formData.email) {
        toast.error("Please enter a valid email.");
        return;
      }
      // code to send otp
      const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/signup/send-otp`, {
        email: formData.email,
      });
      if (res.data.success) {
        setIsOTPSent(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoadingOtp(false);
    }
  };
// code to verify otp and signup 
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSignup(true);
    try {
      if (!otp) {
        toast.error("Please enter the OTP.");
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/signup`, {
        ...formData,
        otp,
      },
        
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", (error as Error).message);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message);
      
      }
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:mt-[0.5rem] mx-auto relative">
      <div className="lg:max-w-4xl lg:border-2 lg:my-auto flex flex-col lg:flex-row w-full lg:h-auto rounded-xl">
        {/* Logo */}
        <span className="lg:w-[5vw] w-[30vw] relative left-5 lg:top-2 lg:left-2 mt-4 lg:mt-0 mx-auto">
          <img src={logo} alt="Logo" className="lg:w-[8vw] w-[20vw]" />
        </span>

        {/* Form */}
        <div className="flex justify-center items-center mx-auto lg:w-[40vw] w-full relative lg:mt-5 lg:right-6 h-auto lg:h-[91vh] mt-6 mb-4 lg:p-6">
          <div className="w-full px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-center lg:text-left">Sign up</h1>
            <p className="lg:text-sm text-xs text-gray-400 text-center lg:text-left mt-1">
              Sign up to enjoy the features of HD.
            </p>

            <form className="mt-6" onSubmit={handleSignup}>
              {/* Name  */}
              <div className="flex gap-2 my-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-2 rounded-lg border-gray-300 lg:w-[25vw] w-full h-12 p-2 outline-blue-700"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex gap-2 my-3">
                <input
                  type="date"
                  name="dateOfBirth"
                  aria-label='date of birth'
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="border-2 rounded-lg bg-white border-gray-300 lg:w-[25vw] w-full h-12 p-2 outline-blue-700"
                />
              </div>

              {/* Email */}
              <div className="flex gap-2 my-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-2 rounded-lg border-gray-300 lg:w-[20vw] w-full h-12 p-2 outline-blue-700"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-white lg:w-[5vw] w-[25vw] h-12 bg-blue-700 rounded-lg font-semibold hover:bg-blue-800 text-sm"
                >
                  {loadingOtp ? <FaSpinner className="animate-spin text-white w-5 h-5 mx-auto" /> : "Send OTP"}
                </button>
              </div>

              {/* OTP  */}
              {isOTPSent && (
                <div className="flex gap-2 my-3">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border-2 rounded-lg border-gray-300 lg:w-[25vw] w-full h-12 p-2 outline-blue-700"
                  />
                </div>
              )}

              {/* Signup*/}
              <button
                type="submit"
                className="text-white mt-2 bg-blue-700 w-full h-12 rounded-xl font-semibold text-md hover:bg-blue-800"
              >
                {loadingSignup ? <FaSpinner className="animate-spin text-white w-5 h-5 mx-auto" /> : "Sign Up"}
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
                Already have an account?{" "}
                <Link to="/login" className="text-blue-700 underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src={container}
            alt="Login image"
            className="w-[60vw] h-[94vh] object-cover relative top-[0.5rem] right-[0.5rem] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
