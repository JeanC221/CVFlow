import { useCV } from '../context/CVContext';
import Header from '../components/layout/Header';
import './TemplatesPage.css';

const templates = [
  { id: 'harvard', name: 'Harvard Classic', desc: 'Traditional serif layout with classic typography. Perfect for academia and corporate roles.', preview: 'serif' },
  { id: 'ats', name: 'ATS Modern', desc: 'Clean sans-serif design optimized for Applicant Tracking Systems.', preview: 'sans' },
];

export default function TemplatesPage() {
  const { state, dispatch } = useCV();

  return (
    <div className="page">
      <Header title="Templates" />
      <div className="page-content">
        <p className="templates-intro">Choose a template for your CV</p>
        <div className="templates-grid">
          {templates.map((t) => (
            <button
              key={t.id}
              className={`template-card card ${state.selectedTemplate === t.id ? 'selected' : ''}`}
              onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
            >
              <div className={`template-preview ${t.preview}`}>
                <div className="tp-line tp-name" />
                <div className="tp-line tp-contact" />
                <div className="tp-divider" />
                <div className="tp-line tp-section" />
                <div className="tp-line tp-text" />
                <div className="tp-line tp-text short" />
              </div>
              <div className="template-info">
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </div>
              {state.selectedTemplate === t.id && <span className="template-check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
