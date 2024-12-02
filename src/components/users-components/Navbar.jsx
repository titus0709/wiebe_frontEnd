import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { userLinks } from "@/constants";
import { UserButton } from "@clerk/clerk-react";

import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList>
          {userLinks.map((link) => {
            return (
              <NavigationMenuItem key={link.route}>
                <Link to={link.route}>{link.label}</Link>
              </NavigationMenuItem>
            );
          })}
          <NavigationMenuItem>
            <UserButton />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
