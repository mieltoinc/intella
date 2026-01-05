import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, Calendar, Clock } from "lucide-react";

const settingsNav = [
  { id: "general", label: "General" },
  { id: "account", label: "Account" },
  { id: "privacy", label: "Privacy" },
  { id: "billing", label: "Billing" },
  { id: "usage", label: "Usage" },
  { id: "capabilities", label: "Capabilities" },
  { id: "connectors", label: "Connectors" },
  { id: "intella-chrome", label: "Intella Chrome" },
];

const usageData = {
  credits: {
    used: 3250,
    total: 5000,
    resetDate: "Jan 15, 2026",
  },
  history: [
    { date: "Today", credits: 450, tasks: 12 },
    { date: "Yesterday", credits: 380, tasks: 9 },
    { date: "Dec 31", credits: 520, tasks: 15 },
    { date: "Dec 30", credits: 290, tasks: 7 },
    { date: "Dec 29", credits: 410, tasks: 11 },
  ],
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [fullName, setFullName] = useState("Oyetoke Tobiloba");
  const [nickname, setNickname] = useState("Tobiloba");
  const [workFunction, setWorkFunction] = useState("");
  const [preferences, setPreferences] = useState("");
  const [responseNotifications, setResponseNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [colorMode, setColorMode] = useState<"light" | "dark" | "system">("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <h1 className="font-body text-3xl font-semibold text-foreground mb-8">Settings</h1>

          <div className="flex gap-12">
            {/* Settings Navigation */}
            <nav className="w-48 flex-shrink-0">
              <ul className="space-y-1">
                {settingsNav.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-body transition-colors ${
                        activeSection === item.id
                          ? "bg-surface-hover text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Settings Content */}
            <div className="flex-1 space-y-8">
              {activeSection === "general" && (
                <>
                  {/* Profile Section */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Profile</h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Full name</label>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-medium">
                            {initials}
                          </div>
                          <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="flex-1 bg-surface border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          What should Intella call you?
                        </label>
                        <Input
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="bg-surface border-border"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm text-muted-foreground mb-2">What best describes your work?</label>
                      <Select value={workFunction} onValueChange={setWorkFunction}>
                        <SelectTrigger className="bg-surface border-border">
                          <SelectValue placeholder="Select your work function" />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border">
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="product">Product Management</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">
                        What <span className="underline decoration-dotted cursor-help">personal preferences</span>{" "}
                        should Intella consider in responses?
                      </label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Your preferences will apply to all conversations, within Intella's guidelines.
                      </p>
                      <Textarea
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        placeholder="e.g. ask clarifying questions before giving detailed answers"
                        className="bg-surface border-border min-h-[100px] resize-none"
                      />
                    </div>
                  </section>

                  <div className="border-t border-border" />

                  {/* Notifications Section */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Notifications</h2>

                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-body text-sm font-medium text-foreground">Response completions</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get notified when Intella has finished a response. Most useful for long-running tasks like
                            tool calls, Research, and Intella Code on the web.
                          </p>
                        </div>
                        <Switch checked={responseNotifications} onCheckedChange={setResponseNotifications} />
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-body text-sm font-medium text-foreground">
                            Emails from Intella Code on the web
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get an email when Intella Code on the web has finished building or needs your response.
                          </p>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                      </div>
                    </div>
                  </section>

                  <div className="border-t border-border" />

                  {/* Appearance Section */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Appearance</h2>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-4">Color mode</label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setColorMode("light")}
                          className={`w-32 h-20 rounded-lg border-2 transition-colors overflow-hidden ${
                            colorMode === "light" ? "border-cyan" : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className="w-full h-full bg-white flex items-center justify-center">
                            <div className="w-16 h-3 bg-gray-200 rounded" />
                          </div>
                        </button>
                        <button
                          onClick={() => setColorMode("dark")}
                          className={`w-32 h-20 rounded-lg border-2 transition-colors overflow-hidden ${
                            colorMode === "dark" ? "border-cyan" : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                            <div className="w-16 h-3 bg-gray-700 rounded" />
                          </div>
                        </button>
                        <button
                          onClick={() => setColorMode("system")}
                          className={`w-32 h-20 rounded-lg border-2 transition-colors overflow-hidden ${
                            colorMode === "system" ? "border-cyan" : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className="w-full h-full flex">
                            <div className="w-1/2 h-full bg-white flex items-center justify-center">
                              <div className="w-6 h-2 bg-gray-200 rounded" />
                            </div>
                            <div className="w-1/2 h-full bg-[#1a1a1a] flex items-center justify-center">
                              <div className="w-6 h-2 bg-gray-700 rounded" />
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeSection === "usage" && (
                <>
                  {/* Credits Overview */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Credits Overview</h2>

                    <div className="p-6 rounded-xl bg-surface border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-cyan" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Credits Used</p>
                            <p className="text-2xl font-semibold text-foreground">
                              {usageData.credits.used.toLocaleString()}{" "}
                              <span className="text-base font-normal text-muted-foreground">
                                / {usageData.credits.total.toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Resets on</p>
                          <p className="text-sm font-medium text-foreground">{usageData.credits.resetDate}</p>
                        </div>
                      </div>

                      <Progress
                        value={(usageData.credits.used / usageData.credits.total) * 100}
                        className="h-2 bg-surface-hover"
                      />

                      <p className="text-sm text-muted-foreground mt-3">
                        {usageData.credits.total - usageData.credits.used} credits remaining this billing period
                      </p>
                    </div>
                  </section>

                  {/* Quick Stats */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Quick Stats</h2>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-surface border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-muted-foreground">Avg. Daily</span>
                        </div>
                        <p className="text-xl font-semibold text-foreground">410</p>
                        <p className="text-xs text-muted-foreground">credits/day</p>
                      </div>

                      <div className="p-4 rounded-xl bg-surface border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-muted-foreground">This Week</span>
                        </div>
                        <p className="text-xl font-semibold text-foreground">2,050</p>
                        <p className="text-xs text-muted-foreground">credits used</p>
                      </div>

                      <div className="p-4 rounded-xl bg-surface border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span className="text-sm text-muted-foreground">Tasks</span>
                        </div>
                        <p className="text-xl font-semibold text-foreground">54</p>
                        <p className="text-xs text-muted-foreground">this week</p>
                      </div>
                    </div>
                  </section>

                  {/* Usage History */}
                  <section>
                    <h2 className="font-body text-lg font-medium text-foreground mb-6">Recent Activity</h2>

                    <div className="rounded-xl bg-surface border border-border overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Date</th>
                            <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                              Credits Used
                            </th>
                            <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Tasks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usageData.history.map((day, index) => (
                            <tr key={index} className="border-b border-border last:border-0">
                              <td className="text-sm text-foreground px-4 py-3">{day.date}</td>
                              <td className="text-sm text-foreground text-right px-4 py-3">{day.credits}</td>
                              <td className="text-sm text-muted-foreground text-right px-4 py-3">{day.tasks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </>
              )}

              {activeSection !== "general" && activeSection !== "usage" && (
                <section>
                  <h2 className="font-body text-lg font-medium text-foreground mb-6 capitalize">
                    {activeSection.replace("-", " ")}
                  </h2>
                  <p className="text-muted-foreground">This section is coming soon.</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
