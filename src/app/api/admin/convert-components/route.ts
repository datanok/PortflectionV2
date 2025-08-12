import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { convertApprovedComponents } from '@/scripts/convertApprovedComponents';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Run the conversion
    await convertApprovedComponents();

    return NextResponse.json({
      success: true,
      message: 'Components converted successfully'
    });

  } catch (error) {
    console.error('Component conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert components' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 