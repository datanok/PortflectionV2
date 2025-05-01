// Optimized GET API endpoint
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { betterFetch } from '@better-fetch/fetch';
import { Session } from '../../../../auth';

// Authentication middleware
const authenticateUser = async (req: NextRequest): Promise<Session | null> => {
  try {
    const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
      // Add caching to avoid repeated auth calls
      cache: 'force-cache', 
      next: { revalidate: 60 } // Revalidate session every minute
    });
    
    return session;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get query parameters
    const url = new URL(req.url);
    const detailView = url.searchParams.get('detail') === 'true';
    
    if (detailView) {
      // If detail view is requested, return full portfolio data
      const portfolios = await prisma.portfolio.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
      });
      
      return NextResponse.json({ portfolios });
    } else {
      // For list view, only return essential data
      const portfoliosList = await prisma.portfolio.findMany({
        where: { userId: session.user.id },
        select: {
          id: true,
          title: true,
          type: true,
          updatedAt: true,
          // Add any other minimal fields needed for list view
        },
        orderBy: { updatedAt: 'desc' },
      });
      
      return NextResponse.json({ portfolios: portfoliosList });
    }
  } catch (err) {
    console.error('Portfolio fetch error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}