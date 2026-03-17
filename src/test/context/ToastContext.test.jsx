import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../context/ToastContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function wrapper({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}

describe('ToastContext', () => {
  it('provides toast.success, toast.error, toast.info', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.success).toBe('function');
    expect(typeof result.current.error).toBe('function');
    expect(typeof result.current.info).toBe('function');
  });

  it('shows a success toast', async () => {
    const user = userEvent.setup();
    function TestComp() {
      const toast = useToast();
      return <button onClick={() => toast.success('Saved!')}>Fire</button>;
    }
    render(<ToastProvider><TestComp /></ToastProvider>);
    await user.click(screen.getByText('Fire'));
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('shows an error toast', async () => {
    const user = userEvent.setup();
    function TestComp() {
      const toast = useToast();
      return <button onClick={() => toast.error('Failed')}>Fire</button>;
    }
    render(<ToastProvider><TestComp /></ToastProvider>);
    await user.click(screen.getByText('Fire'));
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('shows an info toast', async () => {
    const user = userEvent.setup();
    function TestComp() {
      const toast = useToast();
      return <button onClick={() => toast.info('Info msg')}>Fire</button>;
    }
    render(<ToastProvider><TestComp /></ToastProvider>);
    await user.click(screen.getByText('Fire'));
    expect(screen.getByText('Info msg')).toBeInTheDocument();
  });

  it('auto-removes toast after duration', async () => {
    vi.useFakeTimers();
    function TestComp() {
      const toast = useToast();
      return <button onClick={() => toast.success('Temp')}>Fire</button>;
    }
    render(<ToastProvider><TestComp /></ToastProvider>);
    await act(async () => {
      screen.getByText('Fire').click();
    });
    expect(screen.getByText('Temp')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.queryByText('Temp')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('throws if useToast is used outside ToastProvider', () => {
    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within ToastProvider');
  });
});
