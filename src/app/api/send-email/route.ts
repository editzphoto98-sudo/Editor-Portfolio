import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  const { name, email, message, projectType, timeline, honeypot } = body || {};

  // Honeypot check (bots will fill this hidden field)
  if (honeypot) {
    return NextResponse.json(
      { error: "Spam detected" },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate input lengths to prevent resource exhaustion/DoS attacks
  if (
    name.length > 100 ||
    email.length > 250 ||
    message.length > 5000 ||
    (projectType && projectType.length > 100) ||
    (timeline && timeline.length > 100)
  ) {
    return NextResponse.json(
      { error: "Input text exceeds maximum allowed limit" },
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

  // Validate message length
  if (message.trim().length < 30) {
    return NextResponse.json(
      { error: "Message should be at least 30 characters long" },
      { status: 400 }
    );
  }

  // Block disposable email providers
  const blockList = ["tempmail", "mailinator", "10minutemail", "guerrillamail"];
  const domain = email.split("@")[1];
  if (domain && blockList.some((blocked) => domain.includes(blocked))) {
    return NextResponse.json(
      { error: "Temporary email addresses are not allowed" },
      { status: 403 }
    );
  }

  // Save to Supabase Database
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  let dbSaved = false;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: dbError } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
        project_type: projectType,
        timeline,
      });
      if (!dbError) {
        dbSaved = true;
      } else {
        console.error("Database save error:", dbError);
      }
    } catch (dbErr) {
      console.error("Database connection error:", dbErr);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (dbSaved) {
      return NextResponse.json({ success: true, savedToDb: true });
    }
    return NextResponse.json(
      { error: "Missing Resend API Key and database save failed" },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "From Portfolio <contact@yogitasingh.vercel.app>",
      to: ["yukta062@gmail.com"],
      subject: `New Message from Portfolio - ${projectType || "General Inquiry"}`,
      react: EmailTemplate({ name, email, message, projectType, timeline }),
    });

    if (error && !dbSaved) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, savedToDb: dbSaved });
  } catch (error) {
    if (dbSaved) {
      return NextResponse.json({ success: true, savedToDb: true });
    }
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
