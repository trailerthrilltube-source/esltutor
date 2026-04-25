import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { GoldButton } from '../ui/GoldButton';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  const fetchData = async () => {
    const { data: b } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    const { data: p } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
    const { data: t } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    const { data: m } = await supabase.from('session_media').select('*').order('created_at', { ascending: false });

    if (b) setBookings(b);
    if (p) setPayments(p);
    if (t) setTestimonials(t);
    if (m) setMedia(m);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    await fetchData();
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar */}
      <div className="w-64 bg-navy text-ivory p-6 flex flex-col gap-8">
        <h2 className="text-2xl font-display font-semibold text-gold">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {[
            { id: 'bookings', label: 'Bookings' },
            { id: 'media', label: 'Media Gallery' },
            { id: 'payments', label: 'Payments' },
            { id: 'testimonials', label: 'Testimonials' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-gold text-navy font-medium' : 'text-muted hover:text-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-xs text-muted hover:text-red-400 transition-colors"
          >
            Logout Account
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-navy capitalize">
            {activeTab} Management
          </h1>
          <GoldButton onClick={fetchData}>Refresh Data</GoldButton>
        </header>

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gold/10">
            <table className="w-full text-left text-sm font-body">
              <thead className="bg-navy text-ivory">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Date/Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-gold/10">
                    <td className="p-4">{b.full_name}</td>
                    <td className="p-4">{b.email}</td>
                    <td className="p-4">{b.english_level}</td>
                    <td className="p-4">{b.preferred_date} {b.preferred_time}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        b.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className="text-xs border p-1 rounded outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gold/10">
              <h3 className="text-lg font-display font-semibold mb-4">Upload New Media</h3>
              <MediaUploader onUploadSuccess={fetchData} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map((m) => (
                <div key={m.id} className="bg-white p-4 rounded-xl border border-gold/10 flex flex-col gap-2">
                  <div className="aspect-square rounded-lg overflow-hidden bg-navy">
                    {m.type === 'image' && <img src={m.public_url} className="w-full h-full object-cover" />}
                    {m.type !== 'image' && <div className="w-full h-full flex items-center justify-center text-gold">Media</div>}
                  </div>
                  <span className="text-xs font-medium truncate">{m.title}</span>
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={m.is_published}
                        onChange={async () => {
                          await supabase.from('session_media').update({ is_published: !m.is_published }).eq('id', m.id);
                          await fetchData();
                        }}
                      /> Published
                    </label>
                    <button
                      onClick={async () => {
                        await supabase.from('session_media').delete().eq('id', m.id);
                        await fetchData();
                      }}
                      className="text-[10px] text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gold/10">
            <table className="w-full text-left text-sm font-body">
              <thead className="bg-navy text-ivory">
                <tr>
                  <th className="p-4">Student ID</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-gold/10">
                    <td className="p-4">{p.student_id}</td>
                    <td className="p-4">{p.plan}</td>
                    <td className="p-4">{p.currency} {p.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                        p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">{p.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gold/10">
             <table className="w-full text-left text-sm font-body">
              <thead className="bg-navy text-ivory">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Published</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} className="border-b border-gold/10">
                    <td className="p-4">{t.student_name}</td>
                    <td className="p-4">{t.rating} ★</td>
                    <td className="p-4">{t.country}</td>
                    <td className="p-4">{t.is_published ? 'Yes' : 'No'}</td>
                    <td className="p-4">
                      <button
                        onClick={async () => {
                          await supabase.from('testimonials').update({ is_published: !t.is_published }).eq('id', t.id);
                          await fetchData();
                        }}
                        className="text-xs text-gold hover:underline"
                      >
                        Toggle Visibility
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
