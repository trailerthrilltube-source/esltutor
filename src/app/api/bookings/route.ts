import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendBookingEmails } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const payload = parsed.data;
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("bookings").insert({
      full_name: payload.fullName,
      email: payload.email,
      whatsapp: payload.whatsapp,
      english_level: payload.englishLevel,
      preferred_date: payload.preferredDate,
      preferred_time: payload.preferredTime,
      goals: payload.goals,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await sendBookingEmails(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
