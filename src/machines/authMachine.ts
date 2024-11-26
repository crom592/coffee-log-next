import { createMachine, assign } from 'xstate';

interface AuthContext {
  error?: string;
  provider?: string;
}

interface LoginEvent {
  type: 'LOGIN';
  provider: string;
}

interface SuccessEvent {
  type: 'SUCCESS';
}

interface ErrorEvent {
  type: 'ERROR';
  error: string;
}

interface RetryEvent {
  type: 'RETRY';
}

interface LogoutEvent {
  type: 'LOGOUT';
}

export const authMachine = createMachine<
  AuthContext,
  LoginEvent | SuccessEvent | ErrorEvent | RetryEvent | LogoutEvent,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>({
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
          actions: assign({
            provider: (_, event: LoginEvent) => event.provider
          }),
        },
      },
    },
    authenticating: {
      on: {
        SUCCESS: 'authenticated',
        ERROR: {
          target: 'error',
          actions: assign({
            error: (_, event: ErrorEvent) => event.error
          }),
        },
      },
    },
    authenticated: {
      on: {
        LOGOUT: 'idle',
      },
    },
    error: {
      on: {
        RETRY: 'authenticating',
      },
    },
  },
});
