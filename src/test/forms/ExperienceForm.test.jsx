import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import ExperienceForm from '../../components/forms/ExperienceForm';

describe('ExperienceForm', () => {
  it('renders header with title', () => {
    renderWithProviders(<ExperienceForm />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('shows add button', () => {
    renderWithProviders(<ExperienceForm />);
    expect(screen.getByText('+ Add Experience')).toBeInTheDocument();
  });

  it('opens form on add click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    expect(screen.getByPlaceholderText('Company name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job title')).toBeInTheDocument();
  });

  it('has required fields marked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    expect(screen.getByPlaceholderText('Company name')).toBeRequired();
    expect(screen.getByPlaceholderText('Job title')).toBeRequired();
  });

  it('adds experience entry', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    await user.type(screen.getByPlaceholderText('Company name'), 'Google');
    await user.type(screen.getByPlaceholderText('Job title'), 'Engineer');
    await user.type(screen.getByPlaceholderText('Jan 2020'), '2020');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('Experience added')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Google/)).toBeInTheDocument();
  });

  it('shows cancel button in form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('cancel hides form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByPlaceholderText('Company name')).not.toBeInTheDocument();
  });

  it('has maxLength on company input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceForm />);
    await user.click(screen.getByText('+ Add Experience'));
    expect(screen.getByPlaceholderText('Company name')).toHaveAttribute('maxlength', '200');
  });
});
