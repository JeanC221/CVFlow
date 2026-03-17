import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import ProfileForm from '../../components/forms/ProfileForm';

describe('ProfileForm', () => {
  it('renders textarea with placeholder', () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByPlaceholderText(/briefly describe/i)).toBeInTheDocument();
  });

  it('renders header with title', () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByText('Professional Profile')).toBeInTheDocument();
  });

  it('has maxLength of 2000', () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByPlaceholderText(/briefly describe/i)).toHaveAttribute('maxlength', '2000');
  });

  it('shows character counter', () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByText('0/2000')).toBeInTheDocument();
  });

  it('updates character counter on type', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfileForm />);
    await user.type(screen.getByPlaceholderText(/briefly describe/i), 'Hello');
    expect(screen.getByText('5/2000')).toBeInTheDocument();
  });

  it('saves profile on submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfileForm />);
    await user.type(screen.getByPlaceholderText(/briefly describe/i), 'My professional profile');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('Profile saved')).toBeInTheDocument();
  });
});
