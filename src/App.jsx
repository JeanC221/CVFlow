import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import ScrollToTop from './components/ScrollToTop';
import OfflineIndicator from './components/OfflineIndicator';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import PreviewPage from './pages/PreviewPage';
import TemplatesPage from './pages/TemplatesPage';
import SettingsPage from './pages/SettingsPage';
import PersonalInfoForm from './components/forms/PersonalInfoForm';
import ProfileForm from './components/forms/ProfileForm';
import ExperienceForm from './components/forms/ExperienceForm';
import EducationForm from './components/forms/EducationForm';
import CoursesForm from './components/forms/CoursesForm';
import SkillsForm from './components/forms/SkillsForm';
import LanguagesForm from './components/forms/LanguagesForm';
import ProjectsForm from './components/forms/ProjectsForm';
import './App.css';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="app-layout">
        <OfflineIndicator />
        <ScrollToTop />
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/edit/personal" element={<PersonalInfoForm />} />
            <Route path="/edit/profile" element={<ProfileForm />} />
            <Route path="/edit/experience" element={<ExperienceForm />} />
            <Route path="/edit/education" element={<EducationForm />} />
            <Route path="/edit/courses" element={<CoursesForm />} />
            <Route path="/edit/skills" element={<SkillsForm />} />
            <Route path="/edit/languages" element={<LanguagesForm />} />
            <Route path="/edit/projects" element={<ProjectsForm />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </ErrorBoundary>
  );
}
