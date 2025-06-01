"use server";

export async function testEmailSend() {
  console.log("=== TESTING EMAIL SEND ENDPOINT ===");

  try {
    const testData = {
      to: "tanmaypatiltp25@gmail.com",
      subject: "Test from Server Action",
      text: "This is a test email from Next.js server action",
    };

    console.log("Sending request to /send with data:", testData);

    const res = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
      cache: "no-store",
    });

    console.log("Send endpoint response status:", res.status);
    console.log("Send endpoint response ok:", res.ok);

    const responseText = await res.text();
    console.log("Send endpoint response body:", responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      responseData = { rawResponse: responseText };
    }

    return {
      success: res.ok,
      status: res.status,
      response: responseData,
      rawResponse: responseText,
    };
  } catch (error) {
    console.error("Email send test failed:", error);
    return {
      success: false,
      error: error.message,
      type: error.constructor.name,
      stack: error.stack,
    };
  }
}
