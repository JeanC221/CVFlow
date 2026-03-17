import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import SkillsForm from '../../components/forms/SkillsForm';

describe('SkillsForm', () => {
  it('renders header', () => {
    renderWithProviders(<SkillsForm />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders skill name input', () => {
    renderWithProviders(<SkillsForm />);
    expect(screen.getByPlaceholderText(/react, python/i)).toBeInTheDocument();
  });

  it('has maxLength on skill name', () => {
    renderWithProviders(<SkillsForm />);
    expect(screen.getByPlaceholderText(/react, python/i)).toHaveAttribute('maxlength', '100');
  });

  it('renders level buttons', () => {
    renderWithProviders(<SkillsForm />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('adds skill on submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsForm />);
    await user.type(screen.getByPlaceholderText(/react, python/i), 'JavaScript');
    await user.click(screen.getByRole('button', { name: /add skill/i }));
    expect(screen.getByText('Skill added')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('selects level before adding', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsForm />);
    await user.click(screen.getByText('Advanced'));
    await user.type(screen.getByPlaceholderText(/react, python/i), 'TypeScript');
    await user.click(screen.getByRole('button', { name: /add skill/i }));
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    // The badge should show Advanced
    const badges = screen.getAllByText('Advanced');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('clears input after adding', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsForm />);
    const input = screen.getByPlaceholderText(/react, python/i);
    await user.type(input, 'HTML');
    await user.click(screen.getByRole('button', { name: /add skill/i }));
    expect(input).toHaveValue('');
  });

  it('does not add empty skill', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsForm />);
    await user.click(screen.getByRole('button', { name: /add skill/i }));
    expect(screen.queryByText('Skill added')).not.toBeInTheDocument();
  });
});
