import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validations";
import { sendInquiryEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await sendInquiryEmail(parsed.data.name, parsed.data.email, parsed.data.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send inquiry" },
      { status: 500 },
    );
  }
}
