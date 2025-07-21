import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupNullSlugs() {
  try {
    console.log("🔍 Finding portfolios with null slugs...");

    // Get all portfolios and filter for null slugs in JavaScript
    const allPortfolios = await prisma.portfolio.findMany({
      select: { id: true, name: true, userId: true, slug: true },
    });

    const portfoliosWithNullSlugs = allPortfolios.filter(
      (p) => p.slug === null
    );

    console.log(
      `Found ${portfoliosWithNullSlugs.length} portfolios with null slugs`
    );

    if (portfoliosWithNullSlugs.length === 0) {
      console.log("✅ No portfolios with null slugs found");
      return;
    }

    // Update each portfolio with a generated slug
    for (const portfolio of portfoliosWithNullSlugs) {
      const newSlug = generateSlug(portfolio.name);

      // Check if slug already exists
      let finalSlug = newSlug;
      let counter = 1;

      while (true) {
        const existing = await prisma.portfolio.findUnique({
          where: { slug: finalSlug },
          select: { id: true },
        });

        if (!existing || existing.id === portfolio.id) {
          break;
        }

        finalSlug = `${newSlug}-${counter}`;
        counter++;
      }

      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { slug: finalSlug },
      });

      console.log(
        `✅ Updated portfolio ${portfolio.id} (${portfolio.name}) with slug: ${finalSlug}`
      );
    }

    console.log("🎉 Cleanup completed successfully!");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

function generateSlug(name) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "untitled-portfolio"
  );
}

// Run the cleanup
cleanupNullSlugs();
