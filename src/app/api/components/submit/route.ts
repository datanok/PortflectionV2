import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      category,
      tags,
      componentCode,
      thumbnail,
      demoUrl,
      documentationUrl,
      githubUrl,
      version,
      isPremium,
      price,
      compatibility,
      dependencies,
      author,
    } = body;

    // Validate required fields
    if (!name || !description || !category || !componentCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate component code (basic check)
    if (componentCode.length < 50) {
      return NextResponse.json(
        { error: "Component code is too short" },
        { status: 400 }
      );
    }

    // Check for dangerous patterns in component code
    const dangerousPatterns = [
      "eval(",
      "Function(",
      "fetch(",
      "XMLHttpRequest",
      "localStorage",
      "sessionStorage",
      "document.cookie",
      "window.",
      "global.",
      "process.",
    ];

    const hasDangerousPattern = dangerousPatterns.some((pattern) =>
      componentCode.includes(pattern)
    );

    if (hasDangerousPattern) {
      return NextResponse.json(
        { error: "Component code contains potentially dangerous patterns" },
        { status: 400 }
      );
    }

    // Create component submission
    const submission = await prisma.componentSubmission.create({
      data: {
        name,
        description,
        category,
        tags: tags || [],
        componentCode,
        demoUrl: demoUrl || "",
        documentationUrl: documentationUrl || "",
        githubUrl: githubUrl || "",
        version: version || "1.0.0",
        isPremium: isPremium || false,
        price: price || null,
        compatibility: compatibility || [],
        dependencies: dependencies || [],
        status: "PENDING",
        submittedBy: session.user.id,
        authorName: author?.name || session.user.name || "Anonymous",
        authorEmail: author?.email || session.user.email || "",
        authorGithub: author?.github || "",
      },
    });

    return NextResponse.json({
      message: "Component submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error submitting component:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's submissions
    const submissions = await prisma.componentSubmission.findMany({
      where: { submittedBy: session.user.id },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
