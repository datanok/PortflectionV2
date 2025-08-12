"use server";

import { revalidatePath } from "next/cache";
import { GlobalTheme } from "@/components/portfolio/builder/GlobalThemeControls";
import { auth } from "../../auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Types
export interface PortfolioComponent {
  id: string;
  type: string;
  variant: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  order: number;
  isActive?: boolean;
  isMarketplace?: boolean;
  componentCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SavePortfolioData {
  // Basic info
  name: string;
  slug: string;
  description?: string;

  // Layout and theme
  layout: PortfolioComponent[];
  theme?: GlobalTheme;

  // Metadata
  isPublic: boolean;
  tags?: string[];
  thumbnail?: string;

  // Legacy fields for backward compatibility
  portfolioType?:
    | "developer"
    | "designer"
    | "contentCreator"
    | "businessConsulting";
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  about?: string;
  profileImage?: string;
  contactForm?: boolean;
  linkedinLink?: string;
  personalWebsite?: string;
  socials?: Array<{
    type: string;
    url: string;
    username: string;
  }>;
  layoutType?: string;
  extraData?: Record<string, any>;
}

export interface UpdatePortfolioData extends SavePortfolioData {
  id: string;
}

export interface PortfolioListParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "name" | "views";
  sortOrder?: "asc" | "desc";
  status?: "all" | "published" | "draft";
  search?: string;
  portfolioType?:
    | "all"
    | "developer"
    | "designer"
    | "contentCreator"
    | "businessConsulting";
}

export interface PortfolioListResponse {
  portfolios: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    isPublic: boolean;
    portfolioType: string;
    tags: string[];
    views: number;
    lastViewedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    stats: {
      components: number;
      totalViews: number;
    };
    previewUrl: string;
    editUrl: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: PortfolioListParams;
}

export interface PortfolioStatistics {
  overview: {
    totalPortfolios: number;
    publishedPortfolios: number;
    draftPortfolios: number;
    totalViews: number;
    recentViews: number;
    viewGrowth: number;
  };
  portfolioTypes: Array<{
    type: string;
    count: number;
  }>;
  recentActivity: Array<{
    id: string;
    name: string;
    slug: string;
    updatedAt: Date;
    isPublished: boolean;
  }>;
  topPortfolios: Array<{
    id: string;
    name: string;
    slug: string;
    views: number;
    isPublished: boolean;
  }>;
}

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
  shadowIntensity: z.number().min(0).max(100), // Changed from max(1) to max(100)
  animationSpeed: z.number().min(100).max(1000), // Changed from min(0.1).max(2) to min(100).max(1000)
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
  layout: z
    .array(PortfolioComponentSchema)
    .min(1, "At least one component is required"),
  theme: GlobalThemeSchema.optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).max(10, "Too many tags").optional(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional(),
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

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  return session.user;
}

