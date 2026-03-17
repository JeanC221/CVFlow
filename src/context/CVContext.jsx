import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CVContext = createContext();

const STORAGE_KEY = 'cvflow_data';

const defaultState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    city: '',
  },
  profile: '',
  experience: [],
  education: [],
  courses: [],
  skills: [],
  languages: [],
  projects: [],
  selectedTemplate: 'harvard',
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  } catch {
    return defaultState;
  }
}

function cvReducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'ADD_ITEM':
      return {
        ...state,
        [action.section]: [
          ...state[action.section],
          { ...action.payload, id: uuidv4() },
        ],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        [action.section]: state[action.section].map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        [action.section]: state[action.section].filter(
          (item) => item.id !== action.payload
        ),
      };
    case 'REORDER_ITEMS':
      return { ...state, [action.section]: action.payload };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'IMPORT_DATA':
      return { ...defaultState, ...action.payload };
    case 'CLEAR_ALL':
      return defaultState;
    default:
      return state;
  }
}

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, null, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage quota exceeded or unavailable — data stays in memory
      console.warn('CVFlow: Could not save to localStorage', e);
    }
  }, [state]);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV must be used within CVProvider');
  return context;
}
