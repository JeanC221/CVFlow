// Prepared architecture for future Groq API integration
// To integrate: set VITE_GROQ_API_KEY in .env and implement the fetch calls

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateProfessionalSummary(personalInfo, experience) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env');
  }
  // Future: call Groq API here
  return null;
}

export async function improveDescription(text) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env');
  }
  // Future: call Groq API here
  return null;
}

export function isAIAvailable() {
  return !!import.meta.env.VITE_GROQ_API_KEY;
}
