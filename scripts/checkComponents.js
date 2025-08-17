const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkApprovedComponents() {
  console.log("🔍 Checking for approved components in database...");

  try {
    // Check approved components
    const approvedComponents = await prisma.approvedComponent.findMany({
      orderBy: { approvedAt: "desc" },
    });

    console.log(`📦 Found ${approvedComponents.length} approved components:`);

    approvedComponents.forEach((component, index) => {
      console.log(`\n${index + 1}. ${component.name} (${component.id})`);
      console.log(`   Category: ${component.category}`);
      console.log(`   Author: ${component.authorName}`);
      console.log(`   Approved: ${component.approvedAt.toISOString()}`);
      console.log(
        `   Code length: ${component.componentCode?.length || 0} characters`
      );
    });

    // Check component submissions
    const submissions = await prisma.componentSubmission.findMany({
      where: { status: "PENDING" },
      orderBy: { submittedAt: "desc" },
    });

    console.log(`\n📝 Found ${submissions.length} pending submissions:`);

    submissions.forEach((submission, index) => {
      console.log(`\n${index + 1}. ${submission.name} (${submission.id})`);
      console.log(`   Status: ${submission.status}`);
      console.log(`   Submitted: ${submission.submittedAt.toISOString()}`);
    });
  } catch (error) {
    console.error("❌ Error checking components:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkApprovedComponents()
  .then(() => {
    console.log("✨ Check completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Check failed:", error);
    process.exit(1);
  });
