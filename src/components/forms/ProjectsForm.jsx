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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'projects', payload: { ...form, id: editId } });
      toast.success('Project updated');
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'projects', payload: form });
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
    dispatch({ type: 'DELETE_ITEM', section: 'projects', payload: id });
    toast.info('Project removed');
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
              <label className="form-label">Project Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Project name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What does this project do?" />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies</label>
              <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div className="form-group">
              <label className="form-label">URL (optional)</label>
              <input name="url" value={form.url} onChange={handleChange} placeholder="Project link" />
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
