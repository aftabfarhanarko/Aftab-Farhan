import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId: reqSessionId, userName: reqUserName } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    // Try to get authenticated session user if present
    const session = await auth();
    const user = session?.user;

    // Determine current user/session context
    let sessionId = reqSessionId;
    let userName = reqUserName || (user?.name) || "Visitor";
    let chatSession;

    if (sessionId) {
      chatSession = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });
    }

    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          userName,
          userId: user?.id || null,
        },
      });
      sessionId = chatSession.id;
    }

    // Save the last user message to the database
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && (lastUserMessage.role === "user" || lastUserMessage.role === "client")) {
      await prisma.chatMessage.create({
        data: {
          sessionId,
          role: "user",
          content: lastUserMessage.text || lastUserMessage.content || "",
        },
      });
    }

    // 1. Fetch live portfolio data from DB to build fresh context
    const [hero, about, education, experiences, projects, skills] = await Promise.all([
      prisma.hero.findFirst({
        include: { socials: true, stats: true }
      }),
      prisma.about.findFirst(),
      prisma.education.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.experience.findMany({
        include: { roles: true, achievements: true },
        orderBy: { createdAt: "desc" }
      }),
      prisma.project.findMany({
        include: { tech: { include: { tech: true } } },
        orderBy: { createdAt: "desc" }
      }),
      prisma.skillCategory.findMany({
        include: { skills: true },
        orderBy: { createdAt: "asc" }
      })
    ]);

    // Define fallback profile information in case database is empty
    const fallbackHero = {
      name: "Aftab Farhan Arko",
      title: "Junior Full Stack Developer",
      description: "Building responsive, modern, and high-fidelity web applications with React, Next.js, Node.js, and PostgreSQL. Specializing in AI stack integrations and database-driven solutions.",
      stats: ["2+ Years Experience", "20+ Projects Completed", "10+ AI Tools Integrated"],
      socials: [
        "GitHub: https://github.com/aftabfarhanarko",
        "LinkedIn: https://linkedin.com/in/aftabfarhanarko",
        "Email: arko@nexovasoft.com"
      ]
    };

    const fallbackAbout = {
      fullName: "Aftab Farhan Arko",
      roleTag: "Full Stack Software Developer",
      roleDescription: "I build fast, secure, and interactive applications utilizing Next.js (App Router), Node.js, Prisma ORM, and PostgreSQL. I have a strong passion for integrating AI systems (DeepSeek, Windsurf, Cursor, Antigravity) into modern dev cycles.",
      introParagraphs: [
        "I am a developer based in Dhaka, Bangladesh, specialized in building full-stack web applications and modernizing legacy portals into high-fidelity glassmorphic designs.",
        "Over the past couple of years, I have worked on web architectures, relational database optimization, and implementing secure role-based administrative dashboards."
      ],
      clientFocusedText: "Providing robust, scalable code solutions, secure backend rest APIs, and smooth UI/UX with Framer Motion.",
      stats: { "Projects": "20+", "Experience": "2+ Years", "Client Satisfaction": "100%" },
      quoteText: "The best way to predict the future is to build it."
    };

    const fallbackExperiences = [
      {
        company: "NexovaSoft",
        location: "Dhaka, Bangladesh",
        period: "2024 - Present",
        type: "Full-Time",
        techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "Prisma", "PostgreSQL"],
        roles: [
          {
            title: "Full Stack Developer",
            subtitle: "Web Engineering & AI Systems Integration",
            responsibilities: [
              "Lead development of complex Next.js App Router applications, integrating Postgres databases with Prisma ORM.",
              "Implemented NextAuth authorization and session validations to lock down secure admin routes.",
              "Integrated AI coding workflows, shortening boilerplate setup and code audit times by 40%."
            ]
          }
        ],
        achievements: ["API Latency: Reduced by 30%", "Code Audit Speed: Improved 2x"]
      }
    ];

    const fallbackProjects = [
      {
        title: "Personal Portfolio & AI Assistant",
        tagline: "Glassmorphic AI-native Developer Portfolio",
        description: "A state-of-the-art developer portfolio designed with a sleek dark-mode glassmorphic theme. It features an interactive AI stack workflow timeline, a real-time AI Chatbot connected directly to PostgreSQL, and an administrative dashboard to manage content.",
        demoLink: "https://aftabfarhan.com",
        githubLink: "https://github.com/aftabfarhanarko/Aftab-Farhan",
        tech: ["Next.js", "React", "Prisma", "PostgreSQL", "Framer Motion", "OpenRouter AI"],
        year: "2026",
        projectType: "Full-Stack",
        client: "Personal"
      },
      {
        title: "Rajseba Services Marketplace",
        tagline: "Premium Home Service Marketplace in Bangladesh",
        description: "A comprehensive service platform featuring registration workflows, division/district-based service allocations, SMS OTP verification, and booking track timelines for clients, vendors, and agents.",
        demoLink: "https://rajseba.com",
        githubLink: null,
        tech: ["Next.js", "Node.js", "PostgreSQL", "Express", "Prisma", "Twilio SMS"],
        year: "2025",
        projectType: "Web App",
        client: "Rajseba"
      }
    ];

    const fallbackSkills = [
      {
        categoryName: "Frontend Development",
        skills: ["React.js", "Next.js (App Router)", "TypeScript", "TailwindCSS", "Framer Motion", "HTML5/CSS3"]
      },
      {
        categoryName: "Backend & Databases",
        skills: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Neon DB", "NextAuth v5", "RESTful APIs"]
      },
      {
        categoryName: "AI Coding Stack",
        skills: ["Google Antigravity", "Cursor AI", "DeepSeek", "Grok", "Trae", "Windsurf IDE"]
      }
    ];

    const fallbackEducation = [
      {
        degree: "Bachelor of Science in Computer Science & Engineering",
        field: "Computer Science & Engineering",
        institution: "Dhaka International University",
        shortName: "DIU",
        location: "Dhaka, Bangladesh",
        period: "2020 - 2024",
        grade: "CGPA: 3.75"
      }
    ];

    // 2. Build system instructions with database-sourced context
    const userContextPrompt = user ? `
Current Logged-in Admin/User Info:
- Name: ${user.name}
- Email: ${user.email}
Greet them politely by name ("${user.name}") if appropriate.
` : "";

    const timePrompt = `
Current Real-Time Info:
- Date & Time (Bangladesh Timezone): ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}
`;

    const systemPrompt = `You are the official AI Portfolio Assistant of Aftab Farhan Arko, a top-tier Full-Stack Developer.
Your role is to represent Arko professionally to recruiters, clients, and portfolio visitors. You should answer questions about his skills, projects, experience, education, and services accurately using the live verified data provided below.

Here is Arko's verified database information:

1. HERO PROFILE:
${hero ? JSON.stringify({
  name: hero.name,
  title: hero.title,
  description: hero.description,
  stats: hero.stats.map((s: any) => `${s.value} ${s.label}`),
  socials: hero.socials.map((s: any) => `${s.platform}: ${s.url}`)
}, null, 2) : JSON.stringify(fallbackHero, null, 2)}

2. ABOUT / BIO:
${about ? JSON.stringify({
  fullName: about.fullName,
  roleTag: about.roleTag,
  roleDescription: about.roleDescription,
  introParagraphs: about.introParagraphs,
  clientFocusedText: about.clientFocusedText,
  stats: about.stats,
  quoteText: about.quoteText
}, null, 2) : JSON.stringify(fallbackAbout, null, 2)}

3. PROFESSIONAL EXPERIENCE:
${experiences.length > 0 ? JSON.stringify(experiences.map((exp: any) => ({
  company: exp.company,
  location: exp.location,
  period: exp.period,
  type: exp.type,
  techStack: exp.techStack,
  roles: exp.roles.map((r: any) => ({
    title: r.title,
    subtitle: r.subtitle,
    responsibilities: r.responsibilities
  })),
  achievements: exp.achievements.map((a: any) => `${a.metric}: ${a.label}`)
})), null, 2) : JSON.stringify(fallbackExperiences, null, 2)}

4. PROJECTS BUILT:
${projects.length > 0 ? JSON.stringify(projects.map((proj: any) => ({
  title: proj.title,
  tagline: proj.tagline,
  description: proj.description,
  demoLink: proj.demoLink,
  githubLink: proj.githubLink,
  tech: proj.tech.map((pt: any) => pt.tech.name),
  year: proj.year,
  projectType: proj.projectType,
  client: proj.client
})), null, 2) : JSON.stringify(fallbackProjects, null, 2)}

5. TECHNICAL SKILLS:
${skills.length > 0 ? JSON.stringify(skills.map((cat: any) => ({
  categoryName: cat.title,
  skills: cat.skills.map((s: any) => s.name)
})), null, 2) : JSON.stringify(fallbackSkills, null, 2)}

6. EDUCATION:
${education.length > 0 ? JSON.stringify(education.map((edu: any) => ({
  degree: edu.degree,
  field: edu.field,
  institution: edu.institution,
  shortName: edu.shortName,
  location: edu.location,
  period: edu.period,
  grade: edu.grade
})), null, 2) : JSON.stringify(fallbackEducation, null, 2)}

7. AI WORKFLOW & TECH STACK:
Arko operates a state-of-the-art AI-Native workflow comprising 6 stages:
1. System Architecture: Powered by DeepSeek AI (database modeling & SQL optimization).
2. Agentic Boilerplate: Powered by Windsurf IDE (autonomous workspace scaffolding).
3. Rapid Frontend layouts: Powered by Cursor AI (rapid Next.js and Tailwind components).
4. Trace Debugging: Powered by Grok AI (server log trace and environment configuration troubleshooting).
5. Agentic Code Refactoring: Powered by Google Antigravity (automated route hardening, NextAuth protection, lints & tests).
6. Final Build Validation: Powered by ByteDance Trae (compilation checks and routing stability).

INSTRUCTIONS:
1. LANGUAGE RULE: You must detect the language used by the visitor. If they ask, greet, or comment in English, you MUST respond in fluent English. If they speak or greet in Bengali (including Bangla written in English letters/Banglish, e.g., 'kemon acho', 'kaj kemon hoy', 'projects gular details bolo'), you MUST respond in fluent, natural Bengali (Bangla). Always match the user's language exactly.
2. If asked about contact info, tell them they can send a message directly using the Contact Form on the Home page or reach out via socials.
3. Refuse to answer questions completely unrelated to Arko's professional work or portfolio.
4. Greet visitors warmly and help them understand Arko's skills, qualifications, and project achievements.
5. PROJECT DETAILS: When visitors ask about Arko's projects, ALWAYS provide complete, detailed, and highly professional descriptions. Include the title, tagline, description, tech stack, client name, year, and formatted demo/github links (e.g. '[Live Demo](url)' or '[GitHub Repository](url)'). Do not summarize or hide information; explain Arko's project contributions with high fidelity.
6. CRITICAL SECURITY - DASHBOARD RESTRICTIONS: If a user asks about the administrative dashboard, superadmin capabilities, database structures, login/register credentials, dashboard management screens, or any backend admin configs, you MUST strictly refuse to answer. Respond with: 'I am not authorized to share information regarding the administrative dashboard.' in English or 'আমি ড্যাশবোর্ড বা প্রশাসনিক তথ্য শেয়ার করতে অনুমোদিত নই।' in Bengali. Do not disclose any details, statistics, or metadata about the dashboard.
${userContextPrompt}
${timePrompt}
`;

    // 3. Retrieve API Key from environment variables
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

    if (!openrouterKey || openrouterKey.includes("YOUR_FREE_GEMINI_API_KEY_HERE")) {
      console.warn("OpenRouter/Gemini API key is not configured.");
      const defaultReply = "Hello! I am Arko's AI Portfolio Assistant. Currently, my AI brain is not fully set up by the administrator. However, you can browse through my projects and skills on this page!";

      // Save default reply to DB
      await prisma.chatMessage.create({
        data: {
          sessionId,
          role: "assistant",
          content: defaultReply,
        },
      });

      return NextResponse.json({ reply: defaultReply, sessionId });
    }

    // 4. Format message history for OpenRouter (OpenAI chat/completions format)
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === "user" || m.role === "client" ? "user" : "assistant",
        content: m.text || m.content || "",
      }))
    ];

    // 5. Call OpenRouter API using google/gemini-2.5-flash as the primary fast/cheap model
    const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";

    let response = await fetch(openrouterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterKey}`,
        "X-Title": "Arko Portfolio Assistant",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: formattedMessages,
        temperature: 0.7,
      }),
    });

    // If Google Gemini fails or is rate-limited on OpenRouter, fallback to openai/gpt-4o-mini
    if (!response.ok) {
      console.warn("OpenRouter Gemini-2.5-flash call failed, trying fallback openai/gpt-4o-mini...");
      response = await fetch(openrouterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openrouterKey}`,
          "X-Title": "Arko Portfolio Assistant",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API returned error:", errorData);
      throw new Error("OpenRouter API calls failed");
    }

    const data = await response.json();
    const replyText =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process that. Please try again or reach out to Arko directly through the contact form.";

    // Save AI response to DB
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "assistant",
        content: replyText,
      },
    });

    return NextResponse.json({ reply: replyText, sessionId });
  } catch (error: any) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
