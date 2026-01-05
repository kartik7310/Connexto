import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validations } from "../utils/constants";
import Auth from "../services/authService";
import authSide from "../assets/auth_side.png";

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      const res = await Auth.resetPassword({
        email,
        otp: values.otp,
        password: values.password,
        confirmPassword: values.confirmPassword
      });
      if (res?.data?.success) {
        toast.success(res.data.message || "Password reset successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-900 text-white">
        <div className="text-center">
          <p className="mb-4">Invalid access. Please request an OTP first.</p>
          <Link to="/forgot-password" title="Go to Forgot Password" className="btn btn-primary">Go to Forgot Password</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-900 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-base-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block relative h-full">
          <img 
            src={authSide} 
            alt="Reset Password Visual" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Set New Password</h2>
            <p className="text-slate-300 font-medium">Secure your account with a strong password.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 w-full flex flex-col justify-center">
          <div className="mb-8">
             <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
             <p className="text-slate-400 text-sm">Enter the OTP sent to <strong>{email}</strong> and your new password.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">OTP</label>
              <input 
                type="text"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.otp ? "border-red-500" : "border-slate-600"}`}
                {...register("otp", { required: "OTP is required" })}
                placeholder="Enter 6-digit OTP"
              />
              {errors.otp && <p className="text-sm text-red-400 mt-2">{errors.otp.message}</p>}
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">New Password</label>
              <input 
                type="password"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.password ? "border-red-500" : "border-slate-600"}`}
                {...register("password", validations.password)}
                placeholder="New password"
              />
              {errors.password && <p className="text-sm text-red-400 mt-2">{errors.password.message}</p>}
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">Confirm New Password</label>
              <input 
                type="password"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.confirmPassword ? "border-red-500" : "border-slate-600"}`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => val === password || "Passwords do not match"
                })}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && <p className="text-sm text-red-400 mt-2">{errors.confirmPassword.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-slate-400">
            Back to <Link className="text-blue-400 hover:text-blue-300 font-semibold hover:underline" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