// Portfolio Actions
export async function savePortfolio(data: SavePortfolioData) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Validate input
    const validationResult = SavePortfolioSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors);
      throw new Error(
        `Validation failed: ${validationResult.error.errors[0].message}`
      );
    }

    const validatedData = validationResult.data;

    // Check for duplicate slug
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { slug: validatedData.slug },
      select: { id: true, userId: true },
    });

    if (existingPortfolio) {
      if (existingPortfolio.userId === user.id) {
        throw new Error("You already have a portfolio with this slug");
      } else {
        throw new Error("This slug is already taken");
      }
    }

    // Create portfolio with transaction
    const portfolio = await prisma.$transaction(async (tx) => {
      // Create the main portfolio record
      const portfolio = await tx.portfolio.create({
        data: {
          userId: user.id,
          name: validatedData.name,
          slug: validatedData.slug,
          description: validatedData.description,
          layout: validatedData.layout as any,
          theme: validatedData.theme as any,
          isPublished: validatedData.isPublic,
          tags: validatedData.tags || [],
          thumbnail: validatedData.thumbnail,
          portfolioType: validatedData.portfolioType || "developer",
          title: validatedData.title,
          email: validatedData.email,
          phone: validatedData.phone,
          location: validatedData.location,
          about: validatedData.about,
          profileImage: validatedData.profileImage,
          contactForm: validatedData.contactForm,
          linkedinLink: validatedData.linkedinLink,
          personalWebsite: validatedData.personalWebsite,
          socials: validatedData.socials as any,
          layoutType: validatedData.layoutType,
          extraData: validatedData.extraData as any,
        },
      });

      // Create individual component records
      const componentPromises = validatedData.layout.map((component, index) =>
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

    // Revalidate relevant paths
    revalidatePath("/dashboard/portfolios");
    revalidatePath("/dashboard/my-portfolios");
    revalidatePath(`/portfolio/${portfolio.slug}`);

    return {
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
    };
  } catch (error) {
    console.error("Save portfolio error:", error);
    throw error;
  }
}

export async function updatePortfolio(data: UpdatePortfolioData) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Validate input
    const updateSchema = SavePortfolioSchema.extend({
      id: z.string().min(1, "Portfolio ID is required"),
    });

    const validationResult = updateSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors);
      throw new Error(
        `Validation failed: ${validationResult.error.errors[0].message}`
      );
    }

    const { id, ...updateData } = validationResult.data;

    // Verify portfolio ownership
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true, userId: true, slug: true },
    });

    if (!existingPortfolio) {
      throw new Error("Portfolio not found");
    }

    if (existingPortfolio.userId !== user.id) {
      throw new Error("Access denied");
    }

    // Check for slug conflicts (if slug is being updated)
    if (updateData.slug && updateData.slug !== existingPortfolio.slug) {
      const slugConflict = await prisma.portfolio.findUnique({
        where: { slug: updateData.slug },
        select: { id: true, userId: true },
      });

      if (slugConflict) {
        if (slugConflict.userId === user.id) {
          throw new Error("You already have a portfolio with this slug");
        } else {
          throw new Error("This slug is already taken");
        }
      }
    }

    // Update portfolio with transaction
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

    // Revalidate relevant paths
    revalidatePath("/dashboard/portfolios");
    revalidatePath("/dashboard/my-portfolios");
    revalidatePath(`/portfolio/${updatedPortfolio.slug}`);
    revalidatePath(`/dashboard/portfolios/edit/${id}`);

    return {
      success: true,
      data: {
        id: updatedPortfolio.id,
        slug: updatedPortfolio.slug,
        name: updatedPortfolio.name,
        isPublic: updatedPortfolio.isPublished,
        updatedAt: updatedPortfolio.updatedAt,
      },
      message: "Portfolio updated successfully",
    };
  } catch (error) {
    console.error("Update portfolio error:", error);
    throw error;
  }
}

// Helper function to clean up portfolios with null slugs
export async function cleanupNullSlugs() {
  try {
    // Find portfolios with null slugs
    const portfoliosWithNullSlugs = await prisma.portfolio.findMany({
      where: { slug: null },
      select: { id: true, name: true },
    });

    console.log(
      `Found ${portfoliosWithNullSlugs.length} portfolios with null slugs`
    );

    // Update each portfolio with a generated slug
    for (const portfolio of portfoliosWithNullSlugs) {
      const newSlug = await generateUniqueSlug(portfolio.name);
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { slug: newSlug },
      });
      console.log(`Updated portfolio ${portfolio.id} with slug: ${newSlug}`);
    }

    return { success: true, updatedCount: portfoliosWithNullSlugs.length };
  } catch (error) {
    console.error("Cleanup null slugs error:", error);
    throw error;
  }
}

