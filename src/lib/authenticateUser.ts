import { betterFetch } from '@better-fetch/fetch';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

interface Session {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
    impersonatedBy?: string;
  };
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role: string;
    emailVerified: Date | null;
  };
}

export const authenticateUser = async (req: NextRequest): Promise<Session | null> => {
  try {
    const { data: sessionData, error } = await betterFetch<Session>('/api/auth/get-session', {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: req.headers.get('cookie') ?? '',
      },
      cache: 'force-cache',
    });

    if (error) {
      // Handle different error formats
      let errorMessage = 'Authentication error';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if ('statusText' in error && typeof error.statusText === 'string') {
          errorMessage = error.statusText;
        }
      }
      
      if (errorMessage.toLowerCase().includes('expired')) {
        console.warn('Session expired');
      } else {
        console.warn('Authentication error:', errorMessage);
      }
      return null;
    }

    if (!sessionData) {
      console.warn('No session data received');
      return null;
    }

    return sessionData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Authentication fetch failed:', error.message);
      } else {
        console.error('Unknown authentication error:', error);
      }
      return null;
    }
  };
  


/**
 * Throws an error if the portfolio doesn't exist or the user doesn't own it.
 */
export async function verifyPortfolioOwnership(portfolioId: string, userId: string) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id: portfolioId },
  });

if(!portfolio)
  throw new Error('Portfolio not found');

if(portfolio.userId !== userId)
  throw new Error('Access denied. Edit your own portfolio.');

  return portfolio;
}
