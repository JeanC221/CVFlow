import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCompletionPercentage } from '../../utils/helpers';

describe('helpers', () => {
  describe('getCompletionPercentage', () => {
    it('returns 0 for empty state', () => {
      const state = {
        personalInfo: { fullName: '' },
        profile: '',
        experience: [],
        education: [],
        courses: [],
        skills: [],
        languages: [],
        projects: [],
      };
      expect(getCompletionPercentage(state)).toBe(0);
    });

    it('returns 100 when all sections filled', () => {
      const state = {
        personalInfo: { fullName: 'John' },
        profile: 'A profile',
        experience: [{ id: '1' }],
        education: [{ id: '1' }],
        courses: [{ id: '1' }],
        skills: [{ id: '1' }],
        languages: [{ id: '1' }],
        projects: [{ id: '1' }],
      };
      expect(getCompletionPercentage(state)).toBe(100);
    });

    it('returns 50 when half sections filled', () => {
      const state = {
        personalInfo: { fullName: 'John' },
        profile: 'Yes',
        experience: [{ id: '1' }],
        education: [{ id: '1' }],
        courses: [],
        skills: [],
        languages: [],
        projects: [],
      };
      expect(getCompletionPercentage(state)).toBe(50);
    });

    it('returns 13 for only fullName filled (1/8)', () => {
      const state = {
        personalInfo: { fullName: 'John' },
        profile: '',
        experience: [],
        education: [],
        courses: [],
        skills: [],
        languages: [],
        projects: [],
      };
      expect(getCompletionPercentage(state)).toBe(13);
    });
  });

  describe('exportDataAsJSON', () => {
    it('creates a download link with correct data', async () => {
      const { exportDataAsJSON } = await import('../../utils/helpers');
      const createObjectURL = vi.fn(() => 'blob:test');
      const revokeObjectURL = vi.fn();
      global.URL.createObjectURL = createObjectURL;
      global.URL.revokeObjectURL = revokeObjectURL;
      const clickSpy = vi.fn();
      vi.spyOn(document, 'createElement').mockReturnValue({
        set href(v) { this._href = v; },
        get href() { return this._href; },
        set download(v) { this._download = v; },
        get download() { return this._download; },
        click: clickSpy,
      });

      exportDataAsJSON({ test: 'data' });
      expect(createObjectURL).toHaveBeenCalledOnce();
      expect(clickSpy).toHaveBeenCalledOnce();
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:test');

      vi.restoreAllMocks();
    });
  });
});
