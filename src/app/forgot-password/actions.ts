'use server';

import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const supabase = createServerClient();

  const redirectToUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`.trim();
  console.log('Sending redirectTo URL to Supabase:', redirectToUrl);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectToUrl,
  });

  if (error) {
    return redirect(
      '/forgot-password?message=Could not send password reset link. Please try again.'
    );
  }

  return redirect(
    '/forgot-password?message=Password reset link sent. Please check your email.'
  );
}
