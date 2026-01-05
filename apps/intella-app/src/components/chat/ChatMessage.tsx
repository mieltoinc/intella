import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser?: boolean;
  avatar?: React.ReactNode;
  label?: string;
  children?: React.ReactNode;
}

const ChatMessage = ({ content, isUser = false, avatar, label, children }: ChatMessageProps) => {
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-secondary text-foreground">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        {avatar && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            {avatar}
          </div>
        )}
        <div className="flex-1 space-y-4">
          {label && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-foreground">{label}</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">Lite</span>
            </div>
          )}
          <p className="text-foreground/90 leading-relaxed">{content}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
