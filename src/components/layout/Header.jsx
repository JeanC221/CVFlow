import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ title, showBack = false, actions }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button className="header-back" onClick={() => navigate(-1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}
