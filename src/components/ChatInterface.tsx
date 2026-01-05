import { useState } from "react";
import {
  Plus,
  Globe,
  Mic,
  ArrowUp,
  Settings2,
  X,
  Chrome,
  Mail,
  Calendar,
  FolderOpen,
  Github,
  MessageSquare,
  Presentation,
  Globe2,
  Smartphone,
  Palette,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const connectorIcons = [
  { icon: Chrome, name: "Browser", connected: true },
  { icon: Mail, name: "Gmail", connected: false },
  { icon: Calendar, name: "Google Calendar", connected: false },
  { icon: FolderOpen, name: "Google Drive", connected: false },
  { icon: Github, name: "GitHub", connected: false },
  { icon: MessageSquare, name: "Slack", connected: false },
];

const actionPills = [
  { icon: Presentation, label: "Create slides" },
  { icon: Globe2, label: "Build website" },
  { icon: Smartphone, label: "Develop apps" },
  { icon: Palette, label: "Design" },
  { icon: MoreHorizontal, label: "More" },
];

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [showConnectors, setShowConnectors] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4 py-12">
      {/* Main Heading */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-12 text-center animate-fade-in">
        What can I do for you?
      </h1>

      {/* Input Card */}
      <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="input-glow rounded-2xl bg-card p-4 transition-all duration-300">
          {/* Text Input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Assign a task or ask anything"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-base leading-relaxed min-h-[60px]"
            rows={2}
          />

          {/* Input Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Globe className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Mic className="w-5 h-5" />
              </button>
              <button
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  message.trim()
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Connectors Bar */}
        <div className="relative mt-3">
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => setShowConnectors(!showConnectors)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              <span>Connect your tools to Intella</span>
            </button>

            <div className="flex items-center gap-1">
              {connectorIcons.slice(0, 6).map((connector, i) => (
                <div
                  key={connector.name}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-opacity",
                    connector.connected
                      ? "bg-secondary text-foreground"
                      : "bg-secondary/50 text-muted-foreground opacity-60",
                  )}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <connector.icon className="w-3.5 h-3.5" />
                </div>
              ))}
              <button className="ml-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Connectors Dropdown */}
          {showConnectors && (
            <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-xl bg-popover border border-border shadow-xl animate-fade-in z-50">
              {connectorIcons.map((connector) => (
                <button
                  key={connector.name}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <connector.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">{connector.name}</span>
                  </div>
                  {connector.connected ? (
                    <div className="w-8 h-5 rounded-full bg-primary flex items-center justify-end px-0.5">
                      <div className="w-4 h-4 rounded-full bg-primary-foreground" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Connect</span>
                  )}
                </button>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Add connectors</span>
                  <span className="ml-auto text-xs text-muted-foreground">+45</span>
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors">
                  <Settings2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Manage connectors</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Pills */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {actionPills.map((action) => (
          <button key={action.label} className="action-pill">
            <action.icon className="w-4 h-4" />
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
