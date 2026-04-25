"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Payment } from "@/types";

export function PaymentsList() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
      setPayments((data ?? []) as Payment[]);
    };
    load();
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3">Plan</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">PayMongo ID</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t border-slate-100">
              <td className="p-3">{payment.plan}</td>
              <td className="p-3">₱{payment.amount}</td>
              <td className="p-3">{payment.status}</td>
              <td className="p-3">{payment.paymongo_id}</td>
              <td className="p-3">{new Date(payment.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
