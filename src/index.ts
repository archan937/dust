export * from "./components";
export * from "./element";
export * from "./router";
export * from "./state";

import * as components from "./components";
import * as element from "./element";
import * as router from "./router";
import * as state from "./state";

const Dust = {
  ...components,
  ...element,
  ...router,
  ...state,
} as const;

export default Dust;
