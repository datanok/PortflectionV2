import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "popular";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = (page - 1) * limit;

    // Build where clause for approved components
    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    // Build order by clause
    let orderBy: any = {};
    switch (sort) {
      case "popular":
        orderBy = { downloads: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "recent":
        orderBy = { approvedAt: "desc" };
        break;
      case "downloads":
        orderBy = { downloads: "desc" };
        break;
      default:
        orderBy = { downloads: "desc" };
    }

    // Get approved components
    const components = await prisma.approvedComponent.findMany({
      orderBy: {
        downloads: "desc",
      },
      skip: 0,
      take: 12,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        tags: true,
        thumbnail: true,
        demoUrl: true,
        documentationUrl: true,
        githubUrl: true,
        version: true,
        isPremium: true,
        price: true,
        downloads: true,
        rating: true,
        reviews: true,
        compatibility: true,
        dependencies: true,
        approvedAt: true,
        componentCode: true, // Add this line to include componentCode
        authorName: true,
        authorEmail: true,
        authorGithub: true,
      },
    });

    // Get total count
    const total = await prisma.approvedComponent.count({ where });

    // Get user's installed components if authenticated
    let installedComponents: string[] = [];
    let userInstallations: any[] = [];
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      if (session?.user) {
        userInstallations = await prisma.componentInstallation.findMany({
          where: { userId: session.user.id },
          select: { componentId: true },
        });
        installedComponents = userInstallations.map((inst) => inst.componentId);
      }
    } catch (error) {
      // User not authenticated, continue without installations
    }

    // Add installation status to components
    const componentsWithInstallStatus = components.map((component) => ({
      ...component,
      isInstalled: installedComponents.includes(component.id),
      isMarketplace: true, // Add this flag for all marketplace components
    }));

    // If requesting installed components only, fetch full component data
    let installedComponentsData: any[] = [];
    if (searchParams.get("installed") === "true") {
      const installedComponentIds = userInstallations.map(
        (inst) => inst.componentId
      );
      installedComponentsData = await prisma.approvedComponent.findMany({
        where: {
          id: { in: installedComponentIds },
        },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          tags: true,
          thumbnail: true,
          demoUrl: true,
          documentationUrl: true,
          githubUrl: true,
          version: true,
          isPremium: true,
          price: true,
          downloads: true,
          rating: true,
          reviews: true,
          compatibility: true,
          dependencies: true,
          approvedAt: true,
          componentCode: true, // Include the actual component code
          authorName: true,
          authorEmail: true,
          authorGithub: true,
        },
      });
    }

    return NextResponse.json({
      components: componentsWithInstallStatus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      installedComponentsData,
    });
  } catch (error) {
    console.error("Marketplace fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch marketplace components" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { componentId, action } = body;

    if (!componentId || !action) {
      return NextResponse.json(
        { error: "Component ID and action are required" },
        { status: 400 }
      );
    }

    // Verify component exists and is approved
    const component = await prisma.approvedComponent.findUnique({
      where: { id: componentId },
    });

    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    if (action === "install") {
      // Check if already installed
      const existingInstallation =
        await prisma.componentInstallation.findUnique({
          where: {
            userId_componentId: {
              userId: session.user.id,
              componentId,
            },
          },
        });

      if (existingInstallation) {
        return NextResponse.json(
          { error: "Component already installed" },
          { status: 400 }
        );
      }

      // Create installation record
      await prisma.componentInstallation.create({
        data: {
          userId: session.user.id,
          componentId,
          installedAt: new Date(),
        },
      });

      // Increment download count
      await prisma.approvedComponent.update({
        where: { id: componentId },
        data: {
          downloads: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Component installed successfully",
      });
    } else if (action === "uninstall") {
      // Remove installation record
      await prisma.componentInstallation.deleteMany({
        where: {
          userId: session.user.id,
          componentId,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Component uninstalled successfully",
      });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Component installation error:", error);
    return NextResponse.json(
      { error: "Failed to process installation" },
      { status: 500 }
    );
  }
}
