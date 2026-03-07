import { cleanupNode } from 'src/core/createElement';
import { matchRoute } from 'src/router';

const DirectoryRouter = (): Node => {
  const container = document.createElement('div');
  matchRoute((_path, component) => {
    cleanupNode(container);
    container.replaceChildren(component() as Node);
  });
  return container;
};

export default DirectoryRouter;
