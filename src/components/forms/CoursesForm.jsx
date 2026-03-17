import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import SortableList from '../SortableList';
import './Forms.css';

const emptyCourse = { name: '', institution: '', date: '', url: '' };

export default function CoursesForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [form, setForm] = useState(emptyCourse);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'courses', payload: { ...form, id: editId } });
      toast.success('Course updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'courses', payload: form });
      toast.success('Course added');
    }
    setForm(emptyCourse);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, institution: item.institution, date: item.date, url: item.url || '' });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', section: 'courses', payload: id });
    toast.info('Course removed');
  };

  const handleReorder = (items) => {
    dispatch({ type: 'REORDER_ITEMS', section: 'courses', payload: items });
  };

  return (
    <div className="page">
      <Header title="Courses & Certifications" showBack />
      <div className="page-content">
        <SortableList
          items={state.courses}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderItem={(item) => (
            <div>
              <strong>{item.name}</strong>
              <p className="item-sub">{item.institution} • {item.date}</p>
            </div>
          )}
        />

        {!showForm && (
          <button className="btn btn-primary" onClick={() => { setForm(emptyCourse); setEditId(null); setShowForm(true); }} style={{ marginTop: 16 }}>
            + Add Course
          </button>
        )}

        {showForm && (
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Course</h3>
            <div className="form-group">
              <label className="form-label">Course Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Course or certification name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input name="institution" value={form.institution} onChange={handleChange} placeholder="Coursera, Udemy, etc." required />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input name="date" value={form.date} onChange={handleChange} placeholder="2023" />
            </div>
            <div className="form-group">
              <label className="form-label">URL (optional)</label>
              <input name="url" value={form.url} onChange={handleChange} placeholder="Certificate link" />
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
