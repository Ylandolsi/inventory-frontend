import { ModeToggle } from "./DarkMode/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { Plus } from "lucide-react";
export function Navbar() {
  return (
    <nav
      style={{
        borderBottom: "1px solid var(--accent-foreground)",
      }}
      className="flex flex-col gap-4  pb-5"
    >
      <h1 className="font-bold">Bookstore Inventory</h1>
      <div className="flex w-full text-4xl  sm:text-xl items-start justify-between flex-col sm:flex-row sm:items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center text-left">
              <button className="homeButton">
                <a href="/">Home</a>
              </button>
              <NavigationMenuItem className="flex-grow">
                <NavigationMenuTrigger>
                  <a href="/books">Books</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <a
                      href="/books/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Book
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <a href="/authors">Authors</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <a
                      href="/authors/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Author
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <a href="/genres"> Genres</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2 min-w-70">
                  <NavigationMenuLink asChild>
                    <a
                      href="/genres/add"
                      className="flex flex-row items-center gap-2"
                    >
                      <Plus size={18} />
                      Add Genre
                    </a>
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
