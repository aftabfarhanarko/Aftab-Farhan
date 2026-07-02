import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("Education GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch education data" },
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
    const {
      degree,
      field,
      institution,
      shortName,
      location,
      period,
      grade,
    } = body;

    if (!degree || !field || !institution || !location || !period) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const education = await prisma.education.create({
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

    return NextResponse.json(education, { status: 201 });
  } catch (error: any) {
    console.error("Education POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create education", details: error.message },
      { status: 500 }
    );
  }
}
