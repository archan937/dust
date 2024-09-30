export * from "./element";
export * from "./state";

import * as element from "./element";
import * as state from "./state";

const Hydrogen = {
  ...element,
  ...state,
};

export default Hydrogen;
