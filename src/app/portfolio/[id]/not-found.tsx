import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Home, Plus } from "lucide-react";

export default function PortfolioNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Portfolio Not Found
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              The portfolio you&apos;re looking for doesn&apos;t exist or may
              have been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This could be because:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-sm mx-auto">
                <li>• The portfolio URL is incorrect</li>
                <li>• The portfolio has been deleted</li>
                <li>• The portfolio is private</li>
                <li>• The portfolio hasn&apos;t been published yet</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/dashboard/portfolios/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Portfolio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
