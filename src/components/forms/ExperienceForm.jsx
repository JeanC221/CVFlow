import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import SortableList from '../SortableList';
import './Forms.css';

const emptyExp = { company: '', position: '', startDate: '', endDate: '', description: '', achievements: '' };

export default function ExperienceForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [form, setForm] = useState(emptyExp);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'experience', payload: { ...form, id: editId } });
      toast.success('Experience updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'experience', payload: form });
      toast.success('Experience added');
    }
    setForm(emptyExp);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ company: item.company, position: item.position, startDate: item.startDate, endDate: item.endDate, description: item.description, achievements: item.achievements || '' });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', section: 'experience', payload: id });
    toast.info('Experience removed');
  };

  const handleReorder = (items) => {
    dispatch({ type: 'REORDER_ITEMS', section: 'experience', payload: items });
  };

  return (
    <div className="page">
      <Header title="Experience" showBack />
      <div className="page-content">
        <SortableList
          items={state.experience}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderItem={(item) => (
            <div>
              <strong>{item.position}</strong>
              <p className="item-sub">{item.company} • {item.startDate} – {item.endDate || 'Present'}</p>
            </div>
          )}
        />

        {!showForm && (
          <button className="btn btn-primary" onClick={() => { setForm(emptyExp); setEditId(null); setShowForm(true); }} style={{ marginTop: 16 }}>
            + Add Experience
          </button>
        )}

        {showForm && (
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Experience</h3>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <input name="position" value={form.position} onChange={handleChange} placeholder="Job title" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Jan 2020" required />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="Present" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Brief description of your role" />
            </div>
            <div className="form-group">
              <label className="form-label">Achievements (one per line)</label>
              <textarea name="achievements" value={form.achievements} onChange={handleChange} placeholder="Led a team of 5 developers&#10;Increased sales by 20%" rows={4} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
