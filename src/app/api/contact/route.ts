import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: NextRequest) {
  console.log("[CONTACT API] POST request received");

  try {
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.log("[CONTACT API] Rate limit exceeded");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.log("[CONTACT API] Invalid content type");
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("[CONTACT API] JSON parse error");
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.log("[CONTACT API] Missing required fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long (max 100 characters)" },
        { status: 400 }
      );
    }

    if (email.length > 255) {
      return NextResponse.json(
        { error: "Email is too long" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const emailHost = process.env.EMAIL_HOST;
    const emailPort = process.env.EMAIL_PORT;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailHost || !emailPort || !emailUser || !emailPass) {
      console.error("[CONTACT API] SMTP credentials not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    console.log("[CONTACT API] Creating SMTP transport:", {
      host: emailHost,
      port: emailPort,
      user: emailUser,
      secure: true,
    });

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort, 10),
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("[CONTACT API] SMTP transport created successfully");

    console.log("[CONTACT API] Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("[CONTACT API] SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("[CONTACT API] SMTP verification failed:", verifyError);
      if (verifyError instanceof Error) {
        console.error("[CONTACT API] Verification error message:", verifyError.message);
        console.error("[CONTACT API] Verification error code:", (verifyError as any).code);
      }
      throw new Error(`SMTP connection failed: ${verifyError instanceof Error ? verifyError.message : "Unknown error"}`);
    }

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedMessage = sanitize(message).replace(/\n/g, "<br>");

    const mailOptions = {
      from: `"Portfolio Contact" <${emailUser}>`,
      to: "iskandar@danish.my",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h1 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 15px; margin-top: 0; font-size: 24px; font-weight: 600;">
                New Contact Form Submission
              </h1>
              
              <div style="margin-top: 25px;">
                <div style="margin-bottom: 15px;">
                  <strong style="color: #666; display: inline-block; min-width: 80px;">Name:</strong>
                  <span style="color: #000;">${sanitizedName}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #666; display: inline-block; min-width: 80px;">Email:</strong>
                  <a href="mailto:${sanitizedEmail}" style="color: #000; text-decoration: none;">${sanitizedEmail}</a>
                </div>
                
                <div style="margin-top: 25px;">
                  <strong style="color: #666; display: block; margin-bottom: 10px;">Message:</strong>
                  <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #000; border-radius: 4px; white-space: pre-wrap; color: #333;">
                    ${sanitizedMessage}
                  </div>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                <p style="margin: 0;">This email was sent from your portfolio contact form.</p>
                <p style="margin: 5px 0 0 0;">You can reply directly to this email to respond to ${sanitizedName}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
You can reply directly to this email to respond to ${name}.`,
    };

    console.log("[CONTACT API] Attempting to send email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("[CONTACT API] Email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT API] Error:", error);
    if (error instanceof Error) {
      console.error("[CONTACT API] Error message:", error.message);
      console.error("[CONTACT API] Error code:", (error as any).code);
    }

    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
