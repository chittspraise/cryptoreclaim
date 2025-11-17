"use client";
import Link from "next/link";

export default function AdminHeader({ signOut }: { signOut: () => Promise<never> }) {
  return (
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
  );
}
