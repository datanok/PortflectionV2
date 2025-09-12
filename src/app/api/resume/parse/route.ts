import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const upstream = process.env.RESUME_PARSER_URL || "http://localhost:8002/parse-resume";

    const forward = new FormData();
    forward.append("file", file, (file as any).name || "resume");

    const res = await fetch(upstream, {
      method: "POST",
      body: forward as any,
    });

    const text = await res.text();
    if (!res.ok) {
      return new NextResponse(text || "Parser error", { status: res.status });
    }

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to proxy" }, { status: 500 });
  }
}


