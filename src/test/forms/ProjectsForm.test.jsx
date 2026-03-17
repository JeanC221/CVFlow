import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import ProjectsForm from '../../components/forms/ProjectsForm';

describe('ProjectsForm', () => {
  it('renders header', () => {
    renderWithProviders(<ProjectsForm />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('shows add button', () => {
    renderWithProviders(<ProjectsForm />);
    expect(screen.getByText('+ Add Project')).toBeInTheDocument();
  });

  it('opens form with fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsForm />);
    await user.click(screen.getByText('+ Add Project'));
    expect(screen.getByPlaceholderText('Project name')).toBeRequired();
    expect(screen.getByPlaceholderText(/what does this project/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/react, node/i)).toBeInTheDocument();
  });

  it('adds project', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsForm />);
    await user.click(screen.getByText('+ Add Project'));
    await user.type(screen.getByPlaceholderText('Project name'), 'CVFlow');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('Project added')).toBeInTheDocument();
    expect(screen.getByText('CVFlow')).toBeInTheDocument();
  });

  it('has url field with inputMode url', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsForm />);
    await user.click(screen.getByText('+ Add Project'));
    const urlInput = screen.getByPlaceholderText('Project link');
    expect(urlInput).toHaveAttribute('inputmode', 'url');
    expect(urlInput).toHaveAttribute('maxlength', '500');
  });

  it('cancel button hides form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsForm />);
    await user.click(screen.getByText('+ Add Project'));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByPlaceholderText('Project name')).not.toBeInTheDocument();
  });
});
