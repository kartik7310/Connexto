import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../store/store-slices/userSlice";
import ProfileService from "../services/profileService";
import { User, Mail, Calendar, Info, Camera, Edit3, Save, X, ShieldCheck } from "lucide-react";

const EditProfile = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.gender || "",
      photoUrl: user?.photoUrl || "",
      about: user?.about || "",
      age: user?.age ?? ""
    }
  });

  useEffect(() => { user && reset(user) }, [user]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        age: values.age === "" ? undefined : Number(values.age)
      };
      const res = await ProfileService.updateProfile(payload);
      if (res?.data?.success) {
        dispatch(addUser(res?.data));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-900 text-white p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Manage your personal information and preferences.</p>
          </div>
          {user?.plan === "PREMIUM" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 font-semibold text-sm">
              <ShieldCheck size={18} />
              Premium Member
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar / Photo Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-800/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <User size={120} />
              </div>
              
              <div className="flex flex-col items-center relative z-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/30 p-1 bg-gradient-to-tr from-indigo-500 to-purple-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-base-700 flex items-center justify-center">
                      {user?.photoUrl ? (
                        <img src={user.photoUrl} alt="Profile" className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-4xl font-bold">{user?.firstName?.[0]}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-indigo-400 font-medium flex items-center justify-center gap-2 mt-1">
                    <Mail size={16} />
                    {user?.email}
                  </p>
                </div>

                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="bg-base-800/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info size={18} className="text-indigo-400" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-700/40 p-4 rounded-2xl text-center">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Age</p>
                  <p className="text-xl font-bold mt-1">{user?.age || "N/A"}</p>
                </div>
                <div className="bg-base-700/40 p-4 rounded-2xl text-center">
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Gender</p>
                  <p className="text-xl font-bold mt-1">{user?.gender || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-base-800/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl h-full">
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Edit3 className="text-indigo-400" />
                    Edit Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 ml-1">First Name</label>
                      <input className="w-full bg-base-700/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="First Name" {...register("firstName")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 ml-1">Last Name</label>
                      <input className="w-full bg-base-700/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Last Name" {...register("lastName")} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 ml-1">Gender</label>
                      <select className="w-full bg-base-700/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" {...register("gender")}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 ml-1">Age</label>
                      <input className="w-full bg-base-700/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" type="number" placeholder="Age" {...register("age")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Photo URL</label>
                    <div className="relative">
                      <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input className="w-full bg-base-700/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="https://example.com/photo.jpg" {...register("photoUrl")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">About Myself</label>
                    <textarea className="w-full bg-base-700/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="Tell us about yourself..." rows="4" {...register("about")} />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button disabled={isSubmitting} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50">
                      <Save size={18} />
                      {isSubmitting ? "Updating..." : "Save Changes"}
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 bg-base-700 hover:bg-base-600 text-white font-bold py-3 rounded-2xl transition-all border border-white/5 flex items-center gap-2">
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                    <Info className="text-indigo-400" />
                    Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">First Name</p>
                        <p className="text-xl font-medium">{user?.firstName || "-"}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-xl font-medium">{user?.gender || "-"}</p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Last Name</p>
                        <p className="text-xl font-medium">{user?.lastName || "-"}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Age</p>
                        <p className="text-xl font-medium">{user?.age || "-"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Edit3 size={16} />
                      About Me
                    </p>
                    <div className="bg-base-700/30 rounded-2xl p-6 border border-white/5">
                      <p className="text-slate-200 leading-relaxed italic">
                        {user?.about ? `"${user.about}"` : "No description provided."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
