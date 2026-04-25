import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { plan, amount } = await req.json();

    const response = await fetch('https://api.paymongo.com/v1/links', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY!).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id: `link_${Date.now()}`,
          attribute: {
            amount: amount * 100, // Convert to centavos
            payment_options: 'card,gcash,maya',
            description: `ESL Tutoring - ${plan} Plan`,
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
          },
        },
      }),
    });

    const data = await response.json();
    return NextResponse.json({ url: data.data.url }, { status: 200 });
  } catch (error: any) {
    console.error('PayMongo error:', error);
    return NextResponse.json({ error: 'Payment link creation failed' }, { status: 500 });
  }
}
