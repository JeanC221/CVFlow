import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import Dashboard from '../../pages/Dashboard';

describe('Dashboard', () => {
  it('renders CVFlow title', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('CVFlow')).toBeInTheDocument();
  });

  it('shows completion percentage', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('CV Completion')).toBeInTheDocument();
  });

  it('renders all 8 section cards', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders section descriptions', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('Name, email, phone & links')).toBeInTheDocument();
    expect(screen.getByText('Professional summary')).toBeInTheDocument();
    expect(screen.getByText('Work history & achievements')).toBeInTheDocument();
  });

  it('section cards are clickable buttons', () => {
    renderWithProviders(<Dashboard />);
    const buttons = screen.getAllByRole('button');
    // 8 section cards are buttons
    const sectionButtons = buttons.filter(b => b.classList.contains('section-card'));
    expect(sectionButtons).toHaveLength(8);
  });
});
