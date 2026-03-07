export class ReactiveList<T> {
  constructor(
    public readonly subscribe: (fn: () => void) => () => void,
    public readonly getItems: () => T[],
    public readonly render: (item: T) => Node,
  ) {}
}
