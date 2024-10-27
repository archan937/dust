export * from "./components";
export * from "./context";
export * from "./element";
export * from "./router";
export * from "./state";

import * as components from "./components";
import * as context from "./context";
import * as element from "./element";
import * as router from "./router";
import * as state from "./state";

const Dust = {
  ...components,
  ...context,
  ...element,
  ...router,
  ...state,
} as const;

export default Dust;
