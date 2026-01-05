import { Bell, ChevronDown } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import CreditsDropdown from "./CreditsDropdown";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/50 backdrop-blur-sm">
      {/* Version Selector */}
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors">
        <span className="text-sm font-medium text-foreground">Intella 2.0</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Plan Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
          <span className="text-sm text-muted-foreground">Free plan</span>
          <span className="text-sm text-primary font-medium">Start free trial</span>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-secondary transition-colors border border-transparent hover:border-border">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Credits Dropdown */}
        <CreditsDropdown />

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
