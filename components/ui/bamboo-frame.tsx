import { cn } from "@/lib/utils";

interface BambooFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function BambooFrame({ children, className }: BambooFrameProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative z-10 rounded-lg w-full">
        {children}
      </div>
    </div>
  );
}
