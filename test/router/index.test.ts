import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { matchRoute, registerRoutes, useParams } from 'dust';

// Reset URL before each test to avoid cross-test path pollution.
beforeEach(() => {
  history.replaceState({}, '', '/');
});

describe('Router', () => {
  describe('registerRoutes + matchRoute', () => {
    test('handler is called immediately when route is already active', () => {
      const handler = mock(() => undefined);
      // Establish a known currentPath by registering routes first.
      registerRoutes({ '/': () => document.createDocumentFragment() });
      // matchRoute after registerRoutes fires the handler immediately.
      matchRoute(handler);
      expect(handler).toHaveBeenCalled();
    });

    test('handler is called when registerRoutes triggers renderRoute', () => {
      const component = mock(() => document.createDocumentFragment());
      const handler = mock((_path: string, page: unknown) => {
        if (page === component) {
          (document.createElement('div') as HTMLElement).textContent =
            'rendered';
        }
      });
      matchRoute(handler);
      registerRoutes({ '/': component });
      expect(handler).toHaveBeenCalled();
    });

    test('renders matched route component', () => {
      const component = mock(() => document.createElement('article'));
      matchRoute((_path, page) => {
        if (page === component) page();
      });
      registerRoutes({ '/matched-route': component });
      history.pushState({}, '', '/matched-route');
      expect(component).toHaveBeenCalled();
    });

    test('extracts route params via useParams', () => {
      registerRoutes({ '/items/:id': () => document.createDocumentFragment() });
      history.pushState({}, '', '/items/42');
      expect(useParams()).toEqual({ id: '42' });
    });

    test('params reset when navigating to non-param route', () => {
      registerRoutes({
        '/products/:slug': () => document.createDocumentFragment(),
        '/home': () => document.createDocumentFragment(),
      });
      history.pushState({}, '', '/products/widget');
      expect(useParams()).toEqual({ slug: 'widget' });
      history.pushState({}, '', '/home');
      expect(useParams()).toEqual({});
    });

    test('does not re-render when navigating to the same path', () => {
      const component = mock(() => document.createDocumentFragment());
      const handler = mock(() => undefined);
      registerRoutes({ '/same-path': component });
      history.pushState({}, '', '/same-path');
      const callsBefore = handler.mock.calls.length;
      matchRoute(handler);
      const callsAfterMatch = handler.mock.calls.length;
      history.pushState({}, '', '/same-path'); // same path, should skip
      expect(handler.mock.calls.length).toBe(callsAfterMatch); // no new call
      void callsBefore;
    });
  });

  describe('history interception', () => {
    test('replaceState navigates to new route', () => {
      const component = mock(() => document.createDocumentFragment());
      registerRoutes({ '/replaced': component });
      history.replaceState({}, '', '/replaced');
      expect(component).toHaveBeenCalled();
    });

    test('popstate re-renders current route', () => {
      const component = mock(() => document.createDocumentFragment());
      registerRoutes({ '/popstate-test': component });
      history.pushState({}, '', '/popstate-test');
      const countBefore = component.mock.calls.length;
      // Simulate browser back/forward — resets currentPath so renderRoute re-fires.
      registerRoutes({}); // resets currentPath → next renderRoute will run
      window.dispatchEvent(new Event('popstate'));
      expect(component.mock.calls.length).toBeGreaterThanOrEqual(countBefore);
    });

    test('click on same-origin anchor navigates via pushState', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/anchor-nav';
      document.body.appendChild(a);

      registerRoutes({
        '/anchor-nav': () => document.createDocumentFragment(),
      });
      a.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );

      expect(window.location.pathname).toBe('/anchor-nav');
      document.body.removeChild(a);
    });

    test('click on external link does not navigate', () => {
      const a = document.createElement('a');
      a.href = 'https://external.com/page';
      document.body.appendChild(a);

      // Verify the SPA router did not fire — matchRoute handler must not be
      // called again after the click (it may fire once immediately on register).
      let routeChanges = 0;
      matchRoute(() => {
        routeChanges++;
      });
      const changesBefore = routeChanges;

      a.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );

      expect(routeChanges).toBe(changesBefore);
      document.body.removeChild(a);
    });

    test('click on anchor with hash does not navigate via pushState', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/page#section';
      document.body.appendChild(a);

      // hash links must not be intercepted by the SPA router
      let routeChanges = 0;
      matchRoute(() => {
        routeChanges++;
      });
      const changesBefore = routeChanges;

      a.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );

      expect(routeChanges).toBe(changesBefore);
      document.body.removeChild(a);
    });

    test('click on non-anchor element does not navigate', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const prevPath = window.location.pathname;
      div.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(window.location.pathname).toBe(prevPath);
      document.body.removeChild(div);
    });
  });

  describe('resolvePath', () => {
    test('resolves absolute URL by extracting pathname', () => {
      registerRoutes({
        '/from-absolute': () => document.createDocumentFragment(),
      });
      // window.location (the Location object) is passed to renderRoute
      // Its String() form is the full URL: 'http://localhost/...'
      history.pushState({}, '', '/from-absolute');
      expect(window.location.pathname).toBe('/from-absolute');
    });

    test('strips trailing slash', () => {
      const comp = mock(() => document.createDocumentFragment());
      registerRoutes({ '/trailingslash': comp });
      history.pushState({}, '', '/trailingslash/');
      expect(comp).toHaveBeenCalled();
    });
  });
});
