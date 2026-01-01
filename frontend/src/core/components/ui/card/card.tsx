import { cn } from "@/core/utils/cn";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl p-5 shadow-card", className)}>
      {children}
    </div>
  );
}
