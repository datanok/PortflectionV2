"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmailVerified = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">
          Email Verified Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Your email has been successfully verified. You can now access your
          account.
        </p>

        <Link href="/dashboard">
          <Button className="mt-4">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;
