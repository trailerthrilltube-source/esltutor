import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6">
      <div className="max-w-xl rounded-2xl border border-gold/20 bg-white p-10 text-center shadow-sm">
        <h1 className="font-display text-6xl text-navy">Payment Successful</h1>
        <p className="mt-4 font-body text-sm text-slate-600">
          Thank you. Your payment has been completed. We will send your lesson schedule shortly.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-navy">
          Return Home
        </Link>
      </div>
    </main>
  );
}
