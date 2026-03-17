import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CVProvider, useCV } from '../../context/CVContext';

function wrapper({ children }) {
  return <CVProvider>{children}</CVProvider>;
}

describe('CVContext', () => {
  it('provides default state', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    expect(result.current.state.personalInfo.fullName).toBe('');
    expect(result.current.state.profile).toBe('');
    expect(result.current.state.experience).toEqual([]);
    expect(result.current.state.education).toEqual([]);
    expect(result.current.state.skills).toEqual([]);
    expect(result.current.state.languages).toEqual([]);
    expect(result.current.state.courses).toEqual([]);
    expect(result.current.state.projects).toEqual([]);
    expect(result.current.state.selectedTemplate).toBe('harvard');
  });

  it('SET_PERSONAL_INFO updates personalInfo', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({
        type: 'SET_PERSONAL_INFO',
        payload: { fullName: 'John Doe', email: 'john@test.com', phone: '', linkedin: '', github: '', city: '' },
      });
    });
    expect(result.current.state.personalInfo.fullName).toBe('John Doe');
    expect(result.current.state.personalInfo.email).toBe('john@test.com');
  });

  it('SET_PROFILE updates profile', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'SET_PROFILE', payload: 'Senior developer' });
    });
    expect(result.current.state.profile).toBe('Senior developer');
  });

  it('ADD_ITEM adds to experience', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        section: 'experience',
        payload: { company: 'Acme', position: 'Dev', startDate: '2020', endDate: '2023', description: '', achievements: '' },
      });
    });
    expect(result.current.state.experience).toHaveLength(1);
    expect(result.current.state.experience[0].company).toBe('Acme');
    expect(result.current.state.experience[0].id).toBeDefined();
  });

  it('UPDATE_ITEM modifies existing item', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        section: 'skills',
        payload: { name: 'React', level: 'Advanced' },
      });
    });
    const id = result.current.state.skills[0].id;
    act(() => {
      result.current.dispatch({
        type: 'UPDATE_ITEM',
        section: 'skills',
        payload: { id, name: 'React.js', level: 'Advanced' },
      });
    });
    expect(result.current.state.skills[0].name).toBe('React.js');
  });

  it('DELETE_ITEM removes item by id', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({
        type: 'ADD_ITEM',
        section: 'skills',
        payload: { name: 'Vue', level: 'Basic' },
      });
    });
    const id = result.current.state.skills[0].id;
    act(() => {
      result.current.dispatch({ type: 'DELETE_ITEM', section: 'skills', payload: id });
    });
    expect(result.current.state.skills).toHaveLength(0);
  });

  it('REORDER_ITEMS replaces section array', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'ADD_ITEM', section: 'skills', payload: { name: 'A', level: 'Basic' } });
      result.current.dispatch({ type: 'ADD_ITEM', section: 'skills', payload: { name: 'B', level: 'Advanced' } });
    });
    const reversed = [...result.current.state.skills].reverse();
    act(() => {
      result.current.dispatch({ type: 'REORDER_ITEMS', section: 'skills', payload: reversed });
    });
    expect(result.current.state.skills[0].name).toBe('B');
    expect(result.current.state.skills[1].name).toBe('A');
  });

  it('SET_TEMPLATE changes selected template', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'SET_TEMPLATE', payload: 'ats' });
    });
    expect(result.current.state.selectedTemplate).toBe('ats');
  });

  it('IMPORT_DATA replaces state with imported data', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    const importData = {
      personalInfo: { fullName: 'Jane', email: 'jane@test.com', phone: '', linkedin: '', github: '', city: 'NYC' },
      profile: 'Designer',
      experience: [],
      education: [],
      courses: [],
      skills: [{ id: '1', name: 'Figma', level: 'Advanced' }],
      languages: [],
      projects: [],
      selectedTemplate: 'ats',
    };
    act(() => {
      result.current.dispatch({ type: 'IMPORT_DATA', payload: importData });
    });
    expect(result.current.state.personalInfo.fullName).toBe('Jane');
    expect(result.current.state.skills[0].name).toBe('Figma');
    expect(result.current.state.selectedTemplate).toBe('ats');
  });

  it('CLEAR_ALL resets to default state', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'SET_PROFILE', payload: 'Something' });
      result.current.dispatch({ type: 'ADD_ITEM', section: 'skills', payload: { name: 'Test', level: 'Basic' } });
    });
    expect(result.current.state.profile).toBe('Something');
    act(() => {
      result.current.dispatch({ type: 'CLEAR_ALL' });
    });
    expect(result.current.state.profile).toBe('');
    expect(result.current.state.skills).toEqual([]);
  });

  it('persists state to localStorage', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'SET_PROFILE', payload: 'Stored profile' });
    });
    const saved = JSON.parse(localStorage.getItem('cvflow_data'));
    expect(saved.profile).toBe('Stored profile');
  });

  it('loads state from localStorage on init', () => {
    const stored = {
      personalInfo: { fullName: 'Saved User', email: '', phone: '', linkedin: '', github: '', city: '' },
      profile: 'From storage',
      experience: [],
      education: [],
      courses: [],
      skills: [],
      languages: [],
      projects: [],
      selectedTemplate: 'harvard',
    };
    localStorage.setItem('cvflow_data', JSON.stringify(stored));
    const { result } = renderHook(() => useCV(), { wrapper });
    expect(result.current.state.personalInfo.fullName).toBe('Saved User');
    expect(result.current.state.profile).toBe('From storage');
  });

  it('throws if useCV is used outside CVProvider', () => {
    expect(() => {
      renderHook(() => useCV());
    }).toThrow('useCV must be used within CVProvider');
  });

  it('unknown action returns same state', () => {
    const { result } = renderHook(() => useCV(), { wrapper });
    const before = result.current.state;
    act(() => {
      result.current.dispatch({ type: 'UNKNOWN_ACTION' });
    });
    expect(result.current.state).toEqual(before);
  });
});
