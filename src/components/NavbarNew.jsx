import React from 'react'


//from protected routes
import { Navigate, Outlet, useLocation ,Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "./admin-components/SideBar";
// import MobileNav from "./admin-components/MobileNav";
import { userLinks } from "@/constants";

import { SignedIn, UserButton } from "@clerk/clerk-react";

const NavbarNew = () => {
    const { isSignedIn, isLoaded } = useUser();
    const location = useLocation();
  
    if (!isLoaded) {
      return "Loading...";
    }
  

  return  isSignedIn ? (
    // <div className='m-2'>
    //   <h3 className=''>Logo</h3>

      <div className='flex flex-row-reverse m-4 mx-4 mr-20'  >
        {/* <img src={user} alt="" className='w-6 '/> */}

        {/* <Sidebar name={""} links={userLinks} /> */}
        <UserButton   />
        {/* <MobileNav name={"Hello User"} links={userLinks} /> */}
        <Link to="/orders"><h3 className='mx-4 mr-6 font-bold'>ORDERS</h3></Link>
       <Link to="/"><h3 className='mx-4 font-bold'>HOME</h3></Link>
       
     
        
      <Outlet />
      </div>
    // </div>
  ): (
    <Navigate to="/sign-in" state={{ from: location }} />
  );
};

export default NavbarNew;
