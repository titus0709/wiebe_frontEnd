// import React from 'react'


// //from protected routes
// import { Navigate, Outlet, useLocation ,Link } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import Sidebar from "./admin-components/SideBar";
// // import MobileNav from "./admin-components/MobileNav";
// import { userLinks } from "@/constants";

// import { SignedIn, UserButton } from "@clerk/clerk-react";

// const NavbarNew = () => {
//     const { isSignedIn, isLoaded } = useUser();
//     const location = useLocation();
  
//     if (!isLoaded) {
//       return "Loading...";
//     }
  

//   return  isSignedIn ? (
//     // <div className='m-2'>
//     //   <h3 className=''>Logo</h3>

//       <div className='flex flex-row-reverse m-4 mx-4 mr-20'  >
//         {/* <img src={user} alt="" className='w-6 '/> */}

//         {/* <Sidebar name={""} links={userLinks} /> */}
//         <UserButton   />
//         {/* <MobileNav name={"Hello User"} links={userLinks} /> */}
//         <Link to="/orders"><h3 className='mx-4 mr-6 font-bold'>ORDERS</h3></Link>
//        <Link to="/"><h3 className='mx-4 font-bold'>HOME</h3></Link>
       
     
        
//       <Outlet />
//       </div>
//     // </div>
//   ): (
//     <Navigate to="/sign-in" state={{ from: location }} />
//   );
// };

// export default NavbarNew;


import React, { useState } from "react";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react"; // For the hamburger menu icon

const NavbarNew = () => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  if (!isLoaded) {
    return "Loading...";
  }

  return isSignedIn ? (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="font-bold hover:text-gray-700">
            HOME
          </Link>
          <Link to="/orders" className="font-bold hover:text-gray-700">
            ORDERS
          </Link>
          <UserButton />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md sm:hidden">
          <div className="flex flex-col items-center p-4 gap-4">
            <Link
              to="/"
              className="font-bold hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/orders"
              className="font-bold hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              ORDERS
            </Link>
            <UserButton />
          </div>
        </div>
      )}

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} />
  );
};

export default NavbarNew;

