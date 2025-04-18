// import { Progress } from "@/components/ui/progress";

interface SkillBadgeProps {
  name: string;
  proficiency?: number;
  category?: string;
  className?: string;
}

export function SkillBadge({ name, proficiency, category, className }: SkillBadgeProps) {
  return (
    <div className={`rounded-lg border p-3 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        {category && <span className="text-xs text-muted-foreground">{category}</span>}
      </div>
      {proficiency !== undefined && (
        // <Progress value={proficiency} className="h-2" />
      )}
    </div>
  );
}