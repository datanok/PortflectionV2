import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Use the new hosted URL and API key
    const resumeParserUrl =
      process.env.RESUME_PARSER_URL ||
      "https://web-production-ffa48.up.railway.app";
    const resumeApiKey = process.env.RESUME_API_KEY;

    if (!resumeApiKey) {
      return NextResponse.json(
        { error: "Resume parser API key not configured" },
        { status: 500 }
      );
    }

    // Prepare the file for upload
    const forward = new FormData();
    forward.append("file", file, (file as any).name || "resume");

    // Make authenticated request to the resume parser API
    const res = await fetch(`${resumeParserUrl}/parse-resume`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resumeApiKey}`,
      },
      body: forward as any,
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error("Resume parser error:", responseText);
      return NextResponse.json(
        {
          error: "Failed to parse resume",
          details: responseText || `Parser error (${res.status})`,
        },
        { status: res.status }
      );
    }

    // Parse the response to ensure it's valid JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse resume parser response:", responseText);
      return NextResponse.json(
        { error: "Invalid response from resume parser" },
        { status: 500 }
      );
    }

    // Return the parsed resume data
    return NextResponse.json(parsedResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("Resume parsing error:", e);
    return NextResponse.json(
      {
        error: "Failed to process resume",
        details: e?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
