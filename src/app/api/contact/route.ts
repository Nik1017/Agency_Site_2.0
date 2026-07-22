import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, budget, message, services } =
      await req.json();

    const result = await sendMail({
      to: process.env.SMTP_FROM!,
      replyTo: email,

      subject: `New Contact Form - ${name}`,

      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Company:</strong> ${company}</p>

        <p><strong>Budget:</strong> ${budget}</p>

        <p><strong>Services:</strong></p>

        <ul>
          ${services.map((s: string) => `<li>${s}</li>`).join("")}
        </ul>

        <p><strong>Message</strong></p>

        <p>${message}</p>
      `,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
   console.error("CONTACT API ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
  }
}
