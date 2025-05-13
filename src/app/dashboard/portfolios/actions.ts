"use server";

import prisma from '@/lib/prisma';

import { headers } from "next/headers";
import { auth } from '../../../../auth';

/**
 * Delete a portfolio by ID, verifying user ownership.
 * Throws on error or unauthorized.
 */
export async function deletePortfolioAction(id: string) {
  if (!id) {
    throw new Error('Portfolio ID is required');
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Verify ownership before deletion
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { id, userId: session.user.id },
  });
  if (!existingPortfolio) {
    throw new Error('Portfolio not found or access denied');
  }

  await prisma.portfolio.delete({
    where: { id },
  });

  return { success: true };
}

/**
 * Create a portfolio (server action)
 */
export async function createPortfolioAction(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error('Unauthorized');
  const { type = 'developer', ...body } = data;

  // Split scalar and extra fields
  const scalarFields = [
    'name','title','email','phone','location','about','profileImage','contactForm',
    'githubLink','linkedinLink','personalWebsite','socials','theme','type'
  ];
  const prismaData: Record<string, any> = {
    userId: session.user.id,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const extraData: Record<string, any> = {};
  for (const key in body) {
    if (scalarFields.includes(key)) {
      prismaData[key] = body[key];
    } else {
      extraData[key] = body[key];
    }
  }
  prismaData.extraData = extraData;

  const portfolio = await prisma.portfolio.create({
    data: prismaData,
  });
  return portfolio;
}

/**
 * Update a portfolio (server action)
 */
export async function updatePortfolioAction(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user?.id) throw new Error('Unauthorized');
  const { id, type = 'developer', ...body } = data;
  if (!id) throw new Error('Portfolio ID is required');
  // Verify ownership
  const existingPortfolio = await prisma.portfolio.findUnique({ where: { id, userId: session.user.id } });
  if (!existingPortfolio) throw new Error('Portfolio not found or access denied');
  // Split scalar and extra fields
  const scalarFields = [
    'name','title','email','phone','location','about','profileImage','contactForm',
    'githubLink','linkedinLink','personalWebsite','socials','theme','type'
  ];
  const prismaData: Record<string, any> = { type, updatedAt: new Date() };
  const extraData: Record<string, any> = {};
  for (const key in body) {
    if (scalarFields.includes(key)) {
      prismaData[key] = body[key];
    } else {
      extraData[key] = body[key];
    }
  }
  prismaData.extraData = extraData;
  const portfolio = await prisma.portfolio.update({
    where: { id },
    data: prismaData,
  });
  return portfolio;
}
