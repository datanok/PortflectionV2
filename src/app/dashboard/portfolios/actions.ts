"use server";

import prisma from "@/lib/prisma";

import { headers } from "next/headers";
import { auth } from "../../../../auth";
import { verifyPortfolioOwnership } from "@/lib/authenticateUser";

/**
 * Delete a portfolio by ID, verifying user ownership.
 * Throws on error or unauthorized.
 */
export async function deletePortfolioAction(id: string) {
  if (!id) {
    throw new Error("Portfolio ID is required");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  await verifyPortfolioOwnership(id, session.user.id);

  // Verify ownership before deletion
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { id, userId: session.user.id },
  });
  if (!existingPortfolio) {
    throw new Error("Portfolio not found or access denied");
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
  if (!session?.user?.id) throw new Error("Unauthorized");
  const { portfolioType = "developer", ...body } = data;

  // Split scalar and extra fields
  const scalarFields = [
    "name",
    "title",
    "email",
    "phone",
    "location",
    "about",
    "profileImage",
    "contactForm",
    "githubLink",
    "linkedinLink",
    "personalWebsite",
    "socials",
    "theme",
    "portfolioType",
  ];
  const prismaData: Record<string, any> = {
    userId: session.user.id,
    portfolioType,
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
  });

  if (!session?.user?.id) throw new Error("Unauthorized");
  const { id, portfolioType = "developer", ...body } = data;

  if (!id) throw new Error("Portfolio ID is required");
  await verifyPortfolioOwnership(id, session.user.id);


  // Verify ownership
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { id, userId: session.user.id },
  });
  if (!existingPortfolio)
    throw new Error("Portfolio not found or access denied");
  // Split scalar and extra fields
  const scalarFields = [
    "name",
    "title",
    "email",
    "phone",
    "location",
    "about",
    "profileImage",
    "contactForm",
    "githubLink",
    "linkedinLink",
    "personalWebsite",
    "socials",
    "theme",
    "portfolioType",
  ];
  const prismaData: Record<string, any> = { portfolioType, updatedAt: new Date() };
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

/**
 * Publish a portfolio (server action)
 */
export async function publishPortfolioAction(portfolioId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Unauthorized");

  if (!portfolioId) throw new Error("Portfolio ID is required");

  // Verify ownership
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { id: portfolioId, userId: session.user.id },
  });

  if (!existingPortfolio)
    throw new Error("Portfolio not found or access denied");

  const updatedPortfolio = await prisma.portfolio.update({
    where: { id: portfolioId },
    data: {
      isPublished: true,
      updatedAt: new Date(),
    },
  });

  return updatedPortfolio;
}
