import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profileService from "../services/profileService";

export default function ProtectedRoute({ children, isPublic = false }) {
  
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await profileService.getProfile();
        console.log("Auth check:", res);
        
        if (res?.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  // If it's a PUBLIC route (login/signup)
  if (isPublic) {
    // If user IS logged in, redirect to feed
    if (isAuthenticated) return <Navigate to="/feed" replace />;
    // If user is NOT logged in, show the page
    return children;
  }

  // If it's a PROTECTED route (feed/connections)
  // If user is NOT logged in, redirect to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // If user IS logged in, show the page
  return children;
}