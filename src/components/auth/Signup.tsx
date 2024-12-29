import React, { useState, useCallback } from "react";
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
  const [formData, setFormData] = useState({ name: "", dateOfBirth: "", email: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState({ otp: false, signup: false });
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const sendOtp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.email) {
        toast.error("Please enter a valid email.");
        return;
      }

      setLoading((prev) => ({ ...prev, otp: true }));
      // send otp api call
      try {
        const res = await axios.post(`${import.meta.env.VITE_USER_API_ENDPOINT}/signup/send-otp`, {
          email: formData.email,
        });

        if (res.data.success) {
          setIsOTPSent(true);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message || "Failed to send OTP.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      } finally {
        setLoading((prev) => ({ ...prev, otp: false }));
      }
    },
    [formData.email]
  );

  const handleSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!otp) {
        toast.error("Please enter the OTP.");
        return;
      }

      setLoading((prev) => ({ ...prev, signup: true }));
      // signup api call
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_USER_API_ENDPOINT}/signup`,
          { ...formData, otp },
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          toast.success(res.data.message);
          navigate("/dashboard");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || "An unexpected error occurred."
          : "Signup failed. Please try again.";
        toast.error(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, signup: false }));
      }
    },
    [formData, otp, dispatch, navigate]
  );

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:mt-2 mx-auto relative">
      <div className="lg:max-w-4xl lg:border-2 flex flex-col lg:flex-row w-full rounded-xl">
        {/* Logo */}
        <div className="lg:w-[5vw] w-[30vw] mx-auto lg:mt-0 mt-4 relative lg:top-2 lg:left-2">
          <img src={logo} alt="Logo" className="lg:w-[8vw] w-[20vw]" />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center mx-auto lg:w-[40vw] w-full lg:mt-5 lg:right-6 p-6">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center lg:text-left">Sign up</h1>
            <p className="lg:text-sm text-xs text-gray-400 text-center lg:text-left mt-1">
              Sign up to enjoy the features of HD.
            </p>

            <form className="mt-6" onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-2 rounded-lg border-gray-300 w-full h-12 p-2 mb-3 outline-blue-700"
              />

              <input
                type="date"
                name="dateOfBirth"
                aria-label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border-2 rounded-lg border-gray-300 w-full h-12 p-2 mb-3 outline-blue-700"
              />

              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-2 rounded-lg border-gray-300 w-full h-12 p-2 outline-blue-700"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-white w-32 h-12 bg-blue-700 rounded-lg font-semibold hover:bg-blue-800 text-sm"
                >
                  {loading.otp ? <FaSpinner className="animate-spin mx-auto" /> : "Send OTP"}
                </button>
              </div>

              {isOTPSent && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-2 rounded-lg border-gray-300 w-full h-12 p-2 mb-3 outline-blue-700"
                />
              )}

              <button
                type="submit"
                className="text-white bg-blue-700 w-full h-12 rounded-xl font-semibold text-md hover:bg-blue-800 mt-2"
              >
                {loading.signup ? <FaSpinner className="animate-spin mx-auto" /> : "Sign Up"}
              </button>
            </form>

            <div className="flex items-center gap-4 mt-6">
              <hr className="w-full border-gray-300" />
              <p className="text-gray-500 text-sm">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 w-full h-12 rounded-lg text-sm font-semibold hover:bg-gray-100 mt-4">
              Sign in with Google
              <img src={googlelogo} alt="Google logo" className="w-5 h-5" />
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account? <Link to="/signin" className="text-blue-700 underline">Sign in</Link>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block p-2">
          <img
            src={container}
            alt="Login"
            className="w-[60vw] h-[94vh] object-cover  rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
