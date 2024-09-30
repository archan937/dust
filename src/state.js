const {
  isArray,
  isFunction,
  isObject,
  isUndefined,
  randomHash,
} = require("utils");

const MERGE = "__mergeValue__";
const UNSET = "__unsetValue__";

const getValue = (value) => {
  const getter = value?.__getter__;
  return getter ? getter() : value;
};

const setValue = (currentValue, newValue, merge) => {
  const currentIsObject = isObject(currentValue);
  let value = newValue;

  if (isFunction(newValue)) {
    newValue.__skip__ = true;
    if (currentIsObject) {
      const prev = new Proxy(() => undefined, {
        apply(_, _this, [newObject]) {
          return newObject ? { [MERGE]: newObject } : currentValue;
        },
        get(_, property) {
          return currentValue[property];
        },
      });
      value = newValue(prev);
    } else {
      value = newValue(currentValue);
    }
  }

  if (isObject(value)) {
    if (currentIsObject) {
      const deepMerge = value[MERGE];
      updateState(currentValue, deepMerge || value, merge || !!deepMerge);
      return currentValue;
    }
  }

  return value;
};

const updateState = (currentObject, newObject, merge) => {
  const keys = {};

  Object.entries(newObject).forEach(([key, value]) => {
    const setter = currentObject[key]?.__setter__;
    setter ? setter(value, merge) : (currentObject[key] = value);
    keys[key] = true;
  });

  if (!merge) {
    Object.keys(currentObject).forEach((key) => {
      if (key !== "__skip__") {
        const discardKey = !keys[key];
        const isPlainFunction =
          currentObject[key]?.__skip__ && !currentObject[key].__getter__;
        if (discardKey && !isPlainFunction) {
          const setter = currentObject[key]?.__setter__;
          setter ? setter(UNSET) : delete currentObject[key];
        }
      }
    });
  }
};

const useState = (initialValue, owner) => {
  if (isFunction(initialValue)) {
    initialValue.__skip__ = true;
    return [initialValue];
  }

  let state = initialValue;
  const hash = randomHash();
  const listeners = [];

  const register = (caller) => {
    if (
      !caller ||
      caller === owner ||
      caller.name === "__skip__" ||
      caller.__skip__ ||
      caller.__states__?.[hash]
    ) {
      return;
    }
    // console.log(caller.toString(), caller.__states__);
    caller.__states__ || (caller.__states__ = {});
    caller.__states__[hash] = true;
    listeners.push(caller);
  };

  const getter = new Proxy(() => undefined, {
    apply: function __skip__() {
      register(arguments.callee.caller);
      if (isObject(state)) {
        const object = isArray(state) ? [] : {};
        Object.keys(state).forEach((key) => {
          object[key] = getValue(state[key]);
        });
        return object;
      }
      return state;
    },
    get: function __skip__(_, property) {
      if (property === "__getter__") {
        return () => state;
      }
      if (property === "__setter__") {
        return setter;
      }
      if (isUndefined(state)) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(state, property)) {
        register(arguments.callee.caller);
        state[property] = useState(state[property], owner)[0];
      }
      return state[property];
    },
  });

  const setter = (newValue, merge) => {
    const unset = newValue === UNSET;

    if (unset && isObject(state)) {
      const keys = isObject(state) ? Object.keys(newValue) : [];
      Object.entries(state).forEach(([key, value]) => {
        if (!keys.includes(key)) {
          value.__setter__?.(UNSET);
        }
      });
    }

    state = unset ? undefined : setValue(state, newValue, merge);
    listeners.forEach((listener) => (listener.__handler__ || listener)());

    if (unset) {
      listeners.length = 0;
    }
  };

  return [getter, setter];
};

exports.useState = function (initialValue, owner) {
  owner = owner || arguments.callee.caller;
  return useState(initialValue, owner);
};
