import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

interface PreviewTabProps {
  form: any;
  portfolioType: string;
}

const PreviewTab = ({ form, portfolioType }: PreviewTabProps) => {
  const getItemsCount = () => {
    switch (portfolioType) {
      case "developer":
        return (
          <div className="flex gap-2">
            <Badge variant="secondary">{form.getValues("projects")?.length || 0} Projects</Badge>
            <Badge variant="secondary">{form.getValues("skills")?.length || 0} Skills</Badge>
          </div>
        );
      case "designer":
        return <Badge variant="secondary">{form.getValues("caseStudies")?.length || 0} Case Studies</Badge>;
      case "photographer":
        return <Badge variant="secondary">{form.getValues("gallery")?.length || 0} Photos</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Your Portfolio</h3>
      
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-slate-50 dark:bg-slate-900">
          <CardTitle className="flex items-center gap-2">
            Portfolio Summary
            <Badge className="ml-2 capitalize">{portfolioType}</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Personal Information</h4>
              <p className="text-lg font-medium">{form.getValues("name")}</p>
              <p className="text-slate-600 dark:text-slate-300">{form.getValues("title")}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{form.getValues("email")}</p>
            </div>
            
            <Separator />
            
            {/* About */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">About</h4>
              <p className="line-clamp-3 text-slate-700 dark:text-slate-300">{form.getValues("about")}</p>
            </div>
            
            <Separator />
            
            {/* Career */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Career</h4>
              <div className="flex gap-2">
                <Badge variant="outline">{form.getValues("education")?.length || 0} Education</Badge>
                <Badge variant="outline">{form.getValues("experience")?.length || 0} Experience</Badge>
              </div>
            </div>
            
            <Separator />
            
            {/* Portfolio Items */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Portfolio Items</h4>
              {getItemsCount()}
            </div>
            
            <Separator />
            
            {/* Theme */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Theme</h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: form.getValues("theme.primary"),
                    }}
                  ></div>
                  <div
                    className="w-5 h-5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: form.getValues("theme.secondary"),
                    }}
                  ></div>
                </div>
                {/* <Badge variant="outline" className="capitalize">{form.getValues("theme.mode")} mode</Badge> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewTab;