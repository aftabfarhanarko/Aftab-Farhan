import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Skills GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, imageUrl, categoryId } = body;

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Name and Category ID are required" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    console.error("Skill POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create skill", details: error.message },
      { status: 500 }
    );
  }
}