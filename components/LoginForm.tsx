'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { hasSupabaseEnv } from '@/lib/supabase-config';

export function LoginForm({ error }: { error?: string }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const supabaseReady = hasSupabaseEnv();
  const errorMessage =
    error === 'unauthorized'
      ? 'Tento email nemá povolený prístup do administrácie.'
      : error === 'missing-env'
        ? 'Chýba Supabase konfigurácia. Skontrolujte env premenné.'
        : '';

  async function login(e: React.FormEvent) {
    e.preventDefault();

    if (!supabaseReady) {
      setMessage('Doplňte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.');
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const origin = window.location.origin;
    const { error: loginError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback` }
    });
    setMessage(loginError ? loginError.message : 'Skontrolujte email a kliknite na prihlasovací odkaz.');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={login} className="w-full max-w-md bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-semibold">Admin login</h1>
        <p className="mb-6 text-sm text-black/60">Zadajte email administrátora.</p>
        {errorMessage ? <p className="mb-4 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p> : null}
        <input className="mb-4 w-full border border-black/15 px-4 py-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
        <button disabled={!supabaseReady} className="w-full bg-ink px-4 py-3 font-medium text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50">Poslať prihlasovací odkaz</button>
        {message ? <p className="mt-4 text-sm text-black/60">{message}</p> : null}
      </form>
    </main>
  );
}
