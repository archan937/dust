const useRef = <T>(initialValue: T): { current: T } => ({
  current: initialValue,
});

export default useRef;
