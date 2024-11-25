'use client';

import { useMachine } from '@xstate/react';
import { authMachine } from '@/machines/authMachine';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
  const [state, send] = useMachine(authMachine);

  const handleLogin = async (provider: string) => {
    send({ type: 'LOGIN', provider });
    try {
      const result = await signIn(provider, { callbackUrl: '/dashboard', redirect: false });
      if (result?.ok) {
        send({ type: 'SUCCESS' });
      } else {
        send({ type: 'ERROR', error: result?.error || 'Login failed' });
      }
    } catch (error) {
      send({ type: 'ERROR', error: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-500">Welcome Back</h2>
        <p className="mt-2 text-gray-400">Sign in to continue to Coffee Log</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleLogin('google')}
          disabled={state.matches('authenticating')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={() => handleLogin('kakao')}
          disabled={state.matches('authenticating')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-[#FEE500] text-gray-900 rounded-lg hover:bg-[#FDD835] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 3C6.5 3 2 6.5 2 11c0 3.5 2.2 6.5 5.5 7.9-.2.6-.8 2.3-.9 2.7 0 0 0 .1-.1.1v.1c0 .1 0 .1.1.1h.1l3.2-2.2c.7.1 1.4.2 2.1.2 5.5 0 10-3.5 10-8 0-4.5-4.5-8-10-8"
            />
          </svg>
          Continue with Kakao
        </button>
      </div>

      {state.matches('authenticating') && (
        <div className="flex justify-center" role="status">
          <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {state.matches('error') && state.context.error && (
        <div className="bg-red-900 text-red-100 p-3 rounded-lg text-sm" role="alert">
          {state.context.error}
          <button
            onClick={() => send({ type: 'RETRY', retry: true })}
            className="ml-2 underline hover:text-red-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
