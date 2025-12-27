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
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const email = watch("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Signup submit
  const onSubmit = async (values) => {
    try {
      const res = await Auth.createAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        age: values.age,
        otp: values.otp,
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
          err?.message ||
          "Something went wrong"
      );
    }
  };

  // ✅ Send OTP
  const handleSendOtp = async (email) => {
    if (!email) {
      toast.error("Please enter email first");
      return;
    }

    try {
      const res = await Auth.sendOtp({ email });
      if (res?.data?.success) {
        toast.success(res.data.message || "OTP sent successfully");
      } else {
        toast.error(res?.data?.message || "Could not send OTP");
      }
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  // ✅ Google signup
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      toast.error("Google login failed");
      return;
    }

    try {
      const res = await Auth.googleLoginAccount(idToken);
      dispatch(addUser(res.data.user));
      toast.success(res.data?.message || "Signup successful");
      navigate("/feed", { replace: true });
    } catch (err) {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-base-900 px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-base-800 shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Image */}
        <div className="hidden md:block relative">
          <img
            src={authSide}
            alt="Signup"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-5">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* First Name */}
            <input
              className="w-full mb-3 px-3 py-2 rounded-xl bg-base-700 text-white"
              placeholder="First Name"
              {...register("firstName", { required: "First name required" })}
            />
            {errors.firstName && <p className="text-red-400">{errors.firstName.message}</p>}

            {/* Last Name */}
            <input
              className="w-full mb-3 px-3 py-2 rounded-xl bg-base-700 text-white"
              placeholder="Last Name"
              {...register("lastName", { required: "Last name required" })}
            />

            {/* Email */}
            <input
              type="email"
              className="w-full mb-3 px-3 py-2 rounded-xl bg-base-700 text-white"
              placeholder="Email"
              {...register("email", { required: "Email required" })}
            />

            {/* Password */}
            <input
              type="password"
              className="w-full mb-3 px-3 py-2 rounded-xl bg-base-700 text-white"
              placeholder="Password"
              {...register("password", { required: "Password required" })}
            />

            {/* Age */}
            <input
              type="number"
              className="w-full mb-3 px-3 py-2 rounded-xl bg-base-700 text-white"
              placeholder="Age"
              {...register("age", { required: "Age required" })}
            />

            {/* OTP */}
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 px-3 py-2 rounded-xl bg-base-700 text-white"
                placeholder="Enter OTP"
                {...register("otp", { required: "OTP required" })}
              />
              <button
                type="button"
                onClick={() => handleSendOtp(email)}
                className="bg-indigo-600 px-3 py-2 rounded-xl text-white"
              >
                Send OTP
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 py-2 rounded-xl text-white"
            >
              {isSubmitting ? "Creating..." : "Sign up"}
            </button>
          </form>
         {/* OR Divider */}
          <div className="flex items-center my-6 gap-4">
            <span className="flex-grow h-px bg-indigo-700"></span>
            <span className="text-indigo-400 font-semibold text-sm">OR</span>
            <span className="flex-grow h-px bg-indigo-700"></span>
          </div>
          {/* Google */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin onSuccess={handleSuccess} onError={() => toast.error("Google login failed")} />
          </div>

          <p className="text-center text-slate-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
