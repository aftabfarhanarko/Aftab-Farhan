import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessions = await prisma.chatSession.findMany({
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Calculate simple stats
    const totalSessions = sessions.length;
    const totalMessages = sessions.reduce((sum: number, s) => sum + s.messages.length, 0);
    const avgMessagesPerSession = totalSessions > 0 ? (totalMessages / totalSessions).toFixed(1) : "0";

    return NextResponse.json({
      sessions,
      stats: {
        totalSessions,
        totalMessages,
        avgMessagesPerSession,
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch chat sessions:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      await prisma.chatSession.delete({
        where: { id },
      });
      return NextResponse.json({ success: true, message: `Session ${id} deleted.` });
    } else {
      await prisma.chatSession.deleteMany({});
      return NextResponse.json({ success: true, message: "All chat sessions deleted." });
    }
  } catch (error: any) {
    console.error("Failed to delete chat session(s):", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
