export function exportDataAsJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cvflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

const ALLOWED_KEYS = ['personalInfo', 'profile', 'experience', 'education', 'courses', 'skills', 'languages', 'projects', 'selectedTemplate'];
const MAX_IMPORT_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.slice(0, 5000);
}

function sanitizeObject(obj, allowedFields) {
  if (!obj || typeof obj !== 'object') return {};
  const clean = {};
  for (const key of allowedFields) {
    if (key in obj) {
      clean[key] = typeof obj[key] === 'string' ? sanitizeString(obj[key]) : obj[key];
    }
  }
  return clean;
}

function validateImportData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid data format');
  }

  const clean = {};

  // Strip any keys not in ALLOWED_KEYS
  for (const key of ALLOWED_KEYS) {
    if (key in data) clean[key] = data[key];
  }

  // Validate personalInfo
  if (clean.personalInfo && typeof clean.personalInfo === 'object') {
    clean.personalInfo = sanitizeObject(clean.personalInfo, ['fullName', 'email', 'phone', 'linkedin', 'github', 'city']);
  }

  // Validate profile
  if (clean.profile) clean.profile = sanitizeString(clean.profile);

  // Validate arrays
  const arraySections = ['experience', 'education', 'courses', 'skills', 'languages', 'projects'];
  for (const section of arraySections) {
    if (clean[section]) {
      if (!Array.isArray(clean[section])) {
        clean[section] = [];
      } else {
        clean[section] = clean[section].slice(0, 200).map((item) => {
          if (!item || typeof item !== 'object') return null;
          const sanitized = {};
          for (const [k, v] of Object.entries(item)) {
            sanitized[k] = typeof v === 'string' ? sanitizeString(v) : v;
          }
          return sanitized;
        }).filter(Boolean);
      }
    }
  }

  // Validate selectedTemplate
  if (clean.selectedTemplate && !['harvard', 'ats'].includes(clean.selectedTemplate)) {
    clean.selectedTemplate = 'harvard';
  }

  return clean;
}

export function importDataFromJSON() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return reject(new Error('No file selected'));
      if (file.size > MAX_IMPORT_SIZE) return reject(new Error('File too large (max 5MB)'));
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const raw = JSON.parse(ev.target.result);
          const validated = validateImportData(raw);
          resolve(validated);
        } catch (err) {
          reject(new Error(err.message || 'Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };
    input.click();
  });
}

export function getCompletionPercentage(state) {
  const sections = [
    state.personalInfo.fullName,
    state.profile,
    state.experience.length > 0,
    state.education.length > 0,
    state.courses.length > 0,
    state.skills.length > 0,
    state.languages.length > 0,
    state.projects.length > 0,
  ];
  const filled = sections.filter(Boolean).length;
  return Math.round((filled / sections.length) * 100);
}
