'use server';

import { createServerClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${(await headers()).get('origin')}/auth/callback`,
    },
  });

  if (error) {
    console.error('Signup error:', error);
    return redirect('/signup?message=Could not authenticate user');
  }

  return redirect('/signup?message=Check email to continue sign up process');
}
