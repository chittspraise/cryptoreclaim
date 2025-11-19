'use server';

import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '../../utils/supabase/service';

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createServerClient();

  // Admin email validation
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  if (!adminEmails.includes(email)) {
    return redirect(
      '/signup?message=This email address is not authorized for signup.'
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect('/signup?message=Could not create account. Please try again.');
  }

  if (data.user) {
    const supabaseService = createServiceRoleClient();
    const { error: insertError } = await supabaseService
      .from('admin')
      .insert([{ id: data.user.id, email: data.user.email }]);

    if (insertError) {
      console.error('Error inserting user into admin table:', insertError);
      return redirect(
        '/signup?message=Could not create admin account. Please contact support.'
      );
    }
  }

  return redirect('/login?message=Check email to confirm account');
}
