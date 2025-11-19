'use server';

import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const supabase = createServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
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
