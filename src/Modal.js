import React, { useEffect } from 'react';

export default function Modal({ id, data, onClose }) {
  const content = data[id];

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!content) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-panel" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <Content data={content} />
      </div>
    </div>
  );
}

function Content({ data }) {
  switch (data.type) {
    case 'about':     return <AboutContent d={data} />;
    case 'education': return <EduContent d={data} />;
    case 'work':      return <WorkContent d={data} />;
    case 'project':   return <ProjectContent d={data} />;
    case 'skills':    return <SkillsContent d={data} />;
    default:          return null;
  }
}

function Tag({ children }) {
  return <div className="mc-tag">{children}</div>;
}

function AboutContent({ d }) {
  return (
    <div className="mc-about">
      <Tag>about.txt</Tag>
      <h2>{d.name}</h2>
      <p className="mc-role">{d.role}</p>
      <p className="mc-desc">{d.description}</p>
      <div className="mc-links">
        <a href={`mailto:${d.email}`}>{d.email}</a>
        <span>{d.phone}</span>
        <a href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={d.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </div>
  );
}

function EduContent({ d }) {
  return (
    <div>
      <Tag>education.json</Tag>
      <h2>{d.school}</h2>
      <p className="mc-location">{d.location}</p>
      <p className="mc-degree">{d.degree}</p>
      <p className="mc-minor">{d.minor}</p>
      <div className="mc-meta">
        <span>Graduating: {d.graduation}</span>
        <span>GPA: {d.gpa}</span>
      </div>
      <div className="mc-section-label">Coursework</div>
      <div className="mc-tags">
        {d.courses.map((c) => <span key={c} className="mc-chip">{c}</span>)}
      </div>
    </div>
  );
}

function WorkContent({ d }) {
  return (
    <div>
      <Tag>experience.log</Tag>
      <h2>{d.company}</h2>
      <p className="mc-role">{d.role}</p>
      <div className="mc-meta">
        <span>{d.location}</span>
        <span>{d.period}</span>
      </div>
      <ul className="mc-bullets">
        {d.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function ProjectContent({ d }) {
  return (
    <div>
      <Tag>project.md</Tag>
      <h2>{d.name}</h2>
      <p className="mc-subtitle">{d.subtitle}</p>
      <p className="mc-period">{d.period}</p>
      <div className="mc-tags">
        {d.tech.map((t) => <span key={t} className="mc-chip mc-chip-accent">{t}</span>)}
      </div>
      <ul className="mc-bullets">
        {d.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function SkillsContent({ d }) {
  return (
    <div>
      <Tag>skills.yml</Tag>
      <h2>Technical Skills</h2>
      <div className="mc-skill-grid">
        {d.categories.map((cat) => (
          <div key={cat.name} className="mc-skill-cat">
            <div className="mc-skill-cat-name">{cat.name}</div>
            <div className="mc-tags">
              {cat.items.map((item) => (
                <span key={item} className="mc-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
