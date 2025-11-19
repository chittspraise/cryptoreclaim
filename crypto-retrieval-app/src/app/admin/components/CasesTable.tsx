"use client";
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

export default function CasesTable({ cases }: { cases: Case[] }) {
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  return (
    <div className="overflow-x-auto">
      {cases.length === 0 ? (
        <p className="text-center text-gray-300 py-8">No cases found.</p>
      ) : (
        <table className="min-w-full">
          <thead className="border-b-2 border-white/20">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Message
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Uploaded File
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date Submitted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-white/10">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {caseItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {caseItem.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {caseItem.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 max-w-md whitespace-pre-wrap break-words">
                  {caseItem.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {caseItem.file_url ? (
                    isImage(caseItem.file_url) ? (
                      <a
                        href={caseItem.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={caseItem.file_url}
                          alt="Uploaded file"
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      </a>
                    ) : (
                      <a
                        href={caseItem.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline"
                      >
                        View File
                      </a>
                    )
                  ) : (
                    "No file uploaded"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(caseItem.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
