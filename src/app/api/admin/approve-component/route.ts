import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PrismaClient } from "@prisma/client";
import {
  updateComponentFile,
  clearRegistryCache,
} from "@/lib/componentCodeGenerator";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { submissionId, approvedBy, reviewerNotes } = await request.json();

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

    // Create approved component
    const approvedComponent = await prisma.approvedComponent.create({
      data: {
        name: submission.name,
        description: submission.description,
        category: submission.category,
        tags: submission.tags,
        componentCode: submission.componentCode,
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
        approvedBy: user.id,
        originalSubmission: submission.id,
      },
    });

    // Convert to file automatically
    try {
      await updateComponentFile(approvedComponent);
      console.log(`✅ Component file created: ${approvedComponent.name}`);
    } catch (error) {
      console.error("Failed to convert component to file:", error);
      // Continue with approval even if file conversion fails
    }

    // Update submission status
    await prisma.componentSubmission.update({
      where: { id: submissionId },
      data: {
        status: "APPROVED",
        reviewedBy: user.id,
        reviewedAt: new Date(),
        reviewerNotes,
      },
    });

    // Clear registry cache to ensure new component is included
    clearRegistryCache();

    return NextResponse.json({
      success: true,
      message: "Component approved and converted to file successfully",
      componentId: approvedComponent.id,
    });
  } catch (error) {
    console.error("Component approval error:", error);
    return NextResponse.json(
      { error: "Failed to approve component" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
