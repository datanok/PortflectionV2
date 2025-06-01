"use server";

export async function sendEmail({
  to,
  subject,
  template,
  VERIFICATION_URL,
  name,
}: {
  to: string;
  subject: string;
  template: string;
  VERIFICATION_URL: string;
  name: string;
}) {
  try {
    // Sanitize and prepare final template content
    const finalTemplate = template
      .replace(/{{VERIFICATION_URL}}/g, VERIFICATION_URL)
      .replace(/{{name}}/g, name); // Example name fallback from email


    const emailData = {
      to: to.trim(),
      subject: subject.trim(),
      template: finalTemplate.trim(),
      VERIFICATION_URL: VERIFICATION_URL.trim(),
      name: name.trim(),
    };

    const requestBody = JSON.stringify(emailData);


    const res = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
      cache: "no-store",
    });

    const responseText = await res.text();

    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      responseData = {};
    }

    if (!res.ok) {
      throw new Error(responseData.error || `HTTP error! status: ${res.status}`);
    }

    return { success: true, message: "Email job queued successfully" };
  } catch (error) {
    console.error("Error in sendEmail:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to send email: ${errorMessage}`,
    };
  }
}
