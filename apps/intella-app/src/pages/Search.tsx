import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  Clock,
  User,
  FileType,
  ChevronDown,
  Filter,
  Sparkles,
  ThumbsUp,
  Grid3X3,
  MoreVertical,
  Pin,
  MessageSquare,
  FolderOpen,
  Cloud,
  Users,
  Code,
  HardDrive,
  Calendar,
  Mail,
  Database,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchResult {
  id: string;
  title: string;
  link: string;
  source: {
    name: string;
    icon: React.ReactNode;
    color: string;
  };
  author: string;
  updatedAt: string;
  tags: string[];
  collectionsCount: number;
  likes?: number;
  preview: string;
  isPinned?: boolean;
  pinnedBy?: string;
}

interface SourceFilter {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: string;
}

const sampleResults: SearchResult[] = [
  {
    id: "1",
    title: "FY26 AE Onboarding Collection_Days 1–30",
    link: "go/on26",
    source: { name: "Confluence", icon: <Cloud className="w-4 h-4" />, color: "bg-blue-500" },
    author: "Kelly Howell",
    updatedAt: "1mo ago",
    tags: [],
    collectionsCount: 3,
    preview: "In your 1st 30 days you'll get integrated with Intella's technology & sales process. You'll become consciously competent – prospecting and conducting 1st calls like a pro. Content in this period will map primarily to",
    isPinned: true,
    pinnedBy: "Lauren Spears",
  },
  {
    id: "2",
    title: "Developer Onboarding",
    link: "go/dev-onboarding",
    source: { name: "Confluence", icon: <Cloud className="w-4 h-4" />, color: "bg-blue-500" },
    author: "Sanchit Arora",
    updatedAt: "6d ago",
    tags: ["Engineering"],
    collectionsCount: 12,
    likes: 12,
    preview: "You should have arrived here after going through the Day 1 Onboarding Checklist, or perhaps your buddy/manager /teammate recommended that you check out this page to get set up and ramped up. ... # More Onboarding",
  },
  {
    id: "3",
    title: "Day 1 Onboarding Checklist",
    link: "",
    source: { name: "Notion", icon: <FileText className="w-4 h-4" />, color: "bg-amber-500" },
    author: "Arvind Jain",
    updatedAt: "1mo ago",
    tags: [],
    collectionsCount: 14,
    preview: "# Day 1 Onboarding Checklist | Welcome to Intella! ... · Work with HR to do I-9 verification after your Onboarding tasks are fully complete in Gusto. ... with the Engineering Onboarding Handbook",
  },
  {
    id: "4",
    title: "GTM Onboarding Collection",
    link: "go/gtm-onboarding-collecti...",
    source: { name: "Collections", icon: <FolderOpen className="w-4 h-4" />, color: "bg-purple-500" },
    author: "Kelly Howell",
    updatedAt: "1mo ago",
    tags: [],
    collectionsCount: 2,
    preview: "Hey, new team member. We hired you because of your strong performance in your past ... Use those and a growth mindset to capitalize on onboarding – it's bridge between your current abilities and future success!",
  },
  {
    id: "5",
    title: "New Hire Onboarding Hub",
    link: "",
    source: { name: "Confluence", icon: <Cloud className="w-4 h-4" />, color: "bg-blue-500" },
    author: "Shankar Sitaraman",
    updatedAt: "2w ago",
    tags: ["Engineering"],
    collectionsCount: 0,
    likes: 4,
    preview: "to this page, you should consult the Read This First section of Developer Onboarding first to understand all of the engineering onboarding resources you have at your disposal (including all the links on this page)",
  },
];

