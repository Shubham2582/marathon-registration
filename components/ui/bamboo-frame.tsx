import { cn } from "@/lib/utils";

interface BambooFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function BambooFrame({ children, className }: BambooFrameProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="z-10 rounded-lg w-full">{children}</div>
    </div>
  );
}
