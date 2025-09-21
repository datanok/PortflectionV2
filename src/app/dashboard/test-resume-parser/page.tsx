"use client";

import React, { useState } from "react";
import {
  testResumeParserAPI,
  validateResumeData,
  ResumeParserTestResult,
} from "@/lib/resumeParserTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";

export default function TestResumeParserPage() {
  const [file, setFile] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<ResumeParserTestResult | null>(
    null
  );
  const [isTesting, setIsTesting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTestResult(null);
    }
  };

  const runTest = async () => {
    if (!file) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testResumeParserAPI(file);
      setTestResult(result);

      if (result.success && result.data) {
        const validation = validateResumeData(result.data);
        console.log("Resume data validation:", validation);
      }
    } catch (error) {
      console.error("Test error:", error);
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--background] text-[--foreground] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Parser API Test</h1>
          <p className="text-muted-foreground">
            Test the resume parser integration with your hosted API
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Upload Resume File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume-file">
                Select Resume (PDF, DOC, DOCX)
              </Label>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>

            <Button
              onClick={runTest}
              disabled={!file || isTesting}
              className="w-full"
            >
              {isTesting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Testing API...
                </>
              ) : (
                "Test Resume Parser"
              )}
            </Button>
          </CardContent>
        </Card>

        {testResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                Test Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <p
                    className={`text-sm ${
                      testResult.success ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {testResult.success ? "Success" : "Failed"}
                  </p>
                </div>
                {testResult.responseTime && (
                  <div>
                    <Label className="text-sm font-medium">Response Time</Label>
                    <p className="text-sm">{testResult.responseTime}ms</p>
                  </div>
                )}
              </div>

              {testResult.error && (
                <Alert variant="destructive">
                  <AlertDescription>{testResult.error}</AlertDescription>
                </Alert>
              )}

              {testResult.success && testResult.data && (
                <div>
                  <Label className="text-sm font-medium">
                    Parsed Data Preview
                  </Label>
                  <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-64">
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>API URL:</strong>{" "}
                {process.env.NEXT_PUBLIC_RESUME_PARSER_URL ||
                  "https://web-production-ffa48.up.railway.app"}
              </p>
              <p>
                <strong>API Key:</strong>{" "}
                {process.env.NEXT_PUBLIC_RESUME_API_KEY
                  ? "***configured***"
                  : "Not configured"}
              </p>
              <p className="text-muted-foreground">
                Note: API key is not exposed to the client for security reasons.
                Make sure RESUME_API_KEY is set in your server environment
                variables.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