export async function getPortfolio(idOrSlug: string) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Try to find portfolio by ID first, then by slug
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        userId: user.id,
      },
      include: {
        components: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            viewsLog: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // If the portfolio has a null slug, generate one for it
    let finalSlug = portfolio.slug;
    if (!portfolio.slug) {
      const newSlug = await generateUniqueSlug(portfolio.name);
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { slug: newSlug },
      });
      finalSlug = newSlug;
    }

    return {
      success: true,
      data: {
        id: portfolio.id,
        name: portfolio.name,
        slug: finalSlug,
        description: portfolio.description,
        layout: portfolio.layout,
        theme: portfolio.theme as unknown as GlobalTheme,
        isPublic: portfolio.isPublished,
        tags: portfolio.tags,
        thumbnail: portfolio.thumbnail,
        views: portfolio.views,
        lastViewedAt: portfolio.lastViewedAt,
        createdAt: portfolio.createdAt,
        updatedAt: portfolio.updatedAt,
        portfolioType: portfolio.portfolioType,
        title: portfolio.title,
        email: portfolio.email,
        phone: portfolio.phone,
        location: portfolio.location,
        about: portfolio.about,
        profileImage: portfolio.profileImage,
        contactForm: portfolio.contactForm,
        linkedinLink: portfolio.linkedinLink,
        personalWebsite: portfolio.personalWebsite,
        socials: portfolio.socials as any,
        layoutType: portfolio.layoutType,
        extraData: portfolio.extraData as any,
        components: portfolio.components.map((comp) => ({
          id: comp.id,
          type: comp.type,
          variant: comp.variant,
          props: comp.props as Record<string, any>,
          styles: comp.styles as Record<string, any>,
          order: comp.order,
          isActive: comp.isActive,
        })),
        user: portfolio.user,
        analytics: {
          totalViews: portfolio._count.viewsLog,
          recentViews: [], // You can implement this if needed
        },
      },
    };
  } catch (error) {
    console.error("Get portfolio error:", error);
    throw error;
  }
}

export async function deletePortfolio(id: string) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Find portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true, userId: true, name: true },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Verify ownership
    if (portfolio.userId !== user.id) {
      throw new Error("Access denied");
    }

    // Delete portfolio (cascade will handle related records)
    await prisma.portfolio.delete({
      where: { id },
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/portfolios");
    revalidatePath("/dashboard/my-portfolios");

    return {
      success: true,
      message: `Portfolio "${portfolio.name}" deleted successfully`,
    };
  } catch (error) {
    console.error("Delete portfolio error:", error);
    throw error;
  }
}

export async function listPortfolios(
  params: PortfolioListParams = {}
): Promise<PortfolioListResponse> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    const {
      page = 1,
      limit = 10,
      sortBy = "updatedAt",
      sortOrder = "desc",
      status = "all",
      search = "",
      portfolioType = "all",
    } = params;

    // Build query filters - don't filter by slug to avoid Prisma errors
    const where: any = {
      userId: user.id,
    };

    // Status filter
    if (status === "published") {
      where.isPublished = true;
    } else if (status === "draft") {
      where.isPublished = false;
    }

    // Portfolio type filter
    if (portfolioType !== "all") {
      where.portfolioType = portfolioType;
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    try {
      // Get portfolios with pagination - exclude slug from select to avoid null issues
      const [portfolios, totalCount] = await Promise.all([
        prisma.portfolio.findMany({
          where,
          select: {
            id: true,
            name: true,
            description: true,
            thumbnail: true,
            isPublished: true,
            portfolioType: true,
            tags: true,
            views: true,
            lastViewedAt: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                components: true,
                viewsLog: true,
              },
            },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),
        prisma.portfolio.count({ where }),
      ]);

      // Get slugs separately to handle null values
      const portfolioIds = portfolios.map((p) => p.id);
      const slugData = await prisma.portfolio.findMany({
        where: { id: { in: portfolioIds } },
        select: { id: true, slug: true },
      });

      // Create a map of portfolio ID to slug
      const slugMap = new Map(slugData.map((p) => [p.id, p.slug]));

      // Filter out portfolios with null slugs and generate slugs for them
      const validPortfolios = [];
      for (const portfolio of portfolios) {
        let slug = slugMap.get(portfolio.id);

        if (!slug) {
          // Generate a slug for portfolios without one
          try {
            slug = await generateUniqueSlug(portfolio.name);
            await prisma.portfolio.update({
              where: { id: portfolio.id },
              data: { slug },
            });
          } catch (error) {
            console.error(
              `Failed to generate slug for portfolio ${portfolio.id}:`,
              error
            );
            // Skip this portfolio if we can't generate a slug
            continue;
          }
        }

        validPortfolios.push({
          ...portfolio,
          slug,
        });
      }

      return {
        portfolios: validPortfolios.map((portfolio) => ({
          id: portfolio.id,
          name: portfolio.name,
          slug: portfolio.slug,
          description: portfolio.description,
          thumbnail: portfolio.thumbnail,
          isPublic: portfolio.isPublished,
          portfolioType: portfolio.portfolioType,
          tags: portfolio.tags,
          views: portfolio.views,
          lastViewedAt: portfolio.lastViewedAt,
          createdAt: portfolio.createdAt,
          updatedAt: portfolio.updatedAt,
          stats: {
            components: portfolio._count.components,
            totalViews: portfolio._count.viewsLog,
          },
          previewUrl: `/portfolio/${portfolio.slug}`,
          editUrl: `/dashboard/portfolios/edit/${portfolio.id}`,
        })),
        pagination: {
          page,
          limit,
          totalCount: validPortfolios.length, // Use actual count of valid portfolios
          totalPages: Math.ceil(validPortfolios.length / limit),
          hasNextPage: page < Math.ceil(validPortfolios.length / limit),
          hasPrevPage: page > 1,
        },
        filters: params,
      };
    } catch (dbError) {
      console.error("Database error in listPortfolios:", dbError);

      // If there's a database error, return empty results instead of crashing
      return {
        portfolios: [],
        pagination: {
          page,
          limit,
          totalCount: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
        filters: params,
      };
    }
  } catch (error) {
    console.error("List portfolios error:", error);
    throw error;
  }
}

