// Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">   {/* full viewport height */}
      {/* If Navbar is fixed, add matching top padding on main (see step 2) */}
      <Navbar />

      <main className="flex-1">                 {/* grow to fill space */}
        <Outlet />
      </main>

      {/* If Footer is fixed, add bottom padding on main (see step 2) */}
      <Footer />
      <ToastContainer
                position="top-left"
                autoClose={5000}
                pauseOnHover
                theme="light"
            />
    </div>
  );
}
