import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatMessage from "@/components/chat/ChatMessage";
import TaskStep from "@/components/chat/TaskStep";
import ProjectCard from "@/components/chat/ProjectCard";
import ChatInput from "@/components/chat/ChatInput";

// Intella logo component
const IntellaLogo = () => (
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

// Sample task data
const sampleTask = {
  userMessage: "Lets talk about fact vs entity based memories",
  aiResponse:
    "Understood, I will research and analyze the differences between fact-based and entity-based memories, and then create an interactive web report that allows you to explore the data more intuitively, understand trends better, and easily save or share.",
  steps: [
    {
      title: "Research fact-based and entity-based memories",
      description:
        "I am researching the differences between fact-based and entity-based memories to create an engaging, visual interactive webpage for easy understanding and sharing of the findings.",
      activities: [
        {
          type: "searching" as const,
          content: "fact-based vs entity-based memory AI knowledge representation, entity...",
        },
        {
          type: "browsing" as const,
          content: "https://medium.com/@saeedhajebi/building-ai-agents-with-knowledge-grap...",
        },
        {
          type: "searching" as const,
          content: '"fact-based memory" vs "entity-based memory" AI, "fact-centric" vs "e...',
        },
        {
          type: "searching" as const,
          content: 'Searching scholarly literatures "fact-based memory" vs "entity-based memory" AI, "fa...',
        },
        { type: "creating" as const, content: "research_findings.md" },
      ],
      summary:
        "Fact-based memory stores explicit facts, while entity-based memory focuses on tracking entities and their relationships over time; both differ in structure, retrieval, and temporal handling.",
      project: {
        title: "Fact vs Entity Based Memories",
        status: "Project initialized",
      },
      isComplete: true,
    },
    {
      title: "Analyze and synthesize findings into comprehensive content",
      description:
        "I initialized a project to create a visually engaging webpage explaining fact-based versus entity-based memories. Next, I'll design polished, high-end UI components following advanced aesthetic principles.",
      activities: [
        {
          type: "browsing" as const,
          content: "https://www.graphlit.com/blog/survey-of-ai-agent-memory-frameworks",
        },
        {
          type: "browsing" as const,
          content: "https://medium.com/womenintechnology/semantic-vs-episodic-vs-procedura...",
        },
        { type: "creating" as const, content: "comprehensive_research.md" },
      ],
      isComplete: true,
    },
    {
      title: "Create interactive webpage with visualizations",
      description:
        "Memory types include semantic, episodic, and procedural, aligning with fact-based and entity-based approaches. I'll synthesize this into the research document.",
      isComplete: false,
    },
    {
      title: "Present final results to user",
      isComplete: false,
    },
  ],
};

const Task = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
            {/* User Message */}
            <ChatMessage content={sampleTask.userMessage} isUser />

            {/* AI Response */}
            <ChatMessage content={sampleTask.aiResponse} avatar={<IntellaLogo />} label="Intella">
              <div className="space-y-4 mt-6">
                {sampleTask.steps.map((step, i) => (
                  <TaskStep
                    key={i}
                    title={step.title}
                    description={step.description}
                    activities={step.activities}
                    summary={step.summary}
                    isComplete={step.isComplete}
                  >
                    {step.project && (
                      <div className="mt-3">
                        <ProjectCard title={step.project.title} status={step.project.status} />
                      </div>
                    )}
                  </TaskStep>
                ))}

                {/* Progress indicator */}
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                  <span>4 / 4</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </ChatMessage>
          </div>
        </main>

        <ChatInput />
      </div>
    </div>
  );
};

export default Task;
