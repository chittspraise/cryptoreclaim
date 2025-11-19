"use client";
import Link from "next/link";
import Image from "next/image";

export default function AdminHeader({ signOut }: { signOut: () => Promise<never> }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <Link href="/admin">
        <Image src="/images/lofinal.png" alt="Crypto Reclaim Logo" width={150} height={100} />
      </Link>
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
