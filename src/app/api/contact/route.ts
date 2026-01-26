import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

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

// Get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Check Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validate input exists
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate input length
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

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message is too short (min 10 characters)" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize input to prevent XSS
    const sanitize = (str: string) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    };

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedMessage = sanitize(message).replace(/\n/g, "<br>");

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    // Send email via Resend
    // Production: Use verified domain email (e.g., noreply@danish.my)
    // After verifying your domain in Resend dashboard, set RESEND_FROM_EMAIL in .env.local
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const recipientEmail = process.env.RESEND_TO_EMAIL || "iskandar@danish.my";
    
    console.log("Attempting to send email:", { fromEmail, recipientEmail, hasApiKey: !!process.env.RESEND_API_KEY });
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizedName}`,
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
    });

    if (error) {
      console.error("Resend error details:", JSON.stringify(error, null, 2));
      // Provide more helpful error message based on error type
      let errorMessage = "Failed to send email. Please try again later.";
      if (error.message?.includes("domain")) {
        errorMessage = "Domain verification issue. Please check your Resend domain settings.";
      } else if (error.message?.includes("API key") || error.message?.includes("Unauthorized")) {
        errorMessage = "Email service configuration error. Please contact support.";
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Log successful send (without sensitive data)
    console.log(`Contact form submission sent successfully from ${email.substring(0, 3)}***`);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
