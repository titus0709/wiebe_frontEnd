import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Sidebar from "./admin-components/SideBar";
// import MobileNav from "./admin-components/MobileNav";
import { navLinks } from "@/constants/adminLinks";
import { Toaster } from "./ui/toaster";
const AdminCheck = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();

  const isAdmin = user?.publicMetadata.role === "admin";

  if (!isLoaded) {
    return "Loading...";
  }

  if (!isAdmin && !isSignedIn) {
    <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return (
    <main className="root">
      <Sidebar links={navLinks} />
      {/* <MobileNav links={navLinks} /> */}
      <div className="root-container">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminCheck;
