"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { deleteClaim } from "./actions";

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
  cases: initialCases,
  signOut,
}: {
  cases: Case[];
  signOut: () => Promise<never>;
}) {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [showConfirm, setShowConfirm] = useState<string | number | null>(null);

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  const handleDelete = async (id: string | number) => {
    const originalCases = cases;
    // Optimistically update the UI
    setCases(cases.filter((c) => c.id !== id));
    setShowConfirm(null);

    const result = await deleteClaim(id);

    if (!result.success) {
      // If the deletion fails, revert the UI change and show an alert
      setCases(originalCases);
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/iriback.jpg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 md:p-8">
          <header className="flex flex-wrap justify-between items-center py-4">
            <div className="logo mb-4 md:mb-0">
              <Image src="/images/lofinal.png" alt="Crypto Reclaim Logo" width={150} height={100} />
            </div>
            <nav className="mb-4 md:mb-0">
              <ul className="flex">
                <li><Link href="/" className="text-white hover:text-yellow-500 no-underline">Home</Link></li>
              </ul>
            </nav>
            <form action={signOut}>
              <button className="btn header-btn">Sign Out</button>
            </form>
          </header>
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center my-8">
            Case Submissions ({cases.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.length === 0 ? (
              <p className="text-center text-gray-300 py-8 md:col-span-2 lg:col-span-3">No cases found.</p>
            ) : (
              cases.map((caseItem) => (
                <div key={caseItem.id} className="bg-white/10 rounded-lg shadow-lg p-6 hover:bg-white/20 transition-all duration-300 border-b-2 border-gray-500 flex flex-col justify-between">
                  {/* -- Case Details -- */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col md:flex-row md:gap-x-4">
                      <p className="w-full md:w-1/4 font-bold text-white flex-shrink-0">Name:</p>
                      <p className="w-full md:w-3/4 text-gray-300">{caseItem.name}</p>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col md:flex-row md:gap-x-4 items-start md:items-center">
                      <p className="w-full md:w-1/4 font-bold text-white flex-shrink-0">Email:</p>
                      <div className="w-full md:w-3/4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2 md:mt-0">
                        <p className="text-gray-300 break-all">{caseItem.email}</p>
                        <a 
                          href={`mailto:${caseItem.email}`}
                          className="btn text-white no-underline flex-shrink-0 mt-2 sm:mt-0"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                    {/* Subject */}
                    <div className="flex flex-col md:flex-row md:gap-x-4">
                      <p className="w-full md:w-1/4 font-bold text-white flex-shrink-0">Subject:</p>
                      <p className="w-full md:w-3/4 text-gray-300">{caseItem.subject}</p>
                    </div>
                    {/* Message */}
                    <div className="flex flex-col md:flex-row md:gap-x-4">
                      <p className="w-full md:w-1/4 font-bold text-white flex-shrink-0">Message:</p>
                      <p className="w-full md:w-3/4 text-gray-300 whitespace-pre-wrap break-words">{caseItem.message}</p>
                    </div>
                    {/* Uploaded File */}
                    <div className="flex flex-col md:flex-row md:gap-x-4 items-start pt-2">
                      <p className="w-full md:w-1/4 font-bold text-white flex-shrink-0">Uploaded File:</p>
                      <div className="w-full md:w-3/4 mt-2 md:mt-0">
                        {caseItem.file_url ? (
                          isImage(caseItem.file_url) ? (
                            <a href={caseItem.file_url} target="_blank" rel="noopener noreferrer">
                              <Image src={caseItem.file_url} alt="Uploaded file" width={100} height={100} className="rounded-md"/>
                            </a>
                          ) : (
                            <a href={caseItem.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                              View File
                            </a>
                          )
                        ) : (
                          <p className="text-sm text-gray-400">No file uploaded</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* -- Timestamp and Delete Button -- */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      {new Date(caseItem.created_at).toLocaleString()}
                    </p>
                    <button
                      onClick={() => setShowConfirm(caseItem.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold text-white">Are you sure?</h2>
            <p className="text-gray-300 mt-2">This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
