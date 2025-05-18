import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/authenticateUser';

export async function GET(req: NextRequest) {
  try {
    // Extract the portfolio ID from the URL
    const id = new URL(req.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing portfolio ID' }, { status: 400 });
    }

    const session = await authenticateUser(req);

  

    // Find the portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Check if the current user owns this portfolio
    if (portfolio.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return the portfolio data
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio for edit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
