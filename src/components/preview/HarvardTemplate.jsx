import './HarvardTemplate.css';

export default function HarvardTemplate({ data }) {
  const { personalInfo, profile, experience, education, courses, skills, languages, projects } = data;

  return (
    <div className="cv-harvard">
      <header className="cv-header">
        <h1 className="cv-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="cv-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.city, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </header>

      {profile && (
        <section className="cv-section">
          <h2 className="cv-section-title">Professional Profile</h2>
          <p>{profile}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <strong>{exp.position}</strong>
                  <span className="cv-company">{exp.company}</span>
                </div>
                <span className="cv-date">{exp.startDate} – {exp.endDate || 'Present'}</span>
              </div>
              {exp.description && <p>{exp.description}</p>}
              {exp.achievements && (
                <ul className="cv-achievements">
                  {exp.achievements.split('\n').filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <strong>{edu.degree} in {edu.field}</strong>
                  <span className="cv-company">{edu.institution}</span>
                </div>
                <span className="cv-date">{edu.startDate} – {edu.endDate || 'Present'}</span>
              </div>
              {edu.gpa && <p>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="cv-entry">
              <strong>{proj.name}</strong>
              {proj.technologies && <span className="cv-tech"> — {proj.technologies}</span>}
              {proj.description && <p>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Skills</h2>
          <p>{skills.map((s) => `${s.name} (${s.level})`).join(', ')}</p>
        </section>
      )}

      {courses.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Courses & Certifications</h2>
          {courses.map((c) => (
            <div key={c.id} className="cv-entry">
              <strong>{c.name}</strong> — {c.institution} {c.date && `(${c.date})`}
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-title">Languages</h2>
          <p>{languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>
        </section>
      )}
    </div>
  );
}
