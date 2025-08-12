import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { auth } from "../../../../../../auth";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) {
      where.status = status;
    }

    // Fetch submissions with pagination
    const [submissions, total] = await Promise.all([
      prisma.componentSubmission.findMany({
        where,
        orderBy: { submittedAt: "desc" },
        skip,
        take: limit,
        include: {
          submittedByUser: true,
          reviewedByUser: true,
        },
      }),
      prisma.componentSubmission.count({ where }),
    ]);

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching component submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { submissionId, action, feedback } = body;

    if (!submissionId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the submission
    const submission = await prisma.componentSubmission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      // Create approved component
      const approvedComponent = await prisma.approvedComponent.create({
        data: {
          name: submission.name,
          description: submission.description,
          category: submission.category,
          tags: submission.tags,
          componentCode: submission.componentCode,
          thumbnail: "", // Will be set by admin during approval
          demoUrl: submission.demoUrl,
          documentationUrl: submission.documentationUrl,
          githubUrl: submission.githubUrl,
          version: submission.version,
          isPremium: submission.isPremium,
          price: submission.price,
          compatibility: submission.compatibility,
          dependencies: submission.dependencies,
          authorName: submission.authorName,
          authorEmail: submission.authorEmail,
          authorGithub: submission.authorGithub,
          approvedBy: session.user.id,
          originalSubmission: submission.id,
          downloads: 0,
          rating: 0,
          reviewCount: 0,
        },
      });

      // Update submission status
      await prisma.componentSubmission.update({
        where: { id: submissionId },
        data: {
          status: "APPROVED",
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: "Component approved successfully",
        approvedComponent,
      });
    } else if (action === "reject") {
      // Update submission status
      await prisma.componentSubmission.update({
        where: { id: submissionId },
        data: {
          status: "REJECTED",
          rejectionReason: feedback || "Component rejected by admin",
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        },
      });

      return NextResponse.json({ message: "Component rejected successfully" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing component submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
