export * from "../index";

export const createContext = (...args: unknown[]): void => {
  console.log("createContext", args);
};
