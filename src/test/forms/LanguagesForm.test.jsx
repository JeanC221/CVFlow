import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import LanguagesForm from '../../components/forms/LanguagesForm';

describe('LanguagesForm', () => {
  it('renders header', () => {
    renderWithProviders(<LanguagesForm />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('renders language input', () => {
    renderWithProviders(<LanguagesForm />);
    expect(screen.getByPlaceholderText(/english, spanish/i)).toBeInTheDocument();
  });

  it('has maxLength on language name', () => {
    renderWithProviders(<LanguagesForm />);
    expect(screen.getByPlaceholderText(/english, spanish/i)).toHaveAttribute('maxlength', '100');
  });

  it('renders proficiency select', () => {
    renderWithProviders(<LanguagesForm />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('adds language on submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguagesForm />);
    await user.type(screen.getByPlaceholderText(/english, spanish/i), 'English');
    await user.click(screen.getByRole('button', { name: /add language/i }));
    expect(screen.getByText('Language added')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('allows selecting proficiency', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguagesForm />);
    await user.selectOptions(screen.getByRole('combobox'), 'Native');
    await user.type(screen.getByPlaceholderText(/english, spanish/i), 'Spanish');
    await user.click(screen.getByRole('button', { name: /add language/i }));
    const nativeElements = screen.getAllByText('Native');
    expect(nativeElements.length).toBeGreaterThanOrEqual(1);
  });

  it('clears input after adding', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguagesForm />);
    const input = screen.getByPlaceholderText(/english, spanish/i);
    await user.type(input, 'French');
    await user.click(screen.getByRole('button', { name: /add language/i }));
    expect(input).toHaveValue('');
  });
});
