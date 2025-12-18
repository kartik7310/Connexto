

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/store-slices/userSlice";
import Auth from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import authSide from "../assets/auth_side.png";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await Auth.createAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        age: Number(values.age),
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Account created");
        navigate("/login", { replace: true });
      } else {
        toast.error(res?.data?.message || "Could not create account");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Something went wrong"
      );
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    if (!idToken) {
      toast.error("Google login failed: Missing credential token");
      return;
    }
    try {
      const response = await Auth.googleLoginAccount(idToken);
      dispatch(addUser(response.data.user));
      toast.success(response.data?.message || "Google signup successful!");
      navigate("/feed", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Google signup failed. Please try again.";
      toast.error(message);
      console.error("signup failed:", error);
    }
  };

  const handleError = () => {
    toast.error("Google signup failed. Please try again.");
    console.error("Google signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-900 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-base-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block relative h-full">
          <img 
            src={authSide} 
            alt="Signup Visual" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Connexto</h2>
            <p className="text-slate-300 font-medium">Join our community and start connecting with people today.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Sign up to get started</p>
          </div>

          <div onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                First Name
              </label>
              <input
                type="text"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.firstName ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" },
                })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Last Name
              </label>
              <input
                type="text"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.lastName ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" },
                })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.lastName.message}
                </p>
              )}
            </div>    

            {/* Email */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.email ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Password
              </label>
              <input
                type="password"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.password ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                Age
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.age ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Enter your age"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  min: { value: 13, message: "Minimum age is 13" },
                  max: { value: 120, message: "Maximum age is 120" },
                })}
              />
              {errors.age && (
                <p className="text-sm text-red-400 mt-2">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* OTP Section (New) */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-300 block mb-2">
                OTP Verification
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full border border-slate-600 rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Enter OTP"
                  {...register("otp")}
                />
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
                  onClick={() => toast.info("OTP sent to your email!")}
                >
                  Send OTP
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? "Creating..." : "Sign up"}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <span className="flex-grow h-px bg-indigo-700"></span>
            <span className="px-4 text-indigo-400 font-semibold text-sm">OR</span>
            <span className="flex-grow h-px bg-indigo-700"></span>
          </div>

          {/* Google Login */}
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              size="large"
              type="standard"
              shape="rectangular"
              theme="filled_blue"
            />
          </div>

          {/* Login Link */}
          <p className="text-sm text-center mt-6 text-slate-400">
            Already have an account?{" "}
            <Link 
              className="text-blue-400 hover:text-blue-300 font-semibold hover:underline" 
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}