export async function getPortfolioStatistics(): Promise<PortfolioStatistics> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    const [
      totalPortfolios,
      publishedPortfolios,
      draftPortfolios,
      totalViews,
      recentViews,
      portfolioTypes,
      recentActivity,
      topPortfolios,
    ] = await Promise.all([
      // Total portfolios
      prisma.portfolio.count({ where: { userId: user.id } }),

      // Published portfolios
      prisma.portfolio.count({
        where: { userId: user.id, isPublished: true },
      }),

      // Draft portfolios
      prisma.portfolio.count({
        where: { userId: user.id, isPublished: false },
      }),

      // Total views
      prisma.portfolioView.count({
        where: {
          portfolio: { userId: user.id },
        },
      }),

      // Recent views (last 30 days)
      prisma.portfolioView.count({
        where: {
          portfolio: { userId: user.id },
          timestamp: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Portfolio types distribution
      prisma.portfolio.groupBy({
        by: ["portfolioType"],
        where: { userId: user.id },
        _count: { portfolioType: true },
      }),

      // Recent activity
      prisma.portfolio.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          name: true,
          slug: true,
          updatedAt: true,
          isPublished: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),

      // Top portfolios by views
      prisma.portfolio.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          name: true,
          slug: true,
          views: true,
          isPublished: true,
        },
        orderBy: { views: "desc" },
        take: 5,
      }),
    ]);

    // Calculate view growth (simplified - you can implement more sophisticated logic)
    const viewGrowth = 0; // Placeholder

    return {
      overview: {
        totalPortfolios,
        publishedPortfolios,
        draftPortfolios,
        totalViews,
        recentViews,
        viewGrowth,
      },
      portfolioTypes: portfolioTypes.map((type) => ({
        type: type.portfolioType,
        count: type._count.portfolioType,
      })),
      recentActivity: recentActivity.map((portfolio) => ({
        id: portfolio.id,
        name: portfolio.name,
        slug: portfolio.slug,
        updatedAt: portfolio.updatedAt,
        isPublished: portfolio.isPublished,
      })),
      topPortfolios: topPortfolios.map((portfolio) => ({
        id: portfolio.id,
        name: portfolio.name,
        slug: portfolio.slug,
        views: portfolio.views,
        isPublished: portfolio.isPublished,
      })),
    };
  } catch (error) {
    console.error("Get portfolio statistics error:", error);
    throw error;
  }
}

