'use server';

import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function resetPassword(formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const code = formData.get('code') as string;

  if (password !== confirmPassword) {
    return redirect(
      `/reset-password?code=${code}&message=Passwords do not match. Please try again.`
    );
  }

  const supabase = createServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(
      `/reset-password?code=${code}&message=Invalid or expired password reset link.`
    );
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });

  if (updateError) {
    return redirect(
      `/reset-password?code=${code}&message=Could not update password. Please try again.`
    );
  }

  return redirect('/login?message=Password updated successfully. You can now sign in.');
}
