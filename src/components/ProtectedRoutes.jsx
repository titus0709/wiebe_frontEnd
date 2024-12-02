import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "./admin-components/SideBar";

import { userLinks } from "@/constants";

const ProtectedRoutes = () => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return "Loading...";
  }

  return isSignedIn ? (
    <main className="root">
      <Sidebar name={"Hello User"} links={userLinks} />
      
      <div className="root-container">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
