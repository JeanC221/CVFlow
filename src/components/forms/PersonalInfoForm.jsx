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
    dispatch({ type: 'SET_PERSONAL_INFO', payload: form });
    toast.success('Personal info saved');
  };

  return (
    <div className="page">
      <Header title="Personal Info" showBack />
      <form className="page-content" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub</label>
          <input name="github" value={form.github} onChange={handleChange} placeholder="github.com/johndoe" />
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="New York, NY" />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
