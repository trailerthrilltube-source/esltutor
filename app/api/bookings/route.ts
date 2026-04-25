import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { bookingSchema } from '@/lib/validations';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    // 1. Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;

    // 2. Send Confirmation Email to Student
    await resend.emails.send({
      from: 'ESL Tutoring <onboarding@resend.dev>',
      to: validatedData.email,
      subject: 'Booking Confirmation - Your ESL Trial Session',
      html: `<p>Hi ${validatedData.fullName}, your free trial session is requested for <strong>${validatedData.preferredDate}</strong> at <strong>${validatedData.preferredTime}</strong>. We will contact you via WhatsApp soon!</p>`,
    });

    // 3. Notify Admin
    await resend.emails.send({
      from: 'ESL Tutoring <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Booking Request',
      html: `<p>New trial requested by ${validatedData.fullName} (${validatedData.email}) for ${validatedData.preferredDate} ${validatedData.preferredTime}.</p>`,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
