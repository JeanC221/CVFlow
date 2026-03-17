import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import './Forms.css';

const proficiencies = ['Native', 'Advanced', 'Intermediate', 'Basic'];

export default function LanguagesForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('Intermediate');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'languages', payload: { id: editId, name, proficiency } });
      toast.success('Language updated');
      setEditId(null);
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'languages', payload: { name, proficiency } });
      toast.success('Language added');
    }
    setName('');
    setProficiency('Intermediate');
  };

  const handleEdit = (item) => {
    setName(item.name);
    setProficiency(item.proficiency);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', section: 'languages', payload: id });
    toast.info('Language removed');
    if (editId === id) { setEditId(null); setName(''); setProficiency('Intermediate'); }
  };

  return (
    <div className="page">
      <Header title="Languages" showBack />
      <div className="page-content">
        <div className="skills-list">
          {state.languages.map((lang) => (
            <div key={lang.id} className="skill-chip">
              <span className="skill-name">{lang.name}</span>
              <span className="badge badge-blue">{lang.proficiency}</span>
              <div className="skill-actions">
                <button className="icon-btn" onClick={() => handleEdit(lang)} title="Edit">✎</button>
                <button className="icon-btn danger" onClick={() => handleDelete(lang.id)} title="Delete">×</button>
              </div>
            </div>
          ))}
        </div>

        <form className="card form-card" onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Language</h3>
          <div className="form-group">
            <label className="form-label">Language</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="English, Spanish, etc." required />
          </div>
          <div className="form-group">
            <label className="form-label">Proficiency</label>
            <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
              {proficiencies.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-actions">
            {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setName(''); setProficiency('Intermediate'); }}>Cancel</button>}
            <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add Language'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
