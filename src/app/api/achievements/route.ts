import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const achievements = await prisma.portfolioAchievement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Achievements GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { image, title, name, description } = body;

    if (!image || !title || !name || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const achievement = await prisma.portfolioAchievement.create({
      data: {
        image,
        title,
        name,
        description,
      },
    });

    return NextResponse.json(achievement, { status: 201 });
  } catch (error: any) {
    console.error("Achievements POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create achievement", details: error.message },
      { status: 500 }
    );
  }
}
