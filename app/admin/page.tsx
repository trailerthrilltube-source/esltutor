import React from 'react';
import { supabase } from '@/lib/supabase';
import { GoldButton } from '@/components/ui/GoldButton';

export default function AdminLoginPage() {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-navy text-ivory px-6">
      <div className="max-w-md w-full bg-white/5 p-12 rounded-3xl border border-gold/20 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-semibold text-gold">Admin Portal</h1>
          <p className="text-muted font-body text-sm mt-2">Please sign in to manage your site</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-body uppercase text-muted">Email</label>
            <input
              name="email"
              type="email"
              className="bg-navy/50 border border-gold/20 p-3 rounded-lg text-ivory outline-none focus:border-gold transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-body uppercase text-muted">Password</label>
            <input
              name="password"
              type="password"
              className="bg-navy/50 border border-gold/20 p-3 rounded-lg text-ivory outline-none focus:border-gold transition-all"
              required
            />
          </div>
          <GoldButton type="submit" className="w-full">
            Enter Dashboard
          </GoldButton>
        </form>
      </div>
    </div>
  );
}
