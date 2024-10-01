export * from "./element";
export * from "./state";

import * as element from "./element";
import * as state from "./state";

const Dust = {
  ...element,
  ...state,
};

export default Dust;
