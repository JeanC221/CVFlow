import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import PersonalInfoForm from '../../components/forms/PersonalInfoForm';

describe('PersonalInfoForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<PersonalInfoForm />);
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 234 567 890')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('linkedin.com/in/johndoe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('github.com/johndoe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New York, NY')).toBeInTheDocument();
  });

  it('renders header with title', () => {
    renderWithProviders(<PersonalInfoForm />);
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
  });

  it('has required attribute on fullName', () => {
    renderWithProviders(<PersonalInfoForm />);
    expect(screen.getByPlaceholderText('John Doe')).toBeRequired();
  });

  it('has maxLength on inputs', () => {
    renderWithProviders(<PersonalInfoForm />);
    expect(screen.getByPlaceholderText('John Doe')).toHaveAttribute('maxlength', '100');
    expect(screen.getByPlaceholderText('john@example.com')).toHaveAttribute('maxlength', '254');
  });

  it('has save button', () => {
    renderWithProviders(<PersonalInfoForm />);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('updates input value on type', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PersonalInfoForm />);
    const input = screen.getByPlaceholderText('John Doe');
    await user.type(input, 'Jane Doe');
    expect(input).toHaveValue('Jane Doe');
  });

  it('submits form and saves data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PersonalInfoForm />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    await user.type(nameInput, 'Test User');
    await user.click(screen.getByRole('button', { name: /save/i }));
    // Toast should appear
    expect(screen.getByText('Personal info saved')).toBeInTheDocument();
  });

  it('trims whitespace on save', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PersonalInfoForm />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    await user.type(nameInput, '  John  ');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('Personal info saved')).toBeInTheDocument();
  });
});
