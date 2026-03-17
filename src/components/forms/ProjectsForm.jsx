import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import SortableList from '../SortableList';
import './Forms.css';

const emptyProject = { name: '', description: '', technologies: '', url: '' };

export default function ProjectsForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [form, setForm] = useState(emptyProject);
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
      dispatch({ type: 'UPDATE_ITEM', section: 'projects', payload: { ...trimmed, id: editId } });
      toast.success('Project updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'projects', payload: trimmed });
      toast.success('Project added');
    }
    setForm(emptyProject);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, technologies: item.technologies, url: item.url || '' });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_ITEM', section: 'projects', payload: deleteId });
    toast.info('Project removed');
    setDeleteId(null);
  };

  const handleReorder = (items) => {
    dispatch({ type: 'REORDER_ITEMS', section: 'projects', payload: items });
  };

  return (
    <div className="page">
      <Header title="Projects" showBack />
      <div className="page-content">
        <SortableList
          items={state.projects}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
          renderItem={(item) => (
            <div>
              <strong>{item.name}</strong>
              <p className="item-sub">{item.technologies}</p>
            </div>
          )}
        />

        {!showForm && (
          <button className="btn btn-primary" onClick={() => { setForm(emptyProject); setEditId(null); setShowForm(true); }} style={{ marginTop: 16 }}>
            + Add Project
          </button>
        )}

        {showForm && (
          <form className="card form-card" onSubmit={handleSubmit}>
            <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Project</h3>
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Project name" required maxLength={200} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What does this project do?" maxLength={2000} />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies</label>
              <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, PostgreSQL" maxLength={500} />
            </div>
            <div className="form-group">
              <label className="form-label">URL (optional)</label>
              <input name="url" value={form.url} onChange={handleChange} placeholder="Project link" maxLength={500} inputMode="url" />
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
            <h3>Delete Project?</h3>
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
