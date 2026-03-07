export interface Context<T> {
  defaultValue: T;
}

export const createContext = <T>(defaultValue: T): Context<T> => ({
  defaultValue,
});

// NOTE: Context propagation is not yet implemented. useContext always returns
// the defaultValue regardless of any provider in the tree.
export const useContext = <T>(context: Context<T>): T => {
  console.warn(
    '[Dust] useContext is a stub — it always returns the defaultValue. ' +
      'Provider-based propagation is not yet implemented.',
  );
  return context.defaultValue;
};
