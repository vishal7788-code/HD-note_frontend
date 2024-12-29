import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import container from "../../assets/container.png";
import googlelogo from "../../assets/7123025_logo_google_g_icon.svg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { FaSpinner } from "react-icons/fa";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", OTP: "" });
  const [status, setStatus] = useState({ otpSent: false, loadingOtp: false, loadingSignIn: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setStatus((prev) => ({ ...prev, loadingOtp: true }));
    dispatch(setLoading(true));
    try {
      // sigin otp api call
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/signin/send-otp`,
        { email: formData.email }
      );
      if (res.data.success) {
        setStatus((prev) => ({ ...prev, otpSent: true }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message || "Error sending OTP." : "Failed to send OTP.");
    } finally {
      setStatus((prev) => ({ ...prev, loadingOtp: false }));
      dispatch(setLoading(false));
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.OTP) {
      toast.error("Please enter the OTP.");
      return;
    }
    setStatus((prev) => ({ ...prev, loadingSignIn: true }));
    dispatch(setLoading(true));
    try {
      // signin api call
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/signin`,
        { ...formData, otp: formData.OTP },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message : "Failed to sign in.");
    } finally {
      setStatus((prev) => ({ ...prev, loadingSignIn: false }));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:mt-10 mx-auto relative">
      <div className="lg:max-w-4xl flex flex-col border-2 lg:flex-row w-full rounded-xl">
        <span className="lg:w-[5vw] w-[30vw] relative left-5 lg:top-2 mt-4 mx-auto">
          <img src={logo} alt="Logo" className="lg:w-[8vw] w-[20vw]" />
        </span>

        <div className="flex justify-center items-center mx-auto lg:w-[40vw] w-full mt-6 lg:mt-12 mb-4 lg:p-6">
          <div className="w-full px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-center lg:text-left">Sign in</h1>
            <p className="lg:text-sm text-xs text-gray-400 text-center lg:text-left mt-1">
              Please login to continue to your account.
            </p>

            <form className="mt-6">
              <div className="flex gap-2 my-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="border-2 rounded-lg border-gray-300 lg:w-[20vw] w-full h-12 p-2 outline-blue-700"
                />
                <button
                  onClick={sendOtp}
                  className="text-white lg:w-[5vw] w-[25vw] h-12 bg-blue-700 rounded-lg font-semibold hover:bg-blue-800 text-sm"
                  disabled={status.loadingOtp || !validateEmail(formData.email)}
                >
                  {status.loadingOtp ? <FaSpinner className="animate-spin w-5 h-5 mx-auto" /> : "Send OTP"}
                </button>
              </div>

              {status.otpSent && (
                <input
                  type="text"
                  maxLength={6}
                  name="OTP"
                  value={formData.OTP}
                  placeholder="Enter your OTP"
                  onChange={handleChange}
                  className="border-2 rounded-lg border-gray-300 lg:w-[25vw] w-full h-12 p-2 outline-blue-700"
                />
              )}

              <button
                onClick={verifyOtp}
                type="submit"
                className="text-white mt-2 bg-blue-700 w-full h-12 rounded-xl font-semibold text-md hover:bg-blue-800"
                disabled={status.loadingSignIn || !status.otpSent}
              >
                {status.loadingSignIn ? <FaSpinner className="animate-spin w-5 h-5 mx-auto" /> : "Sign In"}
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

        <div className="hidden lg:block p-3">
          <img
            src={container}
            alt="Login image"
            className="w-[60vw] h-[85vh] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
