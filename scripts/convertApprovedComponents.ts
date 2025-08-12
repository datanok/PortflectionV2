#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';
import { writeComponentFile, generateComponentFile, deleteComponentFile } from '../src/lib/componentCodeGenerator';
import { loadComponentRegistry } from '../src/lib/componentRegistry';

const prisma = new PrismaClient();

async function convertApprovedComponents() {
  console.log('🔄 Starting conversion of approved components to .tsx files...');
  
  try {
    // Get all approved components
    const approvedComponents = await prisma.approvedComponent.findMany({
      orderBy: { approvedAt: 'desc' }
    });
    
    console.log(`📦 Found ${approvedComponents.length} approved components`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const component of approvedComponents) {
      try {
        console.log(`\n🔄 Processing: ${component.name} (${component.id})`);
        
        // Generate the component file
        const generatedFile = generateComponentFile(component);
        
        // Write to disk
        await writeComponentFile(generatedFile);
        
        console.log(`✅ Successfully created: ${generatedFile.filePath}`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${component.name}:`, error);
        errorCount++;
      }
    }
    
    console.log(`\n🎉 Conversion complete!`);
    console.log(`✅ Successfully converted: ${successCount} components`);
    console.log(`❌ Errors: ${errorCount} components`);
    
    // Load and display the registry
    const registry = await loadComponentRegistry();
    console.log(`\n�� Component Registry:`);
    Object.values(registry).forEach(comp => {
      console.log(`  - ${comp.name} (${comp.category}) -> ${comp.filePath}`);
    });
    
  } catch (error) {
    console.error('�� Fatal error during conversion:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the conversion
if (require.main === module) {
  convertApprovedComponents()
    .then(() => {
      console.log('✨ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

export { convertApprovedComponents }; 