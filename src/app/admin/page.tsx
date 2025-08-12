import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AdminNavigation } from "@/components/AdminNavigation";
import { auth } from "../../../auth";

export default async function AdminDashboardPage() {
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
        <AdminNavigation />
      </div>
    </div>
  );
}
