import { NavLink } from "react-router-dom";
import { ModeToggle } from "../DarkMode/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

import "./Navbar.scss";

import { Plus } from "lucide-react";
export function Navbar() {
  return (
    <nav
      style={{
        borderBottom: "1px solid var(--accent-foreground)",
      }}
      className="flex flex-col gap-4  pb-5 pl-5"
    >
      <p className="Title">Bookstore Inventory</p>
      <div className="flex w-full items-start justify-between flex-col sm:flex-row sm:items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center text-left">
              <button className="homeButton nv-btn">
                <NavLink to="/">Home</NavLink>
              </button>
              <NavigationMenuItem className="flex-grow">
                <NavigationMenuTrigger className="nv-btn">
                  <NavLink to="/books">Books</NavLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <NavLink
                      to="/books/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Book
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nv-btn">
                  <NavLink to="/authors">Authors</NavLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <NavLink
                      to="/authors/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Author
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nv-btn">
                  <NavLink to="/genres"> Genres</NavLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <NavLink
                      to="/genres/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Genre
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </nav>
  );
}
