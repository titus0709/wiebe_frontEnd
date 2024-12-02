import { SignedIn, UserButton } from "@clerk/clerk-react";

import { Link, useLocation } from "react-router-dom";

import React, { useContext } from "react";

import { ModeToggle } from "../mode-toggle";
import { ThemeProviderContext, useTheme } from "../theme-provider";

const Sidebar = ({ name, links }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { theme } = useContext(ThemeProviderContext);
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <div href={"/"} className="sidebar-logo">
          <h5 className="font-bold text-2xl pb-[4px] ">{name || "Admin"}</h5>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {links.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group 
                      ${
                        isActive
                          ? ` ${
                              theme === "light"
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`
                          : `${
                              theme === "light"
                                ? "text-gray-700"
                                : "text-white-700"
                            } `
                      }
                    `}
                  >
                    <Link to={link.route} className="sidebar-link">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
