import { type Child, Fragment } from 'src/core/createElement';

export interface Context<T> {
  defaultValue: T;
  Provider: (props: { value: T }, ...children: unknown[]) => Node;
}

const stacks = new WeakMap<Context<unknown>, unknown[]>();

const getStack = (context: Context<unknown>): unknown[] => {
  let stack = stacks.get(context);
  if (!stack) {
    stack = [];
    stacks.set(context, stack);
  }
  return stack;
};

export const createContext = <T>(defaultValue: T): Context<T> => {
  const context = {} as Context<T>;
  context.defaultValue = defaultValue;

  context.Provider = (props: { value: T }, ...children: unknown[]): Node => {
    const stack = getStack(context as Context<unknown>);
    stack.push(props.value);
    const node = Fragment(null, ...(children as Child[]));
    stack.pop();
    return node;
  };

  return context;
};

export const useContext = <T>(context: Context<T>): T => {
  const stack = stacks.get(context as Context<unknown>);
  if (stack && stack.length > 0) return stack[stack.length - 1] as T;
  return context.defaultValue;
};