// Utility functions
export async function generateUniqueSlug(baseSlug: string): Promise<string> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    const slug = baseSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
    let counter = 1;
    let finalSlug = slug;

    while (true) {
      const existing = await prisma.portfolio.findUnique({
        where: { slug: finalSlug },
        select: { id: true, userId: true },
      });

      if (!existing || existing.userId === user.id) {
        break;
      }

      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    return finalSlug;
  } catch (error) {
    console.error("Generate unique slug error:", error);
    throw error;
  }
}

export async function duplicatePortfolio(id: string, newName: string) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // First get the original portfolio
    const original = await prisma.portfolio.findUnique({
      where: { id, userId: user.id },
      include: {
        components: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!original) {
      throw new Error("Portfolio not found");
    }

    // Create a new portfolio with the same data but different name and slug
    const newSlug = await generateUniqueSlug(`${original.slug}-copy`);

    const duplicateData: SavePortfolioData = {
      name: newName,
      slug: newSlug,
      description: original.description,
      layout: original.components.map((comp) => ({
        type: comp.type,
        variant: comp.variant,
        props: comp.props as Record<string, any>,
        styles: comp.styles as Record<string, any>,
        order: comp.order,
        isActive: comp.isActive,
      })),
      theme: original.theme as unknown as GlobalTheme,
      isPublic: false, // Always start as draft
      tags: original.tags,
      thumbnail: original.thumbnail,
      portfolioType: original.portfolioType as any,
      title: original.title,
      email: original.email,
      phone: original.phone,
      location: original.location,
      about: original.about,
      profileImage: original.profileImage,
      contactForm: original.contactForm,
      linkedinLink: original.linkedinLink,
      personalWebsite: original.personalWebsite,
      socials: original.socials as any,
      layoutType: original.layoutType,
      extraData: original.extraData as any,
    };

    const result = await savePortfolio(duplicateData);
    return result;
  } catch (error) {
    console.error("Duplicate portfolio error:", error);
    throw error;
  }
}

export async function togglePortfolioVisibility(id: string, isPublic: boolean) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Find portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { id: true, userId: true, name: true, slug: true },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Verify ownership
    if (portfolio.userId !== user.id) {
      throw new Error("Access denied");
    }

    // Update visibility
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        isPublished: isPublic,
        updatedAt: new Date(),
      },
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/portfolios");
    revalidatePath("/dashboard/my-portfolios");
    revalidatePath(`/portfolio/${portfolio.slug}`);

    return {
      success: true,
      data: {
        id: updatedPortfolio.id,
        slug: updatedPortfolio.slug,
        name: updatedPortfolio.name,
        isPublic: updatedPortfolio.isPublished,
        updatedAt: updatedPortfolio.updatedAt,
      },
      message: `Portfolio ${
        isPublic ? "published" : "unpublished"
      } successfully`,
    };
  } catch (error) {
    console.error("Toggle portfolio visibility error:", error);
    throw error;
  }
}

// Analytics functions
export async function getPortfolioAnalytics(
  id: string,
  timeRange: "7d" | "30d" | "90d" = "30d"
) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findUnique({
      where: { id, userId: user.id },
      select: { id: true, name: true },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Calculate date range
    const now = new Date();
    const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    // Get analytics data
    const [totalViews, recentViews, viewsByDay] = await Promise.all([
      // Total views
      prisma.portfolioView.count({
        where: { portfolioId: id },
      }),

      // Recent views
      prisma.portfolioView.count({
        where: {
          portfolioId: id,
          timestamp: { gte: startDate },
        },
      }),

      // Views by day
      prisma.portfolioView.groupBy({
        by: ["timestamp"],
        where: {
          portfolioId: id,
          timestamp: { gte: startDate },
        },
        _count: { timestamp: true },
      }),
    ]);

    return {
      success: true,
      data: {
        portfolioId: id,
        portfolioName: portfolio.name,
        timeRange,
        totalViews,
        recentViews,
        viewsByDay: viewsByDay.map((day) => ({
          date: day.timestamp,
          views: day._count.timestamp,
        })),
      },
    };
  } catch (error) {
    console.error("Get portfolio analytics error:", error);
    throw error;
  }
}
