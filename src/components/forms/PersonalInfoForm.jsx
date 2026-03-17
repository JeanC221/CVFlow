import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import './Forms.css';

export default function PersonalInfoForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [form, setForm] = useState({ ...state.personalInfo });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim()])
    );
    dispatch({ type: 'SET_PERSONAL_INFO', payload: trimmed });
    toast.success('Personal info saved');
  };

  return (
    <div className="page">
      <Header title="Personal Info" showBack />
      <form className="page-content" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required maxLength={100} autoComplete="name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input name="email" type="email" inputMode="email" value={form.email} onChange={handleChange} placeholder="john@example.com" maxLength={254} autoComplete="email" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" maxLength={30} autoComplete="tel" />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" maxLength={200} inputMode="url" />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub</label>
          <input name="github" value={form.github} onChange={handleChange} placeholder="github.com/johndoe" maxLength={200} inputMode="url" />
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="New York, NY" maxLength={100} />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
