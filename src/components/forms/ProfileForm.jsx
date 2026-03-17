import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import './Forms.css';

export default function ProfileForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [profile, setProfile] = useState(state.profile);
  const maxChars = 2000;

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_PROFILE', payload: profile.trim() });
    toast.success('Profile saved');
  };

  return (
    <div className="page">
      <Header title="Professional Profile" showBack />
      <form className="page-content" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">Professional Summary</label>
          <textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="Briefly describe your professional background, key skills, and career goals..."
            rows={6}
            maxLength={maxChars}
          />
          <span className="char-count">{profile.length}/{maxChars}</span>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
