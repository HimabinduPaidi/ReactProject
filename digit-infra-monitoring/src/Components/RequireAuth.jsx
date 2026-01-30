import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LoadingOverlay from "./LoadingOverlay";


export default function RequireAuth() {
  const [isVerifying, setIsVerifying] = useState(true);
  const { user, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setIsVerifying(false);
    };
    verify();
  }, [checkAuth]);

  if (isVerifying || isLoading) {
    return <LoadingOverlay message="Verifying your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}