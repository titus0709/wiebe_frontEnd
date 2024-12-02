// "use client";
// import React, { useContext } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { SignedIn, UserButton } from "@clerk/clerk-react";

// import { Link, useLocation, useParams } from "react-router-dom";
// import { navLinks } from "@/constants/adminLinks";
// import { Menu } from "lucide-react";
// import { ThemeProviderContext } from "../theme-provider";
// import { ModeToggle } from "../mode-toggle";

// const MobileNav = ({ name, links }) => {
//   const location = useLocation();
//   const pathname = location.pathname;
//   const { theme } = useContext(ThemeProviderContext);
//   return (
//     <header className="header">
//       <Link to={"/"} className="flex-center gap-2 md:py-2">
//         <h1 className=" inline-block text-transparent bg-clip-text font-bold text-3xl pb-[4px]">
//           {name || "Admin Dashboard"}
//         </h1>
//       </Link>
//       <nav className="flex gap-2">
//         <SignedIn>
//           <UserButton afterSignOutUrl="/" />
//           <Sheet>
//             <SheetTrigger className="mx-2">
//               <Menu />
//             </SheetTrigger>
//             <SheetContent className="sheet-content sm:w-64">
//               <>
//                 <div className="flex items-center justify-around my-4">
//                   <p className="text-1xl font-bold">
//                     {name || "Admin Dashboard"}
//                   </p>
//                   <ModeToggle />
//                 </div>
//                 <ul className="header-nav_elements">
//                   {links.map((link) => {
//                     const isActive = link.route === pathname;

//                     return (
//                       <li
//                         key={link.route}
//                         className={` ${
//                           isActive
//                             ? ` ${
//                                 theme === "light"
//                                   ? "bg-black text-white rounded-lg"
//                                   : "bg-white text-black rounded-lg"
//                               }`
//                             : `${
//                                 theme === "light"
//                                   ? "text-gray-700 rounded-lg"
//                                   : "text-white-700 rounded-lg"
//                               } `
//                         } flex whitespace-nowrap text-dark-700`}
//                       >
//                         <Link to={link.route} className="sidebar-link">
//                           {link.label}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </>
//             </SheetContent>
//           </Sheet>
//         </SignedIn>
//       </nav>
//     </header>
//   );
// };

// export default MobileNav;
