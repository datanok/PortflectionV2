import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
}
