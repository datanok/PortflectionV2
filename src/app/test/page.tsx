// Create this as a test component in your Next.js app
"use client";
import { testEmailSend } from "../../../actions/test";

export default function TestConnection() {
  const handleTest = async () => {
    console.log("Testing connection...");
    const result = await testEmailSend();
    console.log("Test result:", result);
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div>
      <button onClick={handleTest}>Test Email API Connection</button>
    </div>
  );
}
