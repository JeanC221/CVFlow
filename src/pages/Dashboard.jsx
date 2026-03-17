import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import { getCompletionPercentage } from '../utils/helpers';
import Header from '../components/layout/Header';
import './Dashboard.css';

const sections = [
  { key: 'personal', path: '/edit/personal', title: 'Personal Info', desc: 'Name, email, phone & links', icon: '👤' },
  { key: 'profile', path: '/edit/profile', title: 'Profile', desc: 'Professional summary', icon: '📝' },
  { key: 'experience', path: '/edit/experience', title: 'Experience', desc: 'Work history & achievements', icon: '💼' },
  { key: 'education', path: '/edit/education', title: 'Education', desc: 'Degrees & institutions', icon: '🎓' },
  { key: 'courses', path: '/edit/courses', title: 'Courses', desc: 'Certifications & training', icon: '📜' },
  { key: 'skills', path: '/edit/skills', title: 'Skills', desc: 'Technical & soft skills', icon: '⚡' },
  { key: 'languages', path: '/edit/languages', title: 'Languages', desc: 'Language proficiencies', icon: '🌐' },
  { key: 'projects', path: '/edit/projects', title: 'Projects', desc: 'Personal & professional projects', icon: '🚀' },
];

export default function Dashboard() {
  const { state } = useCV();
  const navigate = useNavigate();
  const percentage = getCompletionPercentage(state);

  return (
    <div className="page">
      <Header title="CVFlow" />
      <div className="page-content">
        <div className="progress-card card">
          <div className="progress-info">
            <span className="progress-label">CV Completion</span>
            <span className="progress-pct">{percentage}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="sections-grid">
          {sections.map((s) => (
            <button key={s.key} className="section-card card" onClick={() => navigate(s.path)}>
              <span className="section-icon">{s.icon}</span>
              <div className="section-text">
                <strong>{s.title}</strong>
                <span className="section-desc">{s.desc}</span>
              </div>
              <svg className="section-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
