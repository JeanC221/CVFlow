import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils';
import SettingsPage from '../../pages/SettingsPage';

describe('SettingsPage', () => {
  it('renders Settings title', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('shows Dark Mode toggle', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('shows Export button', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('shows Import button', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Import')).toBeInTheDocument();
  });

  it('shows Clear button', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('shows confirm dialog on clear click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SettingsPage />);
    await user.click(screen.getByText('Clear'));
    expect(screen.getByText('Clear All Data?')).toBeInTheDocument();
    expect(screen.getByText(/permanently delete/i)).toBeInTheDocument();
  });

  it('cancel dismiss confirm dialog', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SettingsPage />);
    await user.click(screen.getByText('Clear'));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText('Clear All Data?')).not.toBeInTheDocument();
  });

  it('confirm clears data and shows toast', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SettingsPage />);
    await user.click(screen.getByText('Clear'));
    await user.click(screen.getByRole('button', { name: /delete all/i }));
    expect(screen.getByText('All data cleared')).toBeInTheDocument();
  });

  it('shows version footer', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText(/CVFlow v1.0/)).toBeInTheDocument();
  });
});
