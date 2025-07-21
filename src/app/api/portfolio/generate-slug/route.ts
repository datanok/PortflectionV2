import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/authenticateUser";

const GenerateSlugSchema = z.object({
  baseSlug: z
    .string()
    .min(1, "Base slug is required")
    .max(100, "Base slug too long"),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();
    const validationResult = GenerateSlugSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { baseSlug } = validationResult.data;

    // 3. Generate unique slug
    const slug = await generateUniqueSlug(baseSlug, session.user.id);

    return NextResponse.json({
      success: true,
      data: { slug },
    });
  } catch (error) {
    console.error("Generate slug error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate unique slug
async function generateUniqueSlug(
  baseSlug: string,
  userId: string
): Promise<string> {
  const slug = baseSlug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  let counter = 1;
  let finalSlug = slug;

  while (true) {
    const existing = await prisma.portfolio.findFirst({
      where: {
        slug: finalSlug,
        userId: { not: userId }, // Exclude user's own portfolios
      },
      select: { id: true },
    });

    if (!existing) {
      break;
    }

    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  return finalSlug;
}
