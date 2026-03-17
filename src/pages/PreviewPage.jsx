import { useRef, useState } from 'react';
import { useCV } from '../context/CVContext';
import { useToast } from '../context/ToastContext';
import Header from '../components/layout/Header';
import HarvardTemplate from '../components/preview/HarvardTemplate';
import ATSTemplate from '../components/preview/ATSTemplate';
import './PreviewPage.css';

export default function PreviewPage() {
  const { state } = useCV();
  const toast = useToast();
  const cvRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const hasContent = state.personalInfo.fullName || state.profile ||
    state.experience.length > 0 || state.education.length > 0 ||
    state.skills.length > 0;

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = cvRef.current;
      if (!element) throw new Error('Preview not available');

      await html2pdf()
        .set({
          margin: 0,
          filename: `${state.personalInfo.fullName || 'cv'}-cvflow.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save();
      
      toast.success('PDF exported successfully');
    } catch {
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const TemplateComponent = state.selectedTemplate === 'ats' ? ATSTemplate : HarvardTemplate;

  return (
    <div className="page">
      <Header
        title="Preview"
        actions={
          hasContent && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? (
                <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Exporting...</>
              ) : (
                'Export PDF'
              )}
            </button>
          )
        }
      />
      <div className="page-content preview-scroll">
        {hasContent ? (
          <div className="cv-wrapper" ref={cvRef}>
            <TemplateComponent data={state} />
          </div>
        ) : (
          <div className="preview-empty">
            <span className="preview-empty-icon">📄</span>
            <h3>Your CV is empty</h3>
            <p>Start by adding your personal info, experience, and skills from the Home screen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
