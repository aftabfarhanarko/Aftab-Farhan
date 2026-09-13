import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const achievement = await prisma.portfolioAchievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(achievement);
  } catch (error: any) {
    console.error("Single Achievement GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievement details", details: error.message },
      { status: 500 }
    );
  }
}
