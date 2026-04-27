import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      include: {
        stats: true,
        socials: true,
      },
    });
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, description, image, stats, socials } = body;

    // find first hero or create new one
    const existingHero = await prisma.hero.findFirst();

    if (existingHero) {
      // Update
      const updatedHero = await prisma.hero.update({
        where: { id: existingHero.id },
        data: {
          name,
          title,
          description,
          image,
          stats: {
            deleteMany: {},
            create: stats.map((s: any) => ({ label: s.label, value: s.value })),
          },
          socials: {
            deleteMany: {},
            create: socials.map((s: any) => ({
              platform: s.platform,
              url: s.url,
            })),
          },
        },
        include: {
          stats: true,
          socials: true,
        },
      });
      return NextResponse.json(updatedHero);
    } else {
      // Create
      const newHero = await prisma.hero.create({
        data: {
          name,
          title,
          description,
          image,
          stats: {
            create: stats.map((s: any) => ({ label: s.label, value: s.value })),
          },
          socials: {
            create: socials.map((s: any) => ({
              platform: s.platform,
              url: s.url,
            })),
          },
        },
        include: {
          stats: true,
          socials: true,
        },
      });
      return NextResponse.json(newHero);
    }
  } catch (error) {
    console.error("Hero API Error:", error);
    return NextResponse.json(
      { error: "Failed to update hero data" },
      { status: 500 },
    );
  }
}
