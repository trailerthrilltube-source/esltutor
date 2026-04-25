import { Resend } from "resend";
import { BookingInput } from "@/lib/validations";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

function getResendClient() {
  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }
  return new Resend(resendApiKey);
}

export async function sendBookingEmails(input: BookingInput) {
  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL");
  }

  const resend = getResendClient();
  const from = "ESL Tutor <onboarding@resend.dev>";

  const studentHtml = `
  <div style="font-family: DM Sans, Arial, sans-serif; background:#FAF8F3; padding:24px; color:#0D1B40;">
    <h2 style="font-family: 'Cormorant Garamond', serif; color:#0D1B40;">Your Free Trial is Booked! 🎉</h2>
    <p>Hi ${input.fullName},</p>
    <p>Thank you for booking your free ESL trial lesson.</p>
    <div style="background:white;padding:16px;border-radius:12px;border:1px solid #E8E4DD;">
      <p><strong>Date:</strong> ${input.preferredDate}</p>
      <p><strong>Time:</strong> ${input.preferredTime}</p>
      <p><strong>Level:</strong> ${input.englishLevel}</p>
    </div>
    <p>What to expect: level check, confidence feedback, and a custom learning plan.</p>
    <p>Meeting link: <em>[Zoom/Google Meet link placeholder]</em></p>
    <p>Tutor WhatsApp: <strong>+63 900 000 0000</strong></p>
  </div>`;

  const adminHtml = `
  <div style="font-family: DM Sans, Arial, sans-serif; padding:20px;">
    <h2 style="font-family: 'Cormorant Garamond', serif;">New Trial Booking — ${input.fullName}</h2>
    <p><strong>Name:</strong> ${input.fullName}</p>
    <p><strong>Email:</strong> ${input.email}</p>
    <p><strong>WhatsApp:</strong> ${input.whatsapp}</p>
    <p><strong>Level:</strong> ${input.englishLevel}</p>
    <p><strong>Date:</strong> ${input.preferredDate}</p>
    <p><strong>Time:</strong> ${input.preferredTime}</p>
    <p><strong>Goals:</strong> ${input.goals ?? "N/A"}</p>
  </div>`;

  await Promise.all([
    resend.emails.send({
      from,
      to: input.email,
      subject: "Your Free Trial is Booked! 🎉",
      html: studentHtml,
    }),
    resend.emails.send({
      from,
      to: adminEmail,
      subject: `New Trial Booking — ${input.fullName}`,
      html: adminHtml,
    }),
  ]);
}

export async function sendInquiryEmail(name: string, email: string, message: string) {
  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL");
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: "ESL Website <onboarding@resend.dev>",
    to: adminEmail,
    subject: `New Inquiry from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  });
}
