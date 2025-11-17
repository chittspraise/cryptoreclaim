import { createServiceRoleClient } from "@/utils/supabase/service";
import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignupPage(props: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await props.searchParams; // ✅ await it

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect("/signup?message=Could not create account. Please try again.");
    }

    if (data.user) {
      const supabaseService = createServiceRoleClient();
      const { error: insertError } = await supabaseService
        .from("admin")
        .insert([{ id: data.user.id, email: data.user.email }]);

      if (insertError) {
        console.error("Error inserting user into admin table:", insertError);
        return redirect("/signup?message=Could not create admin account. Please contact support.");
      }
    }

    return redirect("/signup?message=Check your email to complete the sign up process");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/iriback.jpg')" }}>
      <div className="w-full max-w-xs bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white border border-white/20">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-300">Get started with a new account</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-white/30 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                         placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-white/30 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                         placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          <div className="pt-2">
            <button
              formAction={signUp}
              className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-lg
                         hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-green-500 transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
          {message && (
            <p className="mt-4 p-3 bg-blue-500/50 text-white text-center rounded-md border border-blue-700">
              {message}
            </p>
          )}
        </form>
        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-400 hover:underline">
            Log in
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-transparent
                       border border-white/50 rounded-lg hover:bg-white hover:text-black
                       transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
