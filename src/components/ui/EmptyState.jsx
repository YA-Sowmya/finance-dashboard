import { Inbox } from "lucide-react";

const EmptyState = ({ message = "No data found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Inbox size={40} style={{ color: "var(--text-muted)" }} />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
