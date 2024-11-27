import { interpret } from 'xstate';
import { loginMachine, type LoginEvent } from './loginMachine';

describe('loginMachine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createTestService = () => {
    const service = interpret(loginMachine);
    service.start();
    return service;
  };

  const defaultLoginEvent: LoginEvent = {
    type: 'LOGIN',
    email: 'test@example.com',
    password: 'password123'
  };

  const defaultFailureEvent: LoginEvent = {
    type: 'FAILURE',
    error: 'Invalid credentials'
  };

  it('should start in idle state', () => {
    const service = createTestService();
    expect(service.getSnapshot().matches('idle')).toBe(true);
    expect(service.getSnapshot().context).toEqual({
      email: '',
      attempts: 0,
      error: undefined
    });
  });

  it('should transition to loading on LOGIN event', (done) => {
    const service = createTestService();
    
    service.subscribe((state) => {
      if (state.matches('loading')) {
        expect(state.context.email).toBe(defaultLoginEvent.email);
        expect(state.context.attempts).toBe(1);
        expect(state.context.error).toBeUndefined();
        done();
      }
    });

    service.send(defaultLoginEvent);
  });

  it('should transition to success on SUCCESS event', (done) => {
    const service = createTestService();
    
    service.subscribe((state) => {
      if (state.matches('success')) {
        expect(state.context.attempts).toBe(1);
        expect(state.context.email).toBe(defaultLoginEvent.email);
        done();
      }
    });

    service.send(defaultLoginEvent);
    service.send({ type: 'SUCCESS' });
  });

  it('should transition to failure on FAILURE event with error message', (done) => {
    const service = createTestService();
    
    service.subscribe((state) => {
      if (state.matches('failure')) {
        expect(state.context.error).toBe(defaultFailureEvent.error);
        expect(state.context.attempts).toBe(1);
        expect(state.context.email).toBe(defaultLoginEvent.email);
        done();
      }
    });

    service.send(defaultLoginEvent);
    service.send(defaultFailureEvent);
  });

  it('should prevent retry after 3 attempts', (done) => {
    const service = createTestService();
    let attempts = 0;
    
    service.subscribe((state) => {
      if (state.matches('loading')) {
        attempts++;
      }
      
      if (state.matches('failure') && attempts === 3) {
        service.send({ type: 'RETRY' });
        
        // Wait a bit to ensure we don't transition
        setTimeout(() => {
          const currentState = service.getSnapshot();
          expect(currentState.matches('failure')).toBe(true);
          expect(currentState.context.attempts).toBe(3);
          done();
        }, 100);
      }
    });

    // First attempt
    service.send(defaultLoginEvent);
    service.send(defaultFailureEvent);

    // Second attempt
    service.send({ type: 'RETRY' });
    service.send(defaultLoginEvent);
    service.send(defaultFailureEvent);

    // Third attempt
    service.send({ type: 'RETRY' });
    service.send(defaultLoginEvent);
    service.send(defaultFailureEvent);
  });

  it('should reset error on new login attempt', (done) => {
    const service = createTestService();
    
    service.subscribe((state) => {
      if (state.matches('loading') && state.context.attempts === 2) {
        expect(state.context.error).toBeUndefined();
        done();
      }
    });

    // First attempt - fail
    service.send(defaultLoginEvent);
    service.send(defaultFailureEvent);

    // Second attempt
    service.send({ type: 'RETRY' });
    service.send(defaultLoginEvent);
  });
});
