import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    console.error("About GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      roleTag,
      roleDescription,
      introParagraphs,
      clientFocusedText,
      stats,
      frontendSkills,
      backendSkills,
      tools,
      projects,
      quoteText,
      quoteAuthor,
      mentorTitle,
      mentorDescription,
    } = body;

    const existingAbout = await prisma.about.findFirst();

    if (existingAbout) {
      // Update
      const updatedAbout = await prisma.about.update({
        where: { id: existingAbout.id },
        data: {
          fullName,
          roleTag,
          roleDescription,
          introParagraphs,
          clientFocusedText,
          stats,
          frontendSkills,
          backendSkills,
          tools,
          projects,
          quoteText,
          quoteAuthor,
          mentorTitle,
          mentorDescription,
        },
      });
      return NextResponse.json(updatedAbout);
    } else {
      // Create
      const newAbout = await prisma.about.create({
        data: {
          fullName,
          roleTag,
          roleDescription,
          introParagraphs,
          clientFocusedText,
          stats,
          frontendSkills,
          backendSkills,
          tools,
          projects,
          quoteText,
          quoteAuthor,
          mentorTitle,
          mentorDescription,
        },
      });
      return NextResponse.json(newAbout);
    }
  } catch (error) {
    console.error("About POST Error:", error);
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 },
    );
  }
}
