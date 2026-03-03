import { matchRoute } from 'src/router';

function DirectoryRouter(): Node {
  const container = document.createElement('div');
  matchRoute((_path, component) => container.replaceChildren(component() as Node));
  return container;
}

export default DirectoryRouter;
