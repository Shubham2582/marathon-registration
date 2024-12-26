import { cn } from "@/lib/utils"

interface BambooFrameProps {
  children: React.ReactNode
  className?: string
}

export function BambooFrame({ children, className }: BambooFrameProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-[url('/wooden-header.png')] bg-contain bg-no-repeat bg-center" />
        <div className="absolute top-12 left-0 w-6 h-[calc(100%-24px)] bg-[url('/bamboo-left.png')] bg-contain bg-repeat-y" />
        <div className="absolute top-12 right-0 w-6 h-[calc(100%-24px)] bg-[url('/bamboo-right.png')] bg-contain bg-repeat-y" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-[url('/wooden-footer.png')] bg-contain bg-no-repeat bg-center" />
      </div>
      <div className="relative z-10 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg mx-6 my-12 p-8">
        {children}
      </div>
    </div>
  )
}

