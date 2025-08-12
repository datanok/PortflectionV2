"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, XCircle, Eye } from "lucide-react";
import { CommunityComponentRenderer } from "@/components/community/CommunityComponentRenderer";

interface ComponentSubmission {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  componentCode: string;
  status: string;
  submittedAt: string;
  authorName: string;
  authorEmail: string;
}

export function AdminComponentReviewNew() {
  const [submissions, setSubmissions] = useState<ComponentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ComponentSubmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/component-submissions");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  const handleApprove = async (submissionId: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/admin/approve-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          approvedBy: "admin", // This will be the actual user ID
          reviewerNotes: reviewNotes,
        }),
      });

      if (response.ok) {
        // Refresh submissions
        await fetchSubmissions();
        setSelectedSubmission(null);
        setReviewNotes("");
      }
    } catch (error) {
      console.error("Failed to approve component:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (submissionId: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/admin/reject-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          rejectionReason: reviewNotes,
        }),
      });

      if (response.ok) {
        await fetchSubmissions();
        setSelectedSubmission(null);
        setReviewNotes("");
      }
    } catch (error) {
      console.error("Failed to reject component:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "PENDING")
                .map((submission) => (
                  <Card
                    key={submission.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedSubmission?.id === submission.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{submission.name}</h3>
                          <p className="text-sm text-gray-600">
                            {submission.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              {submission.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              by {submission.authorName}
                            </span>
                          </div>
                        </div>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Panel */}
        {selectedSubmission && (
          <Card>
            <CardHeader>
              <CardTitle>Review: {selectedSubmission.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Component Preview */}
              <div>
                <h4 className="font-medium mb-2">Component Preview</h4>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <CommunityComponentRenderer
                    componentId={selectedSubmission.id}
                    props={{
                      title: "Preview Title",
                      subtitle: "Preview subtitle",
                    }}
                    onError={(error) => (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Failed to preview: {error.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  />
                </div>
              </div>

              {/* Component Details */}
              <div>
                <h4 className="font-medium mb-2">Details</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Category:</strong> {selectedSubmission.category}
                  </p>
                  <p>
                    <strong>Author:</strong> {selectedSubmission.authorName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedSubmission.authorEmail}
                  </p>
                  <p>
                    <strong>Submitted:</strong>{" "}
                    {new Date(
                      selectedSubmission.submittedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review Notes
                </label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes about your decision..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApprove(selectedSubmission.id)}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve & Convert to File
                </Button>
                <Button
                  onClick={() => handleReject(selectedSubmission.id)}
                  disabled={isProcessing}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
