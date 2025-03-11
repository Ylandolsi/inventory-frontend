import { ModeToggle } from "@/components/DarkMode/ModeToggle";
import { ThemeProvider } from "../components/DarkMode/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex flex-col gap-10 w-full h-full">
        <Navbar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
