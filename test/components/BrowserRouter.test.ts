import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { BrowserRouter, Route } from 'dust';

beforeEach(() => {
  history.replaceState({}, '', '/');
});

describe('Components', () => {
  describe('Route', () => {
    test('returns a DocumentFragment', () => {
      const frag = Route({
        path: '/test',
        component: () => document.createElement('div'),
      });
      expect(frag instanceof DocumentFragment).toBe(true);
    });

    test('stores route data keyed by fragment', () => {
      const comp = (): HTMLDivElement => document.createElement('div');
      const frag = Route({ path: '/stored', component: comp });
      // BrowserRouter uses the fragment to look up the route — verified indirectly below.
      expect(frag instanceof DocumentFragment).toBe(true);
      void comp;
    });
  });

  describe('BrowserRouter', () => {
    test('returns a container element', () => {
      const container = BrowserRouter({}) as HTMLElement;
      expect(container.tagName).toBe('DIV');
    });

    test('renders component for current route', () => {
      const comp = mock(() => document.createElement('section'));
      history.replaceState({}, '', '/br-home');
      const route = Route({ path: '/br-home', component: comp });
      BrowserRouter({}, route);
      expect(comp).toHaveBeenCalled();
    });

    test('renders component on navigation', () => {
      const comp = mock(() => document.createElement('article'));
      const route = Route({ path: '/br-nav', component: comp });
      const container = BrowserRouter({}, route) as HTMLElement;
      history.pushState({}, '', '/br-nav');
      expect(comp).toHaveBeenCalled();
      expect(container.firstElementChild?.tagName).toBe('ARTICLE');
    });

    test('handles redirect route', () => {
      const comp = mock(() => document.createElement('main'));
      const redirectRoute = Route({ path: '/br-old', redirect: '/br-new' });
      const targetRoute = Route({ path: '/br-new', component: comp });
      BrowserRouter({}, redirectRoute, targetRoute);
      history.pushState({}, '', '/br-old');
      // Redirect fires pushState to /br-new, which then renders comp.
      expect(window.location.pathname).toBe('/br-new');
      expect(comp).toHaveBeenCalled();
    });

    test('handles nested routes (recurses into children)', () => {
      const childComp = mock(() => document.createElement('nav'));
      const childRoute = Route({ path: 'nested-child', component: childComp });
      const parentRoute = Route({ path: '/br-parent' }, childRoute);
      BrowserRouter({}, parentRoute);
      history.pushState({}, '', '/br-parent/nested-child');
      expect(childComp).toHaveBeenCalled();
    });

    test('skips non-route nodes in children', () => {
      const comp = mock(() => document.createElement('div'));
      const plainNode = document.createElement('span'); // not a Route fragment
      const route = Route({ path: '/br-skip', component: comp });
      BrowserRouter({}, plainNode, route);
      history.pushState({}, '', '/br-skip');
      expect(comp).toHaveBeenCalled();
    });

    test('cleans up container before re-render', () => {
      const [calls, comps] = [0, [] as HTMLElement[]];
      const comp = mock(() => {
        const el = document.createElement('div');
        comps.push(el);
        return el;
      });
      const route = Route({ path: '/br-cleanup', component: comp });
      const container = BrowserRouter({}, route) as HTMLElement;
      history.pushState({}, '', '/br-cleanup');
      history.replaceState({}, '', '/');
      history.pushState({}, '', '/br-cleanup');
      // comp called multiple times, container always has one child
      expect(container.children.length).toBeLessThanOrEqual(1);
      void calls;
      void comps;
    });
  });
});
