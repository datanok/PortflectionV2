"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestApiPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testApi = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setResults({ endpoint, status: response.status, data });
    } catch (error) {
      setResults({ endpoint, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>

      <div className="space-y-4">
        <Button
          onClick={() =>
            testApi("/api/admin/components/submissions?status=PENDING")
          }
          disabled={loading}
        >
          Test Admin Submissions API
        </Button>

        <Button
          onClick={() => testApi("/api/components/submit")}
          disabled={loading}
        >
          Test Component Submit API
        </Button>
      </div>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
