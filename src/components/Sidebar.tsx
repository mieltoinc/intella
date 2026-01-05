import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PenSquare,
  Search,
  Library,
  FolderPlus,
  ChevronDown,
  Zap,
  Settings,
  HelpCircle,
  Monitor,
  PanelLeftClose,
  PanelLeft,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("tasks");
  const navigate = useNavigate();
  const location = useLocation();

  const mainNav = [
    { icon: PenSquare, label: "New task", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Library", path: "/tasks" },
  ];

  const projects = [
    { name: "Market Research Analysis", icon: "⚡" },
    { name: "Q4 Planning Report", icon: "📊" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 sticky top-0 flex-shrink-0",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan-dim flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-accent-foreground tracking-tight">intella</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {mainNav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn("nav-item w-full", location.pathname === item.path && "nav-item-active")}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}

        {/* Projects Section */}
        {!isCollapsed && (
          <div className="pt-6">
            <button
              onClick={() => setExpandedSection(expandedSection === "projects" ? null : "projects")}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-sidebar-foreground transition-colors"
            >
              <span>Projects</span>
              <div className="flex items-center gap-1">
                <FolderPlus className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
                <ChevronDown
                  className={cn("w-3.5 h-3.5 transition-transform", expandedSection === "projects" && "rotate-180")}
                />
              </div>
            </button>

            {expandedSection === "projects" && (
              <div className="mt-1 space-y-0.5 animate-fade-in">
                <button className="nav-item w-full text-sm">
                  <FolderPlus className="w-4 h-4" />
                  <span>New project</span>
                </button>
                {projects.map((project) => (
                  <button key={project.name} className="nav-item w-full text-sm">
                    <span className="text-base">{project.icon}</span>
                    <span className="truncate">{project.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Tasks */}
        {!isCollapsed && (
          <div className="pt-4">
            <button
              onClick={() => navigate("/tasks")}
              className={cn("nav-item w-full text-sm", location.pathname === "/tasks" && "nav-item-active")}
            >
              <ListTodo className="w-4 h-4" />
              <span>All tasks</span>
            </button>

            <button
              onClick={() => setExpandedSection(expandedSection === "tasks" ? null : "tasks")}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-sidebar-foreground transition-colors"
            >
              <ChevronDown
                className={cn("w-3.5 h-3.5 transition-transform", expandedSection === "tasks" && "rotate-180")}
              />
              <span>Recent</span>
            </button>

            {expandedSection === "tasks" && (
              <div className="mt-1 space-y-0.5 animate-fade-in">
                <button onClick={() => navigate("/task/1")} className="nav-item w-full text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="truncate">Fact vs Entity-Based Memories</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {!isCollapsed && (
          <div className="px-3 py-2 mb-2 rounded-lg bg-gradient-to-r from-cyan/10 to-transparent border border-cyan/20">
            <p className="text-xs text-sidebar-foreground">Share Intella with a friend</p>
            <p className="text-xs text-muted-foreground">Get 500 credits each</p>
          </div>
        )}
        <button onClick={() => navigate("/settings")} className={cn("nav-item w-full", location.pathname === "/settings" && "nav-item-active")}>
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </button>
        <button className="nav-item w-full">
          <HelpCircle className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Help</span>}
        </button>
        <button className="nav-item w-full">
          <Monitor className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Chrome Extension</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
