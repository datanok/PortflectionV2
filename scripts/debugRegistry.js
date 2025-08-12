const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function debugRegistry() {
  console.log('🔍 Debugging component registry...');
  
  try {
    // 1. Check database
    console.log('\n📊 DATABASE CHECK:');
    const approvedComponents = await prisma.approvedComponent.findMany({
      orderBy: { approvedAt: 'desc' }
    });
    
    console.log(`Found ${approvedComponents.length} approved components in database:`);
    approvedComponents.forEach((comp, index) => {
      console.log(`  ${index + 1}. ${comp.name} (${comp.id}) - ${comp.category}`);
    });
    
    // 2. Check files
    console.log('\n�� FILE SYSTEM CHECK:');
    const communityDir = path.join(__dirname, '../src/components/community');
    
    if (fs.existsSync(communityDir)) {
      const files = fs.readdirSync(communityDir);
      const tsxFiles = files.filter(file => file.endsWith('.tsx'));
      
      console.log(`Found ${tsxFiles.length} component files:`);
      tsxFiles.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file}`);
      });
    } else {
      console.log('❌ Community directory does not exist');
    }
    
    // 3. Test registry loading
    console.log('\n🔄 REGISTRY LOADING TEST:');
    try {
      // Import the registry functions
      const { loadComponentRegistry } = require('../src/lib/componentRegistry.ts');
      const registry = await loadComponentRegistry();
      
      console.log(`Registry loaded ${Object.keys(registry).length} components:`);
      Object.values(registry).forEach((comp, index) => {
        console.log(`  ${index + 1}. ${comp.name} (${comp.id}) - ${comp.category}`);
      });
      
    } catch (error) {
      console.error('❌ Error loading registry:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugRegistry()
  .then(() => {
    console.log('\n✨ Debug completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Debug failed:', error);
    process.exit(1);
  }); 