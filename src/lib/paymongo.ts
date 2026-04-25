import { PricingPlan } from "@/types";

const PAYMONGO_BASE_URL = "https://api.paymongo.com/v1/links";

function encodeKey(secretKey: string) {
  return Buffer.from(`${secretKey}:`).toString("base64");
}

export async function createPaymongoPaymentLink(plan: PricingPlan) {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!secretKey) {
    throw new Error("Missing PAYMONGO_SECRET_KEY");
  }

  const body = {
    data: {
      attributes: {
        amount: plan.price * 100,
        description: `${plan.name} Plan - ${plan.sessions} sessions`,
        currency: "PHP",
        remarks: `ESL ${plan.name} plan`,
        checkout_url: `${siteUrl ?? "http://localhost:3000"}/payment/success`,
      },
    },
  };

  const response = await fetch(PAYMONGO_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodeKey(secretKey)}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayMongo error: ${errorText}`);
  }

  const json = await response.json();
  return json?.data?.attributes?.checkout_url as string;
}
