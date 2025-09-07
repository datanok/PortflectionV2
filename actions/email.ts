"use server";

export async function sendEmail({
  to,
  subject,
  templateName,
  variables = {},
  rawHtml = null,
}: {
  to: string;
  subject: string;
  templateName: string;
  variables?: Record<string, string>;
  rawHtml?: string;
}) {
  try {
    const emailData = {
      to: to.trim(),
      subject: subject.trim(),
      templateName: templateName.trim(),
      variables,
      rawHtml,
    };
    console.log(emailData, "emailData");

    const res = await fetch(`${process.env.EMAIL_WORKER_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
      cache: "no-store",
    });
    console.log(res, "res");

    const responseText = await res.text();

    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      responseData = {};
    }

    if (!res.ok) {
      return { success: false, message: "Email job failed to queue" };
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
