"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Code,
  Clock,
  AlertCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "./ui/alert";

interface ComponentSubmission {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  componentCode: string;
  demoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  version: string;
  isPremium: boolean;
  price?: number;
  compatibility: string[];
  dependencies: string[];
  authorName: string;
  authorEmail: string;
  authorGithub?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
}

export default function AdminComponentReview() {
  const [submissions, setSubmissions] = useState<ComponentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ComponentSubmission | null>(null);
  const [filter, setFilter] = useState<
    "all" | "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [reviewNotes, setReviewNotes] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        `/api/admin/components/submissions?status=${filter}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (
    submissionId: string,
    action: "approve" | "reject"
  ) => {
    if (!reviewNotes.trim() && action === "reject") {
      alert("Please provide rejection reason");
      return;
    }

    setIsReviewing(true);
    try {
      const response = await fetch(`/api/admin/components/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId,
          action,
          feedback: reviewNotes,
        }),
      });

      if (response.ok) {
        // Refresh submissions
        await fetchSubmissions();
        setSelectedSubmission(null);
        setReviewNotes("");
        alert(
          `Component ${
            action === "approve" ? "approved" : "rejected"
          } successfully`
        );
      } else {
        const error = await response.json();
        alert(`Failed to ${action} component: ${error.error}`);
      }
    } catch (error) {
      console.error("Review error:", error);
      alert("Failed to process review");
    } finally {
      setIsReviewing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Component Review Dashboard</h1>
        <p className="text-gray-600">
          Review and manage community-submitted components
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {submissions.filter((s) => s.status === "PENDING").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {submissions.filter((s) => s.status === "APPROVED").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {submissions.filter((s) => s.status === "REJECTED").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{submissions.length}</p>
              </div>
              <Code className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Submissions</SelectItem>
            <SelectItem value="PENDING">Pending Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No submissions found
              </h3>
              <p className="text-gray-600">
                {filter === "PENDING"
                  ? "No components are pending review"
                  : `No ${filter.toLowerCase()} components found`}
              </p>
            </CardContent>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">
                        {submission.name}
                      </CardTitle>
                      {getStatusBadge(submission.status)}
                    </div>
                    <CardDescription className="text-sm">
                      {submission.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <span className="text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Component Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Category:</strong> {submission.category}
                      </p>
                      <p>
                        <strong>Version:</strong> {submission.version}
                      </p>
                      <p>
                        <strong>Premium:</strong>{" "}
                        {submission.isPremium ? `$${submission.price}` : "No"}
                      </p>
                      <p>
                        <strong>Tags:</strong> {submission.tags.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Author Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Name:</strong> {submission.authorName}
                      </p>
                      <p>
                        <strong>Email:</strong> {submission.authorEmail}
                      </p>
                      {submission.authorGithub && (
                        <p>
                          <strong>GitHub:</strong> {submission.authorGithub}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {submission.dependencies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Dependencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {submission.dependencies.map((dep) => (
                        <Badge key={dep} variant="outline" className="text-xs">
                          {dep}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {submission.compatibility.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">
                      Compatibility
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {submission.compatibility.map((comp) => (
                        <Badge
                          key={comp}
                          variant="secondary"
                          className="text-xs"
                        >
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{submission.name}</DialogTitle>
                        <DialogDescription>
                          Component code preview
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{submission.componentCode}</pre>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {submission.demoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={submission.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo
                      </a>
                    </Button>
                  )}

                  {submission.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Source
                      </a>
                    </Button>
                  )}

                  {submission.status === "PENDING" && (
                    <Button
                      size="sm"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      Review
                    </Button>
                  )}
                </div>

                {submission.reviewerNotes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Review Notes</h4>
                    <p className="text-sm text-gray-600">
                      {submission.reviewerNotes}
                    </p>
                  </div>
                )}

                {submission.rejectionReason && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1 text-red-800">
                      Rejection Reason
                    </h4>
                    <p className="text-sm text-red-600">
                      {submission.rejectionReason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Review Dialog */}
      {selectedSubmission && (
        <Dialog
          open={!!selectedSubmission}
          onOpenChange={() => setSelectedSubmission(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Review Component: {selectedSubmission.name}
              </DialogTitle>
              <DialogDescription>
                Provide feedback and decide whether to approve or reject this
                component
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review Notes
                </label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Provide feedback about the component..."
                  rows={4}
                />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>For rejections:</strong> Please provide a clear reason
                  for rejection in the notes above.
                  <br />
                  <strong>For approvals:</strong> The component will be approved
                  and made available to users.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSubmission(null)}
                  disabled={isReviewing}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReview(selectedSubmission.id, "reject")}
                  disabled={isReviewing}
                >
                  {isReviewing ? "Rejecting..." : "Reject"}
                </Button>
                <Button
                  onClick={() => handleReview(selectedSubmission.id, "approve")}
                  disabled={isReviewing}
                >
                  {isReviewing ? "Approving..." : "Approve"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
