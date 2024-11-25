import { createMachine } from 'xstate';

interface AuthContext {
  error?: string;
  provider?: string;
}

type AuthEvent =
  | { type: 'LOGIN'; provider: string }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; error: string }
  | { type: 'RETRY' }
  | { type: 'LOGOUT' };

export const authMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgNwBdd0AbAe1wEMBrE7XPAFzYGswBiAB6IAjAHYArKIDMAGhABOADgAMAZj0BWAOwBOPfoAsAJgCM+gDQgAnogDsR-Xv2H9ATn0AaEAE9EARgAWADYAvqFOGDj4RKTkVLQMTKwcXLwCQqISUrLyCkoqapo6egZGJuZWNnYOTq7uXj7+QSFYuIQk5FQ0dIwsHNy8AkIiYhLSsgoKKmoa2noGRiZmltZ2Dk4u7p4+foHBYREE0XGJyWmZ2bn5hcUlUjJyispqmjoNRiZmFtZ2js6u7p4+-kFhEVFxiSlpGVm5+YXFpeWVsgrKqupauoZGJmZWNnYOTm4e3n6BwRFRMfGJKWkZ2bn5RSVlFVU1dU0tHV19Q2NTcytrW3tHZzdPbx9-QKDQiOj4xJS0jKzc-MLiktLyisqq6pramrr6hsam5pbWtvbOrp7evv6BoZHRsfGJyanpmdn5hcWl5ZXVtfWNza3tnd29-YPDo+OT07PzqwA */
  id: 'auth',
  initial: 'idle',
  context: {
    error: undefined,
    provider: undefined,
  },
  states: {
    idle: {
      on: {
        LOGIN: {
          target: 'authenticating',
          actions: (context, event) => {
            context.provider = event.provider;
          },
        },
      },
    },
    authenticating: {
      on: {
        SUCCESS: {
          target: 'authenticated',
          actions: (context) => {
            context.error = undefined;
          },
        },
        ERROR: {
          target: 'error',
          actions: (context, event) => {
            context.error = event.error;
          },
        },
      },
    },
    authenticated: {
      on: {
        LOGOUT: {
          target: 'idle',
          actions: (context) => {
            context.error = undefined;
            context.provider = undefined;
          },
        },
      },
    },
    error: {
      on: {
        RETRY: {
          target: 'authenticating',
          actions: (context) => {
            context.error = undefined;
          },
        },
      },
    },
  },
});
