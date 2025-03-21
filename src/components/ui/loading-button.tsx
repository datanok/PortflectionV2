import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export default function LoadingButton({
  pending,
  children,
  onClick,
}: {
  pending: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className="w-full"
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
