import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  const admins = getAdminEmails();

  if (!email || admins.length === 0) {
    return false;
  }

  return admins.includes(email.toLowerCase());
}

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect('/login?error=missing-env');
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  if (!isAllowedAdminEmail(user.email)) {
    redirect('/login?error=unauthorized');
  }

  return { supabase, user };
}
