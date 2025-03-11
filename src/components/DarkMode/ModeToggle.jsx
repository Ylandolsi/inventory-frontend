import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      // variant="custom"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
    >
      <Sun className="h-12 w-12 dark:hidden" />
      <Moon className="h-8 w-8 hidden dark:block" />
    </Button>
  );
}
