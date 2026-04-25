import { NextResponse } from "next/server";
import { z } from "zod";
import { createPaymongoPaymentLink } from "@/lib/paymongo";

const inputSchema = z.object({
  plan: z.object({
    name: z.enum(["Starter", "Growth", "Intensive"]),
    price: z.number(),
    currency: z.literal("PHP"),
    sessions: z.number(),
    features: z.array(z.string()),
    popular: z.boolean(),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const checkoutUrl = await createPaymongoPaymentLink(parsed.data.plan);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create payment link" },
      { status: 500 },
    );
  }
}
