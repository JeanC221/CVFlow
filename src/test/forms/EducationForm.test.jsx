import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import EducationForm from '../../components/forms/EducationForm';

describe('EducationForm', () => {
  it('renders header', () => {
    renderWithProviders(<EducationForm />);
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('shows add button', () => {
    renderWithProviders(<EducationForm />);
    expect(screen.getByText('+ Add Education')).toBeInTheDocument();
  });

  it('opens form with required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EducationForm />);
    await user.click(screen.getByText('+ Add Education'));
    expect(screen.getByPlaceholderText('University name')).toBeRequired();
    expect(screen.getByPlaceholderText("Bachelor's")).toBeRequired();
    expect(screen.getByPlaceholderText('Computer Science')).toBeRequired();
  });

  it('adds education entry', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EducationForm />);
    await user.click(screen.getByText('+ Add Education'));
    await user.type(screen.getByPlaceholderText('University name'), 'MIT');
    await user.type(screen.getByPlaceholderText("Bachelor's"), 'BS');
    await user.type(screen.getByPlaceholderText('Computer Science'), 'CS');
    await user.type(screen.getByPlaceholderText('2018'), '2018');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('Education added')).toBeInTheDocument();
  });

  it('has maxLength on institution', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EducationForm />);
    await user.click(screen.getByText('+ Add Education'));
    expect(screen.getByPlaceholderText('University name')).toHaveAttribute('maxlength', '200');
  });
});
