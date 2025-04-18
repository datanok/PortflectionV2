import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCountryFromIP } from "@/lib/ip-utils"; // ← new import

export async function POST(req: NextRequest) {
  try {
    const { id, userId } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing portfolio ID" }, { status: 400 });
    }

    // Bot filtering
    const userAgent = req.headers.get("user-agent") || "";
    const botPattern = /bot|crawl|spider|slurp|bing|duckduck|baidu|yandex|sogou|exabot|facebot|ia_archiver/i;
    const isBot = botPattern.test(userAgent);
    if (isBot) {
      return NextResponse.json({ success: false, reason: "Bot detected" });
    }

    // Owner exclusion
    if (userId) {
      const portfolio = await prisma.portfolio.findUnique({ where: { id } });
      if (portfolio && portfolio.userId === userId) {
        return NextResponse.json({ success: false, reason: "Owner view" });
      }
    }

    // Get IP address
    let ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || null;
    if (ip && ip.startsWith("::ffff:")) ip = ip.substring(7); // IPv4-mapped IPv6

    // Get country from IP using IP2Location
    const country = ip ? getCountryFromIP(ip) : null;

    const referrer = req.headers.get("referer") || null;

    // Save the view
    await prisma.portfolioView.create({
      data: {
        portfolioId: id,
        ip,
        country,
        referrer,
        userAgent,
        isBot,
      },
    });

    // Increment the view count
    await prisma.portfolio.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error incrementing portfolio view:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
