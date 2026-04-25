"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema } from "@/lib/validations";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (values: AdminLoginInput) => {
    setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-navy px-4 py-20">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gold/20 bg-white p-8">
        <h1 className="font-display text-5xl text-navy">Admin Login</h1>
        <p className="mt-2 font-body text-sm text-slate-500">Sign in to manage bookings, media, and payments.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Email</label>
            <input {...register("email")} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block font-body text-xs uppercase tracking-[0.12em] text-slate-500">Password</label>
            <input type="password" {...register("password")} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-gold px-5 py-3 font-body text-sm font-medium text-navy hover:bg-gold-light">
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
