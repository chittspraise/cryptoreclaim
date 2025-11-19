export const dynamic = 'force-dynamic';

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminPageClient from "./AdminPageClient";

export default async function AdminPage() {
  const supabase = createServerClient();

  const { data: cases, error } = await supabase
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cases:", error);
    // Handle the error appropriately
    return <div>Error fetching data</div>;
  }

  const signOut = async () => {
    "use server";

    const supabase = createServerClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return <AdminPageClient cases={cases || []} signOut={signOut} />;
}
