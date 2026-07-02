import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const footerHtml = `
      <div style="margin-top: 40px; padding: 40px; border-top: 1px solid #f1f5f9; background-color: #fafafa; text-align: center;">
        <div style="margin-bottom: 25px;">
          <a href="https://www.facebook.com/aftabfarhanarko.official" style="display: inline-block; margin: 0 12px; text-decoration: none;">
            <img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" width="28" height="28">
          </a>
          <a href="https://wa.me/88016134108800" style="display: inline-block; margin: 0 12px; text-decoration: none;">
            <img src="https://cdn-icons-png.flaticon.com/32/733/733585.png" alt="WhatsApp" width="28" height="28">
          </a>
          <a href="https://www.instagram.com/itz_arko.420/" style="display: inline-block; margin: 0 12px; text-decoration: none;">
            <img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" alt="Instagram" width="28" height="28">
          </a>
          <a href="https://www.linkedin.com/in/aftabfarhan/" style="display: inline-block; margin: 0 12px; text-decoration: none;">
            <img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" alt="LinkedIn" width="28" height="28">
          </a>
        </div>
        
        <div style="margin-bottom: 20px;">
          <a href="https://www.facebook.com/aftabfarhanarko.official" style="color: #64748b; text-decoration: none; font-size: 11px; margin: 0 8px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Facebook</a>
          <a href="https://wa.me/88016134108800" style="color: #64748b; text-decoration: none; font-size: 11px; margin: 0 8px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">WhatsApp</a>
          <a href="https://www.instagram.com/itz_arko.420/" style="color: #64748b; text-decoration: none; font-size: 11px; margin: 0 8px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Instagram</a>
          <a href="https://www.linkedin.com/in/aftabfarhan/" style="color: #64748b; text-decoration: none; font-size: 11px; margin: 0 8px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">LinkedIn</a>
        </div>
        
        <p style="font-size: 11px; color: #94a3b8; margin: 0; letter-spacing: 0.5px;">
          &copy; ${new Date().getFullYear()} AFTAB FARHAN ARKO. ALL RIGHTS RESERVED.
        </p>
      </div>
    `;

    const headerHtml = `
      <tr>
        <td style="padding: 40px 40px 20px 40px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <div style="font-size: 22px; font-weight: 900; color: #16a34a; letter-spacing: -0.5px; line-height: 1; text-transform: uppercase;">
                  Aftab Farhan Arko
                </div>
                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-top: 6px; letter-spacing: 2px;">
                  Full Stack Developer
                </div>
              </td>
              <td align="right" valign="top" style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                ${currentDate}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;

    // 1. Send notification to YOU (Aftab Farhan Arko)
    const adminMailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New Contact: ${subject} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f7f6">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
                  ${headerHtml}
                  <tr>
                    <td style="padding: 0 40px 40px 40px;">
                      <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 25px 0; line-height: 1.2;">
                        New Portfolio Message
                      </h1>
                      
                      <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #f1f5f9;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Sender Details</p>
                        <p style="margin: 5px 0; font-size: 16px; color: #1e293b;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 5px 0; font-size: 16px; color: #1e293b;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #16a34a; text-decoration: none; font-weight: 600;">${email}</a></p>
                        <p style="margin: 5px 0; font-size: 16px; color: #1e293b;"><strong>Subject:</strong> ${subject}</p>
                      </div>

                      <div style="padding: 25px; border-left: 5px solid #16a34a; background-color: #f0fdf4; border-radius: 4px 12px 12px 4px;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #16a34a; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Message Content</p>
                        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
                      </div>

                      <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 35px; font-style: italic;">
                        Tip: You can reply directly to this email to contact <strong>${name}</strong>.
                      </p>
                    </td>
                  </tr>
                  ${footerHtml}
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // 2. Send Auto-Reply to the SENDER
    const autoReplyOptions = {
      from: `"Aftab Farhan Arko" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Message Received! - Aftab Farhan Arko`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f7f6">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
                  ${headerHtml}
                  <tr>
                    <td style="padding: 0 40px 40px 40px;">
                      <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 20px 0; line-height: 1.2;">
                        Message Received!
                      </h1>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                        Hi <strong>${name.split(" ")[0]}</strong>,
                      </p>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                        Thank you for reaching out. I've received your message regarding <strong>"${subject}"</strong> and I'm excited to connect with you.
                      </p>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 30px 0;">
                        I'll review your inquiry and get back to you as soon as possible, usually within 24 hours.
                      </p>
                    </td>
                  </tr>
                  ${footerHtml}
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(autoReplyOptions),
      ]);
      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Contact POST Error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 },
    );
  }
}
