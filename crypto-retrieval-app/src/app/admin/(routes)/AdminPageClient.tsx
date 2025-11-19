"use client";
import AdminHeader from "../components/AdminHeader";
import CasesTable from "../components/CasesTable";

interface Case {
  id: string | number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  file_url?: string;
}

export default function AdminPageClient({
  cases,
  signOut,
}: {
  cases: Case[];
  signOut: () => Promise<never>;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/iriback.jpg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 md:p-8">
          <AdminHeader signOut={signOut} />
          <CasesTable cases={cases} />
        </div>
      </div>
    </div>
  );
}