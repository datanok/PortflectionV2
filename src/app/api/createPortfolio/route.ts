import { NextRequest, NextResponse } from 'next/server';
import {
  developerPortfolioSchema,
  designerPortfolioSchema,
  contentCreatorPortfolioSchema,
  businessConsultingPortfolioSchema,
} from '@/lib/zod';
import prisma from '@/lib/prisma';

import {authenticateUser} from '@/lib/authenticateUser';
const portfolioSchemas: Record<string, any> = {
  developer: developerPortfolioSchema,
  designer: designerPortfolioSchema,
  contentCreator: contentCreatorPortfolioSchema,
  businessConsulting: businessConsultingPortfolioSchema,
};

// Shared function to extract common fields from validated data
const extractPortfolioData = (data: any) => {
  const {
    name,
    title,
    email,
    phone,
    location,
    about,
    profileImage,
    contactForm,
    githubLink,
    linkedinLink,
    personalWebsite,
    socials,
    theme,
    type,
    ...extraData
  } = data;

  return {
    commonFields: {
      name,
      title,
      email,
      phone,
      location,
      about,
      profileImage,
      contactForm,
      githubLink,
      linkedinLink,
      personalWebsite,
      socials,
      theme,
      type,
    },
    extraData
  };
};



// Handle POST requests (Create portfolio)
export async function POST(req: NextRequest) {
  try {
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { type = 'developer' } = body;
    
    // Validate input data
    const schema = portfolioSchemas[type] || developerPortfolioSchema;
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { commonFields, extraData } = extractPortfolioData(parsed.data);

    // Create portfolio in DB
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        ...commonFields,
        type,
        extraData,
      },
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (err) {
    console.error('Portfolio creation error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle PUT requests (Update portfolio)
export async function PUT(req: NextRequest) {
  try {
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { id, type = 'developer' } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Portfolio ID is required' }, { status: 400 });
    }
    
    // Verify ownership
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id, userId: session.user.id },
    });
    
    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found or access denied' }, { status: 404 });
    }
    
    // Validate input data
    const schema = portfolioSchemas[type] || developerPortfolioSchema;
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { commonFields, extraData } = extractPortfolioData(parsed.data);

    // Update portfolio in DB
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...commonFields,
        type,
        extraData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (err) {
    console.error('Portfolio update error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle GET request (Fetch portfolios)
export async function GET(req: NextRequest) {
  try {
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    // If ID is provided, fetch specific portfolio
    if (id) {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id, userId: session.user.id },
      });
      
      if (!portfolio) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }
      
      return NextResponse.json({ portfolio });
    }
    
    // Otherwise, fetch all user portfolios
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

// Handle DELETE request
export async function DELETE(req: NextRequest) {
  try {
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Portfolio ID is required' }, { status: 400 });
    }
    
    // Verify ownership before deletion
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id, userId: session.user.id },
    });
    
    if (!existingPortfolio) {
      return NextResponse.json({ error: 'Portfolio not found or access denied' }, { status: 404 });
    }
    
    // Delete the portfolio
    await prisma.portfolio.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Portfolio deletion error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}