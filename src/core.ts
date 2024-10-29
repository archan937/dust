import * as context from "./context";
import * as element from "./element";
import * as router from "./router";
import * as state from "./state";

const Dust = {
  ...context,
  ...element,
  ...router,
  ...state,
} as const;

export default Dust;
export * from "./context";
export * from "./element";
export * from "./router";
export * from "./state";
