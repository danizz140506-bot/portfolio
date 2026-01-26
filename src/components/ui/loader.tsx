import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "classic" | "modified";
}

const sizeClasses = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-4",
  lg: "h-16 w-16 border-4",
};

export default function Loader({
  className,
  size = "md",
  variant = "classic",
}: LoaderProps) {
  if (variant === "modified") {
    return (
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-b-2 border-white ease-linear",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex animate-spin items-center justify-center rounded-full border-4 border-white border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}

export function ClassicLoader() {
  return (
    <div className="flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-white border-t-transparent"></div>
  );
}

export function ModifiedClassicLoader() {
  return (
    <div className="ml-3 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-white ease-linear"></div>
  );
}
