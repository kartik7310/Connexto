// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Auth from "../services/authService"
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
// import { removeUser } from '../store/store-slices/userSlice'
// import { Bell } from 'lucide-react'
// import { clearAllNotifications } from '../store/store-slices/notificationSlice'

// const Navbar = () => {
//   const user = useSelector((state) => state.user?.user)
//   console.log("navser", user);

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { notifications, unreadCount } = useSelector((state) => state.notification);

//   const handleLogout = async () => {
//     try {
//       await Auth.logout()
//       toast.success("Logged out");
//       dispatch(removeUser());
//       navigate("/login", { replace: true })
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }
//   return (
//     <div>
//       <div className="navbar bg-base-300 shadow-sm">
//         <div className="flex-1">
//           <div className="btn btn-ghost text-xl">🧑‍💻Connexto</div>
//         </div>
//         <div className="flex gap-2">
//           <div className="flex gap-2">
//             <div className="dropdown dropdown-end mx-5">
//               {/* The Button/Trigger */}
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="indicator cursor-pointer hover:bg-base-200 p-2 rounded-full transition-colors"
//               >
//                 {unreadCount > 0 && (
//                   <span className="indicator-item badge badge-secondary badge-xs py-2 px-1.5">
//                     {unreadCount}
//                   </span>
//                 )}
//                 <Bell className="w-6 h-6" />
//               </div>

//               {/* The Dropdown Content */}
//               <div
//                 tabIndex={0}
//                 className="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-base-100 border border-base-100 mt-1"
//               >
//                 <div className="card-body">
//                   <div className="flex justify-between items-center">
//                     <h2 className="font-bold text-xl">Notifications</h2>
//                     {unreadCount > 0 && (
//                       <button
//                         className="text-xs text-primary hover:underline"
//                         onClick={() => dispatch(clearAllNotifications())}
//                       >
//                         Clear all
//                       </button>
//                     )}
//                   </div>
//                   <div className="divider my-0"></div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <p className="py-4 text-center text-gray-500">No new notifications</p>
//                     ) : (
//                       <ul className="py-2">
//                         {notifications.map((n, i) => (
//                           <li
//                             key={i}
//                             className="p-2 hover:bg-base-200 rounded-lg cursor-pointer flex gap-3 items-start border-b border-base-200 last:border-0"
//                             onClick={() => {
//                               navigate(`/chat/${n.senderId}`);
//                             }}
//                           >
//                             <img src={n.photoUrl || "/default.png"} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-semibold truncate">{n.firstName} {n.lastName}</p>
//                               <p className="text-xs text-gray-500 truncate">{n.text}</p>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                   <Link to="/connections" className="text-primary hover:underline">View Connections</Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="dropdown dropdown-end mx-5">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src={user ? user?.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
//                 />
//               </div>
//             </div>

//             <ul
//               tabIndex="-1"
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   {user?.plan === "PREMIUM" ? (
//                     <span className="badge badge-primary">Premium</span>
//                   ) : (
//                     <span className="badge">New</span>
//                   )}
//                 </Link>
//               </li>
//               <li><Link to="/connections">Connections</Link></li>
//               <li><Link to="/feed">Feed</Link></li>
//               <li><Link to="/request-connection">Request</Link></li>
//               <li><Link to="/blogs">Blogs</Link></li>
//               <li><Link to="/premium">Premium</Link></li>
//               <li><button onClick={handleLogout}>Logout</button></li>{/* button is better here */}
//             </ul>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../store/store-slices/userSlice";
import { Bell } from "lucide-react";
import { clearAllNotifications } from "../store/store-slices/notificationSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user?.user);
  const { notifications, unreadCount } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.logout();
      toast.success("Logged out");
      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-md px-4">
      {/* LEFT */}
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          🧑‍💻 Connexto
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* ================= NOTIFICATION ================= */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle relative"
          >
            <Bell className="w-6 h-6" />

            {unreadCount > 0 && (
              <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
                {unreadCount}
              </span>
            )}
          </label>

          {/* DROPDOWN PANEL */}
          <div
            tabIndex={0}
            className="
              dropdown-content
              z-50
              mt-3
              w-80
              bg-base-100
              rounded-xl
              shadow-xl
              border border-base-300
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-base-200 rounded-t-xl">
              <h2 className="font-semibold text-lg">Notifications</h2>

              {unreadCount > 0 && (
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={() => dispatch(clearAllNotifications())}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="divider my-0" />

            {/* LIST */}
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-6 text-center text-base-content/60">
                  No new notifications
                </p>
              ) : (
                <ul>
                  {notifications.map((n, i) => (
                    <li
                      key={i}
                      onClick={() => navigate(`/chat/${n.senderId}`)}
                      className="
                        px-4 py-3
                        flex gap-3 items-start
                        hover:bg-base-200
                        transition-colors
                        cursor-pointer
                        border-b border-base-200 last:border-0
                      "
                    >
                      <img
                        src={n.photoUrl || "/default.png"}
                        alt="user"
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {n.firstName} {n.lastName}
                        </p>
                        <p className="text-xs text-base-content/60 truncate">
                          {n.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-3 text-center border-t border-base-200">
              <Link
                to="/connections"
                className="text-sm text-primary hover:underline"
              >
                View Connections
              </Link>
            </div>
          </div>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="profile"
              />
            </div>
          </label>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-300">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                {user?.plan === "PREMIUM" ? (
                  <span className="badge badge-primary">Premium</span>
                ) : (
                  <span className="badge">New</span>
                )}
              </Link>
            </li>

            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/request-connection">Request</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/premium">Premium</Link></li>

            <li>
              <button onClick={handleLogout} className="text-error">
                Logout
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
