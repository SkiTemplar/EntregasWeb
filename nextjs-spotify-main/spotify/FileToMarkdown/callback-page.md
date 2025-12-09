'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveTokens } from '@/lib/auth';

function CallbackContent() {
const router = useRouter();
const searchParams = useSearchParams();
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const handleCallback = async () => {
const code = searchParams.get('code');
const state = searchParams.get('state');
const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('Autenticacion cancelada');
        setLoading(false);
        return;
      }

      if (!code) {
        setError('No se recibio codigo de autorizacion');
        setLoading(false);
        return;
      }

      // Validar state
      const savedState = localStorage.getItem('spotify_auth_state');
      if (!state || state !== savedState) {
        setError('Error de seguridad. Intenta de nuevo.');
        localStorage.removeItem('spotify_auth_state');
        setLoading(false);
        return;
      }

      localStorage.removeItem('spotify_auth_state');

      try {
        const response = await fetch('/api/spotify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al obtener token');
        }

        saveTokens(data.access_token, data.refresh_token, data.expires_in);
        router.replace('/dashboard');

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    handleCallback();
}, [searchParams, router]);

if (error) {
return (
<div className="flex items-center justify-center min-h-screen bg-[#121212]">
<div className="text-center">
<h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
<p className="text-white mb-6">{error}</p>
<button
onClick={() => router.replace('/')}
className="bg-[#1DB954] text-black font-bold px-6 py-2 rounded-full hover:bg-[#1ed760]"
>
Volver al inicio
</button>
</div>
</div>
);
}

return (
<div className="flex items-center justify-center min-h-screen bg-[#121212]">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mx-auto mb-4"></div>
<p className="text-white text-xl">Autenticando...</p>
</div>
</div>
);
}

export default function CallbackPage() {
return (
<Suspense fallback={
<div className="flex items-center justify-center min-h-screen bg-[#121212]">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mx-auto"></div>
</div>
}>
<CallbackContent />
</Suspense>
);
}
