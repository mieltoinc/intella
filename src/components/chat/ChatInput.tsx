import { useState, useMemo } from "react";
import {
  Plus,
  Mic,
  ArrowUp,
  Chrome,
  Mail,
  Calendar,
  FolderOpen,
  Github,
  MessageSquare,
  Settings2,
  ChevronDown,
  Sparkles,
  Eye,
  Brain,
  Zap,
  Image,
  FileText,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ModelCapability = "fast" | "vision" | "reasoning" | "image" | "pdf";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: React.ReactNode;
  capabilities: ModelCapability[];
  isPro?: boolean;
}

const capabilityIcons: Record<ModelCapability, { icon: React.ReactNode; label: string; color: string }> = {
  fast: { icon: <Zap className="w-3.5 h-3.5" />, label: "Fast", color: "text-yellow-500" },
  vision: { icon: <Eye className="w-3.5 h-3.5" />, label: "Vision", color: "text-emerald-500" },
  reasoning: { icon: <Brain className="w-3.5 h-3.5" />, label: "Reasoning", color: "text-purple-500" },
  image: { icon: <Image className="w-3.5 h-3.5" />, label: "Image Gen", color: "text-pink-500" },
  pdf: { icon: <FileText className="w-3.5 h-3.5" />, label: "PDF", color: "text-blue-500" },
};

const models: AIModel[] = [
  // Google models
  {
    id: "gemini-flash",
    name: "Gemini 3 Flash",
    provider: "Google",
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    capabilities: ["fast", "vision"],
  },
  {
    id: "gemini-pro",
    name: "Gemini 3 Pro",
    provider: "Google",
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    capabilities: ["vision", "reasoning", "pdf"],
    isPro: true,
  },
  {
    id: "nano-banana",
    name: "Nano Banana Pro",
    provider: "Google",
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    capabilities: ["vision", "image"],
    isPro: true,
  },
  // Anthropic models
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    icon: <span className="text-orange-400 font-bold text-xs">A\</span>,
    capabilities: ["vision", "reasoning"],
    isPro: true,
  },
  {
    id: "claude-opus",
    name: "Claude Opus 4",
    provider: "Anthropic",
    icon: <span className="text-orange-400 font-bold text-xs">A\</span>,
    capabilities: ["vision", "reasoning", "pdf"],
    isPro: true,
  },
  // OpenAI models
  {
    id: "gpt-5",
    name: "GPT-5.2",
    provider: "OpenAI",
    icon: <span className="text-green-400 text-xs">◎</span>,
    capabilities: ["vision", "reasoning"],
  },
  {
    id: "gpt-5-instant",
    name: "GPT-5.2 Instant",
    provider: "OpenAI",
    icon: <span className="text-green-400 text-xs">◎</span>,
    capabilities: ["fast", "vision"],
  },
];

const providerOrder = ["Google", "Anthropic", "OpenAI"];

// Custom connector icon component matching the reference
const ConnectorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6" />
    <path d="M12 17v6" />
    <path d="M4.22 4.22l4.24 4.24" />
    <path d="M15.54 15.54l4.24 4.24" />
    <path d="M1 12h6" />
    <path d="M17 12h6" />
    <path d="M4.22 19.78l4.24-4.24" />
    <path d="M15.54 8.46l4.24-4.24" />
  </svg>
);

const connectors = [
  { icon: Chrome, name: "My Browser", connected: true },
  { icon: Mail, name: "Gmail", connected: false },
  { icon: Calendar, name: "Google Calendar", connected: false },
  { icon: FolderOpen, name: "Google Drive", connected: false },
  { icon: Github, name: "GitHub", connected: false },
  { icon: MessageSquare, name: "Slack", connected: false },
];

interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
}

const ChatInput = ({
  placeholder = "Send message to Intella",
  onSend,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(models[0]);
  const [modelPopoverOpen, setModelPopoverOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState("");

  const filteredModelsByProvider = useMemo(() => {
    const filtered = models.filter((model) =>
      model.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      model.provider.toLowerCase().includes(modelSearch.toLowerCase())
    );
    
    const grouped: Record<string, AIModel[]> = {};
    providerOrder.forEach((provider) => {
      const providerModels = filtered.filter((m) => m.provider === provider);
      if (providerModels.length > 0) {
        grouped[provider] = providerModels;
      }
    });
    return grouped;
  }, [modelSearch]);

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-border/50 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-card border border-border/50 p-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm leading-relaxed min-h-[44px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              {/* Model Selector */}
              <Popover open={modelPopoverOpen} onOpenChange={setModelPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors text-foreground text-sm">
                    {selectedModel.icon}
                    <span>{selectedModel.name}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-80 p-0 bg-popover border-border"
                  onCloseAutoFocus={() => setModelSearch("")}
                >
                  {/* Search and Filter Header */}
                  <div className="flex items-center gap-2 p-2 border-b border-border">
                    <div className="flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg bg-secondary/50">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search models..."
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                      />
                    </div>
                    <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Models List */}
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {Object.entries(filteredModelsByProvider).map(([provider, providerModels]) => (
                      <div key={provider} className="mb-3 last:mb-0">
                        <div className="text-xs text-muted-foreground px-2 py-1.5 font-medium">
                          {provider}
                        </div>
                        {providerModels.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model);
                              setModelPopoverOpen(false);
                              setModelSearch("");
                            }}
                            className={cn(
                              "flex items-center justify-between w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors",
                              selectedModel.id === model.id && "bg-secondary"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 flex items-center justify-center">
                                {model.icon}
                              </span>
                              <span className="text-sm">{model.name}</span>
                              {model.isPro && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-medium">
                                  PRO
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {model.capabilities.map((cap) => (
                                <span
                                  key={cap}
                                  className={cn("p-1 rounded", capabilityIcons[cap].color)}
                                  title={capabilityIcons[cap].label}
                                >
                                  {capabilityIcons[cap].icon}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                    {Object.keys(filteredModelsByProvider).length === 0 && (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        No models found
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Plus className="w-5 h-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-56 p-2 bg-popover border-border"
                >
                  <div className="text-xs text-muted-foreground px-2 py-1.5">
                    Add files and more
                  </div>
                  <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-5 h-5 bg-[#F24E1E] rounded flex items-center justify-center text-white text-xs font-bold">
                      F
                    </div>
                    <span className="text-sm">Add from Figma</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-5 h-5 bg-[#0078D4] rounded flex items-center justify-center">
                      <FolderOpen className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">Add from OneDrive files</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-5 h-5 bg-[#FBBC04] rounded flex items-center justify-center">
                      <FolderOpen className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">Add from Google Drive files</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                    <Plus className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Add from local files</span>
                  </button>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <ConnectorIcon />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-64 p-2 bg-popover border-border"
                >
                  {connectors.map((connector) => (
                    <button
                      key={connector.name}
                      className="flex items-center justify-between w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <connector.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{connector.name}</span>
                      </div>
                      {connector.connected ? (
                        <div className="w-8 h-5 rounded-full bg-muted flex items-center px-0.5">
                          <div className="w-4 h-4 rounded-full bg-foreground/30" />
                        </div>
                      ) : (
                        <span className="text-xs text-primary">Connect</span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Add connectors</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="px-1.5 py-0.5 rounded bg-secondary text-xs">
                          +45
                        </span>
                      </span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                      <Settings2 className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Manage connectors</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  message.trim()
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
