import { cleanupNode } from './createElement';

interface Root {
  render: (element: Node) => void;
}

export const createRoot = (container: Element | null): Root => {
  if (!container) throw new Error('createRoot: container is null');
  return {
    render(element: Node): void {
      cleanupNode(container);
      container.innerHTML = '';
      container.appendChild(element);
    },
  };
};
