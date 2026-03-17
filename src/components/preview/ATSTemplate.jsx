import './ATSTemplate.css';

export default function ATSTemplate({ data }) {
  const { personalInfo, profile, experience, education, courses, skills, languages, projects } = data;

  return (
    <div className="cv-ats">
      <header className="ats-header">
        <h1 className="ats-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="ats-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.city && <span>{personalInfo.city}</span>}
        </div>
        <div className="ats-links">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {profile && (
        <section className="ats-section">
          <h2>Summary</h2>
          <p>{profile}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="ats-section">
          <h2>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="ats-entry">
              <div className="ats-entry-top">
                <strong>{exp.position}</strong>
                <span className="ats-date">{exp.startDate} – {exp.endDate || 'Present'}</span>
              </div>
              <div className="ats-company">{exp.company}</div>
              {exp.description && <p>{exp.description}</p>}
              {exp.achievements && (
                <ul>
                  {exp.achievements.split('\n').filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="ats-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="ats-entry">
              <div className="ats-entry-top">
                <strong>{edu.degree} in {edu.field}</strong>
                <span className="ats-date">{edu.startDate} – {edu.endDate || 'Present'}</span>
              </div>
              <div className="ats-company">{edu.institution}</div>
              {edu.gpa && <p>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="ats-section">
          <h2>Skills</h2>
          <p>{skills.map((s) => s.name).join(' • ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="ats-section">
          <h2>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="ats-entry">
              <strong>{proj.name}</strong>
              {proj.technologies && <span> | {proj.technologies}</span>}
              {proj.description && <p>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {courses.length > 0 && (
        <section className="ats-section">
          <h2>Certifications</h2>
          <ul>
            {courses.map((c) => <li key={c.id}>{c.name} — {c.institution} {c.date && `(${c.date})`}</li>)}
          </ul>
        </section>
      )}

      {languages.length > 0 && (
        <section className="ats-section">
          <h2>Languages</h2>
          <p>{languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}</p>
        </section>
      )}
    </div>
  );
}
