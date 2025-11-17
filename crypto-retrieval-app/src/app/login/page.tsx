import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const message = searchParams.message;

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/admin");
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xs bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white border border-white/20">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-gray-300">Sign in to access the admin panel</p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          <div className="pt-2">
            <button
              formAction={signIn}
              className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
          {message && (
            <p className="mt-4 p-3 bg-red-500/50 text-white text-center rounded-md border border-red-700">
              {message}
            </p>
          )}
        </form>
        <p className="mt-6 text-sm text-center text-gray-300">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-white no-underline hover:text-gray-200">
            Sign up
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link href="/" className="inline-block px-6 py-2 text-sm font-medium text-white bg-transparent border border-white/50 rounded-lg hover:bg-white/10 no-underline hover:text-gray-200 transition-colors duration-300">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
