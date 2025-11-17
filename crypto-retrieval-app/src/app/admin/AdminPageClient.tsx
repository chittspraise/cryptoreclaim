"use client";
import Link from "next/link";
import Image from "next/image";

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
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/iriback.jpg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Panel: Case Submissions
            </h1>
            <div className="flex items-center">
              <Link
                href="/"
                className="bg-red-500 hover:bg-red-700 text-white no-underline font-bold py-1 px-3 rounded text-sm mr-8 transition-colors duration-300"
              >
                Home
              </Link>
              <form action={signOut}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-4 transition-colors duration-300">
                  Logout
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {cases.length === 0 ? (
              <p className="text-center text-gray-300 py-8">No cases found.</p>
            ) : (
              cases.map((caseItem) => (
                <div key={caseItem.id} className="bg-white/10 rounded-lg shadow-lg p-6 hover:bg-white/20 transition-all duration-300">
                  {/* -- Case Details -- */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col sm:flex-row border-b border-white/20 pb-2">
                      <p className="w-full sm:w-1/4 font-bold text-white">Name:</p>
                      <p className="w-full sm:w-3/4 text-gray-300">{caseItem.name}</p>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col sm:flex-row border-b border-white/20 pb-2">
                      <p className="w-full sm:w-1/4 font-bold text-white flex-shrink-0 mb-2 sm:mb-0">Email:</p>
                      <div className="w-full sm:w-3/4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-gray-300 break-all">{caseItem.email}</p>
                        <a 
                          href={`mailto:${caseItem.email}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-300 no-underline self-start sm:self-center flex-shrink-0"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                    {/* Subject */}
                    <div className="flex flex-col sm:flex-row border-b border-white/20 pb-2">
                      <p className="w-full sm:w-1/4 font-bold text-white">Subject:</p>
                      <p className="w-full sm:w-3/4 text-gray-300">{caseItem.subject}</p>
                    </div>
                    {/* Message */}
                    <div className="flex flex-col sm:flex-row border-b border-white/20 pb-2">
                      <p className="w-full sm:w-1/4 font-bold text-white">Message:</p>
                      <p className="w-full sm:w-3/4 text-gray-300 whitespace-pre-wrap break-words">{caseItem.message}</p>
                    </div>
                    {/* Uploaded File */}
                    <div className="flex flex-col sm:flex-row items-start pt-2">
                      <p className="w-full sm:w-1/4 font-bold text-white mb-2 sm:mb-0">Uploaded File:</p>
                      <div className="w-full sm:w-3/4">
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
                  {/* -- Timestamp -- */}
                  <p className="text-xs text-gray-400 text-right mt-4">
                    {new Date(caseItem.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}