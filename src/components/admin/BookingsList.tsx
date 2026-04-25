"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Booking, BookingStatus } from "@/types";

const statusOptions: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const load = async () => {
    const query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    const { data } = await query;
    setBookings((data ?? []) as Booking[]);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: BookingStatus) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    await load();
  };

  const filtered = filter === "all" ? bookings : bookings.filter((item) => item.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="font-body text-xs uppercase tracking-[0.12em] text-slate-500">Filter</label>
        <select value={filter} onChange={(event) => setFilter(event.target.value as "all" | BookingStatus)} className="rounded border border-slate-300 px-2 py-1 text-sm">
          <option value="all">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Level</th>
              <th className="p-3">Date/Time</th>
              <th className="p-3">Goals</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking.id} className="border-t border-slate-100">
                <td className="p-3">{booking.full_name}</td>
                <td className="p-3">{booking.email}</td>
                <td className="p-3">{booking.whatsapp}</td>
                <td className="p-3">{booking.english_level}</td>
                <td className="p-3">{booking.preferred_date} {booking.preferred_time}</td>
                <td className="max-w-xs truncate p-3">{booking.goals}</td>
                <td className="p-3">
                  <select
                    value={booking.status}
                    onChange={(event) => updateStatus(booking.id, event.target.value as BookingStatus)}
                    className="rounded border border-slate-300 px-2 py-1"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
