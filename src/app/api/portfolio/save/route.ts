import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/authenticateUser";

// Validation schemas
const GlobalThemeSchema = z.object({
  primary: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid primary color format"),
  secondary: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid secondary color format"),
  accent: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid accent color format"),
  background: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid background color format"),
  card: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid card color format"),
  muted: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid muted color format"),
  fontHeading: z.string().min(1, "Heading font is required"),
  fontBody: z.string().min(1, "Body font is required"),
  spacingBase: z.number().min(0.5).max(3),
  spacingSection: z.number().min(1).max(5),
  spacingComponent: z.number().min(0.5).max(3),
  mode: z.enum(["light", "dark", "auto"]),
  borderRadius: z.number().min(0).max(2),
  shadowIntensity: z.number().min(0).max(1),
  animationSpeed: z.number().min(0.1).max(2),
});

const PortfolioComponentSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, "Component type is required"),
  variant: z.string().min(1, "Component variant is required"),
  props: z.record(z.any()),
  styles: z.record(z.any()).optional(),
  order: z.number().int().min(0),
  isActive: z.boolean().default(true),
});

const SavePortfolioSchema = z.object({
  // Basic info
  name: z
    .string()
    .min(1, "Portfolio name is required")
    .max(100, "Name too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug too long")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z.string().max(500, "Description too long").optional(),

  // Layout and theme
  layout: z
    .array(PortfolioComponentSchema)
    .min(1, "At least one component is required"),
  theme: GlobalThemeSchema.optional(),

  // Metadata
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).max(10, "Too many tags").optional(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional(),

  // Legacy fields for backward compatibility
  portfolioType: z
    .enum(["developer", "designer", "contentCreator", "businessConsulting"])
    .optional(),
  title: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
  profileImage: z.string().url("Invalid profile image URL").optional(),
  contactForm: z.boolean().default(true),
  linkedinLink: z.string().url("Invalid LinkedIn URL").optional(),
  personalWebsite: z.string().url("Invalid website URL").optional(),
  socials: z
    .array(
      z.object({
        type: z.string(),
        url: z.string().url(),
        username: z.string(),
      })
    )
    .optional(),
  layoutType: z.string().default("classic"),
  extraData: z.record(z.any()).optional(),
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
    const validationResult = SavePortfolioSchema.safeParse(body);

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

    const {
      name,
      slug,
      description,
      layout,
      theme,
      isPublic,
      tags = [],
      thumbnail,
      portfolioType = "developer",
      title,
      email,
      phone,
      location,
      about,
      profileImage,
      contactForm,
      linkedinLink,
      personalWebsite,
      socials,
      layoutType,
      extraData,
    } = validationResult.data;

    // 3. Check for duplicate slug
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { slug },
      select: { id: true, userId: true },
    });

    if (existingPortfolio) {
      if (existingPortfolio.userId === session.user.id) {
        return NextResponse.json(
          { error: "You already have a portfolio with this slug" },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: "This slug is already taken" },
          { status: 409 }
        );
      }
    }

    // 4. Create portfolio with transaction for data consistency
    const portfolio = await prisma.$transaction(async (tx) => {
      // Create the main portfolio record
      const portfolio = await tx.portfolio.create({
        data: {
          userId: session.user.id,
          name,
          slug,
          description,
          layout: layout as any, // Prisma will handle JSON serialization
          theme: theme as any,
          isPublished: isPublic,
          tags,
          thumbnail,
          portfolioType,
          title,
          email,
          phone,
          location,
          about,
          profileImage,
          contactForm,
          linkedinLink,
          personalWebsite,
          socials: socials as any,
          layoutType,
          extraData: extraData as any,
        },
      });

      // Create individual component records for better querying
      const componentPromises = layout.map((component, index) =>
        tx.portfolioComponent.create({
          data: {
            portfolioId: portfolio.id,
            type: component.type,
            variant: component.variant,
            props: component.props as any,
            styles: component.styles as any,
            order: component.order,
            isActive: component.isActive,
          },
        })
      );

      await Promise.all(componentPromises);

      return portfolio;
    });

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        data: {
          id: portfolio.id,
          slug: portfolio.slug,
          name: portfolio.name,
          isPublic: portfolio.isPublished,
          createdAt: portfolio.createdAt,
          updatedAt: portfolio.updatedAt,
        },
        message: "Portfolio saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Portfolio save error:", error);

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "This slug is already taken" },
          { status: 409 }
        );
      }

      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid user reference" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const updateSchema = SavePortfolioSchema.extend({
      id: z.string().min(1, "Portfolio ID is required"),
    });

    const validationResult = updateSchema.safeParse(body);

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

    const { id, ...updateData } = validationResult.data;

    // 3. Verify portfolio ownership
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true, userId: true, slug: true },
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    if (existingPortfolio.userId !== session.user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // 4. Check for slug conflicts (if slug is being updated)
    if (updateData.slug && updateData.slug !== existingPortfolio.slug) {
      const slugConflict = await prisma.portfolio.findUnique({
        where: { slug: updateData.slug },
        select: { id: true, userId: true },
      });

      if (slugConflict) {
        if (slugConflict.userId === session.user.id) {
          return NextResponse.json(
            { error: "You already have a portfolio with this slug" },
            { status: 409 }
          );
        } else {
          return NextResponse.json(
            { error: "This slug is already taken" },
            { status: 409 }
          );
        }
      }
    }

    // 5. Update portfolio with transaction
    const updatedPortfolio = await prisma.$transaction(async (tx) => {
      // Update main portfolio record
      const portfolio = await tx.portfolio.update({
        where: { id },
        data: {
          name: updateData.name,
          slug: updateData.slug,
          description: updateData.description,
          layout: updateData.layout as any,
          theme: updateData.theme as any,
          isPublished: updateData.isPublic,
          tags: updateData.tags,
          thumbnail: updateData.thumbnail,
          portfolioType: updateData.portfolioType,
          title: updateData.title,
          email: updateData.email,
          phone: updateData.phone,
          location: updateData.location,
          about: updateData.about,
          profileImage: updateData.profileImage,
          contactForm: updateData.contactForm,
          linkedinLink: updateData.linkedinLink,
          personalWebsite: updateData.personalWebsite,
          socials: updateData.socials as any,
          layoutType: updateData.layoutType,
          extraData: updateData.extraData as any,
          updatedAt: new Date(),
        },
      });

      // Update components if layout is provided
      if (updateData.layout) {
        // Delete existing components
        await tx.portfolioComponent.deleteMany({
          where: { portfolioId: id },
        });

        // Create new components
        const componentPromises = updateData.layout.map((component) =>
          tx.portfolioComponent.create({
            data: {
              portfolioId: id,
              type: component.type,
              variant: component.variant,
              props: component.props as any,
              styles: component.styles as any,
              order: component.order,
              isActive: component.isActive,
            },
          })
        );

        await Promise.all(componentPromises);
      }

      return portfolio;
    });

    // 6. Return success response
    return NextResponse.json({
      success: true,
      data: {
        id: updatedPortfolio.id,
        slug: updatedPortfolio.slug,
        name: updatedPortfolio.name,
        isPublic: updatedPortfolio.isPublished,
        updatedAt: updatedPortfolio.updatedAt,
      },
      message: "Portfolio updated successfully",
    });
  } catch (error) {
    console.error("Portfolio update error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "This slug is already taken" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate unique slug
export async function generateUniqueSlug(
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
