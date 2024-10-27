export const createContext = (...args: unknown[]): void => {
  console.log("createContext", args);
};

export const useContext = (...args: unknown[]): void => {
  console.log("useContext", args);
};
