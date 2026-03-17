import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import CoursesForm from '../../components/forms/CoursesForm';

describe('CoursesForm', () => {
  it('renders header', () => {
    renderWithProviders(<CoursesForm />);
    expect(screen.getByText('Courses & Certifications')).toBeInTheDocument();
  });

  it('shows add button', () => {
    renderWithProviders(<CoursesForm />);
    expect(screen.getByText('+ Add Course')).toBeInTheDocument();
  });

  it('opens form with fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CoursesForm />);
    await user.click(screen.getByText('+ Add Course'));
    expect(screen.getByPlaceholderText(/course or certification/i)).toBeRequired();
    expect(screen.getByPlaceholderText(/coursera/i)).toBeRequired();
  });

  it('adds course entry', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CoursesForm />);
    await user.click(screen.getByText('+ Add Course'));
    await user.type(screen.getByPlaceholderText(/course or certification/i), 'React Masterclass');
    await user.type(screen.getByPlaceholderText(/coursera/i), 'Udemy');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('Course added')).toBeInTheDocument();
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
  });

  it('has url field with inputMode url', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CoursesForm />);
    await user.click(screen.getByText('+ Add Course'));
    const urlInput = screen.getByPlaceholderText('Certificate link');
    expect(urlInput).toHaveAttribute('inputmode', 'url');
    expect(urlInput).toHaveAttribute('maxlength', '500');
  });
});
