import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

export function TestimonialCard({ 
  quote, 
  author, 
  role, 
  company, 
  avatar,
  className 
}: TestimonialCardProps) {
  const initials = author
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6">
        <div className="relative">
          <span className="text-6xl text-muted-foreground/20 absolute -top-6 -left-2">&quot;</span>
          <blockquote className="text-muted-foreground mb-4 z-10 relative">
            {quote}
          </blockquote>
        </div>
        <div className="flex items-center mt-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">
              {role}{company ? `, ${company}` : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}