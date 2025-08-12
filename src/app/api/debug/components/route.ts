import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get approved components
    const approvedComponents = await prisma.approvedComponent.findMany({
      orderBy: { approvedAt: 'desc' }
    });
    
    // Get pending submissions
    const submissions = await prisma.componentSubmission.findMany({
      where: { status: 'PENDING' },
      orderBy: { submittedAt: 'desc' }
    });
    
    return NextResponse.json({
      approvedComponents: approvedComponents.map(comp => ({
        id: comp.id,
        name: comp.name,
        category: comp.category,
        authorName: comp.authorName,
        approvedAt: comp.approvedAt,
        codeLength: comp.componentCode?.length || 0
      })),
      pendingSubmissions: submissions.map(sub => ({
        id: sub.id,
        name: sub.name,
        status: sub.status,
        submittedAt: sub.submittedAt
      })),
      summary: {
        approvedCount: approvedComponents.length,
        pendingCount: submissions.length
      }
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch component data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 