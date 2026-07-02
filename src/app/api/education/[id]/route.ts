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
    const {
      degree,
      field,
      institution,
      shortName,
      location,
      period,
      grade,
    } = body;

    const updatedEducation = await prisma.education.update({
      where: { id },
      data: {
        degree,
        field,
        institution,
        shortName,
        location,
        period,
        grade,
      },
    });

    return NextResponse.json(updatedEducation);
  } catch (error: any) {
    console.error("Education PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update education", details: error.message },
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
    await prisma.education.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error: any) {
    console.error("Education DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete education", details: error.message },
      { status: 500 }
    );
  }
}
