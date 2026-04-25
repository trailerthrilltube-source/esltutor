import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  return <AdminDashboard />;
}
