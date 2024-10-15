declare namespace Dust {
  type Child =
    | Node
    | string
    | number
    | boolean
    | null
    | undefined
    | (() => Child);

  type Children = Child[];
  type Component = (props: Props) => Element;

  const Fragment = "";
  function NoElement(props: Props): Props;

  interface CSSProperties {
    display?:
      | "none"
      | "block"
      | "inline"
      | "inline-block"
      | "flex"
      | "grid"
      | "table"
      | "inline-table"
      | "list-item"
      | "run-in"
      | "inherit"
      | "initial"
      | "unset";
    position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    float?: "left" | "right" | "none";
    clear?: "left" | "right" | "both" | "none";
    overflow?: "visible" | "hidden" | "scroll" | "auto";
    overflowX?: "visible" | "hidden" | "scroll" | "auto";
    overflowY?: "visible" | "hidden" | "scroll" | "auto";
    zIndex?: number;
    margin?: string | number;
    marginTop?: string | number;
    marginRight?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    padding?: string | number;
    paddingTop?: string | number;
    paddingRight?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    width?: string | number;
    height?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    border?: string;
    borderWidth?: string | number;
    borderStyle?:
      | "none"
      | "solid"
      | "dotted"
      | "dashed"
      | "double"
      | "groove"
      | "ridge"
      | "inset"
      | "outset"
      | "inherit"
      | "initial"
      | "unset";
    borderColor?: string;
    borderRadius?: string | number;
    background?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    backgroundRepeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
    color?: string;
    fontFamily?: string;
    fontSize?: string | number;
    fontWeight?: "normal" | "bold" | "bolder" | "lighter" | "inherit" | number;
    lineHeight?: string | number;
    textAlign?: "left" | "right" | "center" | "justify";
    textDecoration?: "none" | "underline" | "overline" | "line-through";
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
    letterSpacing?: string | number;
    wordSpacing?: string | number;
    flex?: string | number;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly";
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    alignSelf?:
      | "auto"
      | "flex-start"
      | "flex-end"
      | "center"
      | "baseline"
      | "stretch";
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridArea?: string;
    gridColumn?: string;
    gridRow?: string;
    transition?: string;
    transitionDuration?: string;
    transitionTimingFunction?: string;
    transitionDelay?: string;
    transform?: string;
    cursor?:
      | "auto"
      | "default"
      | "pointer"
      | "text"
      | "wait"
      | "move"
      | "help"
      | "not-allowed"
      | string;
    opacity?: number;
    boxShadow?: string;
    outline?: string;
    [key: string]: string | number | undefined; // Allows for any other CSS properties
  }

  type Props = {
    id?: string;
    class?: string;
    style?: CSSProperties;
    children?: Child | Children;
  } & Record<string, unknown>;

  type Params = Record<string, string>;
  type Route = (() => Element) | (() => void);
  type Routes = Record<string, Route>;
  type RouteHandler = (path: string, page: Route) => void;

  type Primitive = string | number | boolean | null | undefined;
  type AnyObject = Record<string | symbol, unknown>;

  type WithHiddenGetterProperties<T> = T & HiddenGetterProperties;
  type AnyObjectWithHiddenGetterProperties<T> = {
    [K in keyof T]: WithHiddenGetterProperties<T[K]> & Skippable;
  } & HiddenGetterProperties;

  type StateHandler = (() => unknown) & HiddenHandlerProperties & Skippable;
  type StateValue<T> = T | Primitive;

  type StateGetter<T> = (() => T) & HiddenGetterProperties;
  type StateSetter<T> = (
    newValue: T | ((prev: T) => T),
    merge?: boolean,
  ) => void;

  interface Root {
    render: (component: Component | (() => Element)) => void;
  }

  interface Skippable {
    __skip__?: boolean;
  }

  interface HiddenGetterProperties {
    __detach__?: () => unknown;
    __getter__?: () => unknown;
    __setter__?: StateSetter<unknown>;
  }

  interface HiddenHandlerProperties {
    __handler__?: () => void;
    __states__?: Record<string, boolean>;
  }

  function createRoot(root: HTMLElement): Root;
  function createElement(
    componentOrTagNameOrNode: string | Component | Node | null,
    props: Props,
    ...rest: Children
  ): Node | Record<string, unknown>;

  function matchRoute(handler: RouteHandler): void;
  function registerRoutes(newRoutes: Routes): void;
}

declare module "src/state" {
  export function useState<T>(
    initialValue?: T | (() => T),
    handler?: StateHandler,
  ): [StateGetter<T>, StateSetter<T>];
}

export = Dust;
export as namespace Dust;
