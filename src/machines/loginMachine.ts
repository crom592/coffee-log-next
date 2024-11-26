import { setup, assign } from 'xstate';

export type LoginEvent =
  | { type: 'LOGIN'; email: string; password: string }
  | { type: 'SUCCESS' }
  | { type: 'FAILURE'; error: string }
  | { type: 'RETRY' };

export interface LoginContext {
  email: string;
  error?: string;
  attempts: number;
}

const createLoginMachine = () => {
  return setup({
    types: {
      context: {} as LoginContext,
      events: {} as LoginEvent,
    },
    actions: {
      assignLoginData: assign(({context, event}) => {
        if (event.type === 'LOGIN') {
          return {
            ...context,
            email: event.email,
            attempts: context.attempts + 1,
            error: undefined
          };
        }
        return context;
      }),
      assignError: assign(({context, event}) => {
        if (event.type === 'FAILURE') {
          return {
            ...context,
            error: event.error
          };
        }
        return context;
      })
    },
    guards: {
      canRetry: ({context}) => context.attempts < 3
    }
  }).createMachine({
    id: 'login',
    initial: 'idle',
    context: {
      email: '',
      attempts: 0,
      error: undefined
    },
    states: {
      idle: {
        on: { 
          LOGIN: {
            target: 'loading',
            actions: 'assignLoginData'
          }
        }
      },
      loading: {
        on: { 
          SUCCESS: 'success',
          FAILURE: {
            target: 'failure',
            actions: 'assignError'
          }
        }
      },
      success: {
        type: 'final'
      },
      failure: {
        on: { 
          RETRY: {
            target: 'loading',
            guard: 'canRetry'
          }
        }
      }
    }
  });
};

export const loginMachine = createLoginMachine();
