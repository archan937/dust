import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { DirectoryRouter, registerRoutes } from 'dust';

beforeEach(() => {
  history.replaceState({}, '', '/');
});

describe('Components', () => {
  describe('DirectoryRouter', () => {
    test('returns a container element', () => {
      const container = DirectoryRouter() as HTMLElement;
      expect(container.tagName).toBe('DIV');
    });

    test('renders matched component into container', () => {
      const comp = mock(() => document.createElement('section'));
      // Register routes externally (as the dev server injection would do).
      registerRoutes({ '/dr-page': comp });
      const container = DirectoryRouter() as HTMLElement;
      history.pushState({}, '', '/dr-page');
      expect(comp).toHaveBeenCalled();
      expect(container.firstElementChild?.tagName).toBe('SECTION');
    });

    test('cleans up container before re-render', () => {
      const comp = mock(() => document.createElement('div'));
      registerRoutes({ '/dr-cleanup': comp });
      const container = DirectoryRouter() as HTMLElement;
      history.pushState({}, '', '/dr-cleanup');
      history.replaceState({}, '', '/');
      history.pushState({}, '', '/dr-cleanup');
      expect(container.children.length).toBeLessThanOrEqual(1);
    });

    test('renders immediately if route is already active at mount time', () => {
      const comp = mock(() => document.createElement('aside'));
      registerRoutes({ '/dr-immediate': comp });
      history.pushState({}, '', '/dr-immediate');
      // DirectoryRouter registered after navigation — matchRoute fires immediately.
      DirectoryRouter();
      expect(comp).toHaveBeenCalled();
    });
  });
});
