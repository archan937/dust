export type Context<T> = { defaultValue: T };

export const createContext = <T>(defaultValue: T): Context<T> => ({ defaultValue });

export const useContext = <T>(context: Context<T>): T => context.defaultValue;
