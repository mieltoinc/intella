import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Zap, Clock, CheckCircle2, Circle, MoreHorizontal } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  preview: string;
  status: "in_progress" | "completed" | "pending";
  createdAt: string;
  project?: string;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Fact vs Entity-Based Memories",
    preview: "Exploring the differences between factual memory storage and entity-based approaches...",
    status: "in_progress",
    createdAt: "2 hours ago",
    project: "Market Research Analysis",
  },
  {
    id: "2",
    title: "Q4 Revenue Analysis",
    preview: "Analyzing quarterly revenue trends and projections for the upcoming fiscal year...",
    status: "completed",
    createdAt: "Yesterday",
    project: "Q4 Planning Report",
  },
  {
    id: "3",
    title: "User Onboarding Flow",
    preview: "Designing an intuitive onboarding experience for new users joining the platform...",
    status: "pending",
    createdAt: "2 days ago",
  },
  {
    id: "4",
    title: "API Integration Strategy",
    preview: "Planning the integration approach for third-party APIs and data synchronization...",
    status: "completed",
    createdAt: "3 days ago",
    project: "Market Research Analysis",
  },
  {
    id: "5",
    title: "Competitive Analysis Report",
    preview: "Comprehensive analysis of market competitors and their positioning strategies...",
    status: "in_progress",
    createdAt: "1 week ago",
  },
];

const statusConfig = {
  in_progress: {
    icon: Clock,
    label: "In Progress",
    className: "text-amber-500",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    className: "text-emerald-500",
  },
  pending: {
    icon: Circle,
    label: "Pending",
    className: "text-muted-foreground",
  },
};

const Tasks = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredTasks = sampleTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl text-foreground mb-2">All Tasks</h1>
              <p className="text-muted-foreground">View and manage all your research tasks in one place.</p>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50 text-sm text-foreground hover:bg-secondary transition-colors">
                    <Filter className="w-4 h-4" />
                    {filterStatus ? statusConfig[filterStatus as keyof typeof statusConfig].label : "All Status"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setFilterStatus(null)}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("in_progress")}>In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {filteredTasks.map((task) => {
                const StatusIcon = statusConfig[task.status].icon;
                return (
                  <button
                    key={task.id}
                    onClick={() => navigate(`/task/${task.id}`)}
                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <StatusIcon className={cn("w-5 h-5", statusConfig[task.status].className)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-body font-medium text-foreground truncate">{task.title}</h3>
                          {task.project && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan/10 text-cyan text-xs">
                              <Zap className="w-3 h-3" />
                              {task.project}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">{task.preview}</p>
                        <span className="text-xs text-muted-foreground">{task.createdAt}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                          >
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Move to project</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </button>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tasks found.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
