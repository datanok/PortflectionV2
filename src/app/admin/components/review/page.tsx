import { redirect } from "next/navigation";
import { headers } from "next/headers";

import AdminComponentReview from "@/components/AdminComponentReview";
import { auth } from "../../../../../auth";

export default async function AdminComponentReviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is authenticated and is an admin
  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Component Review
        </h1>
        <AdminComponentReview />
      </div>
    </div>
  );
}
