import Link from 'next/link';
import Image from 'next/image';
import { forgotPassword } from './actions';

export default async function ForgotPasswordPage(props: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await props.searchParams;

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
      <div className="form-container-60w mx-auto bg-black/70 backdrop-blur-md rounded-[2.5rem] p-10 text-white border-2 border-white/20 shadow-[0_0_25px_rgba(255,199,0,0.2)]">
        <div className="mb-8 text-center">
          <Image
            src="/images/lofinal.png"
            alt="Crypto Reclaim Logo"
            width={200}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold">Forgot Password</h1>
          <p className="mt-2 text-gray-300">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form className="space-y-6 w-4/5 mx-auto">
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
              className="w-full px-6 bg-white/10 border border-white/30 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400 transition-all duration-300"
              style={{ height: '40px', fontSize: '1rem' }}
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-8">
            <button
              formAction={forgotPassword}
              className="w-full px-10 py-3 font-semibold text-white bg-[#FFC700] rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
            >
              Send Reset Link
            </button>
          </div>

          {message && (
            <p className="mt-4 p-3 bg-blue-500/50 text-white text-center rounded-2xl border border-blue-700">
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-sm text-center text-gray-300">
          Remember your password?{' '}
          <Link
            href="/login"
            className="font-medium text-[#FFC700] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
