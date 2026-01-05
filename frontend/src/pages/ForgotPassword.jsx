import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validations } from "../utils/constants";
import Auth from "../services/authService";
import authSide from "../assets/auth_side.png";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await Auth.forgotPassword(values.email);
      if (res?.data?.success) {
        toast.success(res.data.message || "OTP sent to your email");
        navigate("/reset-password", { state: { email: values.email } });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-900 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-base-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block relative h-full">
          <img 
            src={authSide} 
            alt="Forgot Password Visual" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/90 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Reset Your Password</h2>
            <p className="text-slate-300 font-medium">Don't worry, it happens to the best of us.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 w-full flex flex-col justify-center">
          <div className="mb-8">
             <h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
             <p className="text-slate-400 text-sm">Enter your email address and we'll send you an OTP to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 block mb-2">Email</label>
              <input 
                type="email"
                className={`w-full border rounded-xl px-4 py-3 bg-base-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? "border-red-500" : "border-slate-600"}`}
                {...register("email", validations.email)}
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-sm text-red-400 mt-2">{errors.email.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-slate-400">
            Remembered your password? <Link className="text-blue-400 hover:text-blue-300 font-semibold hover:underline" to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
