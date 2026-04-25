import React from 'react';

export default function ConfirmationPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-navy text-ivory text-center px-6">
      <div className="max-w-md">
        <h1 className="text-5xl font-display font-semibold mb-4">Request Received!</h1>
        <p className="font-body text-muted mb-8">
          Thank you for booking your free trial. We've sent a confirmation email to your inbox.
          Our team will reach out via WhatsApp shortly to finalize your schedule.
        </p>
        <a href="/" className="inline-block bg-gold text-navy px-8 py-3 rounded-full font-body font-medium">
          Return Home
        </a>
      </div>
    </div>
  );
}
