import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCV } from '../context/CVContext';
import { useToast } from '../context/ToastContext';
import { exportDataAsJSON, importDataFromJSON } from '../utils/helpers';
import Header from '../components/layout/Header';
import './SettingsPage.css';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useCV();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = () => {
    try {
      exportDataAsJSON(state);
      toast.success('Data exported successfully');
    } catch {
      toast.error('Failed to export data');
    }
  };

  const handleImport = async () => {
    try {
      const data = await importDataFromJSON();
      dispatch({ type: 'IMPORT_DATA', payload: data });
      toast.success('Data imported successfully');
    } catch (err) {
      if (err.message !== 'No file selected') {
        toast.error(err.message || 'Failed to import data');
      }
    }
  };

  const handleClear = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    dispatch({ type: 'CLEAR_ALL' });
    setShowConfirm(false);
    toast.success('All data cleared');
  };

  return (
    <div className="page">
      <Header title="Settings" />
      <div className="page-content">
        <div className="card settings-item">
          <div className="settings-info">
            <strong>Dark Mode</strong>
            <span>Toggle dark/light theme</span>
          </div>
          <button className={`toggle ${theme === 'dark' ? 'on' : ''}`} onClick={toggleTheme} aria-label="Toggle dark mode">
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="card settings-item" style={{ marginTop: 12 }}>
          <div className="settings-info">
            <strong>Export Data</strong>
            <span>Download your CV data as JSON</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>Export</button>
        </div>

        <div className="card settings-item" style={{ marginTop: 12 }}>
          <div className="settings-info">
            <strong>Import Data</strong>
            <span>Load CV data from a JSON file</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleImport}>Import</button>
        </div>

        <div className="card settings-item danger-card" style={{ marginTop: 12 }}>
          <div className="settings-info">
            <strong>Clear All Data</strong>
            <span>Delete all CV data permanently</span>
          </div>
          <button className="btn btn-danger btn-sm" onClick={handleClear}>Clear</button>
        </div>

        <p className="settings-footer">CVFlow v1.0 — Built with React</p>
      </div>

      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Clear All Data?</h3>
            <p>This will permanently delete all your CV data. This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmClear}>Delete All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
