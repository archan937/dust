import { describe, expect, test } from 'bun:test';
import { cleanupNode, createElement, ReactiveList, useState } from 'dust';
import type { Getter, Setter } from 'src/types';

interface Item {
  name: string;
}

interface MakeListResult {
  container: HTMLElement;
  items: Getter<Item[]>;
  setItems: Setter<Item[]>;
}

const makeList = (initialItems: Item[]): MakeListResult => {
  const [items, setItems] = useState(initialItems);
  const reactiveList = (
    items as unknown as {
      map: (fn: (item: Item) => Node) => ReactiveList<Item>;
    }
  ).map((item) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    return li;
  });
  const container = createElement(
    'ul',
    null,
    reactiveList as unknown as ReactiveList<unknown>,
  ) as HTMLElement;
  return { container, items, setItems };
};

const lis = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.children) as HTMLElement[];

describe('ReactiveList (items.map)', () => {
  test('renders initial items in order', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const { container } = makeList([a, b]);
    expect(lis(container).length).toBe(2);
    expect(lis(container)[0].textContent).toBe('Alice');
    expect(lis(container)[1].textContent).toBe('Bob');
  });

  test('renders empty initial array', () => {
    const { container } = makeList([]);
    expect(lis(container).length).toBe(0);
  });

  test('appends new item when array grows', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const { container, items, setItems } = makeList([a, b]);
    const c = { name: 'Carol' };
    setItems([...items(), c]);
    expect(lis(container).length).toBe(3);
    expect(lis(container)[2].textContent).toBe('Carol');
  });

  test('removes item when array shrinks', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const { container, items, setItems } = makeList([a, b]);
    setItems([items()[0]]);
    expect(lis(container).length).toBe(1);
    expect(lis(container)[0].textContent).toBe('Alice');
  });

  test('reuses existing nodes by identity when reordered', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const { container, setItems } = makeList([a, b]);
    const [liA, liB] = lis(container);
    setItems([b, a]);
    expect(lis(container)[0]).toBe(liB);
    expect(lis(container)[1]).toBe(liA);
  });

  test('same reference at different index is not recreated', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const c = { name: 'Carol' };
    const { container, setItems } = makeList([a, b, c]);
    const orig = lis(container);
    setItems([c, a, b]);
    const updated = lis(container);
    expect(updated[0]).toBe(orig[2]);
    expect(updated[1]).toBe(orig[0]);
    expect(updated[2]).toBe(orig[1]);
  });

  test('items.push triggers update', () => {
    const a = { name: 'Alice' };
    const { container, items } = makeList([a]);
    const b = { name: 'Bob' };
    items.push(b);
    expect(lis(container).length).toBe(2);
    expect(lis(container)[1].textContent).toBe('Bob');
  });

  test('items.unshift triggers update and correct ordering', () => {
    const b = { name: 'Bob' };
    const { container, items } = makeList([b]);
    const a = { name: 'Alice' };
    items.unshift(a);
    expect(lis(container).length).toBe(2);
    expect(lis(container)[0].textContent).toBe('Alice');
    expect(lis(container)[1].textContent).toBe('Bob');
  });

  test('items.splice removes correct node', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const c = { name: 'Carol' };
    const { container, items } = makeList([a, b, c]);
    items.splice(1, 1);
    expect(lis(container).length).toBe(2);
    expect(lis(container)[0].textContent).toBe('Alice');
    expect(lis(container)[1].textContent).toBe('Carol');
  });

  test('cleanupNode stops updates', () => {
    const a = { name: 'Alice' };
    const b = { name: 'Bob' };
    const { container, setItems } = makeList([a, b]);
    cleanupNode(container);
    const c = { name: 'Carol' };
    setItems([a, b, c]);
    expect(lis(container).length).toBe(2);
  });
});
