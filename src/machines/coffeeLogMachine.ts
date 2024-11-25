import { createMachine } from 'xstate';

export interface CoffeeLogContext {
  beanOrigin?: string;
  roastLevel?: string;
  brewingMethod?: string;
  grindSize?: string;
  waterTemperature?: number;
  ratio?: string;
  tastingNotes?: string[];
  rating?: number;
}

export const coffeeLogMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgNwBdd0AbMAYgHkB5AVQGUBRAZQAkBtAAwBdRKAAOAe1i4ALrhABPRAEYAzAHYAHABYAnNoDMAGhABPRZq0B2Tfo2btOgJw6XtgDQgAnogCMAX1CbNExcQhJySmoGZjZOHn5hUXEpWXklVXUtXQNjU3NLG1sHZzcPL19-QJCELBw8IhJyCipaeggmVg5uPkERcUkZeUVlVQ1tPUNTcysQG3snF3dPHz9AkLDImPjCUnJKGnpGZjYuXgFhMUkZeWU1DS0DYzMLKxs7RxdXD28-AKDQ8KjYhOTUtIzs3PzC4tLyqtq6hsaVZp6gxGExmCxWGx2BzOVzuTw+QLBULhSLRWLxRIpNKZbJ5QolcoVKo1OoNJqtDpdHr9QbDUYTaazBZLFZrDZbHZ7A5HE5nC43B5PF5vD6-QHAsFQmHwhEo9GYnF4gkk8mUqk0+mMpkstn1Dm8rk83n8wXCoUi8WS6Uy2XyhVKlVqjVanX6w3G03mi1W602u0Ox1Ol1uj1e71+-0BoPB0Ph6OR6Ox+OJpMp9OZrPZnN5gsF4ul8uVqs12t1hsNpsttvtjudrqd7s93t9-sDwdD4cj0fjieTqfTmezufzxdLFarlbrdYbTZbbY7Xa7vf7g+HI7H0-Hi9Xm93h9Pl9vj8-v9AUDQWCIVCYXCEUi0VicQSiSS+VSGWyuXyRVKFSqtXqTVabQ6XR6-UGo0m8yWKzWmx2ewOJzOFyuNzuDyebw+Xz+QLBULhSLRWLxRLJVLpTLZHL5QqlSrVWr1RqtDrdHr9IbDUbjSbTWbzRarTbbXaHY6nC7XW73R7PV7vT7fH5-QHA0Hg6GwxHI1GY7H43GE0nk6m02n0xms7n84XixXq7X6836+3u-3h+P59Pl+v94fj6fL7f7y-P9-f3+AECQFAcDQPAiCoPAqDYPghDEOQlC0IwrCcLw3CCKIki+LIqiaLohi2I4niBI0iSHI8iKUoylqBomhaNo+iGMYpimOYFhWDYdi2PYjhOc4LiuW47geJ4XjeD4vj+AEQTBKEYThJE0QxLEcTxIkSTJCkqRpOkGSZFk2Q5LkeQFEURQlGU5QVJUVTVDUtT1A0jRNM0LTNK07SdN0PS9H0-QDIMwwjKMYzjJM0yzHM8yLEs+wrGsGxbDsex7AcRwnKc5wXFcNx3PcTwvK87yfN8vz-ICwKgsC4KQrCiLIqi6KYtihLEqS5KUtSNL0oyLJshy3K8oKwqipKMpylqeomhaVp2k6bpem6XoBkGEZRjGCYphmOYFkWZZVnWTZtl2fZDmOE4zjOC4riue4HieF4Pg+L4fj+AEgRBME4SRFEMRxAkySpGk6SZFkOT5IUxSlGU5QVJUVTVDUtT1A0jRNM0LTNK07SdN0PS9H0-QDIMwwjKMYzjJM0yzHM8yLEsKxrBs2w7HsRwnKc5wXNcDz3I8TyvO8Hz-ICwLgpCsKIqiqLYri+KEsSpLkpS1L0oyLJshy3K8vygrCqKkoynKWp6iaFpWnaToem6XoBkGEZRjGCYphmOYFkWZZVnWTZtl2fZDmOE4zjOC4riue4HieF43k+b4-n+QFgVBUFIVhRFUXRTFcXxQliVJclKWpelGRZNkOW5XlBWFUVJRlOUtT1E0LSt */
  id: 'coffeeLog',
  initial: 'idle',
  context: {} as CoffeeLogContext,
  states: {
    idle: {
      on: {
        START: 'beanInfo',
      },
    },
    beanInfo: {
      on: {
        NEXT: 'brewingInfo',
        BACK: 'idle',
        UPDATE: {
          actions: 'updateContext',
        },
      },
    },
    brewingInfo: {
      on: {
        NEXT: 'tastingInfo',
        BACK: 'beanInfo',
        UPDATE: {
          actions: 'updateContext',
        },
      },
    },
    tastingInfo: {
      on: {
        NEXT: 'review',
        BACK: 'brewingInfo',
        UPDATE: {
          actions: 'updateContext',
        },
      },
    },
    review: {
      on: {
        SUBMIT: 'submitting',
        BACK: 'tastingInfo',
        UPDATE: {
          actions: 'updateContext',
        },
      },
    },
    submitting: {
      invoke: {
        src: 'submitLog',
        onDone: 'success',
        onError: 'error',
      },
    },
    success: {
      on: {
        NEW: 'idle',
      },
    },
    error: {
      on: {
        RETRY: 'submitting',
        BACK: 'review',
      },
    },
  },
});
