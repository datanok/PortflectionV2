import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PreviewTabProps {
  form: any;
  portfolioType: string;
}

const PreviewTab = ({ form, portfolioType }: PreviewTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Your Portfolio</h3>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Type</h4>
            <p className="capitalize">{portfolioType}</p>
          </div>

          <div>
            <h4 className="font-medium">Personal Information</h4>
            <p>{form.getValues("name")}</p>
            <p>{form.getValues("title")}</p>
            <p>{form.getValues("email")}</p>
          </div>

          <div>
            <h4 className="font-medium">About</h4>
            <p className="line-clamp-3">{form.getValues("about")}</p>
          </div>

          <div>
            <h4 className="font-medium">Items</h4>
            {portfolioType === "developer" && (
              <p>
                {form.getValues("projects")?.length || 0} projects,{" "}
                {form.getValues("skills")?.length || 0} skills
              </p>
            )}
            {portfolioType === "designer" && (
              <p>{form.getValues("caseStudies")?.length || 0} case studies</p>
            )}
            {portfolioType === "photographer" && (
              <p>{form.getValues("gallery")?.length || 0} photos</p>
            )}
          </div>

          <div>
            <h4 className="font-medium">Theme</h4>
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: form.getValues("theme.primary"),
                }}
              ></div>
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: form.getValues("theme.secondary"),
                }}
              ></div>
              <p className="capitalize">{form.getValues("theme.mode")} mode</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewTab;
