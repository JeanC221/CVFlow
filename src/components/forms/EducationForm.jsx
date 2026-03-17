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
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const trimForm = (f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.trim()]));

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = trimForm(form);
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'education', payload: { ...trimmed, id: editId } });
      toast.success('Education updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'education', payload: trimmed });
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
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_ITEM', section: 'education', payload: deleteId });
    toast.info('Education entry removed');
    setDeleteId(null);
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
              <label className="form-label">Institution *</label>
              <input name="institution" value={form.institution} onChange={handleChange} placeholder="University name" required maxLength={200} />
            </div>
            <div className="form-group">
              <label className="form-label">Degree *</label>
              <input name="degree" value={form.degree} onChange={handleChange} placeholder="Bachelor's" required maxLength={200} />
            </div>
            <div className="form-group">
              <label className="form-label">Field *</label>
              <input name="field" value={form.field} onChange={handleChange} placeholder="Computer Science" required maxLength={200} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date *</label>
                <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="2018" required maxLength={20} />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="2022" maxLength={20} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">GPA (optional)</label>
              <input name="gpa" value={form.gpa} onChange={handleChange} placeholder="3.8/4.0" maxLength={20} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        )}
      </div>

      {deleteId && (
        <div className="confirm-overlay" onClick={() => setDeleteId(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Education?</h3>
            <p>This entry will be permanently removed.</p>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