const sourceFilters: SourceFilter[] = [
  { id: "all", name: "All", icon: <SearchIcon className="w-4 h-4" />, count: "332k" },
  { id: "answers", name: "Answers", icon: <MessageSquare className="w-4 h-4" />, count: "55" },
  { id: "collections", name: "Collections", icon: <Grid3X3 className="w-4 h-4" />, count: "138" },
  { id: "confluence", name: "Confluence - Cloud", icon: <Cloud className="w-4 h-4" />, count: "150" },
  { id: "customers", name: "Customers", icon: <Users className="w-4 h-4" />, count: "31" },
  { id: "developers", name: "Developers", icon: <Code className="w-4 h-4" />, count: "4" },
  { id: "google-drive", name: "Google Drive", icon: <HardDrive className="w-4 h-4" />, count: "6k+" },
  { id: "github", name: "GitHub", icon: <Code className="w-4 h-4" />, count: "2k" },
  { id: "gmail", name: "Gmail", icon: <Mail className="w-4 h-4" />, count: "66+" },
  { id: "calendar", name: "Google Calendar", icon: <Calendar className="w-4 h-4" />, count: "70" },
  { id: "jira", name: "Jira (Cloud)", icon: <Database className="w-4 h-4" />, count: "4k" },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Initialize state from URL params
  const initialQuery = searchParams.get("q") || "";
  const initialSource = searchParams.get("source") || "all";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  // Update URL when search is performed
  const updateUrl = (query: string, source: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (source && source !== "all") params.set("source", source);
    setSearchParams(params);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      updateUrl(searchQuery, selectedSource);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setHasSearched(true);
      updateUrl(searchQuery, selectedSource);
    }
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    if (hasSearched) {
      updateUrl(searchQuery, source);
    }
  };

  // Filter results based on search query
  const filteredResults = sampleResults.filter(
    (result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Zero State - No search yet
  if (!hasSearched) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl px-6">
              <div className="text-center mb-8">
                <h1 className="font-body text-3xl font-semibold text-foreground mb-2">
                  Search everything
                </h1>
                <p className="text-muted-foreground">
                  Find documents, conversations, and more across all your apps
                </p>
              </div>

              <form onSubmit={handleSearch}>
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search across all apps..."
                    className="pl-12 pr-4 py-6 text-lg bg-surface border-border input-glow"
                    autoFocus
                  />
                </div>
              </form>

              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Confluence
                </span>
                <span className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Google Drive
                </span>
                <span className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  GitHub
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Gmail
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Empty State - Search performed but no results
  if (hasSearched && filteredResults.length === 0) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-6">
              {/* Search Header */}
              <div className="mb-6">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across all apps..."
                    className="pl-12 pr-4 py-6 text-lg bg-surface border-border input-glow"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    All filters
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Clock className="w-4 h-4" />
                    Updated
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    From
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <FileType className="w-4 h-4" />
                    Type
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Empty State Content */}
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SearchIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="font-body text-xl font-medium text-foreground mb-2">
                  No results found
                </h2>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find anything matching "{searchQuery}". Try using different keywords or check your spelling.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery("");
                    setHasSearched(false);
                    setSearchParams(new URLSearchParams());
                  }}
                >
                  Clear search
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Results State - Search performed with results
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {/* Search Header */}
            <div className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across all apps..."
                  className="pl-12 pr-4 py-6 text-lg bg-surface border-border input-glow"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <Button variant="secondary" size="sm" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  All filters
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Updated
                  <ChevronDown className="w-3 h-3" />
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  From
                  <ChevronDown className="w-3 h-3" />
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <FileType className="w-4 h-4" />
                  Type
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Results */}
              <div className="flex-1 space-y-2">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="group p-4 rounded-xl bg-card hover:bg-surface-elevated border border-transparent hover:border-border transition-all cursor-pointer"
                  >
                    {result.isPinned && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <Pin className="w-3 h-3" />
                        Pinned by {result.pinnedBy}
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          result.source.color
                        )}
                      >
                        {result.source.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-body font-medium text-foreground">
                            {highlightText(result.title, searchQuery)}
                          </h3>
                          {result.link && (
                            <span className="text-xs text-muted-foreground">
                              · {result.link}
                            </span>
                          )}
                          {result.collectionsCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              +{result.collectionsCount - 1}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
                          <span>Updated {result.updatedAt}</span>
                          <span>by {result.author}</span>
                          {result.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {result.likes && (
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {result.likes} likes
                            </span>
                          )}
                          {result.collectionsCount > 0 && (
                            <span className="flex items-center gap-1">
                              <Grid3X3 className="w-3 h-3" />
                              {result.collectionsCount} Collections
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-secondary-foreground line-clamp-2">
                          {highlightText(result.preview, searchQuery)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Summarize
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Pin result</DropdownMenuItem>
                            <DropdownMenuItem>Add to collection</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sources Sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Found <span className="text-foreground font-medium">{filteredResults.length}</span> results
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    {sourceFilters.map((source) => (
                      <button
                        key={source.id}
                        onClick={() => handleSourceChange(source.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                          selectedSource === source.id
                            ? "bg-primary/10 text-primary"
                            : "text-secondary-foreground hover:bg-surface-hover"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {source.icon}
                          <span>{source.name}</span>
                        </div>
                        <span
                          className={cn(
                            "text-xs",
                            selectedSource === source.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {source.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
