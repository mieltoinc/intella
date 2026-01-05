import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, CalendarClock, HelpCircle, ChevronRight } from "lucide-react";

const CreditsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-colors">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">1,300</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 p-4 bg-card border-border"
        sideOffset={8}
      >
        {/* Plan Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-border">
          <span className="font-serif text-xl italic text-foreground">Free</span>
          <button className="px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            Upgrade
          </button>
        </div>

        {/* Credits Section */}
        <div className="space-y-4">
          {/* Total Credits */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Credits</span>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">1,000</span>
            </div>
            <div className="flex items-center justify-between mt-1 ml-6">
              <span className="text-sm text-muted-foreground">Free credits</span>
              <span className="text-sm text-muted-foreground">1,000</span>
            </div>
          </div>

          {/* Daily Refresh Credits */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Daily refresh credits</span>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">300</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-6">
              Refresh to 300 at 23:00 every day
            </p>
          </div>
        </div>

        {/* View Usage Link */}
        <button className="flex items-center gap-1 mt-4 pt-4 border-t border-border text-foreground hover:text-primary transition-colors">
          <span className="text-sm font-medium">View usage</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreditsDropdown;
