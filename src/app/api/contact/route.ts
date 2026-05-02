import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Email logic
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

    // 1. Send notification to YOU (Aftab Farhan Arko)
    const adminMailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New Contact: ${subject} from ${name}`,
      text: `You have a new message from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #16a34a; margin-top: 0;">New Portfolio Message</h2>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #16a34a;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="padding: 15px; border-left: 4px solid #16a34a; background-color: #f0fdf4; margin-bottom: 20px;">
            <p style="margin: 0; font-style: italic; color: #334155;">"${message}"</p>
          </div>
          <p style="font-size: 12px; color: #64748b; text-align: center; margin-top: 30px;">
            Tip: You can reply directly to this email to contact <strong>${name}</strong>.
          </p>
        </div>
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
        <head>
          <style>
            .social-icon {
              display: inline-block;
              width: 32px;
              height: 32px;
              margin: 0 8px;
              text-decoration: none;
            }
            .footer-link {
              color: #64748b;
              text-decoration: none;
              font-size: 12px;
              margin: 0 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f7f6">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div style="font-size: 20px; font-weight: 800; color: #16a34a; letter-spacing: -0.5px; line-height: 1;">
                              Aftab Farhan Arko
                            </div>
                            <div style="font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-top: 4px; letter-spacing: 1px;">
                              Full Stack Developer
                            </div>
                          </td>
                          <td align="right" valign="top" style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase;">
                            ${currentDate}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 0 40px 40px 40px;">
                      <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 20px 0; line-height: 1.2;">
                        Message Received!
                      </h1>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                        Hi <strong>${name.split(' ')[0]}</strong>,
                      </p>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                        Thank you for reaching out. I've received your message regarding <strong>"${subject}"</strong> and I'm excited to connect with you.
                      </p>
                      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 30px 0;">
                        I'll review your inquiry and get back to you as soon as possible, usually within 24 hours.
                      </p>
                      
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#16a34a" style="border-radius: 8px;">
                            <a href="https://aftabfarhanarko.official" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                              Visit Portfolio
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 40px; border-top: 1px solid #f1f5f9; background-color: #fafafa; text-align: center;">
                      <div style="margin-bottom: 25px;">
                        <a href="https://www.facebook.com/aftabfarhanarko.official" class="social-icon">
                          <img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" width="24" height="24">
                        </a>
                        <a href="https://wa.me/88016134108800" class="social-icon">
                          <img src="https://cdn-icons-png.flaticon.com/32/733/733585.png" alt="WhatsApp" width="24" height="24">
                        </a>
                        <a href="https://www.instagram.com/itz_arko.420/" class="social-icon">
                          <img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" alt="Instagram" width="24" height="24">
                        </a>
                        <a href="https://www.linkedin.com/in/aftabfarhan/" class="social-icon">
                          <img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" alt="LinkedIn" width="24" height="24">
                        </a>
                      </div>
                      
                      <div style="margin-bottom: 20px;">
                        <a href="https://www.linkedin.com/in/aftabfarhan/" class="footer-link">LinkedIn</a>
                        <a href="https://www.facebook.com/aftabfarhanarko.official" class="footer-link">Facebook</a>
                        <a href="https://www.instagram.com/itz_arko.420/" class="footer-link">Instagram</a>
                      </div>
                      
                      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                        &copy; ${new Date().getFullYear()} Aftab Farhan Arko. All Rights Reserved.
                      </p>
                    </td>
                  </tr>
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
        transporter.sendMail(autoReplyOptions)
      ]);
      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Contact POST Error:", error);
    return NextResponse.json({ error: "Failed to send message", details: error.message }, { status: 500 });
  }
}
