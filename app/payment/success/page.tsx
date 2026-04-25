import React from 'react';

export default function PaymentSuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-navy text-ivory text-center px-6">
      <div className="max-w-md">
        <h1 className="text-5xl font-display font-semibold mb-4">Payment Successful!</h1>
        <p className="font-body text-muted mb-8">
          Welcome to the program! Your enrollment is confirmed.
          We'll send your onboarding materials and scheduling link to your email.
        </p>
        <a href="/" className="inline-block bg-gold text-navy px-8 py-3 rounded-full font-body font-medium">
          Return Home
        </a>
      </div>
    </div>
  );
}
