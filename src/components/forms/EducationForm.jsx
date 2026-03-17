import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import SortableList from '../SortableList';
import './Forms.css';

const emptyEdu = { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };

export default function EducationForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [form, setForm] = useState(emptyEdu);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'education', payload: { ...form, id: editId } });
      toast.success('Education updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'education', payload: form });
      toast.success('Education added');
    }
    setForm(emptyEdu);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ institution: item.institution, degree: item.degree, field: item.field, startDate: item.startDate, endDate: item.endDate, gpa: item.gpa || '' });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', section: 'education', payload: id });
    toast.info('Education entry removed');
  };

  const handleReorder = (items) => {
    dispatch({ type: 'REORDER_ITEMS', section: 'education', payload: items });
  };

  return (
    <div className="page">
      <Header title="Education" showBack />
      <div className="page-content">
        <SortableList
          items={state.education}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderItem={(item) => (
            <div>
              <strong>{item.degree} in {item.field}</strong>
              <p className="item-sub">{item.institution} • {item.startDate} – {item.endDate || 'Present'}</p>
            </div>
          )}
        />

        {!showForm && (
          <button className="btn btn-primary" onClick={() => { setForm(emptyEdu); setEditId(null); setShowForm(true); }} style={{ marginTop: 16 }}>
            + Add Education
          </button>
        )}

        {showForm && (
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Education</h3>
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input name="institution" value={form.institution} onChange={handleChange} placeholder="University name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input name="degree" value={form.degree} onChange={handleChange} placeholder="Bachelor's" required />
            </div>
            <div className="form-group">
              <label className="form-label">Field</label>
              <input name="field" value={form.field} onChange={handleChange} placeholder="Computer Science" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="2018" required />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="2022" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">GPA (optional)</label>
              <input name="gpa" value={form.gpa} onChange={handleChange} placeholder="3.8/4.0" />
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
