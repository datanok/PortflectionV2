import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearAllPortfolios() {
  try {
    console.log("🔄 Starting portfolio cleanup...");

    // First, let's see how many portfolios we have
    const portfolioCount = await prisma.portfolio.count();
    console.log(`📊 Found ${portfolioCount} portfolios in the database`);

    if (portfolioCount === 0) {
      console.log("✅ No portfolios to delete. Database is already clean.");
      return;
    }

    // Get a list of all portfolios before deletion
    const portfolios = await prisma.portfolio.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        userId: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    console.log("\n📋 Portfolios to be deleted:");
    portfolios.forEach((portfolio, index) => {
      console.log(
        `${index + 1}. ${portfolio.name} (ID: ${portfolio.id}, Slug: ${
          portfolio.slug || "null"
        })`
      );
    });

    // Delete related data first (foreign key constraints)
    console.log("\n🗑️  Deleting related data...");

    // Delete portfolio views
    const viewsDeleted = await prisma.portfolioView.deleteMany({});
    console.log(`   ✅ Deleted ${viewsDeleted.count} portfolio views`);

    // Delete portfolio components
    const componentsDeleted = await prisma.portfolioComponent.deleteMany({});
    console.log(
      `   ✅ Deleted ${componentsDeleted.count} portfolio components`
    );

    // Finally, delete all portfolios
    console.log("\n🗑️  Deleting portfolios...");
    const portfoliosDeleted = await prisma.portfolio.deleteMany({});
    console.log(`   ✅ Deleted ${portfoliosDeleted.count} portfolios`);

    console.log("\n🎉 Portfolio cleanup completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Portfolios deleted: ${portfoliosDeleted.count}`);
    console.log(`   - Components deleted: ${componentsDeleted.count}`);
    console.log(`   - Views deleted: ${viewsDeleted.count}`);
  } catch (error) {
    console.error("❌ Error during portfolio cleanup:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
clearAllPortfolios()
  .then(() => {
    console.log("\n✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  });
