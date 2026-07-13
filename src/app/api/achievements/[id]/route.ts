import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { image, title, name, issuer, description } = body;

    const updatedAchievement = await prisma.portfolioAchievement.update({
      where: { id },
      data: {
        image,
        title,
        name,
        issuer,
        description,
      },
    });

    return NextResponse.json(updatedAchievement);
  } catch (error: any) {
    console.error("Achievements PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update achievement", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.portfolioAchievement.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Achievement deleted successfully" });
  } catch (error: any) {
    console.error("Achievements DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement", details: error.message },
      { status: 500 }
    );
  }
}
