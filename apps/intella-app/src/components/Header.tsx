import { Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import CreditsDropdown from "./CreditsDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {

  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/50 backdrop-blur-sm">
      {/* Version Selector */}
      <Select defaultValue="1.0">
        <SelectTrigger className="w-[140px] h-9 px-3 rounded-lg border-border hover:bg-secondary transition-colors">
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1.0">Intella 1.0</SelectItem>
        </SelectContent>
      </Select>

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
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;
