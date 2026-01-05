import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  status: string;
  onView?: () => void;
}

const ProjectCard = ({ title, status, onView }: ProjectCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
          <Globe className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{status}</p>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={onView}
        className="text-xs"
      >
        View
      </Button>
    </div>
  );
};

export default ProjectCard;
