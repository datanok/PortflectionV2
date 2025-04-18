
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
   
  
      // Otherwise, require authentication for private access
      const session = await authenticateUser(req);
      if (!session || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const id = session.user.id
  
      if (id) {
        const portfolio = await prisma.portfolio.findMany({
          where: { userId: session.user.id },
        });
        if (!portfolio) {
          return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
        }
        return NextResponse.json({ portfolio });
      }
  
      const portfolios = await prisma.portfolio.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
      });
  
      return NextResponse.json({ portfolios });
    } catch (err) {
      console.error('Portfolio fetch error:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }