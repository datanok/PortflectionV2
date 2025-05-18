import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export default function LoadingButton({
  pending,
  children,
  onClick,
  className,
}: {
  pending: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      className={className}
      type="submit"
      disabled={pending}
    >
      {pending ? (
      <>
       <Loader2 className="animate-spin" />
       Please wait
      </>
      ) : (
        children
      )}
    </Button>
  );
}
