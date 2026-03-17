import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useToast } from '../../context/ToastContext';
import Header from '../layout/Header';
import './Forms.css';

const levels = ['Basic', 'Intermediate', 'Advanced'];
const levelColors = { Advanced: 'badge-blue', Intermediate: 'badge-green', Basic: 'badge-yellow' };

export default function SkillsForm() {
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editId) {
      dispatch({ type: 'UPDATE_ITEM', section: 'skills', payload: { id: editId, name: name.trim(), level } });
      toast.success('Skill updated');
      setEditId(null);
    } else {
      dispatch({ type: 'ADD_ITEM', section: 'skills', payload: { name: name.trim(), level } });
      toast.success('Skill added');
    }
    setName('');
    setLevel('Intermediate');
  };

  const handleEdit = (item) => {
    setName(item.name);
    setLevel(item.level);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', section: 'skills', payload: id });
    toast.info('Skill removed');
    if (editId === id) { setEditId(null); setName(''); setLevel('Intermediate'); }
  };

  return (
    <div className="page">
      <Header title="Skills" showBack />
      <div className="page-content">
        <div className="skills-list">
          {state.skills.map((skill) => (
            <div key={skill.id} className="skill-chip">
              <span className="skill-name">{skill.name}</span>
              <span className={`badge ${levelColors[skill.level] || 'badge-green'}`}>{skill.level}</span>
              <div className="skill-actions">
                <button className="icon-btn" onClick={() => handleEdit(skill)} title="Edit">✎</button>
                <button className="icon-btn danger" onClick={() => handleDelete(skill.id)} title="Delete">×</button>
              </div>
            </div>
          ))}
        </div>

        <form className="card form-card" onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <h3 className="form-card-title">{editId ? 'Edit' : 'Add'} Skill</h3>
          <div className="form-group">
            <label className="form-label">Skill Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="React, Python, etc." required maxLength={100} />
          </div>
          <div className="form-group">
            <label className="form-label">Level</label>
            <div className="level-select">
              {levels.map((l) => (
                <button key={l} type="button" className={`level-btn ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="form-actions">
            {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setName(''); setLevel('Intermediate'); }}>Cancel</button>}
            <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add Skill'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
