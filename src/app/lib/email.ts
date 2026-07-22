import nodemail from "nodemailer";

export const transporter = nodemail.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendMailOptions {
  to: string | string[];

  subject: string;

  text?: string;

  html?: string;

  cc?: string | string[];

  bcc?: string | string[];

  replyTo?: string;

  attachments?: {
    filename: string;
    path?: string;
    content?: Buffer | string;
    contentType?: string;
  }[];
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  cc,
  bcc,
  replyTo,
  attachments,
}: SendMailOptions) {
  try {
    console.log({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
    });
    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM}>`,

      to,

      cc,

      bcc,

      replyTo,

      subject,

      text,

      html,

      attachments,
    });

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error("Email Error:", error);

    return {
      success: false,
      error,
    };
  }
}
