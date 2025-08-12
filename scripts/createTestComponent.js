const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestComponent() {
  console.log('🔧 Creating test component...');
  
  try {
    // Create a test approved component
    const testComponent = await prisma.approvedComponent.create({
      data: {
        name: "TestHero",
        description: "A test hero component for testing the system",
        category: "hero",
        tags: ["test", "hero", "responsive"],
        componentCode: `
interface TestHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export default function TestHero({
  title = "Welcome to My Portfolio",
  subtitle = "This is a test component",
  ctaText = "Get Started"
}: TestHeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-300">
          {ctaText}
        </button>
      </div>
    </div>
  );
}`,
        version: "1.0.0",
        isPremium: false,
        compatibility: ["React 18+", "TypeScript"],
        dependencies: [],
        authorName: "Test Author",
        authorEmail: "test@example.com",
        downloads: 0,
        rating: 0,
        reviewCount: 0,
        approvedBy: "test-admin", // You'll need to replace this with an actual user ID
        originalSubmission: "test-submission", // You'll need to replace this with an actual submission ID
      },
    });
    
    console.log('✅ Test component created:', testComponent.id);
    console.log('Component details:', {
      name: testComponent.name,
      category: testComponent.category,
      approvedAt: testComponent.approvedAt
    });
    
  } catch (error) {
    console.error('❌ Error creating test component:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the creation
createTestComponent()
  .then(() => {
    console.log('✨ Test component creation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Test component creation failed:', error);
    process.exit(1);
  });