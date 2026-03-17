import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './testUtils';
import App from '../App';

describe('App Routing', () => {
  it('renders Dashboard on /', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText('CVFlow')).toBeInTheDocument();
    expect(screen.getByText('CV Completion')).toBeInTheDocument();
  });

  it('renders Settings on /settings', () => {
    renderWithProviders(<App />, { route: '/settings' });
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('renders PersonalInfoForm on /edit/personal', () => {
    renderWithProviders(<App />, { route: '/edit/personal' });
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });

  it('renders ProfileForm on /edit/profile', () => {
    renderWithProviders(<App />, { route: '/edit/profile' });
    expect(screen.getByText('Professional Profile')).toBeInTheDocument();
  });

  it('renders ExperienceForm on /edit/experience', () => {
    renderWithProviders(<App />, { route: '/edit/experience' });
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('+ Add Experience')).toBeInTheDocument();
  });

  it('renders EducationForm on /edit/education', () => {
    renderWithProviders(<App />, { route: '/edit/education' });
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('+ Add Education')).toBeInTheDocument();
  });

  it('renders SkillsForm on /edit/skills', () => {
    renderWithProviders(<App />, { route: '/edit/skills' });
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders LanguagesForm on /edit/languages', () => {
    renderWithProviders(<App />, { route: '/edit/languages' });
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('renders CoursesForm on /edit/courses', () => {
    renderWithProviders(<App />, { route: '/edit/courses' });
    expect(screen.getByText('Courses & Certifications')).toBeInTheDocument();
  });

  it('renders ProjectsForm on /edit/projects', () => {
    renderWithProviders(<App />, { route: '/edit/projects' });
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders bottom nav on all pages', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  it('navigates from dashboard to settings via bottom nav', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });
    await user.click(screen.getByText('Settings'));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('navigates from dashboard to personal info', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });
    await user.click(screen.getByText('Personal Info'));
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });
});
