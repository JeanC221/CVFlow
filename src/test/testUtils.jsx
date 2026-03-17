import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CVProvider } from '../context/CVContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider>
          <CVProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CVProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
