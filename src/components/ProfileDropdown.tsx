import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Brain, 
  User, 
  Settings, 
  Home, 
  HelpCircle, 
  LogOut,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from "lucide-react";

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan to-cyan-dim flex items-center justify-center ring-2 ring-background">
            <span className="text-sm font-medium text-primary-foreground">JD</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 p-4 bg-card border-border"
        sideOffset={8}
      >
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-cyan-dim flex items-center justify-center">
            <span className="text-lg font-medium text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">John Doe</p>
            <p className="text-sm text-muted-foreground truncate">john.doe@example.com</p>
          </div>
        </div>

        {/* Plan & Credits Card */}
        <div className="rounded-lg border border-dashed border-border p-3 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-serif text-lg italic text-foreground">Free</span>
            <button className="px-3 py-1 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
              Upgrade
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Credits</span>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">1,300</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2.5 cursor-pointer">
            <Brain className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Knowledge</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2.5 cursor-pointer">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2.5 cursor-pointer">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Settings</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem className="flex items-center justify-between px-2 py-2.5 cursor-pointer">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Homepage</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between px-2 py-2.5 cursor-pointer">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Get help</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem className="flex items-center gap-3 px-2 py-2.5 cursor-pointer text-red-400 focus:text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
