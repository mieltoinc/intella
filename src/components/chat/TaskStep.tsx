import { useState } from "react";
import { ChevronUp, Check, Search, Globe, FileEdit } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  type: "searching" | "browsing" | "creating";
  content: string;
}

interface TaskStepProps {
  title: string;
  description?: string;
  activities?: ActivityItem[];
  summary?: string;
  isComplete?: boolean;
  children?: React.ReactNode;
}

const activityIcons = {
  searching: Search,
  browsing: Globe,
  creating: FileEdit,
};

const activityLabels = {
  searching: "Searching",
  browsing: "Browsing",
  creating: "Creating file",
};

const TaskStep = ({
  title,
  description,
  activities = [],
  summary,
  isComplete = false,
  children,
}: TaskStepProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left hover:bg-secondary/30 rounded-lg py-2 px-1 -mx-1 transition-colors"
      >
        <div
          className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
            isComplete
              ? "bg-primary/20 text-primary"
              : "border border-muted-foreground/30"
          )}
        >
          {isComplete && <Check className="w-3 h-3" />}
        </div>
        <span className="text-foreground font-medium flex-1">{title}</span>
        <ChevronUp
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            !isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="ml-7 mt-2 space-y-2 animate-fade-in">
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}

          {activities.length > 0 && (
            <div className="space-y-1.5">
              {activities.map((activity, i) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-sm"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {activityLabels[activity.type]}
                    </span>
                    <span className="text-foreground/80 font-mono text-xs truncate">
                      {activity.content}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {summary && (
            <p className="text-sm text-foreground/90 leading-relaxed">
              {summary}
            </p>
          )}

          {children}
        </div>
      )}
    </div>
  );
};

export default TaskStep;
